<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>검색</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">가입 경로</label>
                        <InputText id="nameuser" type="text" v-model="title" placeholder="가입 경로" />
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="maxpoint">등록일자(from) </label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="maxpoint">등록일자(to) </label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>
                </div>

                <div class="p-d-flex p-jc-between p-ai-lg-center p-ai-start p-mt-6 p-flex-column p-flex-lg-row">
                    <div class="p-mb-4 p-mb-lg-0">
                        <!-- <Button :label="$t('button.today')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="today"></Button>
                        <Button :label="$t('button.lastWeek')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastweek"></Button>
                        <Button :label="$t('button.lastMonth')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastmonth"></Button>
                        <Button :label="$t('button.last6Months')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastsixmonth"></Button> -->
                        <!-- <Button :label="$t('button.lastYear')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastyear"></Button> -->
                    </div>
                    <div>
                        <Button label="검색" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchsubscription"></Button>
                        <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetsubscription"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>가입 경로 리스트</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <router-link to="/GeneralManagement/Subscriptionpathmanagement/Subscriptionpathmanagementadd">
                            <Button label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">구독 경로 추가 </Button>
                        </router-link>
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="slNO" :header="$t('#')">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>
                    <Column header="가입 경로" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Title</span>
                            {{ data.title }}
                        </template>
                    </Column>

                    <Column header="노출" style="min-width: 12rem">
                        <template #body="{ index, data }">
                            <span class="p-column-title">Exposure</span>
                            <InputSwitch :modelValue="getStatus(data.status)" :disabled="data.status === 'rejected' || data.status === 'deleted'" @click="Changestatus(index, data.id)" />
                            <!-- <InputSwitch trueValue="active" v-model="status" /> -->
                        </template>
                    </Column>

                    <Column header="등록일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Path creation Date</span>
                            {{ formatDate(data.create_date) }}
                        </template>
                    </Column>

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <p style="display: none">{{ data.mobile }}</p>
                            <div style="display: flex">
                                <span v-if="data.to_be_deleted == true">
                                    <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" />
                                </span>
                                <span v-else>
                                    <Button icon="pi pi-trash" class="p-button2" @click="Subscriptionpathmanagementdelet" />
                                </span>
                            </div>
                        </template>
                    </Column>
                </DataTable>

                <div class="p-paginator p-component p-paginator-bottom">
                    <button @click="paginate(1)" :class="{ 'p-disabled': pagination.current_page === 1 }" class="p-paginator-first p-paginator-element p-link" type="button" :disabled="pagination.current_page === 1">
                        <span class="p-paginator-icon pi pi-angle-double-left"></span>
                        <span class="p-ink"></span>
                    </button>
                    <button @click="paginate(pagination.current_page - 1)" :class="{ 'p-disabled': pagination.current_page === 1 }" class="p-paginator-next p-paginator-element p-link" type="button" :disabled="pagination.current_page === 1">
                        <span class="p-paginator-icon pi pi-angle-left"></span>
                        <span class="p-ink"></span>
                    </button>
                    <span class="p-paginator-pages">
                        <button
                            v-for="(page, index) in get_paginator_page(pagination.total_pages, pagination.current_page)"
                            :key="index"
                            @click="paginate(page)"
                            class="p-paginator-page p-paginator-element p-link"
                            :class="{ 'p-highlight': page === pagination.current_page }"
                            type="button"
                        >
                            {{ page }}<span class="p-ink"></span>
                        </button>
                    </span>
                    <button
                        @click="paginate(pagination.current_page + 1)"
                        :class="{ 'p-disabled': pagination.current_page === pagination.total_pages }"
                        class="p-paginator-next p-paginator-element p-link"
                        type="button"
                        :disabled="pagination.current_page === pagination.total_pages"
                    >
                        <span class="p-paginator-icon pi pi-angle-right"></span>
                        <span class="p-ink"></span>
                    </button>
                    <button
                        @click="paginate(pagination.total_pages)"
                        :class="{ 'p-disabled': pagination.current_page === pagination.total_pages }"
                        :disabled="pagination.current_page === pagination.total_pages"
                        class="p-paginator-last p-paginator-element p-link"
                        type="button"
                    >
                        <span class="p-paginator-icon pi pi-angle-double-right"></span>
                        <span class="p-ink"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// import { useRoute } from 'vue-router';
