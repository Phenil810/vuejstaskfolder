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

                    <!-- <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">가입 경로</label>
                        <Dropdown v-model="subscription" :options="SubscriptionmethodDropdownValues" optionValue="id" optionLabel="title" placeholder="선택" />
                    </div> -->

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
                        <label for="nameuser">가구 구성</label>
                        <Dropdown v-model="family_type" :options="dropdownfamilytypes" optionValue="code" optionLabel="name" placeholder="선택" />
                    </div>

                    <!-- <div class="p-field p-col-12 p-md-3">
                        <label for="nameuser">자녀 유무</label>
                        <Dropdown v-model="children" :options="dropdownchildrens" optionValue="code" optionLabel="name" placeholder="선택" />
                    </div> -->
                </div>

                <div class="p-formgrid p-grid p-mb-3">
                    <div class="p-field p-col-12 p-md-3" style="display: grid">
                        <label for="SecretRoom">VIP 사용자</label>
                        <InputSwitch trueValue="yes" v-model="vip_user" :value="vip_user" @change="viponoff" />
                    </div>
                </div>

                <div class="p-formgrid p-grid p-mb-3" v-if="vip_user == 'yes'">
                    <div class="p-field p-col-12 p-md-3">
                        <label for="startdate">VIP 시작 일자</label>
                        <Calendar id="dateModal" :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3" v-if="vip_user == 'yes'">
                        <label for="enddate">VIP 종료 일자</label>
                        <Calendar id="dateModal" :showIcon="true" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
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
                        <h5>일반 사용자 관리 목록</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <a href="https://gscm-api-dev.dvconsulting.org/api/v1/admin/user/download-excel/user" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a>
                        <!-- <a href="https://api-uat.ggulpot-admin.com/api/v1/admin/user/download-excel/user" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->

                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/user/download-excel/user" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>Export Excel</Button> -->
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

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
                            {{ data.username }}
                        </template>
                    </Column>
                    <Column header="단지명" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Apartment Complex</span>
                            {{ data.apartment_name }}
                        </template>
                    </Column>
                    <Column header="출생년도" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Year of Birth</span>
                            {{ data.dob_year }}
                        </template>
                    </Column>
                    <Column header="가입 경로" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Subscription method</span>
                            {{ data.how_to_know_text }}
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
                    <Column header="가구 구성" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Family Type</span>
                            <span v-if="data.persons_in_family == '1'">
                                <p>1인 가구</p>
                            </span>
                            <span v-else-if="data.persons_in_family == '2'">
                                <p>2인 가구</p>
                            </span>
                            <span v-else-if="data.persons_in_family == '3'">
                                <p>3인 가구</p>
                            </span>
                            <span v-else-if="data.persons_in_family == '4'">
                                <p>4인 가구 이상</p>
                            </span>
                            <span v-else-if="data.persons_in_family == '5'">
                                <p>기타</p>
                            </span>
                            <!-- {{ data.persons_in_family }} -->
                        </template>
                    </Column>
                    <Column header="VIP 사용자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">VIP Users</span>
                            <span v-if="data.vip_user == 0">
                                <InputSwitch :modelValue="getStatus(data.vip_user)" @click="Changestatus(data.id)" />
                            </span>
                            <span v-else-if="data.vip_user == 1">
                                <InputSwitch :modelValue="getStatus(data.vip_user)" @click="Changestatus1(data.id,data.vip_user_start_date,data.vip_user_end_date)" />
                            </span>

                            <!-- <InputSwitch /> -->
                        </template>
                    </Column>
                    <Column header="VIP 시작 일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">VIP Start Date </span>
                            <span v-if="data.vip_user_start_date == null"> - </span>
                            <span v-else>
                                {{ formatVIPDate(data.vip_user_start_date) }}
                            </span>
                        </template>
                    </Column>
                    <Column header="VIP 종료 일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">VIP End Date </span>
                            <span v-if="data.vip_user_end_date == null"> - </span>
                            <span v-else>
                                {{ formatVIPDate(data.vip_user_end_date) }}
                            </span>
                        </template>
                    </Column>
                    <Column header="추천인 전화번호" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">referral_code</span>
                            <span v-if="data.referral_code == null"> - </span>
                            <span v-else>
                                {{ data.referral_code }}
                            </span>
                            <!-- {{ $t(data.have_children) }} -->
                        </template>
                    </Column>
                    <Column header="자녀 유무" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Children</span>
                            <span v-if="data.have_children == null"> - </span>
                            <span v-else>
                                {{ $t(data.have_children) }}
                            </span>
                            <!-- {{ $t(data.have_children) }} -->
                        </template>
                    </Column>
                    <Column header="등록 일자" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Date & Time</span>
                            {{ formatDate(data.create_date) }}
                        </template>
                    </Column>

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>
                            <p style="display: none">{{ data.mobile }}</p>
                            <div style="display: flex">
                                <router-link :to="'/UserManagement/GeneralUserManagement/GeneralUserManagementEdit/' + data.id"
                                    ><Button label="info" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button>
                                </router-link>
                                <router-link :to="'/UserManagement/GeneralUserManagement/GeneralUserManagementview/' + data.id"
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
        <Dialog header="VIP 사용자 설정" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-field">
                            <label for="title2" style="text-align: center">VIP 시작 일자</label>
                            <Calendar
                                id="vipcalendar"
                                :showIcon="true"
                                :class="`${error.startDate ? 'p-invalid' : ''}`"
                                :showButtonBar="true"
                                v-model="startDate"
                                dateFormat="yy.mm.dd"
                                :min-date="new Date()"
                                :placeholder="$t('search.placeholder.date')"
                            ></Calendar>
                            <div class="text-red">{{ error.startDate }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-field">
                            <label for="title2" style="text-align: center">VIP 종료 일자</label>
                            <Calendar id="vipcalendar" :showIcon="true" :class="`${error.endDate ? 'p-invalid' : ''}`" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                            <div class="text-red">{{ error.endDate }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" @click="close" class="p-button-danger" />
                <Button label="Confirm" @click="savevipdate()" class="p-button-primary" />
            </template>
        </Dialog>
    </div>
</template>


<script>
// import { useRoute } from 'vue-router';
// import validateUsersearch from '../../validations/user/validateUserSearch';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import UsermanagementService from '../../../service/API/UsermanagementService';
import validatevipCreateUser from '../../../validations/Usermanagementgs/validatevipCreateUser';
import moment from 'moment';
import axios from 'axios';
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
            error: {},
            // slNo:'',
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
            referral_code: '',
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
            vip_user_end_date: '',
            vip_user_start_date: '',
            vip_user: '',
            startDate: '',
            endDate: '',
            searchenddate: '',
            searchdate: '',
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

        this.storageData = localStorage.getItem('userlistpagination') ? JSON.parse(localStorage.getItem('userlistpagination')) : '';

        console.log(this.storageData, 'data');

        if (this.storageData != '') {
            this.username = this.storageData.username;
            // this.subscription = this.storageData.subscription;
            this.apartment_id = this.storageData.apartment_id;
            this.gender = this.storageData.gender;
            this.from_year_of_birth = this.storageData.from_year_of_birth;
            this.to_year_of_birth = this.storageData.to_year_of_birth;
            this.family_type = this.storageData.family_type;
            // this.children = this.storageData.children;
            this.vip_user = this.storageData.vip_user;
            this.startDate = this.storageData.startDate;
            this.endDate = this.storageData.endDate;
            this.userpagination = this.storageData.page;
        }

        if (this.userpagination == '' || this.userpagination == null) {
            if (this.username || this.apartment_id || this.gender || this.from_year_of_birth || this.to_year_of_birth || this.family_type || this.vip_user || this.startDate || this.endDate) {
                const searchListParams = {
                    page: Number(this.pagination.current_page),
                    limit: this.pagination.pagination_limit,
                    username: this.username,
                    apartment_id: this.apartment_id,
                    gender: this.gender,
                    from_year_of_birth: this.from_year_of_birth,
                    to_year_of_birth: this.to_year_of_birth,
                    family_type: this.family_type,
                    vip_user: this.vip_user === 'yes' ? '1' : '',
                    startDate: this.startDate,
                    endDate: this.endDate,
                };
                this.userlist(searchListParams);
            } else {
                const searchListParams = {
                    page: Number(this.pagination.current_page),
                    limit: this.pagination.pagination_limit,
                };
                this.userlist(searchListParams);
            }
        } else {
            const searchLocalParams = {
                page: Number(this.userpagination),
                limit: this.pagination.pagination_limit,
                username: this.username,
                apartment_id: this.apartment_id,
                gender: this.gender,
                from_year_of_birth: this.from_year_of_birth,
                to_year_of_birth: this.to_year_of_birth,
                family_type: this.family_type,
                vip_user: this.vip_user === 'yes' ? '1' : '',
                startDate: this.startDate,
                endDate: this.endDate,
            };
            console.log('userpagination', this.userpagination);
            this.userlist(searchLocalParams);
        }

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
            return values === 1 ? true : false;
        },
        viponoff() {
            this.vip_user == 'NO';
            this.startDate = '';
            this.endDate = '';
        },
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
                .getUserList(data)
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
                'userlistpagination',
                JSON.stringify({
                    limit: this.pagination.pagination_limit,
                    page: page,
                    // username: this.username,
                    // apartment_id: this.apartment_id,
                    // gender: this.gender,
                    // from_year_of_birth: this.from_year_of_birth,
                    // to_year_of_birth: this.to_year_of_birth,
                    // family_type: this.family_type,
                    // vip_user: this.vip_user,
                    // startDate: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
                    // endDate: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : '',
                })
            );
            this.usermanagementService
                .getUserList({
                    page: page,
                    limit: this.pagination.pagination_limit,
                    username: this.username,
                    apartment_id: this.apartment_id,
                    gender: this.gender,
                    from_year_of_birth: this.from_year_of_birth,
                    to_year_of_birth: this.to_year_of_birth,
                    family_type: this.family_type,
                    vip_user: this.vip_user === 'yes' ? '1' : '0',
                    startDate: this.searchdate,
                    endDate: this.searchenddate,
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

        Changestatus1(id, startDate , endDate) {
            console.log('eeee', id,startDate,endDate);
            var complexstatus = { ...{ id: id ,startDate: startDate , endDate: endDate} };
            // console.log('companystatus', companystatus);
            this.usermanagementService.complexchange_status(complexstatus).then((res) => {
                console.log(res);
                this.$toast.add({ severity: 'info', summary: '확인됨', detail: 'VIP 사용자 설정 완료', life: 3000 });
                this.userlist({ page: this.pagination.current_page, limit: this.pagination.pagination_limit });
                this.resetUser();
            });
        },

        Changestatus(id) {
            console.log('eeee', id);

            this.vipid = id;

            this.display = true;
        },
        savevipdate() {
            if (this.formatDatevip(this.endDate)  >= this.formatDatevip(this.startDate)) {
                let vcheckData = {
                    startDate: this.startDate === null ? '' : this.startDate.toString(),
                    endDate: this.endDate === null ? '' : this.endDate.toString(),
                };

                const { isInvalid, error } = validatevipCreateUser(vcheckData);
                if (isInvalid) {
                    this.error = error;
                    console.log(error);
                } else {
                    // this.formData.append('id', this.id);
                    // this.formData.append('startDate', this.startDate);
                    // this.formData.append('endDate', this.endDate);
                    // console.log(this.name);

                    var complexvip = { ...{ id: this.vipid, startDate: this.formatDatevip(this.startDate), endDate: this.formatDatevip(this.endDate) } };
                    return axios
                        .post('admin/user/save-vip-user', complexvip)
                        .then(() => {
                            // alert('일반 사용자 업데이트 성공적으로.');
                            this.userlist({ page: this.pagination.current_page, limit: this.pagination.pagination_limit });
                            this.resetUser();
                            this.display = false;

                            setTimeout(() => {
                                this.$toast.add({ severity: 'info', summary: '확인.', detail: 'VIP 사용자 설정 완료', life: 3000 });
                            }, 1000);
                        })
                        .catch(() => {
                            self.$toast.add({ severity: 'info', summary: '문제 발생', detail: '', life: 3000 });
                        });
                }
            } else if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            }
        },
        resetUser() {
            localStorage.setItem('userlistpagination', '');
            (this.username = ''),
                (this.apartment_id = ''),
                (this.gender = ''),
                (this.from_year_of_birth = ''),
                (this.to_year_of_birth = ''),
                (this.family_type = ''),
                (this.vip_user = ''),
                (this.startDate = ''),
                (this.endDate = ''),
                this.userlist({ page: 1, limit: this.pagination.pagination_limit });
            window.location.reload();
        },
        searchuser() {
            if (this.startDate > this.endDate) {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '종료 날짜는 시작 날짜보다 이후여야 합니다.', life: 3000 });
            } else {
                if (
                    this.username !== '' ||
                    this.apartment_id !== '' ||
                    this.gender !== '' ||
                    this.from_year_of_birth !== '' ||
                    this.to_year_of_birth !== '' ||
                    this.family_type !== '' ||
                    this.vip_user !== '' ||
                    this.startDate !== '' ||
                    this.endDate !== ''
                ) {
                    if (this.startDate != '') {
                        this.searchdate = this.addDay(this.startDate);
                    } else {
                        this.searchdate = '';
                    }

                    if (this.endDate != '') {
                        this.searchenddate = this.addDay(this.endDate);
                    } else {
                        this.searchenddate = '';
                    }
                    localStorage.setItem(
                        'userlistpagination',
                        JSON.stringify({
                            limit: this.pagination.pagination_limit,
                            page: this.pagination.current_page,
                            username: this.username,
                            apartment_id: this.apartment_id,
                            gender: this.gender,
                            from_year_of_birth: this.from_year_of_birth,
                            to_year_of_birth: this.to_year_of_birth,
                            family_type: this.family_type,
                            vip_user: this.vip_user,
                            startDate: this.searchdate,
                            endDate: this.searchenddate,
                        })
                    );

                    let searchParams = {
                        limit: this.pagination.pagination_limit,
                        page: 1,
                        username: this.username,
                        apartment_id: this.apartment_id,
                        gender: this.gender,
                        from_year_of_birth: this.from_year_of_birth,
                        to_year_of_birth: this.to_year_of_birth,
                        family_type: this.family_type,
                        vip_user: this.vip_user === 'yes' ? '1' : '',
                        startDate: this.searchdate,
                        endDate: this.searchenddate,
                    };
                    console.log('searchParams', searchParams);
                    this.customer1 = true;
                    this.usermanagementService
                        .getUserList(searchParams)
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
            this.startDate = '';
            this.endDate = '';
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

        formatDatevip(value) {
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

        formatVIPDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll');
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
                            self.apartmentlist({ page: self.pagination.current_page, limit: self.pagination.pagination_limit });
                            self.$toast.add({ severity: 'info', summary: 'Deleted', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                        })
                        .catch(() => {
                            self.$toast.add({ severity: 'info', summary: 'Deleted', detail: '성공적으로 삭제되었습니다.', life: 3000 });
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