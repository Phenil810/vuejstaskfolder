<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>{{ $t('Search') }}</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">{{ $t('Category 1') }}</label>
                        <Dropdown v-model="first_category"  :options="dropdownValues"   optionLabel="first_category" placeholder="선택 해주세요"  name="first_category"
                            id="first_category" />
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">{{ $t('Category 2') }}</label>
                         <Dropdown v-model="second_category"  :options="SeconddropdownValues"   optionLabel="second_category" placeholder="선택 해주세요"  name="second_category"
                            id="second_category" />
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">{{ $t('Category 3') }}</label>
                         <Dropdown v-model="third_category"  :options="SeconddropdownValues"   optionLabel="third_category" placeholder="선택 해주세요"  name="third_category"
                            id="third_category" />
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">{{ $t('Status') }}</label>
                        <Dropdown id="state" v-model="productCategoryStatus" :options="statusdropdown" optionLabel="name" placeholder="Select One"></Dropdown>
                       
                        
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
                        <Button :label="$t('button.search')" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchproduct"></Button>
                        <Button :label="$t('button.reset')" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetUser"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>{{ $t('Category Listing') }}</h5>
                    </div>
                    <div>
                        <router-link :to="'/AddProductCategory'">
                            <Button label="Primary" class="p-mr-2 p-mb-2" ><i class="pi pi-download p-mr-2"></i>{{ $t('Add New') }}</Button>
                        </router-link>
                        <router-link :to="''">
                            <Button label="Primary" class="p-mr-2 p-mb-2"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button>
                        </router-link>
                        <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>{{ $t('button.downloadExcel') }}</Button>
                    </div>
                </div>
                <DataTable :value="customer1" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll" v-model:selection="selected">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> No Data found. </template>
                    <template #loading> Loading data. Please wait. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="slNO" :header="$t('#')" style="min-width: 12rem">
                        <template #body="{ index }">
                            <span class="p-column-title">Name</span>
                            {{ index + 1 }}
                        </template>
                    </Column>
                    <Column field="name" :header="$t('Category 1')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Category 1</span>
                            {{ data.first_category }}
                        </template>
                    </Column>
                    <Column :header="$t('Category 2')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Category 2</span>
                            {{ data.second_category }}
                        </template>
                    </Column>
                    <Column :header="$t('Category 3')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Category 3</span>
                            {{ data.third_category }}
                        </template>
                    </Column>
                    <Column :header="$t('Status')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Status</span>
                            {{ data.status }}
                        </template>
                    </Column>
                    <Column :header="$t('Action')">
                        <template #body="{ data }">
                            <span class="p-column-title">Balance</span>
                            <!-- <p style="display: none">{{ data.mobile }}</p> -->
                            <div style="display: flex">
                                <router-link :to="'/ViewProductcategory/' + data.id"
                                    ><Button label="info" class="p-button2" ><i class="pi pi-eye p-mr-2"></i> </Button>
                                </router-link>
                                <router-link :to="'/Editproductcategory/' + data.id"
                                    ><Button label="info" class="p-button2" ><i class="pi pi-user-edit p-mr-2"></i> </Button>
                                </router-link>
                                <Button icon="pi pi-trash" class="p-button2" @click="confirm(data.id)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
