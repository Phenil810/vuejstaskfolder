<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>검색</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">닉네임</label>
                        <InputText id="nameuser" type="text" v-model="username" placeholder="닉네임 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">단지명</label>
                        <Dropdown v-model="apartment_id" :options="apartmentcomplexDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">가입 경로</label>
                        <Dropdown v-model="subscription" :options="SubscriptionmethodDropdownValues" optionValue="id" optionLabel="title" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">성별</label>
                        <Dropdown v-model="gender" :options="dropdownGenders" optionValue="code" optionLabel="name" placeholder="선택" />
                    </div>
                </div>
                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">출생년도(from)</label>
                        <Dropdown v-model="from_year_of_birth" :options="FromyearOfBirthDropdownValues" optionValue="name" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">출생년도(to)</label>
                        <Dropdown v-model="to_year_of_birth" :options="ToyearOfBirthDropdownValues" optionValue="name" optionLabel="name" placeholder="선택" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">이메일 주소</label>
                        <InputText id="nameuser" type="text" v-model="email" placeholder="이메일 ID 입력" />
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">자녀 유무</label>
                        <Dropdown v-model="children" :options="dropdownchildrens" optionValue="code" optionLabel="name" placeholder="선택" />
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
                        <Button label="검색" icon="pi pi-search" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchuser"></Button>
                        <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetUser"></Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>관리자 사용자 관리 목록</h5>
                    </div>
                    <div>
                        <router-link :to="'/UserManagement/AdminUserManagement/AdminUserManagementAdd'"><Button label="info" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2"> 이메일 추가 </Button> </router-link>
                        <a href="https://gscm-api-dev.dvconsulting.org/api/v1/admin/user/download-excel/admin" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a>
                        <!-- <a href="https://api-uat.ggulpot-admin.com/api/v1/admin/user/download-excel/admin" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->

                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/user/download-excel/admin" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>Export Excel</Button> -->
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다.</template>
                    <template #loading>데이터를 로드 중입니다. 기다리다.</template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="slNO" :header="$t('#')">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>
                    <Column header="닉네임" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Nickname</span>
                            <span v-if="data.username == null"> - </span>
                            <span v-else>
                                {{ data.username }}
                            </span>
                        </template>
                    </Column>
                    <Column header="단지명" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>
                            <span v-if="data.apartment_name == null"> - </span>
                            <span v-else>
                                {{ data.apartment_name }}
                            </span>
                        </template>
                    </Column>
                    <Column header="출생년도" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Year of Birth</span>
                            <span v-if="data.dob_year == null"> - </span>
                            <span v-else>
                                {{ data.dob_year }}
                            </span>
                        </template>
                    </Column>
                    <Column header="가입 경로" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Subscription method</span>
                            <span v-if="data.how_to_know_text == null"> - </span>
                            <span v-else>
                                {{ data.how_to_know_text }}
                            </span>
                        </template>
                    </Column>
                    <Column header="성별" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Gender</span>
                            <span v-if="data.gender == null"> - </span>
                            <span v-else>
                                {{ $t(data.gender) }}
                            </span>
                        </template>
                    </Column>
                    <Column header="이메일 주소" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Email Id</span>
                            <span v-if="data.email_table_email == null"> - </span>
                            <span v-else>
                                {{ data.email_table_email }}
                            </span>
                        </template>
                    </Column>
                    <Column header="핸드폰번호" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Phone</span>
                            <span v-if="data.mobile == null"> - </span>
                            <span v-else>
                                {{ data.mobile }}
                            </span>
                        </template>
                    </Column>
                    <Column header="등록 일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Date & Time</span>
                            <span v-if="data.create_date == null"> - -</span>
                            <span v-else>
                                {{ formatDate(data.create_date) }}
                            </span>
                        </template>
                    </Column>

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <p style="display: none">{{ data.mobile }}</p>
                            <div style="display: flex">
                                <span v-if="data.id == null">
                                    <Button label="info" class="p-button2" disabled><i class="pi pi-user-edit p-mr-2"></i> </Button>
                                </span>
                                <span v-else>
                                    <router-link :to="'/UserManagement/AdminUserManagement/AdminUserManagementEdit/' + data.id"
                                        ><Button label="info" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button>
                                    </router-link>
                                </span>
                                <span v-if="data.id == null">
                                    <Button label="help" class="p-button2" disabled><i class="pi pi-eye p-mr-2"></i> </Button>
                                </span>
                                <span v-else>
                                    <router-link :to="'/UserManagement/AdminUserManagement/AdminUserManagementview/' + data.id"
                                        ><Button label="help" class="p-button2"><i class="pi pi-eye p-mr-2"></i> </Button
                                    ></router-link>
                                </span>

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
import UsermanagementService from '../../../service/API/UsermanagementService';
import moment from 'moment';
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
            totalrecords: '',
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },

            dropdownGenders: [
                { name: '남성', code: 'm' },
                { name: '여성', code: 'f' },
            ],

            dropdownGender: null,

            dropdownfamilytypes: [
                { name: '1인 가구', code: '1' },
                { name: '2인 가구', code: '2' },
                { name: '3인 가구', code: '3' },
                { name: '4인 가구 이상', code: '4' },
                { name: '기타', code: '5' },
            ],
            dropdownfamilytype: null,

            dropdownchildrens: [
                { name: '있음', code: 'y' },
                { name: '없음', code: 'n' },
            ],
            dropdownchildren: null,
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            name: '',
            status: '',
            id: '',
            username: '',
            apartment_name: '',
            apartment_id: '',
            how_to_know_text: '',
            subscription: '',
            gender: '',
            from_year_of_birth: '',
            to_year_of_birth: '',
            family_type: '',
            children: '',
            email: '',
            email_table_email: '',
            apartmentcomplexDropdownValues: '',
            apartmentcomplexDropdownValue: null,
            SubscriptionmethodDropdownValues: '',
            SubscriptionmethodDropdownValue: null,
            FromyearOfBirthDropdownValues: [
                { name: '1900' },
                { name: '1901' },
                { name: '1902' },
                { name: '1903' },
                { name: '1904' },
                { name: '1905' },
                { name: '1906' },
                { name: '1907' },
                { name: '1908' },
                { name: '1909' },
                { name: '1910' },
                { name: '1911' },
                { name: '1912' },
                { name: '1913' },
                { name: '1914' },
                { name: '1915' },
                { name: '1916' },
                { name: '1917' },
                { name: '1918' },
                { name: '1919' },
                { name: '1920' },
                { name: '1921' },
                { name: '1922' },
                { name: '1923' },
                { name: '1924' },
                { name: '1925' },
                { name: '1926' },
                { name: '1927' },
                { name: '1928' },
                { name: '1929' },
                { name: '1930' },
                { name: '1931' },
                { name: '1932' },
                { name: '1933' },
                { name: '1934' },
                { name: '1935' },
                { name: '1936' },
                { name: '1937' },
                { name: '1938' },
                { name: '1939' },
                { name: '1940' },
                { name: '1941' },
                { name: '1942' },
                { name: '1943' },
                { name: '1944' },
                { name: '1945' },
                { name: '1946' },
                { name: '1947' },
                { name: '1948' },
                { name: '1949' },
                { name: '1950' },
                { name: '1951' },
                { name: '1952' },
                { name: '1953' },
                { name: '1954' },
                { name: '1955' },
                { name: '1956' },
                { name: '1957' },
                { name: '1958' },
                { name: '1959' },
                { name: '1960' },
                { name: '1961' },
                { name: '1962' },
                { name: '1963' },
                { name: '1964' },
                { name: '1965' },
                { name: '1966' },
                { name: '1967' },
                { name: '1968' },
                { name: '1969' },
                { name: '1970' },
                { name: '1971' },
                { name: '1972' },
                { name: '1973' },
                { name: '1974' },
                { name: '1975' },
                { name: '1976' },
                { name: '1977' },
                { name: '1978' },
                { name: '1979' },
                { name: '1980' },
                { name: '1981' },
                { name: '1982' },
                { name: '1983' },
                { name: '1984' },
                { name: '1985' },
                { name: '1986' },
                { name: '1987' },
                { name: '1988' },
                { name: '1989' },
                { name: '1990' },
                { name: '1991' },
                { name: '1992' },
                { name: '1993' },
                { name: '1994' },
                { name: '1995' },
                { name: '1996' },
                { name: '1997' },
                { name: '1998' },
                { name: '1999' },
                { name: '2000' },
                { name: '2001' },
                { name: '2002' },
                { name: '2003' },
                { name: '2004' },
                { name: '2005' },
                { name: '2006' },
                { name: '2007' },
                { name: '2008' },
                { name: '2009' },
                { name: '2010' },
                { name: '2011' },
                { name: '2012' },
                { name: '2013' },
                { name: '2014' },
                { name: '2015' },
                { name: '2016' },
                { name: '2017' },
                { name: '2018' },
                { name: '2019' },
                { name: '2020' },
                { name: '2021' },
                { name: '2022' },
            ],
            FromyearOfBirthDropdownValue: null,
            ToyearOfBirthDropdownValues: [
                { name: '1900' },
                { name: '1901' },
                { name: '1902' },
                { name: '1903' },
                { name: '1904' },
                { name: '1905' },
                { name: '1906' },
                { name: '1907' },
                { name: '1908' },
                { name: '1909' },
                { name: '1910' },
                { name: '1911' },
                { name: '1912' },
                { name: '1913' },
                { name: '1914' },
                { name: '1915' },
                { name: '1916' },
                { name: '1917' },
                { name: '1918' },
                { name: '1919' },
                { name: '1920' },
                { name: '1921' },
                { name: '1922' },
                { name: '1923' },
                { name: '1924' },
                { name: '1925' },
                { name: '1926' },
                { name: '1927' },
                { name: '1928' },
                { name: '1929' },
                { name: '1930' },
                { name: '1931' },
                { name: '1932' },
                { name: '1933' },
                { name: '1934' },
                { name: '1935' },
                { name: '1936' },
                { name: '1937' },
                { name: '1938' },
                { name: '1939' },
                { name: '1940' },
                { name: '1941' },
                { name: '1942' },
                { name: '1943' },
                { name: '1944' },
                { name: '1945' },
                { name: '1946' },
                { name: '1947' },
                { name: '1948' },
                { name: '1949' },
                { name: '1950' },
                { name: '1951' },
                { name: '1952' },
                { name: '1953' },
                { name: '1954' },
                { name: '1955' },
                { name: '1956' },
                { name: '1957' },
                { name: '1958' },
                { name: '1959' },
                { name: '1960' },
                { name: '1961' },
                { name: '1962' },
                { name: '1963' },
                { name: '1964' },
                { name: '1965' },
                { name: '1966' },
                { name: '1967' },
                { name: '1968' },
                { name: '1969' },
                { name: '1970' },
                { name: '1971' },
                { name: '1972' },
                { name: '1973' },
                { name: '1974' },
                { name: '1975' },
                { name: '1976' },
                { name: '1977' },
                { name: '1978' },
                { name: '1979' },
                { name: '1980' },
                { name: '1981' },
                { name: '1982' },
                { name: '1983' },
                { name: '1984' },
                { name: '1985' },
                { name: '1986' },
                { name: '1987' },
                { name: '1988' },
                { name: '1989' },
                { name: '1990' },
                { name: '1991' },
                { name: '1992' },
                { name: '1993' },
                { name: '1994' },
                { name: '1995' },
                { name: '1996' },
                { name: '1997' },
                { name: '1998' },
                { name: '1999' },
                { name: '2000' },
                { name: '2001' },
                { name: '2002' },
                { name: '2003' },
                { name: '2004' },
                { name: '2005' },
                { name: '2006' },
                { name: '2007' },
                { name: '2008' },
                { name: '2009' },
                { name: '2010' },
                { name: '2011' },
                { name: '2012' },
                { name: '2013' },
                { name: '2014' },
                { name: '2015' },
                { name: '2016' },
                { name: '2017' },
                { name: '2018' },
                { name: '2019' },
                { name: '2020' },
                { name: '2021' },
                { name: '2022' },
            ],
            ToyearOfBirthDropdownValue: null,
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.usermanagementService = new UsermanagementService();
    },
    mounted() {
        //  this.userlist();
        this.storageData = localStorage.getItem('adminuserlist') ? JSON.parse(localStorage.getItem('adminuserlist')) : '';

        console.log(this.storageData, 'data');

        if (this.storageData != '') {

            this.username = this.storageData.username;
            this.subscription = this.storageData.subscription;
            this.apartment_id = this.storageData.apartment_id;
            this.gender = this.storageData.gender;
            this.from_year_of_birth = this.storageData.from_year_of_birth;
            this.to_year_of_birth = this.storageData.to_year_of_birth;
            this.family_type = this.storageData.family_type;
            this.children = this.storageData.children;
            this.email = this.storageData.email;
            this.adminuserlistpagination = this.storageData.page;
        }

        if (this.adminuserlistpagination == '' || this.adminuserlistpagination == null) {
            if (this.username || this.subscription || this.apartment_id || this.gender || this.from_year_of_birth || this.to_year_of_birth || this.family_type || this.children || this.email) {
            const searchListParams = {
                page: Number(this.pagination.current_page),
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
            };
            this.userlist(searchListParams);
        } else {
            const listParams = {
                page: Number(this.pagination.current_page),
                limit: this.pagination.pagination_limit,
            };
            this.userlist(listParams);
        }
        } else {
            const searchLocalParams = {
                page: Number(this.adminuserlistpagination),
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
            };
            console.log('userlist', this.userlist);
            this.userlist(searchLocalParams);
        }

        // this.apartmentlist();
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

        userlist(data) {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.usermanagementService
                .getAdminUserManagementList(data)
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
            localStorage.setItem(
                    'adminuserlist',
                    JSON.stringify({
                        limit: this.pagination.pagination_limit,
                        page: page,
                        username: this.username,
                        apartment_id: this.apartment_id,
                        subscription: this.subscription,
                        gender: this.gender,
                        from_year_of_birth: this.from_year_of_birth,
                        to_year_of_birth: this.to_year_of_birth,
                        family_type: this.family_type,
                        children: this.children,
                        email: this.email,
                    })
                );
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
                    this.totalrecords = res.data.total_records;
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
            localStorage.setItem('adminuserlist', '');
            (this.username = ''),
                (this.apartment_id = ''),
                (this.subscription = ''),
                (this.gender = ''),
                (this.from_year_of_birth = ''),
                (this.to_year_of_birth = ''),
                (this.family_type = ''),
                (this.children = ''),
                (this.email = ''),
                this.userlist({ page: 1, limit: this.pagination.pagination_limit });
        },
        searchuser() {
            if (this.username !== '' ||  this.apartment_id !== '' ||  this.subscription !== '' ||  this.gender !== '' ||  this.from_year_of_birth !== '' ||  this.to_year_of_birth !== '' ||  this.family_type !== '' ||  this.children !== '' ||  this.email !== '') {
                localStorage.setItem(
                    'adminuserlist',
                    JSON.stringify({
                        limit: this.pagination.pagination_limit,
                        page: this.pagination.current_page,
                        username: this.username,
                        apartment_id: this.apartment_id,
                        subscription: this.subscription,
                        gender: this.gender,
                        from_year_of_birth: this.from_year_of_birth,
                        to_year_of_birth: this.to_year_of_birth,
                        family_type: this.family_type,
                        children: this.children,
                        email: this.email,
                    })
                );
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    username: this.username,
                    apartment_id: this.apartment_id,
                    subscription: this.subscription,
                    gender: this.gender,
                    from_year_of_birth: this.from_year_of_birth,
                    to_year_of_birth: this.to_year_of_birth,
                    family_type: this.family_type,
                    children: this.children,
                    email: this.email,
                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.usermanagementService
                    .getAdminUserManagementList(searchParams)
                    .then((res) => {
                        console.log('res', res);
                        this.customer1 = res.data.result;
                        this.totalrecords = res.data.total_records;
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
                header: '확인',
                message: '삭제하시겠습니까?',
                icon: 'pi pi-trash',
                acceptLabel: '확인',
                rejectLabel: ' 취소',
                accept: () => {
                    self.apartmentService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);
                            self.apartmentlist({ page: self.pagination.current_page, limit: self.pagination.pagination_limit });
                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                        })
                        .catch(() => {
                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
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

.p-button.p-button-text {
    background-color: #221ed9;
    color: white;
    border-color: transparent;
}
</style>