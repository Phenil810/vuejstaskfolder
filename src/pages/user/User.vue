<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>{{ $t('search.title') }}</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">{{ $t('usermanagement.search.Nickname') }}</label>
                        <InputText id="nameuser" :class="`${error.name ? 'p-invalid' : ''}`" type="text" :placeholder="$t('search.placeholder.search')" v-model="nickname" />
                        <div class="text-red">{{ error.name }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="mobileuser">{{ $t('usermanagement.search.Id') }}</label>
                        <InputText id="mobileuser" :class="`${error.mobile ? 'p-invalid' : ''}`" type="text" :placeholder="$t('search.placeholder.search')" v-model="username" />
                        <div class="text-red">{{ error.mobile }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="emailuser">{{ $t('usermanagement.search.Children') }}</label>
                        <Dropdown id="state" v-model="has_children" :options="pets" optionLabel="name" placeholder="Select One"></Dropdown>
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="emailuser">{{ $t('usermanagement.search.Childrens Age') }}</label>
                        <!-- <InputText id="emailuser" :class="`${error.email ? 'p-invalid' : ''}`" type="email" :placeholder="$t('search.placeholder.search')" v-model=" children_age" />
                        <div class="text-red">{{ error.email }}</div> -->
                        <MultiSelect v-model="children_age" :options="c_ages" optionLabel="name" placeholder="select one" @change="helloqwe"/>
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">{{ $t('usermanagement.search.Gender') }}</label>
                        <Dropdown id="state" v-model="gender" :options="genders" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="mobileuser">{{ $t('usermanagement.search.Age Group') }}</label>
                        <Dropdown id="state" v-model="age_group" :options="age_groups" optionLabel="name" placeholder="Select One"></Dropdown>
                        <div class="text-red">{{ error.mobile }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="emailuser">{{ $t('usermanagement.search.Marital Status') }}</label>
                        <Dropdown id="state" v-model="marital_status" :options="marital_statuss" optionLabel="name" placeholder="Select One"></Dropdown>
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="emailuser">{{ $t('usermanagement.search.Pet') }}</label>
                        <Dropdown id="state" v-model="has_pet" :options="pets" optionLabel="name" placeholder="Select One"></Dropdown>
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">{{ $t('usermanagement.search.Min Point') }}</label>
                        <InputText id="nameuser" :class="`${error.name ? 'p-invalid' : ''}`" type="text" :placeholder="$t('search.placeholder.search')" v-model="min_point" />
                        <div class="text-red">{{ error.name }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="mobileuser">{{ $t('usermanagement.search.Max Point') }}</label>
                        <InputText id="mobileuser" :class="`${error.mobile ? 'p-invalid' : ''}`" type="text" :placeholder="$t('search.placeholder.search')" v-model="max_point" />
                        <div class="text-red">{{ error.mobile }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">{{ $t('usermanagement.search.Start Date') }}</label>
                        <Calendar :class="`${error.calendarValue ? 'p-invalid' : ''}`" :showIcon="true" :showButtonBar="true" v-model="start_date" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                        <div class="text-red">{{ error.calendarValue }}</div>
                    </div>
                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">{{ $t('usermanagement.search.End Date') }}</label>
                        <Calendar :class="`${error.calendarValue ? 'p-invalid' : ''}`" :showIcon="true" :showButtonBar="true" v-model="end_date" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                        <div class="text-red">{{ error.calendarValue }}</div>
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
                        <Button :label="$t('button.search')" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchuser"></Button>
                        <Button :label="$t('button.reset')" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetUser"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>{{ $t('usermanagement.list.User List') }}</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>{{ $t('button.downloadExcel') }}</Button>
                    </div>
                </div>
                <DataTable :value="customer1" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll" v-model:selection="selected">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> No Data found. </template>
                    <template #loading> Loading data. Please wait. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="slNO" :header="$t('#')">
                        <template #body="{ data }">
                            <span class="p-column-title">slNo</span>
                            {{ data.slNo }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Nickname')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Nickname</span>
                            {{ data.nickname }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Id')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Id</span>
                            {{ data.username }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Point')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Point</span>
                            {{ data.points }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Gender')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Gender</span>
                            {{ data.gender }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Age Group')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Age Group</span>
                            {{ data.age_group }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Marital Status')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Marital Status</span>
                            {{ data.married=='1'?'married':'unmarried' }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Children')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Created-Date</span>
                            {{ data.has_children==1?'Yes':'No' }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Childs Age')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Created-Date</span>
                            {{ data.children_age==null ?'Not shared':data.children_age }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Pets')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Pets</span>
                            {{ data.has_pets==1?'Yes':'No' }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Pets Type')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Pets Type</span>
                            {{ data.pet_type==null ?'Not shared':data.pet_type }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Account Status')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Account Status</span>
                            {{ data.status }}
                        </template>
                    </Column>
                    <Column :header="$t('usermanagement.list.Registration date & Time')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Registration date & Time</span>
                            {{ formatDate(data.registration_date) }}
                        </template>
                    </Column>
                    <Column :header="$t('Action')">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <p style="display: none">{{ data.mobile }}</p>
                            <div style="display: flex">
                                <router-link :to="'/user/view-user/' + data.id"
                                    ><Button label="info" class="p-button2"><i class="pi pi-eye p-mr-2"></i> </Button>
                                </router-link>
                                <!-- <router-link :to="'/user/edit-user/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link> -->
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
import UserService from '../../service/API/UserService';
import axios from 'axios';
// import ProductService from '../service/ProductService';
// import axios from 'axios';
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

            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            user: null,
            statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
            genders: [
                { name: 'male', code: 'male' },
                { name: 'female', code: 'female' },
            ],
            pets: [
                { name: 'Yes', code: '1' },
                { name: 'No', code: '0' },
            ],
            marital_statuss: [
                { name: 'married', code: '1' },
                { name: 'unmarried', code: '0' },
            ],
            age_groups: [
                { name: '25~35', code: '25 ~ 35' },
                { name: '35~45', code: '35 ~ 45' },
                { name: '45~55', code: '45 ~ 55' },
                { name: '55~65', code: '55 ~ 65' },
            ],
            c_ages: [
                { name: 'INFANT', code: '10_20' },
                { name: 'ADULT', code: '21_30' },
                { name: 'SCHOOL_AGED_CHILDREN', code: '31_40' },
            ],
            
            dropdownItem: null,
            error: {},
            //params for list
            nickname: '',
            username: '',
            has_children: '',
            children_age: '',
            gender: '',
            age_group: '',
            marital_status: '',
            has_pet: '',
            min_point: '',
            max_point: '',
            start_date: '',
            end_date: '',
            selectedItemss:'',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.userService = new UserService();
    },
    mounted() {
        this.getlist();
    },
    watch: {},
    methods: {
        helloqwe(){
           let xyz = [];
            let data = this.children_age;
            for (var a = 0; a < data.length; a++) {
                xyz.push(data[a].name);
            }
            // this.selectedItemss = xyz.toString();
            this.selectedItemss = xyz;
            console.log(this.children_age);
            console.log(this.selectedItemss);
        },
        getlist() {
            this.userService
                .getUserList(this.nickname, this.username, this.has_children.code, this.selectedItemss, this.gender.code, this.age_group.code, this.marital_status.code==''?'':this.marital_status.code,this.status, this.has_pet.code==''?'': this.has_pet.code, this.min_point, this.max_point, this.start_date==""?"":this.formatDate(this.start_date), this.end_date==""?"":this.formatDate(this.end_date))
                .then((data) => {
                    let list=data.map((item, index) => ({ ...item, slNo: index + 1 }))
                    this.customer1 = list;
                    this.loading1 = false;
                    this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                });
        },
        resetUser() {
             this.selectedItemss = '',
            this.nickname = '';
            this.username = '';
            this.has_children = '';
            this.children_age = '';
            this.gender = '';
            this.age_group = '';
            this.marital_status = '';
            this.has_pet = '';
            this.min_point = '';
            this.max_point = '';
            this.start_date = '';
            this.end_date = '';
            this.getlist();
        },
        searchuser() {
             if (
                this.selectedItemss == '' &&
                this.nickname == '' &&
                this.username == '' &&
                this.has_children == '' &&
                this.children_age == '' &&
                this.gender == '' &&
                this.age_group == '' &&
                this.marital_status == '' &&
                this.has_pet == '' &&
                this.min_point == '' &&
                this.max_point == '' &&
                this.start_date == '' &&
                this.end_date == ''
            ) {
                this.$toast.add({ severity: 'error', summary: 'Error message', detail: '1개 이상의 검색 값을 입력하세요.', life: 3000 });
            } else {
                this.getlist();
            }
        },
        exceldownload() {
            this.userService
                .getExcel(this.nickname, this.username, this.has_children, this.children_age, this.gender.code, this.age_group.code, this.marital_status.code, this.has_pet.code=='Yes'?1:0, this.min_point, this.max_point, this.start_date==""?"":this.formatDate(this.start_date), this.end_date==""?"":this.formatDate(this.end_date))
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Userlist.xlsx'); //or any other extension
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
                    axios({ method: 'patch', url: '/user/delete', data: { id: id, status: 'deleted' } }).then(function () {});

                    self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                    self.userService
                        .getUserList(self.nickname, self.username, self.has_children, self.children_age, self.gender, self.age_group, self.marital_status, self.has_pet, self.min_point, self.max_point, self.start_date, self.end_date)
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
