<template>
    <div class="p-grid">
        <Toast />
        
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>푸시 알림 상세정보</strong>
                </h4>
                <div class="p-field p-grid">
                    <label for="category_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">제목:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ title }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">설명:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p>{{ short_description }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Url:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p id="url">{{ url }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">등록일자:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p>{{ formatDate(create_date) }}</p>
                    </div>
                </div>
            </div>
        </div>
    

    <div class="p-col-12">
        <div class="card">
            <div class="p-d-flex p-jc-between p-mb-2">
                <div>
                    <h5>발송 인원:</h5>
                </div>
                <div>
                    <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                    <button target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="PushnotificationdetailDownloadExcel()" style="background: blue; color: white">엑셀 다운로드</button>
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
                <Column header="닉네임" style="min-width: 12rem" field="name" >
                    <template #body="{ data }">
                        <span class="p-column-title">Nickname</span>
                        {{ data.username }}
                    </template>
                </Column>

                <Column header="단지명" style="min-width: 12rem" field="email" >
                    <template #body="{ data }">
                        <span class="p-column-title">Apartment Complex</span>
                        {{ data.apartment_name }}
                    </template>
                </Column>

                <Column header="출생년도" style="min-width: 12rem" field="participated_date" >
                    <template #body="{ data }">
                        <span class="p-column-title">Year of Birth</span>
                        {{ data.dob_year }}
                    </template>
                </Column>

                <Column header="가입 경로" style="min-width: 12rem" field="status" >
                    <template #body="{ data }">
                        <span class="p-column-title">Subscription method</span>
                        {{ data.how_to_know_text }}
                    </template>
                </Column>

                <Column header="성별" style="min-width: 12rem" field="status" >
                    <template #body="{ data }">
                        <span class="p-column-title">gender</span>
                        <span v-if="data.gender == null"> - </span>
                        <span v-else>
                            {{ $t(data.gender) }}
                        </span>
                    </template>
                </Column>

                <Column header="가구 구성" style="min-width: 12rem" field="status" >
                    <template #body="{ data }">
                        <span class="p-column-title">family type</span>
                        <span v-if="data.persons_in_family == '1'">
                            <p>1인 가구</p>
                        </span>
                        <span v-else-if="data.persons_in_family == '2'">
                            <p>2인 가구</p>
                        </span>
                        <span v-else-if="data.persons_in_family == '3'">
                            <p>3인 가구</p>
                        </span>
                        <span v-else-if="data.persons_in_family == '4'">
                            <p>4인 가구 이상</p>
                        </span>
                        <span v-else-if="data.persons_in_family == '5'">
                            <p>기타</p>
                        </span>
                    </template>
                </Column>

                <Column header="자녀 유무" style="min-width: 12rem" field="status" >
                    <template #body="{ data }">
                        <span class="p-column-title">children</span>
                        <span v-if="data.have_children == null"> - </span>
                        <span v-else>
                            {{ $t(data.have_children) }}
                        </span>
                    </template>
                </Column>

                <Column header="읽음 상태" style="min-width: 12rem" field="status" >
                    <template #body="{ data }">
                        <span class="p-column-title">Read Status</span>
                        <span v-if="data.is_read == 'y'">읽음   </span>
                        <span v-else>
                            읽지 않음
                        </span>
                    </template>
                </Column>

                <Column header="등록 일자" style="min-width: 12rem" field="status" >
                    <template #body="{ data }">
                        <span class="p-column-title">Date & Time</span>
                        {{ formatDate(data.create_date) }}
                    </template>
                </Column>
            </DataTable>
            <br />

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

            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <div>
                    <Button label="삭제" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="deleteNote($route.params.id)" style="background: blue; color: white" />
                </div>
            </div>

            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
// import { useRoute } from 'vue-router';
// import validateUsersearch from '../../validations/user/validateUserSearch';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import PushNotificationService from '../../../service/API/PushNotificationService';
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
            checked1: true,
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
            customer2:[],
            show_in_banner: '',
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            title: '',
            startDate: '',
            endDate: '',
            description: '',
            link_text: '',
            url: '',
            create_date: '',
            searchdate: '',
            searchenddate: '',
            id: '',
            apartment_name: '',
            username: '',
            dob_year: '',
            how_to_know_text: '',
            gender: '',
            have_children: '',
            persons_in_family: '',
            is_read:'',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.pushNotificationService = new PushNotificationService();
        // this.changeToSpanish();
    },
    mounted() {
        localStorage.setItem('id', this.$route.params.id);
        this.pushnotificationtdetail();
        this.pushnotificationtlist();

        this.pushNotificationService.PushNotificationview(this.$route.params.id).then((res) => {
            this.title = res.data.title;
            this.short_description = res.data.short_description;
            this.url = res.data.url;
            this.create_date = res.data.create_date;
        });
    },
    watch: {},
    methods: {
        // changeToSpanish() {
        //     this.$primevue.config.locale.accept = 'Aceptar';
        //     this.$primevue.config.locale.reject = 'Rechazar';
        //     this.$primevue.config.locale.dayNamesMin = ['D','L','M','X','J','V','S'];
        // },

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

        PushnotificationdetailDownloadExcel() {
            this.pushNotificationService
                .getExcelPushNotificationuserdetailsFinal()
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'pushnotificationdetaillist.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((err) => console.log(err));
        },

        pushnotificationtdetail() {
            const postlistParams = {
                id: this.$route.params.id,
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.pushNotificationService
                .PushNotificationdetaillist(postlistParams)
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;

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
            this.pushNotificationService
                .PushNotificationdetaillist({ page: page, limit: this.pagination.pagination_limit, id: this.$route.params.id })
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


        pushnotificationtlist() {
            const pushtlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.pushNotificationService
                .getPushNotificationList(pushtlistParams)
                .then((res) => {
                    this.customer2 = res.data.result;
                    
                   
                    

                    //                 this.company_id= this.company.id;
                    // console.log("this.company_id",this.company_id);
                    console.log('res', this.customer1);
                    console.log(res);
                    this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                    this.loading1 = false;
                })
                .catch((err) => console.log(err));
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
                message: '삭제하시겠습니까?',
                icon: 'pi pi-trash',
                acceptLabel: '확인',
                rejectLabel: ' 취소',
                accept: () => {
                    self.pushNotificationService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);
                            self.pushnotificationtlist();
                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });

                            setTimeout(() => {
                                self.$router.push({ path: '/GeneralManagement/NotificationManagement/NotificationManagementList', query: { alert: 1, severity: 'info', summary: '삭제', msg: '성공적으로 삭제되었습니다.' } });
                            }, 1000);
                        })
                        // .catch(() => {
                        //     self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                        // });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
                },
            });
        },
    },
};
</script>

<style scoped>
p#url {
    line-break: anywhere;
}
</style>