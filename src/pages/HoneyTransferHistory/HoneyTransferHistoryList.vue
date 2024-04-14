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
                        <label for="producttitle">단지명</label>
                        <Dropdown v-model="apartment_id" :options="apartmentcomplexDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="Fromuser">꿀 발송인</label>
                        <InputText id="minihoney" type="text" v-model="from_user" placeholder="꿀 발송인" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="Touser">꿀 수신인</label>
                        <InputText id="maxhoney" type="text" v-model="to_user" placeholder="꿀 수신인 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="Minhoney">꿀 거래 금액(최소)</label>
                        <InputText id="maxhoney" type="text" v-model="min_honey" placeholder="꿀 거래 금액(최소) 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="Maxhoney">꿀 거래 금액(최대)</label>
                        <InputText id="maxhoney" type="text" v-model="max_honey" placeholder="꿀 거래 금액(최대) 입력" />
                    </div>
                </div>

                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="startdate">발송일자(from) </label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="enddate">발송일자(to)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
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
                    <div class="p-mb-4 p-mb-lg-0">
                        <Button label="검색" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchhoneyTransferHistorylist"></Button>
                        <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resethoneyTransferHistory"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>꿀 거래 이력 리스트</h5>
                    </div>
                    <div>
                        <a @click="exceldownload(apartment_id)" label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출</a>
                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/products/product-list-excel-export" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue;color: white;">엑셀 추출</a> -->
                        <!-- <router-link to="/AddProductManagement"> -->
                        <!-- <Button label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">추가</Button> -->
                        <!-- </router-link> -->
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="#" header="#">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>
                    <Column header="단지명" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>

                            {{ data.apartment_name }}
                        </template>
                    </Column>

                    <Column header="꿀 발송인" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">From user</span>

                            {{ data.from_user }}
                        </template>
                    </Column>

                    <Column header="꿀 수신인" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">To user</span>
                            {{ data.to_user }}
                        </template>
                    </Column>

                    <Column header="꿀 거래 금액" style="min-width: 14rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">No. of honey transferred</span>
                            {{ data.point }}
                        </template>
                    </Column>

                    <Column header="발송일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Date</span>
                            {{ formatDate(data.create_date) }}
                        </template>
                    </Column>

                    <Column header="기능" style="min-width: 5rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <div style="display: flex">
                                <router-link :to="'/HoneyTransferHistoryDetail/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-eye p-mr-2"></i> </Button
                                ></router-link>
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

