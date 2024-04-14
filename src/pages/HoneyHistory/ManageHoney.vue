<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <form>
                <div class="card p-fluid">
                    <h4>
                        <strong>꿀 관리 - {{ username }} </strong>
                    </h4>

                    <div class="p-formgrid p-grid p-mb-3">
                        <div class="p-field p-col-12 p-md-3">
                            <label for="Nickname">꿀</label>
                            <InputText id="Points" type="text" :class="`${error.points ? 'p-invalid' : ''}`" v-model="points" placeholder="꿀 입력" v-on:keypress="NumbersOnly" />
                            <div class="text-red">{{ error.points }}</div>
                        </div>

                        <div class="p-field p-col-12 p-md-3">
                            <label for="minpoint">꿀 적립/차감</label>
                            <!-- <Dropdown v-model="post_type" :options="dropdownPostTypes" optionValue="code" optionLabel="name" placeholder="Please Select One" /> -->
                            <Dropdown v-model="transaction_type" :class="`${error.transaction_type ? 'p-invalid' : ''}`" :options="ManageActiontypeDropdownValues" optionValue="code" optionLabel="name" placeholder="선택" />
                            <div class="text-red">{{ error.transaction_type }}</div>
                        </div>

                        <div class="p-field p-col-12 p-md-3">
                            <label for="maxpoint">사유</label>
                            <InputText id="maxpoint" type="text" :class="`${error.reason ? 'p-invalid' : ''}`" v-model="reason" placeholder="키워드 입력" />
                            <div class="text-red">{{ error.reason }}</div>
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
                            <Button label="제출" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="addreward"></Button>
                            <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetReward"></Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="p-col-12">
            <div class="card">
                <span v-if="customer1.length > 0">
                    <div class="p-d-flex p-jc-between p-mb-2">
                        <div>
                            <h5>꿀 내역</h5>
                        </div>
                        <div>
                            <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                            <!-- <a href="https://gscm-api.dvconsulting.org/api/v1/admin/reward/download-excel" target="_blank" class="p-button p-button-text p-mr-2 p-mb-2">Export Excel </a> -->
                            <a>Total Points:{{ mydata }}</a>
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
                        <Column header="꿀" style="min-width: 12rem">
                            <template #body="{ data }">
                                <span class="p-column-title">Points</span>
                                {{ data.point }}
                            </template>
                        </Column>

                        <Column header="적립/삭제" style="min-width: 12rem">
                            <template #body="{ data }">
                                <span class="p-column-title">Action Type</span>
                                {{ $t(data.transaction_type) }}
                            </template>
                        </Column>

                        <Column header="사유" style="min-width: 12rem">
                            <template #body="{ data }">
                                <span class="p-column-title">Reason</span>
                                {{ data.description }}
                            </template>
                        </Column>

                        <Column header="등록 일자" style="min-width: 12rem">
                            <template #body="{ data }">
                                <span class="p-column-title">Date & Time</span>

                                {{ dateformat(data.create_date) }}
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
                </span>

                <span v-else>
                    <p style="text-align: center; font-size: x-large; font-weight: 600">포인트 파운드 없음</p>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
// import { useRoute } from 'vue-router';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import validateCreateHoneyHistory from '../../validations/HoneyHistory/validateCreateHoneyHistory';
import HoneyManagementListService from '../../service/API/HoneyManagementListService';
import axios from 'axios';
import utils from '@/service/utils';
import moment from 'moment';
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
                pagination_limit: 5,
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
            current_point: '',
            transaction_type: '',
            points: '',
            reason: '',
            user_id: '',
            ManageActiontypeDropdownValues: [
                { name: '차감', code: 'debit' },
                { name: '적립', code: 'credit' },
            ],
            ManageActiontypeDropdownValue: null,

            mydata: {},
            formData: new FormData(),
            username: '',
            error: {},
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.honeyManagementListService = new HoneyManagementListService();
    },
    mounted() {
        this.rewardlist();
    },
    watch: {},
    methods: {
        getStatus(values) {
            return values === 'active' ? true : false;
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

        rewardlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
                id: this.$route.params.id,
                language: 'ko',
            };
            console.log(this.page);
            this.loading1 = true;
            this.honeyManagementListService
                .getmanageList(postlistParams)
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.mydata = res.data.credit_debit_points[0].current_point;
                    this.username = this.customer1[0].username;
                    //                 this.company_id= this.company.id;
                    // console.log("this.company_id",this.company_id);
                    console.log('res', this.mydata);
                    console.log(this.username);
                    this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                    this.loading1 = false;
                })
                .catch((err) => console.log(err));
        },
        NumbersOnly(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
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
            this.honeyManagementListService
                .getmanageList({ page: page, limit: this.pagination.pagination_limit, id: this.$route.params.id,language: 'ko' })
                .then((res) => {
                    this.customer1 = res.data.result;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        resetReward() {
            (this.points = ''), (this.transaction_type = ''), (this.reason = ''), this.rewardlist();
        },
        addreward() {
            var self = this;
            let vcheckData = {
                points: self.points,
                transaction_type: self.transaction_type,
                reason: self.reason,
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreateHoneyHistory(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                self.formData.append('user_id', self.$route.params.id);
                self.formData.append('points', self.points);
                self.formData.append('transaction_type', self.transaction_type);
                self.formData.append('reason', self.reason);
                // console.log(this.name);
                return axios
                    .post('admin/reward/add', { user_id: self.$route.params.id, points: self.points, transaction_type: self.transaction_type, reason: self.reason })
                    .then(() => {
                        // alert('Manage Rewards added successfully.');
                        self.$router.push({ name: 'ManageHoney' });

                        setTimeout(() => {
                            if (self.transaction_type == 'credit') {
                                self.$toast.add({ severity: 'info', summary: '확인.', detail: '보상 관리 추가 성공적으로.', life: 3000 });
                                window.location.reload();
                            } else {
                                self.$toast.add({ severity: 'info', summary: '확인.', detail: '보상 관리가 성공적으로 차감되었습니다.', life: 3000 });
                                window.location.reload();
                            }
                        }, 1000);
                    })
                    .catch(function () {
                        

                        // alert('이메일이 이미 존재합니다');
                        self.$toast.add({ severity: 'error', summary: '거부됨.', detail: '포인트가 부족합니다', life: 3000 });
                    });
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
            const date = new Date(value);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var hr = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return (value = yyyy + '/' + mm + '/' + dd + ' ' + ' ' + hr + ':' + min + ':' + sec);
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