// import validateUsersearch from '../../validations/user/validateUserSearch';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import SubscriptionpathmanagementService from '../../../service/API/SubscriptionpathmanagementService';
// import axios from 'axios';
import moment from 'moment';
import utils from '@/service/utils';
export default {
    data() {
        return {
            selected: [],
            render: true,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            totalrecords: '',
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            title: '',
            startDate: '',
            endDate: '',

            create_date: '',
            searchdate: '',
            searchenddate: '',
            id: '',
            to_be_deleted: '',
            deleted: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.subscriptionpathmanagementService = new SubscriptionpathmanagementService();
    },
    mounted() {
        //  this.Subscriptionpathmanagementlist();
        this.storageData = localStorage.getItem('Subscriptionpathmanagement') ? JSON.parse(localStorage.getItem('Subscriptionpathmanagement')) : '';

        console.log(this.storageData, 'data');

        if (this.storageData != '') {
            this.Subscriptionpathmanagementlistpagination = this.storageData.page;
            this.title = this.storageData.title;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
        }

        if (this.Subscriptionpathmanagementlistpagination == '' || this.Subscriptionpathmanagementlistpagination == null) {
            if (this.title || this.startDate || this.endDate ){
            const searchListParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
                title: this.title,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.Subscriptionpathmanagementlist(searchListParams);
        } else {
            const searchListParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
            };
            this.Subscriptionpathmanagementlist(searchListParams);
        }
        } else {
            const searchLocalParams = {
                page: Number(this.Subscriptionpathmanagementlistpagination),
                limit: this.pagination.pagination_limit,
                title: this.title,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.Subscriptionpathmanagementlist(searchLocalParams);
        }
       
    },
    watch: {},
    methods: {
        getStatus(values) {
            return values === 'active' ? true : false;
        },
        addDay(val) {
            const date = new Date(val);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return (val = yyyy + '-' + mm + '-' + dd);
        },

        Changestatus(index, id) {
            console.log('eeee', id);
            console.log('index', this.statustext);
            var statustext = this.customer1[index].status;
            this.customer1[index].status = statustext === 'active' ? 'inactive' : 'active';
            var Subscriptionpathmanagementstatus = { ...{ id: id, status: this.customer1[index].status } };
            // console.log('companystatus', companystatus);
            this.subscriptionpathmanagementService.Subscriptionpathmanagementchange_status(Subscriptionpathmanagementstatus).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    this.$toast.add({ severity: 'info', summary: '성공적으로', detail: '구독 상태 수정이 완료되었습니다.', life: 3000 });
                    this.Subscriptionpathmanagementlist({ page: 1, limit: this.pagination.pagination_limit });
                }
            });
        },
        Subscriptionpathmanagementdelet() {
            this.$toast.add({ severity: 'info', detail: '이 구독은 이미 사용 중이므로 삭제할 수 없습니다.', life: 3000 });
        },

        Subscriptionpathmanagementlist(data) {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.subscriptionpathmanagementService
                .getSubscriptionpathmanagementList(data)
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    // this.deleted = res.data.result[0].to_be_deleted;

                    //                 this.company_id= this.company.id;
                    // console.log("this.company_id",this.company_id);
                    console.log('res', this.customer1);
                    console.log(this.deleted);
                    this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                    this.loading1 = false;
                })
                .catch((err) => console.log(err));
        },

        setPagination(current_page, total_pages, total_records) {
            this.pagination.current_page = current_page;
            this.pagination.total_pages = total_pages;
            this.pagination.total_records = total_records;
        },

        get_paginator_page(total, active) {
            return utils.paginate(total, active);
        },

        paginate(page) {
            this.loading1 = true;
            // var start_date = this.formatRangeDate(this.date_range.at(0));
            // var end_date = this.formatRangeDate(this.date_range.at(1));
            localStorage.setItem(
                'Subscriptionpathmanagement',
                JSON.stringify({
                    title: this.title,
                    startDate: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                    endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                    page: page,
                    limit: this.pagination.pagination_limit,
                })
            );
            this.subscriptionpathmanagementService
                .getSubscriptionpathmanagementList({ page: page, limit: this.pagination.pagination_limit, title: this.title, startDate: this.searchdate, endDate: this.searchenddate })
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        resetsubscription() {
            localStorage.setItem('Subscriptionpathmanagement', '');
            (this.title = ''), (this.startDate = ''), (this.endDate = ''), this.Subscriptionpathmanagementlist({ page: 1, limit: this.pagination.pagination_limit });
        },
        searchsubscription() {
           if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else { 
            if (this.title !== '' || this.startDate !== '' || this.endDate !== '') {
                // this.$toast.add({ severity: 'error', summary: this.$t('error message'), detail: this.$t('Please enter one or more search values.'), life: 3000 });
                if (this.startDate != '') {
                    this.searchdate = this.addDay(this.startDate);
                } else {
                    this.searchdate = '';
                }

                if (this.endDate != '') {
                    this.searchenddate = this.addDay(this.endDate);
                } else {
                    this.searchenddate = '';
                }

                localStorage.setItem(
                    'Subscriptionpathmanagement',
                    JSON.stringify({
                        title: this.title,
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                        page: this.pagination.current_page,
                        limit: this.pagination.pagination_limit,
                    })
                );
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    title: this.title,
                    startDate: this.searchdate,
                    endDate: this.searchenddate,

                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.subscriptionpathmanagementService
                    .getSubscriptionpathmanagementList(searchParams)
                    .then((res) => {
                        console.log('res', res);
                        this.customer1 = res.data.result;
                        this.totalrecords = res.data.total_records;
                        console.log('searchPost', this.customer1);
                        this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                        this.loading1 = false;
                    })
                    .catch(() => {
                        this.customer1 = [];
                        this.loading1 = false;
                    });
            }
        }
        },
        // searchuser() {
        //      if (
        //         this.name == ''
        //     ) {
        //         this.$toast.add({ severity: 'error', summary: 'Error message', detail: 'Please enter one or more search values.', life: 3000 });
        //     } else {
        //         this.apartmentlist();
        //     }
        // },
        // exceldownload() {
        //     this.userService
        //         .getExcel(this.nickname, this.username, this.has_children, this.children_age, this.gender.code, this.age_group.code, this.marital_status.code, this.has_pet.code=='Yes'?1:0, this.min_point, this.max_point, this.start_date==""?"":this.formatDate(this.start_date), this.end_date==""?"":this.formatDate(this.end_date))
        //         .then((response) => {
        //             const url = window.URL.createObjectURL(new Blob([response.data]));
        //             const link = document.createElement('a');
        //             link.href = url;
        //             link.setAttribute('download', 'Userlist.xlsx'); //or any other extension
        //             document.body.appendChild(link);
        //             link.click();
        //         });
        // },

        open() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        toggle(event) {
            this.$refs.op.toggle(event);
        },
        today() {
            const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '.');
            this.startDate = utc;
            this.endDate = utc;
            this.tagManagementlist();
            console.log(this.startDate);
        },
        lastweek() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 7);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '.' + (edate.getMonth() + 1).toString().padStart(2, '0') + '.' + edate.getDate().toString().padStart(2, '0');
            this.startDate = startDate;
            this.endDate = endDate;
            this.tagManagementlist();
        },
        lastmonth() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 31);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '.' + (edate.getMonth() + 1).toString().padStart(2, '0') + '.' + edate.getDate().toString().padStart(2, '0');
            this.startDate = startDate;
            this.endDate = endDate;
            this.tagManagementlist();
        },
        lastsixmonth() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 182);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '.' + (edate.getMonth() + 1).toString().padStart(2, '0') + '.' + edate.getDate().toString().padStart(2, '0');
            this.startDate = startDate;
            this.endDate = endDate;
            this.tagManagementlist();
        },

        onRowExpand(event) {
            this.$toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
        },
        onRowCollapse(event) {
            this.$toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
        },
        expandAll() {
            this.expandedRows = this.products.filter((p) => p.id);
            this.$toast.add({ severity: 'success', summary: 'All Rows Expanded', life: 3000 });
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 });
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },

        formatsearchDate(value) {
            const date = new Date(value);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return (value = yyyy + '-' + mm + '-' + dd);
        },
        calculateCustomerTotal(name) {
            let total = 0;
            if (this.customer3) {
                for (let customer of this.customer3) {
                    if (customer.representative.name === name) {
                        total++;
                    }
                }
            }

            return total;
        },
        deleteNote: function (id) {
            // console.log(id);
            var self = this;
            this.$confirm.require({
                group: 'dialog',
                header: '확인',
                message: '게시글을 삭제하겠습니까?',
                icon: 'pi pi-trash',
                acceptLabel: '확인',
                rejectLabel: ' 취소',
                accept: () => {
                    self.subscriptionpathmanagementService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);
                            self.Subscriptionpathmanagementlist({ page: self.pagination.current_page, limit: self.pagination.pagination_limit });
                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                        })
                        .catch(() => {
                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                        });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.p-datatable-tbody {
    .p-button {
        white-space: nowrap;
    }
}
.p-fluid {
    .p-button {
        width: auto;
    }
}
</style>
