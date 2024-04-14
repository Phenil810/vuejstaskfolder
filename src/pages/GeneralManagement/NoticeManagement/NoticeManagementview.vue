<template>
    <div class="p-grid">
        <Toast />
        <ConfirmDialog group="dialog" />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>공지사항 상세</strong>
                </h4>
                <div class="p-field p-grid">
                    <label for="category_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">제목:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ title }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">내용:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p>{{ description }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">이미지:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="notice_image == null"> NA</span>
                        <span v-else><Image :src="notice_image" alt="이미지를 사용할 수 없음" class="product-image" width="137" height="85" /></span>
                        
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">링크 텍스트:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ link_text }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">URL:</label>
                    <div class="p-col-12 p-md-10 " >
                        <p >{{ url }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">등록일자:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ formatDate(create_date) }}</p>
                    </div>
                </div>
                <div class="p-d-flex p-jc-end" style="float: left">
                    <router-link :to="'/GeneralManagement/NoticeManagement/NoticeManagementedit/' + $route.params.id">
                        <Button label="help" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2">
                            <i class="pi pi-user-edit p-mr-2"></i>
                            수정
                        </Button>
                    </router-link>

                    <Button class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="deleteNote($route.params.id)"> 삭제</Button>
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
import NoticeManagementService from '../../../service/API/NoticeManagementService';
import utils from '@/service/utils';
import moment from 'moment';

export default {
    name: 'NoticeManagementview',
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

            title: '',
            user_name: '',
            create_date: '',
            description: '',
            notice_image: '',
            link_text: '',
            url: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.noticeManagementService = new NoticeManagementService();
    },

    methods: {
        noticeManagementlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.noticeManagementService
                .getNoticeManagementList(postlistParams)
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
            this.noticeManagementService
                .getNoticeManagementList({ page: page, limit: this.pagination.pagination_limit, title: this.title, startDate: this.startDate, endDate: this.endDate })
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
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },

        formatRecruitmentDate(value) {
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
            return (value = `${yyyy}-${mm}-${dd} `);
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
                    self.noticeManagementService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);

                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                            self.noticeManagementlist();
                            setTimeout(() => {
                                self.$router.push({ name: 'NoticeManagementlist' });
                            }, 1000);
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

        formatactivityDate(value) {
            const date = new Date(value);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var hr = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return (value = ` ${hr}:${min}:${sec} `);
        },
    },

    mounted() {
        // this.apartmentService.complexview(this.$route.params.id ).then((data) => {
        //     console.log(data);
        //     this.mydata = data[0];

        // });
        this.noticeManagementlist();

        this.noticeManagementService.noticeview(this.$route.params.id).then((res) => {
            this.title = res.data.result.title;
            this.description = res.data.result.description;
            this.notice_image = res.data.result.notice_image;
            this.link_text = res.data.result.link_text;
            this.url = res.data.result.url;
            this.create_date = res.data.result.create_date;

            console.log(this.notice_image);
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

.url {
    word-wrap: break-word;
}
</style>