import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { setActivePinia, createPinia } from 'pinia';
import { useCounterStore } from '../../../src/stores/example-store';
import { mount } from '@vue/test-utils';
import {
  QBreadcrumbs,
  QBreadcrumbsEl,
  QCard,
  QBtn,
  QSpinner,
  QLayout,
} from 'quasar';
import EvrimedPage from '../../../src/pages/EvrimedPage.vue';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

describe('Evrimed', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('has 2 breadcrumbs', () => {
    const wrapper = mount(EvrimedPage);
    const breadcrumb = wrapper.findComponent(QBreadcrumbs);
    const breadcrumbs = breadcrumb.findAllComponents(QBreadcrumbsEl);

    expect(breadcrumbs.length).toEqual(2);
  });
  it('has required fields in card', () => {
    const wrapper = mount(EvrimedPage);
    const card = wrapper.findComponent(QCard);
    const searchButton = card.findComponent(QBtn);

    expect(searchButton.attributes().class).toContain('bg-bluebackground');
  });
  it('click on search button', () => {
    const wrapper = mount(EvrimedPage);
    const { vm } = wrapper;
    const card = wrapper.findComponent(QCard);
    const searchButton = card.findComponent(QBtn);
    searchButton.trigger('click');
    vm.GetMermDetails();
    const showLoader = vm.showLoading;
    expect(showLoader).toEqual(true);
    const store = useCounterStore();
    expect(store.mermDetailsLoading).toBe(true);
    // expect(store.GetMermDetails('1111111111')).toBeCalledTimes(1);
  });
  it('data loaded', () => {
    const wrapper = mount(EvrimedPage);
    const store = useCounterStore();
    store.mermDetailsVisible = true;
    store.mermDetailsLoading = true;
    const card = wrapper.findComponent(QCard);
    expect(card.attributes().class).toContain('mermcard');
  });
});
