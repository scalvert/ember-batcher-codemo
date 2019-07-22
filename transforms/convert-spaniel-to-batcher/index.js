const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);

  const namedImports = ['scheduleRead', 'scheduleWork'];

  const replacers = {
    scheduleRead: {
      replaceWith: 'readDOM',
      replace: () => {
        return j.identifier('readDOM');
      },
    },
    scheduleWork: {
      replaceWith: 'mutateDOM',
      replace: () => {
        return j.identifier('mutateDOM');
      },
    },
  };

  let importNames = [];

  function addImport(importDeclaration, replace = true) {
    importNames = importNames
      .sort(function(a, b) {
        let localA = a.local.name.toUpperCase();
        let localB = b.local.name.toUpperCase();
        return localA < localB ? -1 : localA > localB ? 1 : 0;
      })
      .reverse();

    importDeclaration[replace ? 'replaceWith' : 'insertBefore'](
      j.importDeclaration(importNames, j.literal('ember-batcher'))
    );
  }

  function updateImports(importDeclaration) {
    let spanielImport = importDeclaration.get(0).node;
    let specifiers = spanielImport.specifiers;
    let shouldUpdate = specifiers.some(
      node => !namedImports.includes(node.local.name)
    );

    if (shouldUpdate) {
      let i = specifiers.length;

      while (i--) {
        let sp = specifiers[i];

        if (namedImports.includes(sp.local.name)) {
          specifiers.splice(i, 1);
        }
      }

      addImport(importDeclaration, false);
    } else {
      addImport(importDeclaration);
    }
  }

  function findImportPath(names, path) {
    return root
      .find(j.ImportDeclaration, { source: { value: path } })
      .filter(p =>
        p.value.specifiers.find(
          sp =>
            sp.type === 'ImportSpecifier' &&
            names.some(name => name === sp.local.name)
        )
      );
  }

  function transform() {
    const spanielImports = findImportPath(namedImports, 'spaniel');

    if (spanielImports.size() > 0) {
      let importDeclaration = spanielImports.get(0).node;
      let i = importDeclaration.specifiers.length;

      while (i--) {
        let sp = importDeclaration.specifiers[i];
        if (namedImports.includes(sp.local.name)) {
          let replacer = replacers[sp.local.name];

          root
            .find(j.CallExpression, {
              callee: {
                type: 'Identifier',
                name: sp.local.name,
              },
            })
            .find(j.Identifier, {
              name: sp.local.name,
            })
            .replaceWith(replacer.replace);

          importNames.push(
            j.importSpecifier(
              j.identifier(replacer.replaceWith),
              j.identifier(replacer.replaceWith)
            )
          );
        }
      }

      if (importNames.length > 0) {
        updateImports(spanielImports);
      }
    }
  }

  transform();

  return root.toSource({
    quote: 'single',
    wrapColumn: 100,
    trailingComma: true,
  });
};
