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
                        <label for="nameuser">단지명</label>
                        <Dropdown v-model="apartment_id" :options="apartmentpostDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">게시물 타입</label>
                        <Dropdown v-model="post_type" :options="dropdownPostTypes" optionValue="code" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">태그</label>
                        <Dropdown v-model="tag_id" :options="tagDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">게시물 제목</label>
                        <InputText id="nameuser" type="text" v-model="title" placeholder="게시물 제목 입력" />
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">게시물 작성자</label>
                        <InputText id="nameuser" type="text" v-model="nickname" placeholder="닉네임 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">등록일자(from)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">등록일자(to)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>
                </div>

                <div class="p-d-flex p-jc-between p-ai-lg-center p-ai-start p-mt-6 p-flex-column p-flex-lg-row">
                    <div class="p-mb-4 p-mb-lg-0">
                        <Button :label="$t('button.today')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="today"></Button>
                        <Button :label="$t('button.lastWeek')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastweek"></Button>
                        <Button :label="$t('button.lastMonth')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastmonth"></Button>
                        <Button :label="$t('button.last6Months')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastsixmonth"></Button>
                        <!-- <Button :label="$t('button.lastYear')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastyear"></Button> -->
                    </div>
                    <div>
                        <Button label="검색" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchpostlist"></Button>
                        <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetPost"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>게시물 리스트</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <a href="https://gscm-api-dev.dvconsulting.org/api/v1/admin/post/download-excel/" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출</a>
                        <!-- <a href="https://api-uat.ggulpot-admin.com/api/v1/admin/post/download-excel/" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출</a> -->

                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/post/download-excel/" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue;color: white;">엑셀 추출</a> -->
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>Export Excel</Button> -->
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
                    <Column header="단지명" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>
                            {{ data.user_location }}
                        </template>
                    </Column>
                    <Column header="게시물 타입" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Post Type</span>
                            {{ $t(data.post_type) }}
                        </template>
                    </Column>
                    <Column header="태그" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Tag</span>
                            {{ data.post_tag }}
                        </template>
                    </Column>
                    <Column header="게시물 제목" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Title</span>
                            <template v-if="data.title.length < 8"> {{ data.title }}</template>
                            <template v-else> {{ data.title.substring(0, 8) + '..' }}</template>
                            <!-- {{ data.title }} -->
                        </template>
                    </Column>
                    <Column header="게시물 작성자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Posted By</span>
                            {{ data.user_name }}
                        </template>
                    </Column>
                    <Column header="게시물 등록일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Posted Date & Time</span>
                            {{ formatDate(data.create_date) }}
                        </template>
                    </Column>

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <p style="display: none">{{ data.mobile }}</p>
                            <div style="display: flex">
                                <!-- <router-link :to="'/EditUsermanagement/' + data.id"
                                    ><Button label="info" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button>
                                </router-link> -->
                                <router-link :to="'/ViewPostManagement/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-eye p-mr-2"></i> </Button
                                ></router-link>
                                <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" />
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

