<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>일반 사용자 관리 편집</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">닉네임</label>
                            <InputText type="text" placeholder="아파트명을 입력하세요" v-model="username" id="name" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">단지명</label>
                            <Dropdown v-model="apartment_id" :options="apartmentcomplexDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />

                            <div class="text-red">{{ error.apartment_id }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">주소</label>
                            <InputText type="text" :class="`${error.address ? 'p-invalid' : ''}`" placeholder="주소 입력" v-model="address" id="address"></InputText>
                            <div class="text-red">{{ error.address }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">이메일</label>
                            <InputText type="text" placeholder="이메일 입력" v-model="email" id="email" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">핸드폰번호</label>
                            <InputText type="text" placeholder="전화번호 입력" v-model="mobile" id="mobile" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">출생년도</label>
                            <InputText type="text" placeholder="생년월일 입력" v-model="dob_year" id="dob_year" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">성별</label>
                            <InputText type="text" placeholder="성별 입력" v-model="displayStatus" id="gender" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">가입 경로</label>
                            <InputText type="text" placeholder="구독 방법 입력" v-model="how_to_know_text" id="how_to_know_text" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">가구 구성</label>
                            <InputText type="text" placeholder="가족 유형 입력" v-model="persons_in_family" id="persons_in_family" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">추천 코드</label>
                            <InputText type="text" placeholder="추천 코드 입력" v-model="referral_code" id="referral_code" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">자녀 유무</label>
                            <InputText type="text" placeholder="입력하다 어린이들" v-model="displayChildren" id="have_children" style="background: #e0e0e0" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">VIP 사용자</label>
                            <br />
                            <!-- <InputSwitch :modelValue="getStatus(vip_user)" @click="Changestatus(vip_user)"  @change="isHidden = !isHidden" /> -->
                            <InputSwitch :trueValue="1" v-model="vip_user" @change="isHidden = isHidden" />
                           
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3" v-if="vip_user == 1 || isHidden">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">VIP 시작 일자</label>
                            <Calendar :showButtonBar="true" :class="`${error.startDate ? 'p-invalid' : ''}`" v-model="startDate" dateFormat="yy.mm.dd" :min-date="new Date()" :placeholder="$t('search.placeholder.date')" ></Calendar>
                            <div class="text-red">{{ error.startDate }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3" v-if="vip_user == 1 || isHidden">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">VIP 종료 일자</label>
                            <Calendar :showButtonBar="true" :class="`${error.endDate ? 'p-invalid' : ''}`" v-model="endDate" dateFormat="yy.mm.dd" :min-date="new Date()" :placeholder="$t('search.placeholder.date')"></Calendar>
                            <div class="text-red">{{ error.endDate }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="editComplexmanagement"></Button>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                    <!-- <Button :label="$t('Confirm')" icon="pi pi-check" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2"></Button> -->
                </div>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import UsermanagementService from '../../../service/API/UsermanagementService';
import utils from '@/service/utils';
import validateCreateUser from '../../../validations/Usermanagementgs/validateCreateUser';
import validatevipeditCreateUser from '../../../validations/Usermanagementgs/validatevipeditCreateUser';

export default {
    name: 'GeneralUserManagementEdit',
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
            apartmentcomplexDropdownValue: null,
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            have_children: '',
            persons_in_family: '',
            how_to_know_text: '',
            referral_code: '',
            gender: '',
            dob_year: '',
            mobile: '',
            email: '',
            address: '',
            apartment_name: '',
            apartment_id: '',
            username: '',
            displayStatus: '',
            displayChildren: '',
            vip_user: '',
            vip_user_end_date: '',
            vip_user_start_date: '',
            searchenddate: '',
            searchdate: '',
            startDate: '',
            endDate: '',
            isHidden: false,
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.usermanagementService = new UsermanagementService();
    },

    methods: {
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
        getStatus(values) {
            return values === 1 ? true : false;
        },
        Changestatus(values) {
            return values === 1 ? true : false;
        },
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
                .getUserList({
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
            // var hr = date.getHours();
            // var min = date.getMinutes();
            // var sec = date.getSeconds();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return (value = `${yyyy}-${mm}-${dd}`);
        },
        editComplexmanagement() {
            if (this.vip_user == 1) {
             if (this.formatDate(this.endDate) < this.formatDate(this.startDate)) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });

             } else {

                let vcheckData = {
                    apartment_id: this.apartment_id,
                    address: this.address,
                    vip_user: this.vip_user.toString(),
                    startDate: this.startDate === null ? '' : this.startDate.toString(),
                    endDate: this.endDate === null ? '' : this.endDate.toString(),
                    username: this.username,
                    // dob_year: this.dob_year,
                    year_of_birth: this.dob_year,
                    gender: this.gender,
                    subscription_method: this.subscription_method,
                    type_of_family: this.type_of_family,
                    children: this.children,
                  
                };

                const { isInvalid, error } = validatevipeditCreateUser(vcheckData);
                if (isInvalid) {
                    this.error = error;
                    console.log(error);
                } else {
                    // this.formData.append('id', this.$route.params.id);
                    // this.formData.append('apartment_id', this.apartment_id);
                    // this.formData.append('address', this.address);
                    return axios
                        .post('admin/user/edit', {
                            id: this.$route.params.id,
                            apartment_id: this.apartment_id,
                            address: this.address,
                            vip_user: this.vip_user === 1 ? 1 : 0,
                            startDate: this.formatDate(this.startDate),
                            endDate: this.formatDate(this.endDate),
                            username: this.username,
                            year_of_birth: this.dob_year,
                            gender: this.gender,
                            subscription_method: this.subscription_method,
                            type_of_family: this.type_of_family,
                            children: this.children,
                        })
                        .then(() => {
                            // alert('일반 사용자 업데이트 성공적으로.');
                            console.log(this.$route.params.id);
                            this.$router.push({ name: 'GeneralUserManagementList' });

                            setTimeout(() => {
                                this.$toast.add({ severity: 'info', summary: '확인.', detail: '일반 사용자 업데이트 성공적으로.', life: 3000 });
                            }, 1000);
                        });
                }
            }
            } else {
                
                let vcheckData = {
                    apartment_id: this.apartment_id,
                    address: this.address,
                    vip_user: this.vip_user,
                    // startDate: this.startDate === null ? '' : this.startDate,
                    // endDate: this.endDate === null ? '' : this.endDate,
                    username: this.username,
                    // dob_year: this.dob_year,
                    year_of_birth: this.dob_year,
                    gender: this.gender,
                    subscription_method: this.subscription_method,
                    type_of_family: this.type_of_family,
                    children: this.children,
                };

                const { isInvalid, error } = validateCreateUser(vcheckData);
                if (isInvalid) {
                    this.error = error;
                    console.log(error);
                } else {
                    // this.formData.append('id', this.$route.params.id);
                    // this.formData.append('apartment_id', this.apartment_id);
                    // this.formData.append('address', this.address);
                    return axios
                        .post('admin/user/edit', {
                            id: this.$route.params.id,
                            apartment_id: this.apartment_id,
                            address: this.address,
                            vip_user: this.vip_user === 1 ? 1 : 0,
                            startDate: this.formatDate(this.startDate),
                            endDate: this.formatDate(this.endDate),
                            username: this.username,
                            year_of_birth: this.dob_year,
                            gender: this.gender,
                            subscription_method: this.subscription_method,
                            type_of_family: this.type_of_family,
                            children: this.children,
                        })
                        .then(() => {
                            // alert('일반 사용자 업데이트 성공적으로.');
                            console.log(this.$route.params.id);
                            this.$router.push({ name: 'GeneralUserManagementList' });

                            setTimeout(() => {
                                this.$toast.add({ severity: 'info', summary: '확인.', detail: '일반 사용자 업데이트 성공적으로.', life: 3000 });
                            }, 1000);
                        });
                }
            }
        },
    },
    mounted() {
        // this.apartmentService.complexview(this.$route.params.id ).then((data) => {
        //     console.log(data);
        //     this.mydata = data[0];

        // });
        const postlistParams = {
            page: 1,
            limit: 1000,
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
            });

        this.userlist();
        this.usermanagementService.userview(this.$route.params.id).then((res) => {
            this.username = res.data.result.username;
            this.apartment_id = res.data.result.apartment_id;
            this.subscription_method = res.data.result.how_to_know;
            this.type_of_family = res.data.result.persons_in_family;
            this.apartment_name = res.data.result.apartment_name;
            this.address = res.data.result.address;
            this.email = res.data.result.email;
            this.mobile = res.data.result.mobile;
            this.dob_year = res.data.result.dob_year;
            this.gender = res.data.result.gender;
            this.gender === 'm' ? (this.displayStatus = '남성') : (this.displayStatus = '여성');
            this.how_to_know_text = res.data.result.how_to_know_text;
            this.persons_in_family = res.data.result.persons_in_family;
            if (res.data.result.persons_in_family == '1') {
                this.persons_in_family = '1인 가구';
            } else if (res.data.result.persons_in_family == '2') {
                this.persons_in_family = '2인 가구';
            } else if (res.data.result.persons_in_family == '3') {
                this.persons_in_family = '3인 가구';
            } else if (res.data.result.persons_in_family == '4') {
                this.persons_in_family = '4인 가구 이상';
            } else if (res.data.result.persons_in_family == '5') {
                this.persons_in_family = '기타';
            }
            this.have_children = res.data.result.have_children;
            this.have_children === 'y' ? (this.displayChildren = '있음') : (this.displayChildren = '없음');
            this.create_date = res.data.result.create_date;
            this.referral_code = res.data.result.referral_code;
            this.vip_user = res.data.result.vip_user;
            this.startDate = res.data.result.vip_user_start_date;
            this.endDate = res.data.result.vip_user_end_date;
            this.children = res.data.result.have_children;

            console.log(this.vip_user);
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