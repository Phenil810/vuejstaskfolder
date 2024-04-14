<template>
    <div class="p-grid">
        <Toast />

        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>공지글 & 인기글 관리</h5>
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="#" header="#">
                        <template #body="{ data }">
                            <span class="p-column-title">slNo</span>
                            {{ data.id }}
                        </template>
                    </Column>
                    <Column header="활동" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Criteria</span>
                            {{ data.name }}
                        </template>
                    </Column>

                    <Column header="적용률(%)" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">percentage allotted (%)</span>
                            {{ data.percentage }}
                        </template>
                    </Column>

                    <!-- <Column header="꿀 지급 개수" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Honey(points) per Activity</span>
                            {{ data.honey_per_activity }}
                        </template>
                    </Column> -->

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>

                            <div style="display: flex">
                                <!-- <router-link :to="'/ManageHoney/' + data.id"><Button label="info" class="p-button">리워드 관리</Button> </router-link> -->
                                <!-- <router-link :to="'/user/edit-user/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link> -->

                                <router-link :to="'/HotPostManagementEdit/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link>
                                <!-- <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" /> -->
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

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

                    <div class="p-field p-col-12 p-md-3">
                        <label for="title">게시글 제목</label>
                        <InputText id="nameuser" type="text" v-model="title" placeholder="게시글 제목 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="postedby">게시글 작성자</label>
                        <InputText id="nameuser" type="text" v-model="posted_by" placeholder="게시글 작성자" />
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="startdate">반영 일자(from)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="enddate">반영 이자(to)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3" style="display: grid">
                        <label for="SecretRoom">노출</label>
                        <InputSwitch trueValue="yes" v-model="hot_post_status" :value="hot_post_status" />
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
                        <Button label="검색" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchhotPostlist"></Button>
                        <Button label="초기화" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resethotPostlist"></Button>
                    </div>
                </div>

                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>공지글 & 인기글 리스트</h5>
                    </div>
                    <!-- <div>
                        <Button label="Refresh" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="Refresh"></Button>
                    </div> -->
                </div>

                <DataTable :value="customer2" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading2" :filters="filters2" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="#" :header="$t('#')">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>

                    <Column header="게시글 이미지" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Post Image</span>
                            <span v-if="data.post_image == ''">이미지가 없습니다.</span>
                            <span v-else><img :src="data.post_image" alt="이미지를 사용할 수 없음" class="product-image" /> </span>
                            <!-- <img :src="data.product_image" alt="이미지를 사용할 수 없음" class="product-image" /> -->
                        </template>
                    </Column>
                    <Column header="단지명" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>
                            {{ data.apartment_name }}
                        </template>
                    </Column>

                    <Column header="게시글 제목" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Post Title</span>

                            <template v-if="data.title.length < 8"> {{ data.title }}</template>
                            <template v-else> {{ data.title.substring(0, 8) + '..' }}</template>
                            <!-- {{ data.title }} -->
                        </template>
                    </Column>

                    <Column header="게시글 작성자" style="min-width: 14rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Posted by</span>
                            {{ data.posted_by }}
                        </template>
                    </Column>

                    <Column header="총 적용률" style="min-width: 14rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Total Value</span>
                            {{ data.total_percentage }}
                        </template>
                    </Column>

                    <Column header="작성 일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Post Created On</span>
                            {{ formatDate(data.create_date) }}
                        </template>
                    </Column>

                    <Column header="노출(공지글)" style="min-width: 12rem">
                        <template #body="{ index, data }">
                            <span class="p-column-title">exposed (Promotional Post)</span>

                            <InputSwitch :modelValue="getStatus(data.show_at_top)" v-model="data.show_at_top" @click="Changepromotionalstatus(index, data.post_id, data.apartment_id, data.show_at_top)" />
                        </template>
                    </Column>

                    <Column header="노출(인기글) " style="min-width: 12rem">
                        <template #body="{ index, data }">
                            <span class="p-column-title">Exposed (Hot Post)</span>

                            <InputSwitch :modelValue="getStatus(data.hot_post_status)" v-model="data.hot_post_status" @click="Changestatus(index, data.post_id, data.apartment_id, data.hot_post_status)" />
                        </template>
                    </Column>

                    <Column header="기능" style="min-width: 5rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <div style="display: flex">
                                <router-link :to="'/HotPostManagementDetail/' + data.post_id"
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
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import HotPostManagementService from '../../service/API/HotPostManagementService';
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
            totalrecords: '',
            serial_number: '',
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            checked: 'false',
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            customer2: [],
            loading1: true,
            loading2: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            activity_type: '',
            apartment_id: '',
            apartment_name: '',
            post_image: '',
            title: '',
            total_percentage: '',
            posted_by: '',
            create_date: '',
            status: '',
            hot_post_status: '',
            show_at_top: '',
            activity_limit: '',
            startDate: '',
            endDate: '',
            searchdate: '',
            searchenddate: '',
            honey_per_activity: '',
            name: '',
            percentage: '',
            id: '',
            apartmentcomplexDropdownValues: '',
            post_id: '',
            apartmentcomplexDropdownValue: null,
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.hotPostManagementService = new HotPostManagementService();
        this.storageData = localStorage.getItem('HotPostManagement') ? JSON.parse(localStorage.getItem('HotPostManagement')) : '';
        console.log(this.storageData, 'data');

        if (this.storageData != '') {
            this.apartment_id = this.storageData.apartment_id;
            this.hot_post_status = this.storageData.hot_post_status;
            this.title = this.storageData.title;
            this.posted_by = this.storageData.posted_by;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
            this.hotPostManagementlistpagination = this.storageData.page;
        }

        if (this.hotPostManagementlistpagination == '' || this.hotPostManagementlistpagination == null) {
            if (this.apartment_id || this.title || this.posted_by || this.hot_post_status || this.startDate || this.endDate) {
                const searchListParams = {
                    page: Number(this.pagination.current_page),
                    limit: this.pagination.pagination_limit,
                    apartment_id: this.apartment_id,
                    title: this.title,
                    posted_by: this.posted_by,
                    hot_post_status: this.hot_post_status === 'yes' ? '1' : '',
                    startDate: this.startDate,
                    endDate: this.endDate,
                };
                this.hotPostList(searchListParams);
            } else {
                const searchLocalParams = {
                    page: Number(this.pagination.current_page),
                    limit: this.pagination.pagination_limit,
                };

                this.hotPostList(searchLocalParams);
            }
        } else {
            const searchLocalParams = {
                page: Number(this.hotPostManagementlistpagination),
                limit: this.pagination.pagination_limit,
                apartment_id: this.apartment_id,
                title: this.title,
                posted_by: this.posted_by,
                hot_post_status: this.hot_post_status === 'yes' ? '1' : '',
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.hotPostList(searchLocalParams);
        }
    },
    mounted() {
        this.hotPostManagementList({ page: 1, limit: this.pagination.pagination_limit });

        // this.hotPostList();

        const postlistParams = {
            page: 1,
            limit: 1000,
        };
        this.hotPostManagementService

            .getApartmentList(postlistParams)

            .then((res) => {
                this.apartmentcomplexDropdownValues = res.data.result;
                // this.products = data;
                this.loading1 = false;
                // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                console.log(this.customer1);
                // console.log(data);
            });
    },
    watch: {},
    methods: {
        getStatus(values) {
            console.log(values);
            return values == '1' ? true : false;
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
        hotPostManagementList() {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.hotPostManagementService
                .gethotPostManagementList()
                .then((res) => {
                    this.customer1 = res.data.result;

                    // this.setPagination1(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);

                    this.loading1 = false;
                })
                .catch((err) => console.log(err));
        },

        hotPostList(data) {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.hotPostManagementService
                .gethotPostList(data)
                .then((res) => {
                    this.customer2 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    this.apartment_id = res.data.apartment_id;
                    // this.hot_post_status = res.data.result.hot_post_status;
                    this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                    this.loading2 = false;
                    console.log(this.apartment_id);
                    // console.log(this.hot_post_status);
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
            this.loading2 = true;
            // var start_date = this.formatRangeDate(this.date_range.at(0));
            // var end_date = this.formatRangeDate(this.date_range.at(1));
            localStorage.setItem(
                'HotPostManagement',
                JSON.stringify({
                    apartment_id: this.apartment_id,
                    hot_post_status: this.hot_post_status,
                    title: this.title,
                    posted_by: this.posted_by,
                    startDate: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                    endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                    page: page,
                    limit: this.pagination.pagination_limit,
                })
            );
            this.hotPostManagementService
                .gethotPostList({
                    limit: this.pagination.pagination_limit,
                    page: page,
                    apartment_id: this.apartment_id,
                    title: this.title,
                    posted_by: this.posted_by,
                    hot_post_status: this.hot_post_status === 'yes' ? '1' : '',
                    startDate: this.searchdate,
                    endDate: this.searchenddate,
                })
                .then((res) => {
                    this.customer2 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    console.log('paginate', this.customer2);
                    this.pagination.current_page = page;
                    this.loading2 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        resethotPostlist() {
            localStorage.setItem('HotPostManagement', '');
            (this.apartment_id = ''),
                (this.title = ''),
                (this.posted_by = ''),
                (this.startDate = ''),
                (this.endDate = ''),
                (this.hot_post_status = ''),
                this.hotPostList({ page: 1, limit: this.pagination.pagination_limit }),
                this.hotPostManagementList();
        },

        searchhotPostlist() {
            if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else {
                if (this.apartment_id !== '' || this.title !== '' || this.posted_by !== '' || this.startDate !== '' || this.endDate !== '' || this.hot_post_status !== '') {
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
                        'HotPostManagement',
                        JSON.stringify({
                            apartment_id: this.apartment_id,
                            title: this.title,
                            posted_by: this.posted_by,
                            hot_post_status: this.hot_post_status,
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
                        title: this.title,
                        posted_by: this.posted_by,
                        hot_post_status: this.hot_post_status === 'yes' ? '1' : '',
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                    };
                    console.log('searchParams', searchParams);
                    this.customer2 = true;
                    this.hotPostManagementService
                        .gethotPostList(searchParams)
                        .then((res) => {
                            console.log('res', res);
                            this.customer2 = res.data.result;
                            this.totalrecords = res.data.total_records;
                            console.log('searchPost', this.customer2);
                            this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                            this.loading2 = false;
                        })
                        .catch(() => {
                            this.customer2 = [];
                            this.loading2 = false;
                        });
                }
            }
        },
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },

        Changepromotionalstatus(index, id, apartment_id) {
            console.log('eeee', id);
            console.log('index', this.statustext);
            console.log('apartment', this.apartment_id);
            var statustext = this.customer2[index].show_at_top;
            // var apartmentid = this.customer1[index].apartment_id;
            // this.customer1[index].apartment_id = apartmentid;
            this.customer2[index].show_at_top = statustext == false ? '0' : '1';
            if (this.customer2[index].show_at_top == '1') {
                this.customer2[index].show_at_top = '0';
                //alert('0');
            } else if (this.customer2[index].show_at_top == '0') {
                this.customer2[index].show_at_top = '1';
                //alert('1');
            }

            var complexstatus = { ...{ id: id, show_at_top: this.customer2[index].show_at_top, apartment_id: apartment_id } };

            // console.log('companystatus', companystatus);
            this.hotPostManagementService.promotionalPostManagementchange_status(complexstatus).then((res) => {
                console.log(res.data.success);
                if (res.data.success == false) {
                    this.$toast.add({ severity: 'error', summary: '확인됨', detail: '상단 고정 게시글이 최대로 설정되어 있습니다', life: 3000 });
                    this.hotPostList({ page: 1, limit: this.pagination.pagination_limit });
                    this.hotPostManagementList({ page: 1, limit: this.pagination.pagination_limit });
                    this.apartment_id = '';
                } else {
                    this.$toast.add({ severity: 'info', summary: '확인됨', detail: '공지글 상태 변경 완료', life: 3000 });
                    this.hotPostList({ page: 1, limit: this.pagination.pagination_limit });
                    this.hotPostManagementList({ page: 1, limit: this.pagination.pagination_limit });
                    this.apartment_id = '';
                }
            });
        },

        Changestatus(index, post_id, apartment_id) {
            console.log('eeee', post_id);
            console.log('index', this.customer2[index].hot_post_status);
            console.log('apartment', this.apartment_id);
            var statustext = this.customer2[index].hot_post_status;
            console.log('index', this.statustext);
            // var apartmentid = this.customer1[index].apartment_id;
            // this.customer1[index].apartment_id = apartmentid;
            this.customer2[index].hot_post_status = statustext == true ? '1' : '0';
            if (this.customer2[index].hot_post_status == '1') {
                this.customer2[index].hot_post_status = '0';

                //alert('0');
            } else if (this.customer2[index].hot_post_status == '0') {
                this.customer2[index].hot_post_status = '1';
                //alert('1');
            }

            var complexstatus = { ...{ id: post_id, hot_post_status: this.customer2[index].hot_post_status, apartment_id: apartment_id } };

            // console.log('companystatus', companystatus);
            this.hotPostManagementService.complexchange_status(complexstatus).then((res) => {
                console.log(res.data.success);
                if (res.data.success == false) {
                    this.$toast.add({ severity: 'error', summary: '확인됨', detail: '상단 고정 게시글이 최대로 설정되어 있습니다', life: 3000 });
                    this.hotPostList({ page: 1, limit: this.pagination.pagination_limit });
                    this.hotPostManagementList({ page: 1, limit: this.pagination.pagination_limit });
                    this.apartment_id = '';
                } else {
                    this.$toast.add({ severity: 'info', summary: '확인됨', detail: '인기글 상태 변경 완료', life: 3000 });
                    this.hotPostList({ page: 1, limit: this.pagination.pagination_limit });
                    this.hotPostManagementList({ page: 1, limit: this.pagination.pagination_limit });
                    this.apartment_id = '';
                }
            });
        },

        Refresh() {
            (this.apartment_id = ''), (this.startDate = ''), (this.endDate = ''), (this.hot_post_status = ''), this.hotPostList({ page: 1, limit: this.pagination.pagination_limit });
            this.hotPostManagementList();
            this.apartment_id = '';
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

.product-image {
    width: 100px;
    height: 50px;
}

.p-button.p-button-text {
    background-color: #221ed9;
    color: white;
    border-color: transparent;
}
</style>