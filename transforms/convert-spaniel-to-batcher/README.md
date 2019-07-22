# convert-spaniel-to-batcher


## Usage

```
npx ember-batcher-codemod convert-spaniel-to-batcher path/of/files/ or/some**/*glob.js

# or

yarn global add ember-batcher-codemod
ember-batcher-codemod convert-spaniel-to-batcher path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [both](#both)
* [scheduleRead](#scheduleRead)
* [scheduleWork](#scheduleWork)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="both">**both**</a>

**Input** (<small>[both.input.js](transforms/convert-spaniel-to-batcher/__testfixtures__/both.input.js)</small>):
```js
import Component from '@ember/component';
import { scheduleRead, scheduleWork } from 'spaniel';

export default Component.extend({
  init() {
    scheduleRead(() => {
      // ... some DOM read

      scheduleWork(() => {
        // ... some DOM work
      });
    });
  },
});

```

**Output** (<small>[both.input.js](transforms/convert-spaniel-to-batcher/__testfixtures__/both.output.js)</small>):
```js
import Component from '@ember/component';
import { readDOM, mutateDOM } from 'ember-batcher';

export default Component.extend({
  init() {
    readDOM(() => {
      // ... some DOM read

      mutateDOM(() => {
        // ... some DOM work
      });
    });
  },
});

```
---
<a id="scheduleRead">**scheduleRead**</a>

**Input** (<small>[scheduleRead.input.js](transforms/convert-spaniel-to-batcher/__testfixtures__/scheduleRead.input.js)</small>):
```js
import Component from '@ember/component';
import { scheduleRead } from 'spaniel';

export default Component.extend({
  init() {
    scheduleRead(() => {
      // ... some DOM read
    });
  },
});

```

**Output** (<small>[scheduleRead.input.js](transforms/convert-spaniel-to-batcher/__testfixtures__/scheduleRead.output.js)</small>):
```js
import Component from '@ember/component';
import { readDOM } from 'ember-batcher';

export default Component.extend({
  init() {
    readDOM(() => {
      // ... some DOM read
    });
  },
});

```
---
<a id="scheduleWork">**scheduleWork**</a>

**Input** (<small>[scheduleWork.input.js](transforms/convert-spaniel-to-batcher/__testfixtures__/scheduleWork.input.js)</small>):
```js
import Component from '@ember/component';
import { scheduleWork } from 'spaniel';

export default Component.extend({
  init() {
    scheduleWork(() => {
      // ... some DOM read
    });
  },
});

```

**Output** (<small>[scheduleWork.input.js](transforms/convert-spaniel-to-batcher/__testfixtures__/scheduleWork.output.js)</small>):
```js
import Component from '@ember/component';
import { mutateDOM } from 'ember-batcher';

export default Component.extend({
  init() {
    mutateDOM(() => {
      // ... some DOM read
    });
  },
});

```
<!--FIXTURE_CONTENT_END-->