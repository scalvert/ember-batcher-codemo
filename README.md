# ember-batcher-codemod


A collection of codemod's for ember-batcher-codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-batcher-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-batcher-codemod
ember-batcher-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [convert-spaniel-to-batcher](transforms/convert-spaniel-to-batcher/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`