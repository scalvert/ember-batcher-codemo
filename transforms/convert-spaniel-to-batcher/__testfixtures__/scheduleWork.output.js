import Component from '@ember/component';
import { mutateDOM } from 'ember-batcher';

export default Component.extend({
  init() {
    mutateDOM(() => {
      // ... some DOM read
    });
  },
});
