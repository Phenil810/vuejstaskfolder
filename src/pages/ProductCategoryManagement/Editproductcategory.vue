<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>{{ $t('Edit Category Details') }}</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="SurTitle">{{ $t('Category 1') }}</label>
                        <InputText id="SurTitle" :class="`${error.first_category ? 'p-invalid' : ''}`" type="text" :placeholder="$t('Enter Category 1')" v-model="first_category" />
                        <div class="text-red">{{ error.first_category }}</div>
                    </div>
                    </div>
                    <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="surveyURL">{{ $t('Category 2') }}</label>
                        <InputText id="surveyURL" :class="`${error.second_category ? 'p-invalid' : ''}`" type="text" :placeholder="$t('Enter Category 2')" v-model="second_category" />
                        <div class="text-red">{{ error.second_category }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label>{{ $t('Category 3') }}</label>
                        <InputText id="surveyURL" :class="`${error.third_category ? 'p-invalid' : ''}`" type="text" :placeholder="$t('Enter Category 3')" v-model="third_category" />                        
                        <div class="text-red">{{ error.third_category }}</div>
                    </div>
                </div>
                <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                    <label for="exposure">{{ $t('Status') }}</label>
                    <div class="p-field p-col-12 p-md-3">
                        <InputSwitch  v-model="productCategoryStatus"/>
                        <!-- <div class="text-red">{{ error.title }}</div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="p-d-flex p-jc-between">
                <div>
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button label="help" class="p-button-outlined p-button-help p-mr-2 p-mb-2" @click="confirm($event)"><i class="pi pi-check p-mr-2"></i>Save</Button>
                   
                </div>
                <div>
                    <Button @click="$router.go(-1)" label="Go Back" class="p-button-outlined p-mr-2 p-mb-2" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import UpdateProductcategory from '../../validations/ProductCategoryManagement/UpdateProductcategory';
import ProductCategoryService from '../../service/API/ProductCategoryService';
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
            customer1: null,
            loading1: false,
            idFrozen: false,
            products: null,
            expandedRows: [],
            user: null,
            error: {},
            //params for list
            productCategoryStatus: false,
            first_category: '',
            second_category: '',
            third_category: '',
            status:'',
            start_date: '',
            end_date: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.productCategoryService = new ProductCategoryService();
    },
    mounted() {
        this.getDetails();
    },
    watch: {},
    methods: {
        open() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                message: '계속 진행하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    //callback to execute when user confirms the action
                    this.productCategoryService.UpdateProductcategory(this.$route.params.id,this.first_category, this.second_category, this.third_category,this.productCategoryStatus == true ? 'active' : 'inactive').then(() => {
                        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Survey successfully Updated', life: 3000 });
                        this.$router.push({ name: 'ProductCategorylist' });
                    });
                },
                reject: () => {
                    //callback to execute when user rejects the action
                },
            });
        },
        // confirm(event) {
        //     this.$confirm.require({
        //         target: event.currentTarget,
        //         group: 'popup',
        //         message: '이대로 진행하시겠습니까?',
        //         icon: 'pi pi-exclamation-triangle',
        //         acceptLabel: '확인',
        //         rejectLabel: ' 취소',
        //         accept: () => {
        //             let vcheckData = {
        //                 first_category: this.first_category,
        //                 second_category: this.second_category,
        //                 third_category: this.third_category ,
        //                 status: this.status,
                       
        //             };
        //             console.log(vcheckData);
        //             const { isInvalid, error } = UpdateProductcategory(vcheckData);
        //             if (isInvalid) {
        //                 this.error = error;
        //                 console.log(error);
        //             } else {
        //                 this.error = {};
        //                 this.productCategoryService.updateProductCategory(this.$route.params.id,this.first_category, this.second_category, this.third_category,this.productCategoryStatus == true ? 'active' : 'inactive').then((data) => {
        //                     console.log(data);
        //                     this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Survey successfully Updated', life: 3000 });
        //                     this.$router.push({ name: 'ProductCategorylist' });
        //                 });
        //             }
        //         },
        //         reject: () => {
        //             this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다.', detail: '취소되었습니다.', life: 3000 });
        //         },
        //     });
        // },
        // getlist() {
        //    this.productCategoryService.updateProductCategory(this.first_category, this.second_category, this.third_category,this.status,this.$route.params.id).then((data) => {
        //         console.log(data);
        //         this.customer1 = data;
        //         this.loading1 = false;
        //         this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
        //     });
        // },
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
        getDetails() {
            this.productCategoryService.productCategoryDetails(this.$route.params.id).then((data) => {
                this.first_category = data.first_category;
                this.second_category = data.second_category;
                this.third_category = data.third_category;
                // this.status = data.status;
                // alert(this.surveyStatus);
                if (data.status === 'active') {
                    this.productCategoryStatus = true;
                } else {
                    this.productCategoryStatus = false;
                }
            });
        },
        resetUser() {
            this.name = '';
            this.email = '';
            this.mobile = '';
            this.error = {};
            this.calendarValue = '';
            this.calendarValue1 = '';
            this.userService.getUserList(this.name, this.email, this.mobile).then((data) => {
                this.customer1 = data;
                this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
            });
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
        },
        exceldownload() {
            this.selects();
            this.userService.downloadExcel(this.name, this.mobile, this.email, this.calendarValue, this.calendarValue1, this.selectedItemss).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Userlist.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
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