// import { useRoute } from 'vue-router';
// import validateUsersearch from '../../validations/user/validateUserSearch';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ProductCategoryService from '../../service/API/ProductCategoryService';
import axios from 'axios';
// import ProductService from '../service/ProductService';
// import axios from 'axios';
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
            dropdownValue: null,
            dropdownValues: '',
            SeconddropdownValues:'',
            SeconddropdownValue: null,
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            user: null,
            statusdropdowns:'',
            statusdropdown: [
                { name: 'Active', code: 'active' },
                { name: 'Inactive', code: 'inactive' },
            ],
            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
            genders: [
                { name: 'Statistical', code: 'Statistical' },
                { name: 'Coupon', code: 'Coupon' },
                { name: 'Survey reminder', code: 'Survey reminder' },
                { name: 'Manual', code: 'Manual' },
            ],
            pets: [
                { name: 'Yes', code: 'Yes' },
                { name: 'No', code: 'No' },
            ],
            marital_statuss: [
                { name: 'married', code: 'married' },
                { name: 'unmarried', code: 'unmarried' },
            ],
            age_groups: [
                { name: '25~35', code: '25 ~ 35' },
                { name: '35~45', code: '35 ~ 45' },
                { name: '45~55', code: '45 ~ 55' },
                { name: '55~65', code: '55 ~ 65' },
            ],
            dropdownItem: null,
            error: {},
            //params for list
            Ntitle: '',
            Ntype: '',
            start_date: '',
            end_date: '',
            id:'',
            notification_type:'',
            productCategoryStatus:'',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.productCategoryService = new ProductCategoryService();
    },
    mounted() {
        this.productCategoryService
            .getproductCategoryDropdown()
            .then((data) => {
                this.dropdownValues = data;
                this.SeconddropdownValues = data;
                // this.products = data;
                this.loading1 = false;
                // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                console.log(this.dropdownValues);
                console.log(data);
            })
            
        this.getlist();
    },
    watch: {},
    methods: {
        getlist() {
            // const route = useRoute();
            // console.log(route.params);
            // console.log(this.start_date);
            // console.log(this.end_date);
            console.log('statusdropdown', this.productCategoryStatus);
            this.productCategoryService.getProductCategoryList(this.first_category, this.second_category, this.third_category, this.productCategoryStatus?.code).then((data) => {
                
                console.log(data);
                console.log(this.productCategoryStatus?.code)
                this.customer1 = data;
                this.loading1 = false;
                this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
            });
        },
        // selects() {
        //     let xyz = [];
        //     let data = this.selected;
        //     for (var a = 0; a < data.length; a++) {
        //         xyz.push(data[a].id);
        //     }
        //     this.selectedItemss = xyz.toString();
        //     if (this.calendarValue !== '') {
        //         this.calendarValue = this.calendarValue.toISOString().slice(0, 10);
        //     }
        //     if (this.calendarValue1 !== '') {
        //         this.calendarValue1 = this.calendarValue1.toISOString().slice(0, 10) + 1;
        //     }
        // },
        resetUser() {
            this.first_category = '';
            this.second_category = '';
            this.third_category = '';
            this.productCategoryStatus = '';
            this.getlist();
        },
       
        searchproduct() {
            if (this.first_category == '' && this.second_category == ''  && this.third_category == ''  && this.productCategoryStatus == '') {
                console.log(this.productCategoryStatus)
                this.$toast.add({ severity: 'error', summary: 'Error message', detail: '1개 이상의 검색 값을 입력하세요.', life: 3000 });
            } else {
                this.getlist();
                
                
            }
        },
        exceldownload() {
            this.productCategoryService
                .getExcel(this.first_category, this.second_category, this.third_category, this.productCategoryStatus?.code)
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Productcategorylist.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
        },
        today() {
            const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '.');
            this.start_date = utc;
            this.end_date = utc;
            this.getlist();
            console.log(this.start_date);
        },
        lastweek() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 7);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '.' + (edate.getMonth() + 1).toString().padStart(2, '0') + '.' + edate.getDate().toString().padStart(2, '0');
            this.start_date = startDate;
            this.end_date = endDate;
            this.getlist();
            console.log(this.start_date);
        },
        lastmonth() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 31);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '.' + (edate.getMonth() + 1).toString().padStart(2, '0') + '.' + edate.getDate().toString().padStart(2, '0');
            this.start_date = startDate;
            this.end_date = endDate;
            this.getlist();
            console.log(this.start_date);
        },
        lastsixmonth() {
            const date = new Date();
            const edate = new Date();
            date.setDate(date.getDate() - 182);
            edate.setDate(edate.getDate());
            const startDate = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
            const endDate = edate.getFullYear() + '.' + (edate.getMonth() + 1).toString().padStart(2, '0') + '.' + edate.getDate().toString().padStart(2, '0');
            this.start_date = startDate;
            this.end_date = endDate;
            this.getlist();
            console.log(this.start_date);
        },
        getParams(NotificationType){
            localStorage.setItem('NotificationType',NotificationType )
            console.log(NotificationType)
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
            return (value = yyyy + '.' + mm + '.' + dd);
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

        confirm(id) {
            var self = this;
            this.$confirm.require({
                group: 'dialog',
                header: '확인',
                message: '삭제하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: '확인',
                rejectLabel: ' 취소',
                accept: () => {
                   
                     axios({ method: 'delete', url: `/product-category/${id}` }).then(function () {});
                    self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                    self.productCategoryService
                        .getProductCategoryList(self.first_category, self.second_category, self.third_category, self.productCategoryStatus)
                        .then((data) => {
                            console.log(data);
                            this.customer1 = data;
                            this.loading1 = false;
                            this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
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