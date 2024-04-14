<template>
    <div class="p-grid">
        <Toast />

        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>리워드 부여 리스트</h5>
                    </div>
                </div>

                <DataTable :value="customer1" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="#" header="#">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>
                    <Column header="활동 타입" style="min-width: 12rem" field="username">
                        <template #body="{ data }">
                            <span class="p-column-title">Activity Type</span>
                            {{ $t(data.activity_type) }}
                        </template>
                    </Column>

                    <Column header="1일 최대 부여 횟수(일반)" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Normal User Activity Per Day</span>
                            {{ data.activity_limit }}
                        </template>
                    </Column>

                    <Column header="1일 최대 부여 횟수(VIP)" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">VIP User Activity Per Day</span>
                            {{ data.vip_activity_limit }}
                        </template>
                    </Column>

                    <Column header="꿀 지급 개수" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Honey(points) per Activity</span>
                            <span v-if="data.activity_type == 'post'">
                            ***
                            </span>
                            <span v-else>
                                {{ data.honey_per_activity }}
                            </span>
                           
                        </template>
                    </Column>

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>

                            <div style="display: flex">
                                <!-- <router-link :to="'/ManageHoney/' + data.id"><Button label="info" class="p-button">리워드 관리</Button> </router-link> -->
                                <!-- <router-link :to="'/user/edit-user/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link> -->
                                <span v-if="data.activity_type == 'post'">
                                    <router-link :to="'/EditPostManagement/' + data.id"
                                        ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                    ></router-link>
                                </span>
                                <span v-else>
                                    <router-link :to="'/EditRewardManagement/' + data.id"
                                        ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                    ></router-link>
                                </span>

                                <!-- <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" /> -->
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <br>

                <p>참고: - VIP 사용자는 일반적으로 지급되는 꿀에 X2에 해당하는 꿀을 지급 받습니다.</p>
            </div>
        </div>

        <div class="p-col-12">
            <div class="card">
                <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>게시글 등록 리워드 리스트</h5>
                    </div>
                </div>

                <DataTable :value="customer2" :paginator="false" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading2" :filters="filters2" responsiveLayout="scroll">
                    <!-- v-model:selection="selected" -->
                    <ConfirmDialog group="dialog" />

                    <template #empty> 데이터가 없습니다. </template>
                    <template #loading> 데이터를 로드 중입니다. 기다리다. </template>

                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="#" header="#">
                        <template #body="{ index }">
                            <span class="p-column-title">slNo</span>
                            {{ totalrecords - index - (pagination.current_page - 1) * pagination.pagination_limit }}
                        </template>
                    </Column>
                    <Column header="글자수 (bytes)" style="min-width: 12rem" field="post_chracter">
                        <template #body="{ data }">
                            <span class="p-column-title">Activity Type</span>
                            {{ data.post_chracter }}
                        </template>
                    </Column>

                    <Column header="꿀 차등 지급 개수" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Activity limit per day</span>
                            {{ data.charcter_honey_per_activity }}
                        </template>
                    </Column>

                    <!-- <Column header="꿀 지급 개수" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Honey(points) per Activity</span>
                            {{ data.honey_per_activity }}
                        </template>
                    </Column> -->

                    <Column header="기능">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span>

                            <div style="display: flex">
                                <!-- <router-link :to="'/ManageHoney/' + data.id"><Button label="info" class="p-button">리워드 관리</Button> </router-link> -->
                                <!-- <router-link :to="'/user/edit-user/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link> -->

                                <router-link :to="'/EditPostRegistrationRewards/' + data.id"
                                    ><Button label="help" class="p-button2"><i class="pi pi-user-edit p-mr-2"></i> </Button
                                ></router-link>
                                <!-- <Button icon="pi pi-trash" class="p-button2" @click="deleteNote(data.id)" /> -->
                            </div>
                        </template>
                    </Column>
                </DataTable>
                <br>

                <p>참고: - VIP 사용자는 일반적으로 지급되는 꿀에 X2에 해당하는 꿀을 지급 받습니다.</p>
            </div>
        </div>
    </div>
</template>


<script>
// import { useRoute } from 'vue-router';
// import { FilterMatchMode, FilterOperator } from 'primevue/api';
import RewardManagementListService from '../../service/API/RewardManagementListService';
// import axios from 'axios';
// import moment from 'moment';
import utils from '@/service/utils';
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
            totalrecords: '',
            serial_number: '',
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
            customer1: [],
            customer2: [],
            loading1: true,
            loading2: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            activity_type: '',
            activity_limit: '',
            honey_per_activity: '',
            id: '',
            post_chracter: '',
            charcter_honey_per_activity: '',
            vip_activity_limit:'',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.rewardManagementListService = new RewardManagementListService();
    },
    mounted() {
        this.rewardManagementList();
        this.PostRegistrationRewardsList();
    },
    watch: {},
    methods: {
        rewardManagementList() {
            // const postlistParams = {
            //     page: 1,
            //     limit: this.pagination.pagination_limit,
            // };
            this.loading1 = true;
            this.rewardManagementListService
                .gethoneyList()
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;

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
            this.rewardManagementListService
                .gethoneyList({ page: page, limit: this.pagination.pagination_limit })
                .then((res) => {
                    this.customer1 = res.data.result;
                    this.totalrecords = res.data.total_records;
                    console.log('paginate', this.customer1);
                    this.pagination.current_page = page;
                    this.loading1 = false;
                    // console.log(res.data);
                })
                .catch((err) => console.log(err));
        },

        PostRegistrationRewardsList() {
            const postlistParams = {
                language: 'ko',
            };
            this.loading2 = true;
            this.rewardManagementListService
                .getpostregistrationrewardList(postlistParams)
                .then((res) => {
                    this.customer2 = res.data.result;
                    this.totalrecords = res.data.total_records;

                    this.loading2 = false;
                })
                .catch((err) => console.log(err));
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