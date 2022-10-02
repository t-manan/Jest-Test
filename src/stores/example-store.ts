import { defineStore } from 'pinia';
import { api } from '../boot/axios';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    lang: [] as any[],
    languages: [],
    sidebarDetails: [],
    headerLinks: {},
    SearchCriteria: {},
    DropDownItems: {},
    headerDetails: {},
    searchedPatients: [],
    subHierarchies: [],
    breadcrumbs: [],
    hierarchyColumns: [],
    currentHierarchyName: '',
    subHierarchyType: '',
    allowedToAddStaff: false,
    mermDetails: [],
    mermDetailsVisible: false,
    mermDetailsLoading: true,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    async getLanguagesByDeployment() {
      // this.lang = api.get()
      try {
        const response = await api.get('/GetAllowedLanguagesForDeployment');
        this.lang = response.data;
        console.log(response.data + '');
        const onr = JSON.stringify(response.data);
        console.log(onr);
        const obj = JSON.parse(onr);
        const res = [];

        for (const i in obj) res.push({ label: obj[i], value: i });
        console.log(res);
        // const res = JSON.parse(response.data);
        // console.log(res);
        // Object.entries(res).forEach((entry) => {
        //   const [key, value] = entry;
        //   console.log(`${key}: ${value}`);
        // });
        // let langMap = new Map();
        // langMap = response.data;
        // console.log(langMap.keys);
        // for (let i = 0; i < langMap.size; i++) {
        //   console.log('i');
        // }
        // langMap.forEach((values, keys) => {
        //   console.log(keys + '->' + values);
        // });
        // this.lang = Object.values(response.data);
        this.lang = res;
        console.log(this.lang);
      } catch (error) {}
    },
    async getSidebarDetails() {
      try {
        const response = await api.get('/SidebarPermissions');
        this.sidebarDetails = response.data.Data;
        console.log(this.sidebarDetails);
      } catch (error) {}
    },
    async getHeaderDetails() {
      try {
        const response = await api.get('/GetHeaderDetails');
        this.headerDetails = response.data.Data;
        this.headerLinks = response.data.Data.HeaderLinks;
        this.SearchCriteria = response.data.Data.SearchCriteria;
        this.DropDownItems = response.data.Data.DropDownItems;
        console.log(this.SearchCriteria);
        console.log('header links');
      } catch (error) {}
    },
    async findPatientsByKey(key: string, criteria: string) {
      try {
        // ?FirstName_like=tes
        const query = `${key}_like=${criteria}`;
        const response = await api.get(`/SearchPatientsByKey?${query}`);
        console.log(response.data);
        console.log(key + criteria);
        this.searchedPatients = response.data;
      } catch (error) {}
    },
    async getStaffDetails() {
      try {
        // const query = `${key}_like=${criteria}`;
        const response = await api.get('/GetViewParamsForStaffDetails');
        console.log(response.data.Data);
        this.hierarchyColumns = response.data.Data.HierarchyColumns.map(
          function (val: any, index: any) {
            return {
              name: val.name,
              field: val.key,
              label: val.name,
              align: 'left',
              sortable: val.sortable,
              clickable: val.clickable,
            };
          }
        );
        // console.log(newArr);
        // this.hierarchyColumns = response.data.Data.HierarchyColumns;
        this.breadcrumbs = response.data.Data.breadcrumbs;
        this.subHierarchies = response.data.Data.HierarchyColumnsData;
        this.currentHierarchyName = response.data.Data.CurrentHierarchyName;
        this.subHierarchyType = response.data.Data.SubHierarchyType;
        this.allowedToAddStaff = response.data.Data.AllowedToAddStaff;
      } catch (error) {}
    },
    async GetMermDetails(imei: string) {
      console.log('ssssssssss');
      try {
        const language = localStorage.getItem('language');
        const query = `imei=${imei}&language=${language}`;
        this.mermDetailsLoading = true;
        const response = await api.get(
          `/GetMermDetailsByImeiAndHierarchy1?${query}`
        );
        console.log(response.data.length);
        this.mermDetails = response.data;
        if (response.data.length != 0) {
          this.mermDetails = response.data[0].data;
        }
        this.mermDetailsLoading = false;
        this.mermDetailsVisible = true;
      } catch (error) {}
    },
  },
});
