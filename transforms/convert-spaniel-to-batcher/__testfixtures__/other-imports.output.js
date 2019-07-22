import Component from '@ember/component';
import { readDOM, mutateDOM } from 'ember-batcher';
import { SpanielObserver } from 'spaniel';

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
