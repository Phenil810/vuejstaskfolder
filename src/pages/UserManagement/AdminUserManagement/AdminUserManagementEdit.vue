<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>관리자 사용자 관리 편집</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">닉네임</label>
                            <InputText type="text" :class="`${error.username ? 'p-invalid' : ''}`" placeholder="아파트명을 입력하세요" v-model="username" id="name" ></InputText>
                            <div class="text-red">{{ error.username }}</div>
                        </div>
                    </div>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">단지명</label>
                            <Dropdown v-model="apartment_id" :class="`${error.apartment_id ? 'p-invalid' : ''}`" :options="apartmentcomplexDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />

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
                            <InputText type="text" placeholder="Enter Email" v-model="email" id="email" style="background: #E0E0E0;" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">핸드폰번호</label>
                            <InputText type="text" placeholder="Enter Phone" v-model="mobile" id="mobile" style="background: #E0E0E0;" disabled></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">출생년도</label>
                            <Dropdown v-model="year_of_birth" :class="`${error.year_of_birth ? 'p-invalid' : ''}`" :options="yearofbirthDropdownValues" optionValue="name" optionLabel="name" placeholder="선택" />
                            <div class="text-red">{{ error.year_of_birth }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">성별</label>
                            <Dropdown v-model="gender" :class="`${error.gender ? 'p-invalid' : ''}`" :options="dropdownGenders" optionValue="code" optionLabel="name" placeholder="선택" />
                            <div class="text-red">{{ error.gender }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">가입 경로</label>
                            <Dropdown v-model="subscription_method"  :class="`${error.subscription_method ? 'p-invalid' : ''}`" :options="SubscriptionmethodDropdownValues" optionValue="id" optionLabel="title" placeholder="선택" />
                            <div class="text-red">{{ error.subscription_method }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">가구 구성</label>
                            <Dropdown v-model="type_of_family" :class="`${error.type_of_family ? 'p-invalid' : ''}`" :options="dropdownfamilytypes" optionValue="code" optionLabel="name" placeholder="선택" />
                            <div class="text-red">{{ error.type_of_family }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">자녀 유무</label>
                            <Dropdown v-model="children" :class="`${error.children ? 'p-invalid' : ''}`" :options="dropdownchildrens" optionValue="code" optionLabel="name" placeholder="선택" />
                            <div class="text-red">{{ error.children }}</div>
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
import validateCreateAdminUser from '../../../validations/Usermanagementgs/validateCreateAdminUser';
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
            gender: '',
            dob_year: '',
            year_of_birth: '',
            subscription_method: '',
            type_of_family: '',
            children: '',
            mobile: '',
            email: '',
            address: '',
            apartment_name: '',
            apartment_id: '',
            username: '',
            displayStatus:'',
            displayChildren:'',
            SubscriptionmethodDropdownValues: '',
            SubscriptionmethodDropdownValue: null,
            dropdownGenders: [
                { name: '남성', code: 'm' },
                { name: '여성', code: 'f' },
            ],

            dropdownGender: null,

            dropdownfamilytypes: [
                { name: '1인 가구', code: 1 },
                { name: '2인 가구', code: 2 },
                { name: '3인 가구', code: 3 },
                { name: '4인 가구 이상', code: 4 },
                { name: '기타', code: 5 },
            ],
            dropdownfamilytype: null,

            dropdownchildrens: [
                { name: '있음', code: 'y' },
                { name: '없음', code: 'n' },
            ],
            dropdownchildren: null,
            yearofbirthDropdownValues: [
                { name: 1900 },
                { name: 1901 },
                { name: 1902 },
                { name: 1903 },
                { name: 1904 },
                { name: 1905 },
                { name: 1906 },
                { name: 1907 },
                { name: 1908 },
                { name: 1909 },
                { name: 1910 },
                { name: 1911 },
                { name: 1912 },
                { name: 1913 },
                { name: 1914 },
                { name: 1915 },
                { name: 1916 },
                { name: 1917 },
                { name: 1918 },
                { name: 1919 },
                { name: 1920 },
                { name: 1921 },
                { name: 1922 },
                { name: 1923 },
                { name: 1924 },
                { name: 1925 },
                { name: 1926 },
                { name: 1927 },
                { name: 1928 },
                { name: 1929 },
                { name: 1930 },
                { name: 1931 },
                { name: 1932 },
                { name: 1933 },
                { name: 1934 },
                { name: 1935 },
                { name: 1936 },
                { name: 1937 },
                { name: 1938 },
                { name: 1939 },
                { name: 1940 },
                { name: 1941 },
                { name: 1942 },
                { name: 1943 },
                { name: 1944 },
                { name: 1945 },
                { name: 1946 },
                { name: 1947 },
                { name: 1948 },
                { name: 1949 },
                { name: 1950 },
                { name: 1951 },
                { name: 1952 },
                { name: 1953 },
                { name: 1954 },
                { name: 1955 },
                { name: 1956 },
                { name: 1957 },
                { name: 1958 },
                { name: 1959 },
                { name: 1960 },
                { name: 1961 },
                { name: 1962 },
                { name: 1963 },
                { name: 1964 },
                { name: 1965 },
                { name: 1966 },
                { name: 1967 },
                { name: 1968 },
                { name: 1969 },
                { name: 1970 },
                { name: 1971 },
                { name: 1972 },
                { name: 1973 },
                { name: 1974 },
                { name: 1975 },
                { name: 1976 },
                { name: 1977 },
                { name: 1978 },
                { name: 1979 },
                { name: 1980 },
                { name: 1981 },
                { name: 1982 },
                { name: 1983 },
                { name: 1984 },
                { name: 1985 },
                { name: 1986 },
                { name: 1987 },
                { name: 1988 },
                { name: 1989 },
                { name: 1990 },
                { name: 1991 },
                { name: 1992 },
                { name: 1993 },
                { name: 1994 },
                { name: 1995 },
                { name: 1996 },
                { name: 1997 },
                { name: 1998 },
                { name: 1999 },
                { name: 2000},
                { name: 2001 },
                { name: 2002 },
                { name: 2003 },
                { name: 2004 },
                { name: 2005 },
                { name: 2006 },
                { name: 2007 },
                { name: 2008 },
                { name: 2009 },
                { name: 2010 },
                { name: 2011 },
                { name: 2012 },
                { name: 2013 },
                { name: 2014 },
                { name: 2015 },
                { name: 2016 },
                { name: 2017 },
                { name: 2018 },
                { name: 2019 },
                { name: 2020 },
                { name: 2021 },
                { name: 2022 },
            ],
            yearofbirthDropdownValue: null
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
                username: this.username,
                apartment_id: this.apartment_id.toString(),
                address: this.address,
                year_of_birth: this.year_of_birth.toString(),
                gender : this.gender,
                subscription_method:  this.subscription_method.toString(),
                type_of_family: this.type_of_family.toString(),
                children: this.children.toString(),
            };

            const { isInvalid, error } = validateCreateAdminUser(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('id', this.$route.params.id);
                this.formData.append('apartment_id', this.apartment_id);
                this.formData.append('address', this.address);
                console.log(this.name);
                return axios.post('admin/user/edit', { id: this.$route.params.id,username: this.username, apartment_id: this.apartment_id,
                     address: this.address , year_of_birth:this.year_of_birth,gender:this.gender,subscription_method:this.subscription_method,
                     type_of_family:this.type_of_family, children: this.children}).then(() => {
                    // alert('Admin User Updated successfully.');
                    console.log(this.$route.params.id);
                    this.$router.push({ name: 'AdminUserManagementlist' });
                    setTimeout(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '관리자 사용자가 성공적으로 업데이트되었습니다.', life: 3000 });
                    }, 1000);
                });
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

            this.usermanagementService

            .getSubscriptionpathmanagementList(postlistParams)

            .then((res) => {
                this.SubscriptionmethodDropdownValues = res.data.result;
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
            this.apartment_name = res.data.result.apartment_name;
            this.address = res.data.result.address;
            this.email = res.data.result.email;
            this.mobile = res.data.result.mobile;
            this.year_of_birth = res.data.result.dob_year;
            this.gender = res.data.result.gender;
            // this.gender === 'm' ? (this.displayStatus = '남성') : (this.displayStatus = '여성');
            this.how_to_know_text = res.data.result.how_to_know_text;
            this.subscription_method = res.data.result.how_to_know;
            this.type_of_family = res.data.result.persons_in_family;
            // if (res.data.result.persons_in_family == '1') {
            //             this.persons_in_family = '1인 가구';
            //         } else if (res.data.result.persons_in_family == '2') {
            //             this.persons_in_family = '2인 가구';
            //         }else if (res.data.result.persons_in_family == '3') {
            //             this.persons_in_family = '3인 가구';
            //         }else if (res.data.result.persons_in_family == '4') {
            //             this.persons_in_family = '4인 가구 이상';
            //         }else if (res.data.result.persons_in_family == '5') {
            //             this.persons_in_family = '기타';
            //         }
            this.children = res.data.result.have_children;
            // this.have_children === 'y' ? (this.displayChildren = '예') : (this.displayChildren = '아니');
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