<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!drawer || miniState"
    @click.capture="drawerClick"
    :width="239"
    :breakpoint="500"
    bordered
    class="bg-primary text-white"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item class="sidebar q-mt-md" v-show="!miniState">
          <q-select
            dense
            options-dense
            elevated
            filled
            emit-value
            map-options
            class="xcv bg-secondary text-white full-width q-ma-xs"
            v-model="cmpLocale"
            :options="options"
            popup-content-class="popup-styled"
            :popup-content-style="{
              backgroundColor: '#fff',
              color: '#6E7191',
              width: '200px',
              height: '200px',
              overflow: 'auto',
              opacity: '1',
            }"
            ref="qselect"
            @filter="filterFn"
          >
            <template #before-options>
              <q-input
                class="sticky-input z-top q-ma-sm text-black"
                dense
                borderless
                outlined
                clearable
                hide-bottom-space
                clear-icon="close"
                bg-color="grey-2"
                v-model="filter"
                @update:model-value="filterFn2"
                ref="qinput"
              >
                <template v-slot:prepend>
                  <q-icon round name="search" />
                </template>
              </q-input>
            </template>
          </q-select>
        </q-item>
        <q-item
          v-for="(item, index) in sidebarDetails"
          :key="index"
          :active="item.name === activeItem"
          class="cursor-pointer"
          active-class="active-item"
          clickable
          :to="item.link"
          @click="activeItem = item.name"
        >
          <q-item-section side class="">
            <q-icon size="18px" :name="`img:/icons/${item.icon}.svg`" />
          </q-item-section>

          <q-item-section> {{ $t(item.name) }} </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <div class="q-mini-drawer absolute" style="top: 8px; right: -17px">
      <q-btn
        dense
        round
        elevated
        class="bg-white text-black"
        v-if="miniState == false"
        icon="chevron_left"
        @click="miniState = true"
      />
      <q-btn
        dense
        round
        elevated
        class="bg-white text-black"
        v-if="miniState == true"
        icon="chevron_right"
        @click="miniState = false"
      />
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, onMounted, onBeforeMount } from 'vue';
import { useCounterStore } from '../stores/example-store';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });
const model = ref('English');
const miniState = ref(false);
const drawer = ref(false);
const selectedSearchOption = ref(null);
const qselect = ref(null);
const qinput = ref(null);
const store = useCounterStore();
const activeItem = ref('overview');
let cmpLocale = ref(null);

const someOpts = [
  { label: 'English', value: 'en-US' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Hindi', value: 'hi-IN' },
  { label: 'English', value: 'en-US' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Hindi', value: 'hi-IN' },
];
const options = ref(null);
// const opts = Object.freeze(options);
const { sidebarDetails, lang } = storeToRefs(store);
function filterFn(val, update) {
  console.log('1234');
  console.log(val);
  if (val === '') {
    update(() => {
      options.value = store.lang;
    });
    return;
  }

  update(() => {
    console.log(2323);
    const needle = val.toLowerCase();
    options.value = store.lang.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
}
function filterFn2(val) {
  console.log(qselect.value);
  qselect.value.filter(val);
}
function check() {
  console.log('333');
}
onBeforeMount(async () => {
  await store.getSidebarDetails();
  await store.getLanguagesByDeployment();
  options.value = lang.value;
  cmpLocale.value = locale.value;
});
watch(cmpLocale, () => {
  const storage = localStorage || window.localStorage;
  // console.log(locale);
  locale.value = cmpLocale.value;
  storage.setItem('language', cmpLocale.value);
});
</script>

<style lang="scss" scoped>
.xcv {
  border-radius: 6px !important;
}
.sticky-input {
  position: sticky;
  top: 0;
  opacity: 1;
  border: solid 2px #fff;
  border-radius: 4px;
  box-shadow: 0 0 2px #000 inset;
}
</style>
