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
                        <label for="Nickname">닉네임</label>
                        <InputText id="Nickname" type="text" v-model="username" placeholder="닉네임 입력" />
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="minpoint">최소 리워드</label>
                        <InputText id="minpoint" type="text" v-model="minPoints" placeholder="리워드 입력" />
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="maxpoint">최다 리워드</label>
                        <InputText id="maxpoint" type="text" v-model="maxPoints" placeholder="리워드 입력" />
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>
                </div>

                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="maxpoint">반영 일자(From) </label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                        <!-- <div class="text-red">{{ error.name }}</div> -->
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="maxpoint">반영 일자(to) </label>
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
                        <Button label="검색" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchreward"></Button>
                        <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetReward"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>회원 리워드 리스트</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <a href="https://gscm-api-dev.dvconsulting.org/api/v1/admin/reward/download-excel" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a>
                        <!-- <a href="https://api-uat.ggulpot-admin.com/api/v1/admin/reward/download-excel" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->

                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/reward/download-excel" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <!-- <Column field="slNO" :header="$t('#')">
                        <template #body="{ data }">
                            <span class="p-column-title">slNo</span>
                            {{ data.id }}
                        </template>
                    </Column> -->
                    <Column header="닉네임" style="min-width: 12rem" field="username" :sortable="true">
                        <template #body="{ data }">
                            <span class="p-column-title">Nickname</span>
                            {{ data.username }}
                        </template>
                    </Column>

                    <Column header="리워드" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Total Points</span>
                            {{ data.current_point }}
                        </template>
                    </Column>

                    <Column header="최종 수정 일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Recent Updated Date & Time</span>
                            <span v-if="data.create_date == '--'"> {{ data.create_date }}</span>
                            <span v-else>
                                {{ formatDate(data.create_date) }}
                            </span>
                        </template>
                    </Column>

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>

                            <div style="display: flex">
                                <router-link :to="'/ManageHoney/' + data.id"><Button label="info" class="p-button">꿀 관리</Button> </router-link>
                                <!-- <router-link :to="'/user/edit-user/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link> -->
                                <!-- <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" /> -->
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
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import HoneyManagementListService from '../../service/API/HoneyManagementListService';
// import axios from 'axios';
import moment from 'moment';
import utils from '@/service/utils';
export default {
    data() {
        return {
            selected: [],

            selectedItemss: '',
            render: true,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
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

            username: '',
            point: '',
            minPoints: '',
            maxPoints: '',
            startDate: '',
            endDate: '',
            create_date: '',
            status: '',
            id: '',
            user_id: '',
            searchdate: '',
            searchenddate: '',
            current_point: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.honeyManagementListService = new HoneyManagementListService();
    },
    mounted() {
        //  this.rewardlist();

        this.storageData = localStorage.getItem('honey') ? JSON.parse(localStorage.getItem('honey')) : '';
        console.log(this.storageData, 'data');

        if (this.storageData != '') {
            this.username = this.storageData.username;
            this.minPoints = this.storageData.minPoints;
            this.maxPoints = this.storageData.maxPoints;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
            this.rewardlistpagination = this.storageData.page;
       
        }
        if (this.rewardlistpagination == '' || this.rewardlistpagination == null) {
            const searchListParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
                username: this.username,
                minPoints: this.minPoints,
                maxPoints: this.maxPoints,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.rewardlist(searchListParams);
        } else {
            const searchLocalParams = {
                page: Number(this.rewardlistpagination),
                limit: this.pagination.pagination_limit,
                username: this.username,
                minPoints: this.minPoints,
                maxPoints: this.maxPoints,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.rewardlist(searchLocalParams);
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

        selects() {
            let xyz = [];
            let data = this.selected;
            for (var a = 0; a < data.length; a++) {
                xyz.push(data[a].id);
            }
            this.selectedItemss = xyz.toString();
            if (this.calendarValue !== '') {
                this.calendarValue = this.calendarValue.toISOString().slice(0, 10);
            }
            if (this.calendarValue1 !== '') {
                this.calendarValue1 = this.calendarValue1.toISOString().slice(0, 10) + 1;
            }
        },

        rewardlist(data) {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.honeyManagementListService
                .getRewardList(data)
                .then((res) => {
                    this.customer1 = res.data.result;
                    //                 this.company_id= this.company.id;
                    // console.log("this.company_id",this.company_id);
                    console.log('res', this.customer1);
                    console.log(res);
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
                    'honey',
                    JSON.stringify({
                        username: this.username,
                        minPoints: this.minPoints,
                        maxPoints: this.maxPoints,
                        startDate: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                        endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                        page: page,
                        limit: this.pagination.pagination_limit,
                    })
                );
            this.honeyManagementListService
                .getRewardList({ page: page, limit: this.pagination.pagination_limit, username: this.username, minPoints: this.minPoints, maxPoints: this.maxPoints, startDate: this.searchdate, endDate: this.searchenddate })
                .then((res) => {
                    this.customer1 = res.data.result;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        Changestatus(index, id) {
            console.log('eeee', id);
            console.log('index', this.statustext);
            var statustext = this.customer1[index].status;
            this.customer1[index].status = statustext === 'active' ? 'inactive' : 'active';
            var complexstatus = { ...{ id: id, status: this.customer1[index].status } };
            // console.log('companystatus', companystatus);
            this.apartmentService.complexchange_status(complexstatus).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    this.$toast.add({ severity: 'info', summary: 'succuss', detail: 'Completed apartement status correction.', life: 3000 });
                    this.apartmentlist();
                }
            });
        },
        resetReward() {
            localStorage.setItem('honey', '');
            (this.username = ''), (this.minPoints = ''), (this.maxPoints = ''), (this.startDate = ''), (this.endDate = ''), this.rewardlist({ page: 1, limit: this.pagination.pagination_limit });
        },
        searchreward() {
            if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else {
            if (this.username  !==' '  || this.minPoints  !==' '  || this.maxPoints  !==' '  || this.startDate  !==' '  || this.endDate !== '') {
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
                    'honey',
                    JSON.stringify({
                        username: this.username,
                        minPoints: this.minPoints,
                        maxPoints: this.maxPoints,
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                        page: this.pagination.current_page,
                        limit: this.pagination.pagination_limit,
                    })
                );
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    username: this.username,
                    minPoints: this.minPoints,
                    maxPoints: this.maxPoints,
                    startDate: this.searchdate,
                    endDate: this.searchenddate,

                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.honeyManagementListService
                    .getRewardList(searchParams)
                    .then((res) => {
                        console.log('res', res);
                        this.customer1 = res.data.result;
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
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
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
                header: 'Confirm',
                message: 'do you want to delete?',
                icon: 'pi pi-trash',
                acceptLabel: 'Confirm',
                rejectLabel: 'cancellation',
                accept: () => {
                    self.apartmentService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);
                            self.apartmentlist();
                            self.$toast.add({ severity: 'info', summary: 'Deleted', detail: 'It has been successfully deleted.', life: 3000 });
                        })
                        .catch(() => {
                            self.$toast.add({ severity: 'info', summary: 'Deleted', detail: 'It has been successfully deleted.', life: 3000 });
                        });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'An error occurred', detail: 'Canceled', life: 3000 });
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

.p-button.p-button-text {
    background-color: #221ed9;
    color: white;
    border-color: transparent;
}
</style>