import HoneyTransferHistoryService from '../../service/API/HoneyTransferHistoryService';
// import axios from 'axios';
import utils from '@/service/utils';
import moment from 'moment';
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
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            totalrecords: '',
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            create_date: '',
            apartment_name: '',
            from_user: '',
            point: '',
            to_user: '',
            mobile: '',
            id: '',
            startDate: '',
            endDate: '',
            searchdate: '',
            searchenddate: '',
            total_cancelled: '',
            total_delivered: '',
            total_pending: '',
            total_purchase: '',
            exposed: '',
            apartment_id: '',
            show_at_top: '',
            apartmentcomplexDropdownValues: '',
            apartmentcomplexDropdownValue: null,
            promotional_post_status: '',
            promotional_status: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.honeyTransferHistoryService = new HoneyTransferHistoryService();
    },
    mounted() {
        // this.promotionalPostManagementlist();

        const postlistParams = {
            page: 1,
            limit: 1000,
        };
        this.honeyTransferHistoryService

            .getApartmentList(postlistParams)

            .then((res) => {
                this.apartmentcomplexDropdownValues = res.data.result;
                // this.products = data;
                this.loading1 = false;
                // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                console.log(this.customer1);
                // console.log(data);
            });

        this.storageData = localStorage.getItem('honeyTransferHistory') ? JSON.parse(localStorage.getItem('honeyTransferHistory')) : '';
        console.log(this.storageData, 'data');

        if (this.storageData != '') {
            this.apartment_id = this.storageData.apartment_id;
            this.from_user = this.storageData.from_user;
            this.to_user = this.storageData.to_user;
            this.min_honey = this.storageData.min_honey;
            this.max_honey = this.storageData.max_honey;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
            this.honeyTransferHistory = this.storageData.page;
        }

        if (this.honeyTransferHistory == null || this.honeyTransferHistory == '') {
            if (this.apartment_id || this.from_user || this.to_user || this.min_honey || this.max_honey || this.startDate || this.endDate) {
                const searchListParams = {
                    page: Number(this.pagination.current_page),
                    limit: this.pagination.pagination_limit,
                    apartment_id: this.apartment_id,
                    from_user: this.from_user,
                    to_user: this.to_user,
                    min_honey: this.min_honey,
                    max_honey: this.max_honey,
                    startDate: this.startDate,
                    endDate: this.endDate,
                };
                this.honeyTransferHistorylist(searchListParams);
            } else {
                const postlistParams = {
                    page: Number(this.pagination.current_page),
                    limit: this.pagination.pagination_limit,
                };
                this.honeyTransferHistorylist(postlistParams);
            }
        } else {
            const searchLocalParams = {
                page: Number(this.honeyTransferHistory),
                limit: this.pagination.pagination_limit,
                apartment_id: this.apartment_id,
                from_user: this.from_user,
                to_user: this.to_user,
                min_honey: this.min_honey,
                max_honey: this.max_honey,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.honeyTransferHistorylist(searchLocalParams);
        }
    },
    watch: {},
    methods: {
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
        getStatus(values) {
            return values == '1' ? true : false;
        },

        exceldownload(apartment_id) {

            // let searchParams = {

                        // apartment_id: this.apartment_id,
                        // from_user: this.from_user == undefined ? '' : this.from_user,
                        // to_user: this.to_user == undefined ? '' : this.to_user,
                        // min_honey: this.min_honey == undefined ? '' : this.min_honey ,
                        // max_honey: this.max_honey == undefined ? '' : this.max_honey,
                        // startDate: this.searchdate == undefined ? '' : this.searchdate ,
                        // endDate: this.searchenddate == undefined ? '' : this.searchenddate,
                    // };

            this.honeyTransferHistoryService.getexcel(apartment_id)

            // return axios
                // .get(`https://gscm-api-dev.dvconsulting.org/api/v1/admin/reward/honey-transfer-history-excel-export/${apartment_id}`)

                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Honeytransferhistory.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
        },

        honeyTransferHistorylist(data) {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.honeyTransferHistoryService
                .gethoneyTransferHistoryList(data)
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    this.apartment_id = res.data.apartment_id;
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
                'honeyTransferHistory',
                JSON.stringify({
                    apartment_id: this.apartment_id,
                    from_user: this.from_user,
                    to_user: this.to_user,
                    min_honey: this.min_honey,
                    max_honey: this.max_honey,
                    startDate: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                    endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                    page: page,
                    limit: this.pagination.pagination_limit,
                })
            );
            let paginationParams = {
                limit: this.pagination.pagination_limit,
                page: page,
                apartment_id: this.apartment_id,
                from_user: this.from_user,
                to_user: this.to_user,
                min_honey: this.min_honey,
                max_honey: this.max_honey,
                startDate: this.searchdate,
                endDate: this.searchenddate,
            };
            this.honeyTransferHistoryService
                .gethoneyTransferHistoryList(paginationParams)
                .then((res) => {
                    this.customer1 = res.data.result;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        // Changestatus(index, id, apartment_id) {
        //     console.log('eeee', id);
        //     console.log('index', this.statustext);
        //     console.log('apartment', this.apartment_id);
        //     var statustext = this.customer1[index].show_at_top;
        //     // var apartmentid = this.customer1[index].apartment_id;
        //     // this.customer1[index].apartment_id = apartmentid;
        //     this.customer1[index].show_at_top = statustext == false ? '0' : '1';
        //     if (this.customer1[index].show_at_top == '1') {
        //         this.customer1[index].show_at_top = '0';
        //         //alert('0');
        //     } else if (this.customer1[index].show_at_top == '0') {
        //         this.customer1[index].show_at_top = '1';
        //         //alert('1');
        //     }

        //     var complexstatus = { ...{ id: id, show_at_top: this.customer1[index].show_at_top, apartment_id: apartment_id } };

        //     // console.log('companystatus', companystatus);
        //     this.promotionalPostManagementService.promotionalPostManagementchange_status(complexstatus).then((res) => {
        //         console.log(res.data.success);
        //         if (res.data.success == false) {
        //             this.$toast.add({ severity: 'error', summary: '확인됨', detail: '상단 고정 게시글이 최대로 설정되어 있습니다', life: 3000 });
        //             this.promotionalPostManagementlist({ page: 1, limit: this.pagination.pagination_limit });
        //             this.apartment_id = '';
        //         } else {
        //             this.$toast.add({ severity: 'info', summary: '확인됨', detail: '공지글 상태 변경 완료', life: 3000 });
        //             this.promotionalPostManagementlist({ page: 1, limit: this.pagination.pagination_limit });
        //             this.apartment_id = '';
        //         }
        //     });
        // },

        resethoneyTransferHistory() {
            localStorage.setItem('honeyTransferHistory', '');
            (this.apartment_id = ''),
                (this.from_user = ''),
                (this.to_user = ''),
                (this.min_honey = ''),
                (this.max_honey = ''),
                (this.startDate = ''),
                (this.endDate = ''),
                this.honeyTransferHistorylist({ page: 1, limit: this.pagination.pagination_limit });
        },
        today() {
            const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
            this.startDate = utc;
            this.endDate = utc;
            this.searchpostlist();
            console.log(this.startDate);
        },
        lastweek() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 7);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '-' + (edate.getMonth() + 1).toString().padStart(2, '0') + '-' + edate.getDate().toString().padStart(2, '0');
            this.startDate = startDate;
            this.endDate = endDate;
            this.searchpostlist();
        },
        lastmonth() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 31);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '-' + (edate.getMonth() + 1).toString().padStart(2, '0') + '-' + edate.getDate().toString().padStart(2, '0');
            this.startDate = startDate;
            this.endDate = endDate;
            this.searchpostlist();
        },
        lastsixmonth() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 182);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '-' + (edate.getMonth() + 1).toString().padStart(2, '0') + '-' + edate.getDate().toString().padStart(2, '0');
            this.startDate = startDate;
            this.endDate = endDate;
            this.searchpostlist();
        },
        searchhoneyTransferHistorylist() {
            if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else {
                if (this.apartment_id !== ' ' || this.from_user !== '' || this.to_user !== '' || this.min_honey !== '' || this.max_honey !== '' || this.startDate !== '' || this.endDate !== '') {
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
                        'honeyTransferHistory',
                        JSON.stringify({
                            apartment_id: this.apartment_id,
                            from_user: this.from_user,
                            to_user: this.to_user,
                            min_honey: this.min_honey,
                            max_honey: this.max_honey,
                            startDate: this.searchdate,
                            endDate: this.searchenddate,
                            page: this.pagination.current_page,
                            limit: this.pagination.pagination_limit,
                        })
                    );

                    let searchParams = {
                        limit: this.pagination.pagination_limit,
                        page: 1,
                        apartment_id: this.apartment_id,
                        from_user: this.from_user,
                        to_user: this.to_user,
                        min_honey: this.min_honey,
                        max_honey: this.max_honey,
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                    };
                    console.log('searchParams', searchParams);
                    this.customer1 = true;
                    this.honeyTransferHistoryService
                        .gethoneyTransferHistoryList(searchParams)
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
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll');
            }
        },

        dateformat(value) {
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
        // deleteNote: function (id) {
        //     // console.log(id);
        //     var self = this;
        //     this.$confirm.require({
        //         group: 'dialog',
        //         header: '확인',
        //         message: '게시글을 삭제하겠습니까?',
        //         icon: 'pi pi-trash',
        //         acceptLabel: '확인',
        //         rejectLabel: ' 취소',
        //         accept: () => {
        //             self.postmanagementService
        //                 .delete({ id: id })
        //                 .then(function (response) {
        //                     console.log(response);
        //                     self.postlist();
        //                     self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
        //                 })
        //                 .catch(() => {
        //                     self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
        //                 });
        //         },
        //         reject: () => {
        //             this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
        //         },
        //     });
        // },
    },
};
</script>




<style lang="scss" scoped >
.product-image {
    width: 100px;
    height: 50px;
}

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