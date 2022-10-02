import messages from 'src/i18n';
import { boot } from 'quasar/wrappers';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import DrawerComponent from '../../../src/components/DrawerComponent.vue';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

describe('DrawerComponent.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  // eslint-disable-next-line jest/expect-expect
  it('i18n', () => {
    const i18n = createI18n({
      legacy: false,
      locale: '',
      globalInjection: true,
      messages: messages,
    });

    const wrapper = mount(DrawerComponent, {
      global: {
        plugins: [i18n],
      },
    });
    console.log(wrapper.html());

    // expect(wrapper.vm.t).toBeTruthy();
  });
});
