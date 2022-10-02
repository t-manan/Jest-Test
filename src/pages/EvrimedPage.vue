<template>
  <q-layout class="layout-background">
    <q-breadcrumbs class="text-blue-grey-6">
      <q-breadcrumbs-el class="text-bold" icon="home" to="/" />
      <q-breadcrumbs-el class="text-bold" label="SEARCH" to="/" />
    </q-breadcrumbs>
    <!-- <h4 class="q-ma-xs q-pa-sm text-bold">Evrimed</h4> -->
    <q-tabs
      v-model="selectedTab"
      align="left"
      class="bg-white bg-bluebackgroundText q-mx-xl q-my-md"
    >
      <q-tab name="SEARCH" class="text-bold q-px-xl">SEARCH</q-tab>
      <q-tab name="MANAGEMENT" class="text-bold q-px-xl">MANAGEMENT</q-tab>
    </q-tabs>
    <q-card flat bordered class="q-mx-xl q-my-sm">
      <q-card-actions horizontal align="left">
        <q-card-section class="text-bold text-blue-grey-4"
          >evriMed (MERM) ID</q-card-section
        >
        <q-card-section class="col-4"
          ><q-input
            elevated
            dense
            outlined
            v-model="mermId"
            placeholder="Enter MERM Id"
            class="full-width q-mr-xs q-ml-lg"
        /></q-card-section>

        <q-btn
          dense
          elevated
          size="md"
          padding="sm lg"
          class="bg-bluebackground text-white text-bold q-ml-md"
          @click="GetMermDetails"
          >Search</q-btn
        >
      </q-card-actions>
    </q-card>
    <div v-if="mermDetailsVisible && !mermDetailsLoading">
      <q-card
        v-if="mermDetails.length !== 0"
        class="mermcard flex q-mx-xl q-my-md"
      >
        <q-card-section horizontal class="q-mx-xl">
          <q-card-section vertical>
            <q-card-section
              class="q-pa-none"
              v-for="(item, index) in mermDetails"
              :key="index"
            >
              <q-item class="q-pa-none" v-if="index % 2 === 0"
                ><q-item-label class="large-text">{{ item.key }}</q-item-label
                ><q-item-label
                  class="q-px-lg text-weight-bolder text-bold large-text"
                  >{{ item.value }}</q-item-label
                >
              </q-item>
            </q-card-section>
          </q-card-section>

          <q-card-section vertical>
            <q-card-section
              class="q-pa-none"
              v-for="(item, index) in mermDetails"
              :key="index"
            >
              <q-item class="q-pa-none" v-if="index % 2 !== 0"
                ><q-item-label class="large-text">{{ item.key }}</q-item-label
                ><q-item-label
                  v-if="item.key !== 'Patient ID'"
                  class="q-px-lg text-bold text-weight-bolder large-text"
                  >{{ item.value }}</q-item-label
                >
                <q-item-label
                  v-else
                  class="q-px-lg text-weight-bolder text-bold decorationText"
                  ><a href="">{{ item.value }}</a></q-item-label
                >
              </q-item>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
      <div
        v-if="mermDetails.length === 0"
        class="flex flex-center large-text text-bold"
      >
        MERM Details Not Found
      </div>
    </div>
    <!-- <q-inner-loading
      :showing="showLoading && mermDetailsLoading"
      label="Loading.."
    /> -->
    <div
      v-if="showLoading && mermDetailsLoading"
      class="loader flex flex-center"
    >
      <q-spinner color="primary" size="2.5em" class="q-mx-auto" />
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../stores/example-store';

const store = useCounterStore();
// const mermDetailsVisible = ref(false);
const mermId = ref('');
const showLoading = ref(false);
const selectedTab = ref('SEARCH');
function GetMermDetails() {
  showLoading.value = true;
  store.GetMermDetails(mermId.value);
  mermDetailsVisible.value = true;
}
const { mermDetails, mermDetailsVisible, mermDetailsLoading } =
  storeToRefs(store);
const data = [
  {
    key: 'MERM Serial Number',
    value: '861833048453809',
  },
  {
    key: 'Allocated',
    value: 'True',
  },
  {
    key: 'Last Heartbeat Received',
    value: null,
  },
  {
    key: 'Patient ID',
    value: '325191',
  },
];
</script>

<style lang="scss" scoped>
a {
  all: unset;
}
</style>
