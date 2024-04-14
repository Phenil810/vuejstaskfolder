<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>관리자 사용자 관리 세부</strong>
                </h4>
                <div class="p-field p-grid">
                    <label for="category_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">닉네임:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ username }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">단지명:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ apartment_name }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">주소:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ address }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">이메일:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ email }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">핸드폰번호:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ mobile }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">출생년도:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ dob_year }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">성별:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="gender == null"> - </span>
                            <span v-else>
                                {{ $t(gender) }}
                            </span>
                        
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_function_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">가입 경로:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ how_to_know_text }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_function_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">가구 구성:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="persons_in_family == '1' ">
                                <p>1인 가구</p>
                            </span>
                            <span v-else-if="persons_in_family == '2' ">
                                <p>2인 가구</p>
                            </span>
                            <span v-else-if="persons_in_family == '3' ">
                                <p>3인 가구</p>
                            </span>
                            <span v-else-if="persons_in_family == '4' ">
                                <p>4인 가구 이상</p>
                            </span>
                            <span v-else-if="persons_in_family == '5' ">
                                <p>기타</p>
                            </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">자녀 유무 :</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ $t(have_children) }}</p>
                        
                    </div>
                </div>
                <div class="p-d-flex p-jc-end" style="float: left">
                    <router-link :to="'/UserManagement/AdminUserManagement/AdminUserManagementEdit/'  + $route.params.id">
                        <Button label="help" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2">
                            <i class="pi pi-user-edit p-mr-2"></i>
                            수정
                        </Button>
                    </router-link>
                </div>
                <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                    <!-- <Button :label="$t('Confirm')" icon="pi pi-check" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2"></Button> -->
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import UsermanagementService from '../../../service/API/UsermanagementService';
import utils from '@/service/utils';
// import validateCreateUser from '../../validations/Usermanagementgs/validateCreateUser';
export default {
    name: 'AdminUserManagementview',
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

            id: '',
            customer1: null,
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
            
            have_children: '',
            persons_in_family: '',
            how_to_know_text: '',
            gender: '',
            dob_year: '',
            mobile: '',
            email: '',
            address: '',
            apartment_name: '',
            apartment_id: '',
            username: '',
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
                .getAdminUserManagementList(postlistParams)
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
                .getAdminUserManagementList({
                    page: page,
                    limit: this.pagination.pagination_limit,
                    username: this.username,
                    subscription: this.subscription,
                    apartment_id: this.apartment_id,
                    gender: this.gender,
                    from_year_of_birth: this.from_year_of_birth,
                    to_year_of_birth: this.to_year_of_birth,
                    family_type: this.family_type,
                    children: this.children,
                    email: this.email,
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

                console.log(this.username);
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
</style>
