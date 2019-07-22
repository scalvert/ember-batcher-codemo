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
