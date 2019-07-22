import Component from '@ember/component';
import { readDOM } from 'ember-batcher';

export default Component.extend({
  init() {
    readDOM(() => {
      // ... some DOM read
    });
  },
});
