import Component from '@ember/component';
import { scheduleRead } from 'spaniel';

export default Component.extend({
  init() {
    scheduleRead(() => {
      // ... some DOM read
    });
  },
});
