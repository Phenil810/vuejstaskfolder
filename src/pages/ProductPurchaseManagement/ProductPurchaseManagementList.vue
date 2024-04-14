<template>
    <div class="p-grid">
        <Toast />
        <ConfirmDialog group="dialog" />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>검색</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="producttitle">상품명</label>
                        <InputText id="producttitle" type="text" v-model="product_name" placeholder="상품명 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="minihoney">닉네임</label>
                        <InputText id="minihoney" type="text" v-model="nickname" placeholder="닉네임 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="maxhoney">단지명</label>
                        <Dropdown v-model="apartment_id" :options="apartmentcomplexDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3" style="display: grid">
                        <label for="SecretRoom">처리 상태</label>
                        <Dropdown v-model="delivery_status" :options="DeliveryStatusDropdownValues" optionValue="code" optionLabel="name" placeholder="선택" />
                    </div>
                </div>

                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="startdate">환불 요청 여부</label>
                        <Dropdown v-model="refund_request" :options="CouponRefundDropdownValues" optionValue="code" optionLabel="name" placeholder="선택" />
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="enddate">구매 시작 날짜 </label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="enddate">구매 종료일 </label>
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
                        <Button label="검색" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchproductManagementpurchaselist()"></Button>
                        <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetproductManagementpurchaselist()"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>제품 구매 목록</h5>
                    </div>
                    <div>
                        <a :href="'https://gscm-api-dev.dvconsulting.org/api/v1/admin/products/user-purchase-product-excell-export'" label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white"
                            >엑셀 추출</a
                        >
                        <!-- <a href="https://api-uat.ggulpot-admin.com/api/v1/admin/products/user-purchase-product-excell-export" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue;color: white;">엑셀 추출</a> -->

                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/products/user-purchase-product-excell-export" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue;color: white;">엑셀 추출</a> -->
                    </div>
                </div>

                <DataTable :value="result" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="#" :header="$t('#')">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>

                    <Column header="상품 이미지" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Product image</span>
                            <img :src="data.product_image" alt="이미지를 사용할 수 없음" class="product-image" />
                        </template>
                    </Column>

                    <Column header="상품명" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Product Name</span>
                            {{ data.title }}
                        </template>
                    </Column>

                    <Column header="닉네임" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Nickname</span>
                            {{ data.nickname }}
                        </template>
                    </Column>

                    <Column header="단지명" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>
                            {{ data.apartment_name }}
                        </template>
                    </Column>

                    <Column header="구매 일자" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Purchased date</span>
                            {{ formatDateproductlist(data.purchase_date) }}
                        </template>
                    </Column>

                    <Column header="상품 판매 상태" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">is product exposed</span>
                            <p v-if="data.status == 'active'">판매</p>
                            <p v-else>중단</p>
                            <!-- {{ data.status }} -->
                        </template>
                    </Column>

                    <Column header="교환 취소 요청 여부" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Is Requested By User</span>
                            <!-- <span v-if="data.updated_by == 1 && data.product_status == 'cancelled'"> -- </span>
                            <span v-else-if="data.user_id != 1 && data.product_status == 'pending'"> -- </span>
                            <span v-else-if="data.user_id != 1 && data.product_status == 'delivered'"> -- </span>
                            <span v-else-if="data.user_id != 1 && data.product_status == 'cancelled'"> Yes </span> -->
                            {{ data.is_requested_by_user == 'Yes' ? '있음' : data.is_requested_by_user == '--' ? '-' : data.is_requested_by_user }}
                        </template>
                    </Column>

                    <Column header="처리 상태" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Delivery Status</span>
                            <span v-if="data.product_status == 'pending'">
                                <!-- @click="PendingStatus($route.params.id, data.user_id)" -->
                                <Button label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: white; color: black" @click="open(data.product_id, data.user_id, data.transaction_id)">처리 전</Button>
                            </span>
                            <span v-else-if="data.product_status == 'delivered'">
                                <Button label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: black; color: white" @click="open1(data.product_id, data.user_id, data.transaction_id)">처리 완료</Button>
                            </span>

                            <span v-else>
                                <Button label="Primary" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: grey; color: white" disabled>환불/취소/기타</Button>
                            </span>
                        </template>
                    </Column>

                    <Dialog header="변경할 상태값을 선택해주세요." v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                        <div class="p-grid p-formgrid p-mb-3">
                            <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                                <br />
                                <!-- <Dropdown v-model="dropdownValue" modelValue="dropdownValues[0].name" :options="dropdownValues" optionLabel="code" :placeholder="status" /> -->

                                <input type="radio" id="delivered" name="delivered" value="delivered" v-model="product_status" />

                                <label for="delivered">처리 완료</label>
                                <br />

                                <input type="radio" id="cancelled" name="cancelled" value="cancelled" v-model="product_status" />
                                <label for="cancelled">환불/취소/기타</label>

                                <!-- <div class="text-red">{{ error.product_status }}</div> -->
                            </div>
                        </div>

                        <template #footer>
                            <div class="p-d-flex p-jc-end p-ai-center dual-btn" style="float: right">
                                <Button :disabled="!product_status" label="확인" @click="onConfirm(product_status)" icon="pi pi-check" class="p-button-primary" />
                            </div>
                            <div class="p-d-flex p-jc-end p-ai-center dual-btn" style="float: left">
                                <Button :disabled="!product_status" label="취소" @click="close" icon="pi pi-pi-times" class="p-button-danger" />

                            </div>
                        </template>
                    </Dialog>

                    <Dialog header="변경할 상태값을 선택해주세요." v-model:visible="delivereddisplay" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                        <div class="p-grid p-formgrid p-mb-3">
                            <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                                <br />
                                <!-- <Dropdown v-model="dropdownValue" modelValue="dropdownValues[0].name" :options="dropdownValues" optionLabel="code" :placeholder="status" /> -->

                                <input type="radio" id="cancelled" name="cancelled" value="cancelled" v-model="product_status" />
                                <label for="cancelled">환불/취소/기타</label>

                                <!-- <div class="text-red">{{ error.product_status }}</div> -->
                            </div>
                        </div>

                        <template #footer>
                            <div class="p-d-flex p-jc-end p-ai-center dual-btn" style="float: right">
                                <Button :disabled="!product_status" label="확인" @click="onConfirm1(product_status)" icon="pi pi-check" class="p-button-primary" />
                            </div>
                            <div class="p-d-flex p-jc-end p-ai-center dual-btn" style="float: left">
                                <Button :disabled="!product_status" label="취소" @click="close1" icon="pi pi-pi-times" class="p-button-danger" />

                            </div>
                        </template>
                    </Dialog>
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
// import axios from 'axios';
import ProductmanagementService from '../../service/API/ProductmanagementService';
import utils from '@/service/utils';
import moment from 'moment';
// import { stat } from 'fs';

