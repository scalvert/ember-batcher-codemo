import Component from '@ember/component';
import { scheduleWork } from 'spaniel';

export default Component.extend({
  init() {
    scheduleWork(() => {
      // ... some DOM read
    });
  },
});
