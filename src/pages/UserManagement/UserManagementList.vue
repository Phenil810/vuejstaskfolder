<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>Search</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">Nickname</label>
                        <InputText id="nameuser"  type="text" v-model="username" placeholder="Search by member nickname"  />
                        
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">Apartment Complex</label>
                        <Dropdown  v-model="apartment_id" :options="apartmentcomplexDropdownValues" optionValue="id" optionLabel="name" placeholder="Please Select One" />
                        
                    </div>
                    
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">Subscription method</label>
                        <Dropdown  v-model="subscription" :options="SubscriptionmethodDropdownValues" optionValue="id" optionLabel="how_to_know_text" placeholder="Please Select One" />
                       
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">Gender</label>
                        <Dropdown  v-model="gender" :options="dropdownGenders" optionValue="code" optionLabel="name" placeholder="Please Select One" />

                        
                       
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">From year Of Birth</label>
                        <Dropdown  v-model="from_year_of_birth" :options="FromyearOfBirthDropdownValues" optionValue="dob_year" optionLabel="dob_year" placeholder="Please Select One" />
                       
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">To year Of Birth</label>
                        <Dropdown  v-model="to_year_of_birth" :options="ToyearOfBirthDropdownValues" optionValue="dob_year" optionLabel="dob_year" placeholder="Please Select One" />
                       
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">Family type</label>
                        <Dropdown  v-model="family_type" :options="dropdownfamilytypes" optionValue="code" optionLabel="name" placeholder="Please Select One" />
                       
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">Children</label>
                        <Dropdown  v-model="children" :options="dropdownchildrens" optionValue="code" optionLabel="name" placeholder="Please Select One" />
                       
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
                        <Button label="Search" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchuser"></Button>
                        <Button label="Reset" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetUser"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>User List</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <a href="https://gscm-api.dvconsulting.org/api/v1/admin/user/download-excel" target="_blank" class="p-button p-button-text p-mr-2 p-mb-2">Export Excel </a>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>Export Excel</Button> -->
                    </div>
                </div>
               
                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll" >
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> No Data found. </template>
                    <template #loading> Loading data. Please wait. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="slNO" :header="$t('#')">
                        <template #body="{ data }">
                            <span class="p-column-title">slNo</span>
                            {{ data.id }}
                        </template>
                    </Column>
                    <Column header="Nickname" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Nickname</span>
                            {{ data.username }}
                        </template>
                    </Column>
                    <Column header="Apartment Complex" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>
                            {{ data.apartment_name }}
                        </template>
                    </Column>
                    <Column header="Year of Birth" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Year of Birth</span>
                            {{ data.dob_year }}
                        </template>
                    </Column>
                    <Column header="Subscription method" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Subscription method</span>
                            {{ data.how_to_know_text }}
                        </template>
                    </Column>
                    <Column header="Gender" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Gender</span>
                            <span v-if="data.gender == null">
                                -
                            </span>
                            <span v-else>
                                {{ $t(data.gender) }}
                            </span>
                            
                        </template>
                    </Column>
                    <Column header="Family Type" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Family Type</span>
                            {{ data.persons_in_family }}
                        </template>
                    </Column>
                     <Column header="Children" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Children</span>
                            <span v-if="data.have_children == null">
                                -
                            </span>
                            <span v-else>
                                {{ $t(data.have_children) }}
                            </span>
                            <!-- {{ $t(data.have_children) }} -->
                        </template>
                    </Column>
                     <Column header="Date & Time" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Date & Time</span>
                            {{ formatDate(data.create_date) }}
                        </template>
                    </Column>

                    
                    
                    <Column :header="$t('Action')">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <p style="display: none">{{ data.mobile }}</p>
                            <div style="display: flex">
                                <router-link :to="'/EditUsermanagement/' + data.id "
                                    ><Button label="info" class="p-button2"><i class="pi pi-user-edit  p-mr-2"></i> </Button>
                                </router-link>
                                <router-link :to="'/ViewUserManagement/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-eye p-mr-2"></i> </Button
                                ></router-link>
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
// import validateUsersearch from '../../validations/user/validateUserSearch';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import UsermanagementService from '../../service/API/UsermanagementService';
// import axios from 'axios';
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
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },

            dropdownGenders: [
                { name: 'Male', code: 'm' },
                { name: 'Female', code: 'f' },
            ],

            dropdownGender:null,

            dropdownfamilytypes:[
                { name: '1-person households', code: '1' },
                { name: '2-person households', code: '2' },
                { name: '3-person households', code: '3' },
                { name: '4-person households', code: '4' },
                { name: 'Others', code: '5' },
            ],
            dropdownfamilytype:null,

            dropdownchildrens: [
                { name: 'Yes', code: 'y' },
                { name: 'No', code: 'n' },
            ],
            dropdownchildren:null,
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            name:'',
            status:'',
            id:'',
            username:'',
            apartment_name:'',
            apartment_id:'',
            how_to_know_text:'',
            subscription:'',
            gender:'',
            from_year_of_birth:'',
            to_year_of_birth:'',
            family_type:'',
            children:'',
            apartmentcomplexDropdownValues:'',
            apartmentcomplexDropdownValue:null,
            SubscriptionmethodDropdownValues:'',
            SubscriptionmethodDropdownValue:null,
            FromyearOfBirthDropdownValues:'',
            FromyearOfBirthDropdownValue:null,
            ToyearOfBirthDropdownValues:'',
            ToyearOfBirthDropdownValue:null,
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.usermanagementService = new UsermanagementService();
    },
    mounted() {
        this.userlist();
        // this.apartmentlist();
         const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
       this.usermanagementService

            .getApartmentList(postlistParams)
            
            .then((res) => {
                this.apartmentcomplexDropdownValues = res.data.result;
                // this.products = data;
                this.loading1 = false;
                // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                console.log(this.customer1);
                // console.log(data);
            })
     
        

    },
    watch: {},
    methods: {
        getStatus(values) {
            return values === 'active' ? true : false;
        },

        // apartmentlist() {
        //     const postlistParams = {
        //         page: 1,
        //         limit: this.pagination.pagination_limit,
        //     };
        //     this.loading1 = true;
        //     this.usermanagementService
        //         .getApartmentList(postlistParams)
        //         .then((res) => {
        //             this.customer1 = res.data.result;
        //             this.apartmentcomplexDropdownValues = res.data.result;
        //             //                 this.company_id= this.company.id;
        //             // console.log("this.company_id",this.company_id);
        //             console.log('res', this.customer1);
        //             console.log(res);
        //             this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
        //             this.loading1 = false;
        //         })
        //         .catch((err) => console.log(err));
        // },
       

        
        

       

       
        
       userlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.usermanagementService
                .getUserList(postlistParams)
                .then((res) => {
                    this.customer1 = res.data.result;
                    
                    this.SubscriptionmethodDropdownValues = res.data.result;
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
            this.usermanagementService
                .getUserList({ page: page, limit: this.pagination.pagination_limit, username: this.username, subscription: this.subscription, apartment_id: this.apartment_id,
                                    gender: this.gender,from_year_of_birth: this.from_year_of_birth,to_year_of_birth: this.to_year_of_birth
                                    ,family_type: this.family_type, children: this.children    })
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
        resetUser() {
             this.username = '',
             this.apartment_id = '',
             this.subscription = '',
             this.gender = '',
             this.from_year_of_birth = '',
             this.to_year_of_birth = '',
             this.family_type = '',
             this.children = '',
            this.userlist();
        },
        searchuser() {
            
            if (this.username == '' && this.apartment_id == '' &&  this.subscription == '' && this.gender == '' && this.from_year_of_birth == '' && this.to_year_of_birth == '' && this.family_type == '' && this.children == '' ) {
               
                this.$toast.add({ severity: 'error', summary: this.$t('error message'), detail: this.$t('Please enter one or more search values.'), life: 3000 });}
                else{
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    username: this.username,
                    apartment_id: this.apartment_id,
                    subscription : this.subscription,
                    gender : this.gender,
                    from_year_of_birth : this.from_year_of_birth,
                    to_year_of_birth : this.to_year_of_birth,
                    family_type : this.family_type,
                    children : this.children,
                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.usermanagementService
                    .getUserList(searchParams)
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
    background-color: #221ED9;
    color: white;
    border-color: transparent;
}

</style>