export default {
    name: 'ProductManagementview',
    data() {
        return {
            getUserId: null,
            getUserId1: null,
            gettarnsactionId: null,
            gettarnsactionId1: null,
            render: true,
            display: false,
            delivereddisplay: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            name: '',
            apartmentcomplexDropdownValues: '',
            apartmentcomplexDropdownValue: null,

            id: '',
            result: [],
            loading1: true,
            idFrozen: false,
            products: null,

            error: {},
            formData: new FormData(),

            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },

            title: '',
            description: '',
            product_image: '',
            honey: '',
            create_date: '',
            username: '',
            apartment_id: '',
            product_status: '',
            product_id: '',
            user_id: '',
            transaction_id: '',
            is_requested_by_user: '',
            CouponRefundDropdownValues: [
                { name: '환불 요청', code: 'yes' },
                { name: '-', code: 'no' },
            ],
            CouponRefundDropdownValue: null,
            DeliveryStatusDropdownValues: [
                { name: '처리 전', code: 'pending' },
                { name: '처리 완료', code: 'delivered' },
                { name: '환불/취소/기타', code: 'cancelled' },
            ],
            DeliveryStatusDropdownValue: null,
            delivery_status: '',
            refund_request: '',
            startDate: '',
            endDate: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.productmanagementService = new ProductmanagementService();
    },

    methods: {
        onConfirm(status) {
            if (status == 'delivered') {
                this.PendingStatus(this.getproductid, this.getUserId, this.gettarnsactionId);
                this.display = false;
                this.delivereddisplay = false;
            } else if (status == 'cancelled') {
                this.DeliveredStatus(this.getproductid, this.getUserId, this.gettarnsactionId);
                this.display = false;
                this.delivereddisplay = false;
            }
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

        onConfirm1(status) {
            if (status == 'delivered') {
                this.PendingStatus(this.getproductid1, this.getUserId1, this.gettarnsactionId1);
                this.delivereddisplay = false;
            } else if (status == 'cancelled') {
                this.DeliveredStatus(this.getproductid1, this.getUserId1, this.gettarnsactionId1);
                this.delivereddisplay = false;
            }
        },
        open(productid, userId, tarnsactionId) {
            this.display = true;
            this.getUserId = userId;
            this.getproductid = productid;
            this.gettarnsactionId = tarnsactionId;
        },
        close() {
            this.display = false;
            this.product_status = '';
        },

        open1(productid, userId, tarnsactionId) {
            this.delivereddisplay = true;
            this.getUserId1 = userId;
            this.getproductid1 = productid;
            this.gettarnsactionId1 = tarnsactionId;
        },
        close1() {
            this.delivereddisplay = false;
            this.product_status = '';
        },

        productManagementpurchaselist(data) {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };

            this.loading1 = true;
            this.productmanagementService
                .getProductpurchaseList(data)
                .then((res) => {
                    this.result = res.data.result;
                    this.totalrecords = res.data.total_records;
                    //                 this.company_id= this.company.id;
                    // console.log("this.company_id",this.company_id);

                    console.log('res', this.result);
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
                    'ProductPurchaseManagement',
                    JSON.stringify({
                        product_name: this.product_name,
                        nickname: this.nickname,
                        apartment_id: this.apartment_id,
                        refund_request: this.refund_request,
                        delivery_status: this.delivery_status,
                        startDate:this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                        endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                        page: page,
                        limit: this.pagination.pagination_limit,
                    })
                );
            let paginationParams = {
                limit: this.pagination.pagination_limit,
                page: page,
                product_name: this.product_name,
                nickname: this.nickname,
                apartment_id: this.apartment_id.toString(),
                refund_request: this.refund_request,
                delivery_status: this.delivery_status,
                startDate: this.searchdate,
                endDate: this.searchenddate,
            };
            this.productmanagementService
                .getProductpurchaseList(paginationParams)
                .then((res) => {
                    this.result = res.data.result;
                    console.log('paginate', this.result);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        resetproductManagementpurchaselist() {
            localStorage.setItem('ProductPurchaseManagement', '');
            (this.product_name = ''),
                (this.nickname = ''),
                (this.apartment_id = ''),
                (this.refund_request = ''),
                (this.delivery_status = ''),
                (this.startDate = ''),
                (this.endDate = ''),
                this.productManagementpurchaselist({ page: 1, limit: this.pagination.pagination_limit });
        },

        searchproductManagementpurchaselist() {
            if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else {
            if (this.product_name !== '' ||  this.nickname !== '' || this.apartment_id !== '' || this.refund_request !== '' || this.delivery_status !== '' || this.startDate !== '' || this.endDate !== '') {
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
                    'ProductPurchaseManagement',
                    JSON.stringify({
                        product_name: this.product_name,
                        nickname: this.nickname,
                        apartment_id: this.apartment_id,
                        refund_request: this.refund_request,
                        delivery_status: this.delivery_status,
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                        page: this.pagination.current_page,
                        limit: this.pagination.pagination_limit,
                    })
                );
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    product_name: this.product_name,
                    nickname: this.nickname,
                    apartment_id: this.apartment_id.toString(),
                    refund_request: this.refund_request,
                    delivery_status: this.delivery_status,
                    startDate: this.searchdate,
                    endDate: this.searchenddate,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.productmanagementService
                    .getProductpurchaseList(searchParams)
                    .then((res) => {
                        console.log('res', res);
                        this.result = res.data.result;
                        this.totalrecords = res.data.total_records;
                        console.log('searchPost', this.result);
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
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll ');
            }
        },

        formatDateproductlist(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },

        PendingStatus: function (product_id, user_id, transaction_id) {
            console.log(product_id);
            console.log(user_id);
            console.log(transaction_id);
            var self = this;
            self.$confirm.require({
                group: 'dialog',
                header: '확인',
                message: '처리 완료로 상태값으로처리 상태를 변경하시겠습니까',
                icon: 'pi pi-trash',
                acceptLabel: '변경',
                rejectLabel: '취소',
                accept: () => {
                    self.productmanagementService.productstatus({ product_id: product_id, user_id: user_id, transaction_id: transaction_id, status: 'delivered' }).then(function (response) {
                        console.log(response);

                        self.$toast.add({ severity: 'info', summary: '확인', detail: '상태를 성공적으로 업데이트했습니다.', life: 3000 });
                        
                        setTimeout(() => {
                            self.$router.push({ name: 'ProductPurchaseManagementList' });
                        }, 1000);
                        self.productManagementpurchaselist({ page: 1, limit: self.pagination.pagination_limit });
                        self.display = false;
                    });
                    // .catch(() => {
                    //     self.$toast.add({ severity: 'info', summary: '확인', detail: '상태를 성공적으로 업데이트했습니다.', life: 3000 });
                    // });
                },
                reject: () => {
                    self.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
                },
            });
        },

        DeliveredStatus: function (product_id, user_id, transaction_id) {
            // console.log(id);
            var self = this;
            self.$confirm.require({
                group: 'dialog',
                header: '확인',
                message: '환불/취소/기타 상태값으로처리 상태를 변경하시겠습니까?',
                icon: 'pi pi-trash',
                acceptLabel: '변경',
                rejectLabel: '취소',
                accept: () => {
                    self.productmanagementService.productstatus({ product_id: product_id, user_id: user_id, transaction_id: transaction_id, status: 'cancelled' }).then(function (response) {
                        console.log(response);

                        self.$toast.add({ severity: 'info', summary: '확인', detail: '상태를 성공적으로 업데이트했습니다.', life: 3000 });
                       
                        setTimeout(() => {
                            self.$router.push({ name: 'ProductPurchaseManagementList' });
                        }, 1000);
                        self.productManagementpurchaselist({ page: 1, limit: self.pagination.pagination_limit });
                    });
                    // .catch(() => {
                    //     self.$toast.add({ severity: 'info', summary: '확인', detail: '상태를 성공적으로 업데이트했습니다.', life: 3000 });
                    // });
                },
                reject: () => {
                    self.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
                },
            });
        },
    },

    mounted() {
        //  this.productManagementpurchaselist();

        this.storageData = localStorage.getItem('ProductPurchaseManagement') ? JSON.parse(localStorage.getItem('ProductPurchaseManagement')) : '';

        console.log(this.storageData, 'data');

        if (this.storageData != '') {

            this.product_name = this.storageData.product_name;
            this.nickname = this.storageData.nickname;
            this.apartment_id = this.storageData.apartment_id;
            this.refund_request = this.storageData.refund_request;
            this.delivery_status = this.storageData.delivery_status;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
            this.productManagementpurchaselistpagination = this.storageData.page;
        }


        if (this.productManagementpurchaselistpagination == '' || this.productManagementpurchaselistpagination == null) {

            if (this.product_name || this.nickname || this.apartment_id || this.refund_request || this.delivery_status || this.startDate || this.endDate ) {
            const searchListParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
                product_name: this.product_name,
                nickname: this.nickname,
                apartment_id: this.apartment_id.toString(),
                refund_request: this.refund_request,
                delivery_status: this.delivery_status,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.productManagementpurchaselist(searchListParams);
        } else {
            const searchListParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
            };
            this.productManagementpurchaselist(searchListParams);
        }
        } else {
            const searchLocalParams = {
                page: Number(this.productManagementpurchaselistpagination),
                limit: this.pagination.pagination_limit,
                product_name: this.product_name,
                nickname: this.nickname,
                apartment_id: this.apartment_id.toString(),
                refund_request: this.refund_request,
                delivery_status: this.delivery_status,
                startDate: this.startDate,
                endDate: this.endDate,
            };

            this.productManagementpurchaselist(searchLocalParams);
        }

        const postlistParams = {
            page: 1,
            limit: 1000,
        };

        this.productmanagementService

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
};
</script>


<style scoped>
.p-fluid .p-button {
    width: auto;
}
.renderHtml {
    background-color: #fcfcfc;
    padding: 25px;
    border: 1px solid rgba(70, 77, 242, 0.2);
    border-radius: 5px;
    margin-top: 15px;
}

.url {
    word-wrap: break-word;
}

.product-image {
    width: 100px;
    height: 50px;
}
</style>