<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>Edit User</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Nickname</label>
                            <InputText type="text"  placeholder="Enter apartment title" v-model="username" id="name" disabled></InputText>
                           
                        </div>
                    </div>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Apartment Complex</label>
                            <Dropdown v-model="apartment_id" :options="apartmentcomplexDropdownValues" optionValue="apartment_id" optionLabel="apartment_name" placeholder="Please Select One" />

                            <div class="text-red">{{ error.apartment_id }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Address</label>
                            <InputText type="text" :class="`${error.address ? 'p-invalid' : ''}`" placeholder="Enter Address" v-model="address" id="address"></InputText>
                            <div class="text-red">{{ error.address }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Email</label>
                            <InputText type="text" placeholder="Enter Email" v-model="email" id="email" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Phone</label>
                            <InputText type="text" placeholder="Enter Phone" v-model="mobile" id="mobile" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Year of Birth</label>
                            <InputText type="text" placeholder="Enter Year of Birth" v-model="dob_year" id="dob_year" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Gender</label>
                            <InputText type="text" placeholder="Enter Gender" v-model="gender" id="gender" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">subscription method</label>
                            <InputText type="text" placeholder="Enter subscription method" v-model="how_to_know_text" id="how_to_know_text" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Type of Family</label>
                            <InputText type="text" placeholder="Enter Type of Family" v-model="persons_in_family" id="persons_in_family" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">Children</label>
                            <InputText type="text" placeholder="Enter Children" v-model="have_children" id="have_children" disabled></InputText>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button :label="$t('Save')" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="editComplexmanagement"></Button>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <Button :label="$t('Back')" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                    <!-- <Button :label="$t('Confirm')" icon="pi pi-check" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2"></Button> -->
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import UsermanagementService from '../../service/API/UsermanagementService';
import utils from '@/service/utils';
import validateCreateUser from '../../validations/Usermanagementgs/validateCreateUser';
export default {
    name: 'AddComplexManagement',
    data() {
        return {
            render: true,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            name: '',
            mydata: {},
            id: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            error: {},
            formData: new FormData(),
            apartmentcomplexDropdownValues: '',
            apartmentcomplexDropdownValue:null,
             pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            have_children:'',
            persons_in_family:'',
            how_to_know_text:'',
            gender:'',
            dob_year:'',
            mobile:'',
            email:'',
            address:'',
            apartment_name:'',
            apartment_id:'',
            username:'',


        };
    },
    customerService: null,
    productService: null,
    created() {
        this.usermanagementService = new UsermanagementService();
    },

    methods: {
        userlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.usermanagementService
                .getUserList(postlistParams)
                .then((res) => {
                    
                    this.apartmentcomplexDropdownValues = res.data.result;
                    
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
            return (value = `${yyyy}-${mm}-${dd} ${hr}:${min}:${sec}`);
        },
        editComplexmanagement() {
            let vcheckData = {
                apartment_id: this.apartment_id,
                address:  this.address,
            };
               
                
            const { isInvalid, error } = validateCreateUser(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('id' , this.$route.params.id);
                this.formData.append('apartment_id' , this.apartment_id);
                this.formData.append('address', this.address);
                console.log(this.name);
                return axios.post('admin/user/edit', {'id':this.$route.params.id,'apartment_id':this.apartment_id,'address': this.address}).then(() => {
                    alert('User Updated successfully.');
                    console.log(this.$route.params.id)
                    this.$toast.add({ severity: 'info', summary: 'Confirm.', detail: 'User Updated successfully.', life: 3000 });
                    this.$router.push({ name: 'UserManagementList' });
                });
            }
        },
    },
    mounted() {
        // this.apartmentService.complexview(this.$route.params.id ).then((data) => {
        //     console.log(data);
        //     this.mydata = data[0];

        // });
        this.userlist();
        this.usermanagementService.userview(this.$route.params.id).then((res) => {
            this.username = res.data.result.username;
            this.apartment_id = res.data.result.apartment_id;
            this.apartment_name = res.data.result.apartment_name;
            this.address = res.data.result.address;
            this.email = res.data.result.email;
            this.mobile = res.data.result.mobile;
            this.dob_year = res.data.result.dob_year;
            this.gender = res.data.result.gender;
            this.how_to_know_text = res.data.result.how_to_know_text;
            this.persons_in_family = res.data.result.persons_in_family;
            this.have_children = res.data.result.have_children;
            this.create_date = res.data.result.create_date;
            

            console.log(this.name);
        });
    },
};
</script>

<style scoped>
.img-info {
    font-size: 11px;
    font-weight: 400;
    color: rgb(48, 48, 48);
}
.custom-select {
    position: relative;
    border: 1px solid #cecece;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
}
.custom-select-invalid {
    position: relative;
    border: 1px solid red;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
}
.select-file {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0%;
    z-index: 5;
    opacity: 0;
}
.SelectBtn {
    max-width: 100px;
}
.custom-select span {
    max-width: 140px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>