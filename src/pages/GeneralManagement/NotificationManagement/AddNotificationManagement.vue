<template>
    <div>
    <div class="card">
        <Toast />
        <!-- <ConfirmDialog group="dialog" /> -->
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>푸시 알림 추가</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">제목</label>
                            <InputText type="text" :class="`${error.title ? 'p-invalid' : ''}`" placeholder="제목" id="title2" v-model="title"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>

                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">URL</label>
                            <InputText type="text" placeholder="URL 입력" id="title2" v-model="url"></InputText>
                            <!-- <div class="text-red">{{ error.url }}</div> -->
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">설명</label>
                            <Textarea type="text" placeholder="설명 입력" :class="`${error.sorts_description ? 'p-invalid' : ''}`" id="title2" v-model="sorts_description" maxlength="250"></Textarea>
                            <span style="float: right">최대 250 글자</span>
                            <div class="text-red">{{ error.sorts_description }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    
    <div class="p-grid">
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
                        <label for="nameuser">가구 구성</label>
                        <Dropdown v-model="family_type" :options="dropdownfamilytypes" optionValue="code" optionLabel="name" placeholder="선택" />
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
    </div>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>일반 사용자 관리 목록</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <!-- <a href="https://gscm-api.dvconsulting.org/api/v1/admin/user/download-excel/user" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->
                        <!-- <a href="https://api.ggulpot-admin.com/api/v1/admin/user/download-excel/user" target="_blank" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" style="background: blue; color: white">엑셀 추출 </a> -->
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>Export Excel</Button> -->
                    </div>
                </div>
                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll" v-model:selection="selected">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <!-- <Column field="slNO" :header="$t('#')">
                    <template #body="{}">
                        <span class="p-column-title">slNo</span>
                        {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                    </template>
                </Column> -->
                    <column selectionMode="multiple" style="width: 16px; text-align: center" />
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

                    <!-- <Column header="기능">
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
                                <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" />
                            </div>
                        </template>
                    </Column> -->
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
            <div class="p-d-flex p-jc-center p-ai-center">
                <div>
                    <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                </div>
                <div>
                    <Button :disabled="!selected.length" label="발송" class="p-button p-button-outlined p-button p-mr-2 p-mb-2" @click="addpushNotification" style="background: blue; color: white" />
                </div>
                <div>
                    <Button :disabled="selected.length || !customer1.length" label="모두 보내기" class="p-button p-button-outlined p-button p-mr-2 p-mb-2" @click="addAllpushNotification" style="background: blue; color: white" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import axios from 'axios';
// import { useRoute } from 'vue-router';
import validateCreateNotification from '../../../validations/notification/validateCreateNotification';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import PushNotificationService from '../../../service/API/PushNotificationService';
// import axios from 'axios';
import moment from 'moment';
import utils from '@/service/utils';
export default {
    data() {
        return {
            apartment_id: null,
            subscription: null,
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
            error: {},
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            show_in_banner: '',
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            title: '',
            sorts_description: '',
            startDate: '',
            endDate: '',
            description: '',
            link_text: '',
            url: '',
            create_date: '',
            searchdate: '',
            searchenddate: '',
            id: '',
            apartment_name: '',
            username: '',
            dob_year: '',
            how_to_know_text: '',
            gender: '',
            have_children: '',
            children: '',
            to_year_of_birth: '',
            from_year_of_birth: '',
            family_type: '',
            persons_in_family: '',
            formData: new FormData(),
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
            filterRender: false,
            ToyearOfBirthDropdownValue: null,
            userType: localStorage.getItem('userType'),
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.pushNotificationService = new PushNotificationService();
        // this.changeToSpanish();
    },
    mounted() {
        this.pushnotificationtuserlist();
        if (this.userType == 'super_admin') {
            this.filterRender = true;
        } else {
            this.filterRender = false;
        }
        const postlistParams = {
            page: 1,
            limit: 1000,
        };
        this.pushNotificationService.getApartmentList(postlistParams).then((res) => {
            this.apartmentcomplexDropdownValues = res.data.result;
            // this.products = data;
            this.loading1 = false;
            // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
            //   console.log(this.customer1);
            // console.log(data);
        });
        this.pushNotificationService

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

        pushnotificationtuserlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.pushNotificationService
                .getPushNotificationuserList(postlistParams)
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;

                    //                 this.company_id= this.company.id;
                    // console.log("this.company_id",this.company_id);
                    console.log('res', this.customer1);
                    console.log(res);
                    this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                    this.loading1 = false;
                    this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
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
            this.selected = [];
            this.loading1 = true;
            // var start_date = this.formatRangeDate(this.date_range.at(0));
            // var end_date = this.formatRangeDate(this.date_range.at(1));
            this.pushNotificationService
                .getPushNotificationuserList({
                    page: page,
                    limit: this.pagination.pagination_limit,
                    username: this.username,
                    subscription: this.subscription ? this.subscription : '',
                    apartment_id: this.apartment_id ? this.apartment_id : '',
                    gender: this.gender,
                    from_year_of_birth: this.from_year_of_birth,
                    to_year_of_birth: this.to_year_of_birth,
                    family_type: this.family_type,
                    children: this.children,
                })
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    this.customer1.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        resetUser() {
            (this.username = ''), (this.apartment_id = ''), (this.subscription = ''), (this.gender = ''), (this.from_year_of_birth = ''), (this.to_year_of_birth = ''), (this.family_type = ''), (this.children = ''), this.pushnotificationtuserlist();
        },
        searchuser() {
            if (this.username == '' && this.apartment_id == '' && this.subscription == '' && this.gender == '' && this.from_year_of_birth == '' && this.to_year_of_birth == '' && this.family_type == '' && this.children == '') {
                this.$toast.add({ severity: 'error', summary: this.$t('error message'), detail: this.$t('Please enter one or more search values.'), life: 3000 });
            } else {
                let searchParams = {
                    limit: this.pagination.pagination_limit,
                    page: 1,
                    username: this.username,
                    apartment_id: this.apartment_id ? this.apartment_id : '',
                    subscription: this.subscription ? this.subscription : '',
                    gender: this.gender,
                    from_year_of_birth: this.from_year_of_birth,
                    to_year_of_birth: this.to_year_of_birth,
                    family_type: this.family_type,
                    children: this.children,

                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);
                this.customer1 = true;
                this.pushNotificationService
                    .getPushNotificationuserList(searchParams)
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

        formatsearchDate(value) {
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
            return (value = yyyy + '-' + mm + '-' + dd);
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

        addpushNotification() {
            let xyz = [];
            let data = this.selected;
            let self = this;

            for (var a = 0; a < data.length; a++) {
                //    xyz.push({ user_id: data[a].id });
                xyz.push(data[a].id);
            }
            if (xyz.length == 0) {
                self.$toast.add({ severity: 'error', summary: 'error', detail: '한 명 이상의 사용자를 선택하세요.', life: 3000 });
                // alert('한 명 이상의 사용자를 선택하세요.');
                setTimeout(() => {
                    // window.location.reload();
                }, 1000);
            }
            self.selectedItemss = xyz;
            let vcheckData = {
                title: self.title,
                url: self.url,
                sorts_description: self.sorts_description,
                user_ids: xyz,
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreateNotification(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                {
                    return axios.post('/admin/pushnotification/push-notification-add', { title: this.title, url: window.btoa(this.url), sorts_description: this.sorts_description, user_ids: xyz }).then(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '알림이 성공적으로 추가되었습니다.', life: 3000 });
                        setTimeout(() => {
                            this.$router.push({ name: 'NotificationManagementList' });
                        }, 1000);
                    });
                }
            }
        },
        addAllpushNotification() {
            // var self = this;
            let self = this;
            const vcheckData = {
                title: self.title,
                url: window.btoa(self.url),
                sorts_description: self.sorts_description,
                user_ids: [],
                user_count: 'all',
                username: self.username,
                apartment_id: self.apartment_id ? self.apartment_id : '',
                subscription: self.subscription ? self.subscription : '',
                gender: self.gender,
                from_year_of_birth: self.from_year_of_birth,
                to_year_of_birth: self.to_year_of_birth,
                family_type: self.family_type,
                children: self.children,
            };
            const { isInvalid, error } = validateCreateNotification(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                this.$confirm.require({
                    group: 'dialog',
                    header: '발송',
                    message: '선택된 사용자들에게 푸시 알림을 보내시겠습니까?',
                    icon: 'pi pi-trash',
                    acceptLabel: '발송',
                    rejectLabel: ' 취소',
                    accept: () => {
                        axios.post('/admin/pushnotification/push-notification-add', vcheckData).then(() => {
                            (this.title = ''), (this.sorts_description = ''), (this.url = '');
                            this.$toast.add({ severity: 'success', summary: '확인', detail: '알림이 성공적으로 추가되었습니다.', life: 3000 });
                            setTimeout(() => {
                                this.$router.push({ name: 'NotificationManagementList' });
                            }, 1000);
                        });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
                    },
                });
            }
        },
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

.product-image {
    padding-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
    height: 100px;
}

.p-fluid .p-button {
    width: auto;
}
</style>