import PostmanagementService from '../../service/API/PostmanagementService';
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
            name: '',
            status: '',
            username: '',
            id: '',
            apartment_id: '',
            post_type: '',
            tag_id: '',
            title: '',
            posted_by: '',
            nickname: '',
            create_date: '',
            startDate: '',
            endDate: '',
            user_location: '',
            post_tag: '',
            user_name: '',
            apartmentpostDropdownValues: '',
            apartmentpostDropdownValue: null,
            dropdownPostTypes: [
                { name: '활동', code: 'activity' },
                { name: '일반', code: 'general' },
            ],
            dropdownPostType: null,
            tagDropdownValues: '',
            tagDropdownValue: null,
            searchenddate: '',
            searchdate: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.postmanagementService = new PostmanagementService();
    },
    mounted() {
        // this.postlist();

        this.storageData = localStorage.getItem('postlist') ? JSON.parse(localStorage.getItem('postlist')) : '';

        console.log(this.storageData, 'data');

        if (this.storageData != '') {

            this.apartment_id = this.storageData.apartment_id;
            this.post_type = this.storageData.post_type;
            this.tag_id = this.storageData.tag_id;
            this.title = this.storageData.title;
            this.nickname = this.storageData.nickname;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
            this.postlistpagination = this.storageData.page;
        }


        if (this.postlistpagination == '' || this.postlistpagination == null) {
            if (this.apartment_id || this.post_type || this.tag_id || this.title || this.nickname || this.startDate || this.endDate ) {
            const searchListParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
                apartment_id: this.apartment_id,
                post_type: this.post_type,
                tag_id: this.tag_id,
                title: this.title,
                nickname: this.nickname,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.postlist(searchListParams);
        } else {
            this.postlist({ limit: this.pagination.pagination_limit, page: this.pagination.current_page });
        }

        } else {
            const searchLocalParams = {
                page: Number(this.postlistpagination),
                limit: this.pagination.pagination_limit,
                apartment_id: this.apartment_id,
                post_type: this.post_type,
                tag_id: this.tag_id,
                title: this.title,
                nickname: this.nickname,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.postlist(searchLocalParams);
        }

        const postlistParams = {
            page: 1,
            limit: 1000,
        };
        this.postmanagementService

            .getApartmentList(postlistParams)

            .then((res) => {
                this.apartmentpostDropdownValues = res.data.result;
                // this.products = data;
                this.loading1 = false;
                // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                console.log(this.customer1);
                // console.log(data);
            });

        this.postmanagementService

            .gettagList(postlistParams)

            .then((res) => {
                this.tagDropdownValues = res.data.result;
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

        postlist(data) {
            // const postlistsParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.postmanagementService
                .getPostList(data)
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;

                    this.FromyearOfBirthDropdownValues = res.data.result;
                    this.ToyearOfBirthDropdownValues = res.data.result;
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
                    'postlist',
                    JSON.stringify({
                        limit: this.pagination.pagination_limit,
                        page: page,
                        apartment_id: this.apartment_id,
                        post_type: this.post_type,
                        tag_id: this.tag_id,
                        title: this.title,
                        nickname: this.nickname,
                        startDate: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                        endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                    })
                );
            this.postmanagementService
                .getPostList({
                    page: page,
                    limit: this.pagination.pagination_limit,
                    apartment_id: this.apartment_id,
                    post_type: this.post_type,
                    tag_id: this.tag_id,
                    title: this.title,
                    nickname: this.nickname,
                    startDate: this.searchdate,
                    endDate: this.searchenddate,
                })
                .then((res) => {
                    this.customer1 = res.data.result;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        // Changestatus(index, id) {
        //      console.log('eeee', id);
        //      console.log('index', this.statustext);
        //     var statustext = this.customer1[index].status;
        //     this.customer1[index].status = statustext === 'active' ? 'inactive' : 'active';
        //     var complexstatus = { ...{  id: id, status: this.customer1[index].status } };
        //     // console.log('companystatus', companystatus);
        //     this.apartmentService.complexchange_status(complexstatus).then((res) => {
        //         // console.log(res);
        //         if (res.status === 200) {
        //             this.$toast.add({ severity: 'info', summary: 'succuss', detail: 'Completed apartement status correction.', life: 3000 });
        //             this.apartmentlist();
        //         }
        //     });
        // },

        resetPost() {
            localStorage.setItem('postlist', '');
            (this.username = ''),
                (this.apartment_id = ''),
                (this.post_type = ''),
                (this.tag_id = ''),
                (this.title = ''),
                (this.nickname = ''),
                (this.startDate = ''),
                (this.endDate = ''),
                this.postlist({ page: 1, limit: this.pagination.pagination_limit });
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
        searchpostlist() {
            if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else {
            if (this.apartment_id !==' '  || this.post_type !==' '  ||  this.tag_id !==' '  ||  this.title !==' '  || this.nickname !==' '  || this.startDate !==' '  || this.endDate !== '') {
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
                    'postlist',
                    JSON.stringify({
                        limit: this.pagination.pagination_limit,
                        page: this.pagination.current_page,
                        apartment_id: this.apartment_id,
                        post_type: this.post_type,
                        tag_id: this.tag_id,
                        title: this.title,
                        nickname: this.nickname,
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                    })
                );
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    apartment_id: this.apartment_id,
                    post_type: this.post_type,
                    tag_id: this.tag_id,
                    title: this.title,
                    nickname: this.nickname,
                    startDate: this.searchdate,
                    endDate: this.searchenddate,
                    // children: this.children,
                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.postmanagementService
                    .getPostList(searchParams)
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
        //     this.usermanagementService
        //         .getExcel(this.username, this.apartment_name, this.dob_year, this.mobile,this.subscription, this.gender, this.persons_in_family, this.have_children, this.create_date==""?"":this.formatDate(this.create_date))
        //         .then((response) => {
        //             const url = window.URL.createObjectURL(new Blob([response.data]));
        //             const link = document.createElement('a');
        //             link.href = url;
        //             link.setAttribute('download', 'UserManagementlist.xlsx'); //or any other extension
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
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
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
                    self.postmanagementService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);
                            self.postlist({ page: self.pagination.current_page, limit: self.pagination.pagination_limit });
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

.p-button.p-button-text {
    background-color: #221ed9;
    color: white;
    border-color: transparent;
}
</style>