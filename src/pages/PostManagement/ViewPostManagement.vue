<template>
    <div class="p-grid">
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>게시물 세부정보</strong>
                </h4>
                <div class="p-field p-grid">
                    <label for="category_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">단지명:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ user_location }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시물 타입:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ $t(post_type) }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">태그:</label>
                    <div class="p-col-12 p-md-2">
                        <Dropdown v-model="tag_id" :class="`${error.tag_id ? 'p-invalid' : ''}`" :options="tagDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" />
                        <div class="text-red">{{ error.tag_id }}</div>
                        <!-- <p>{{ post_tag }}</p> -->
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시물 제목:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ title }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시물 작성자:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ user_name }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시물 등록일자:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ formatDate(create_date) }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">상세 내용:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ post_description }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_function_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시물 이미지:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="post_images == null || post_images.length == 0">!! 사용할 수 있는 이미지 없음</span>
                        <span v-else>
                            <Image v-for="(postImg, i) of post_images" :key="i" :src="postImg" alt="이미지를 사용할 수 없음" class="product-image" width="137" height="85" />
                        </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_function_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">모집 인원:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ is_involved }} / {{ person_involved }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">모집 시작 날짜:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="recruitment_start == null"> N/A </span>
                        <span v-else>
                            {{ dateformat(recruitment_start) }}
                        </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">모집 종료 날짜:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="recruitment_end == null"> N/A </span>
                        <span v-else>
                            {{ dateformat(recruitment_end) }}
                        </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">활동 날짜:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="activity_start_time == null"> N/A </span>
                        <span v-else>
                            {{ dateformat(activity_start_time) }}
                        </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">활동 시작 시간:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="activity_start_time == null"> N/A </span>
                        <span v-else>
                            {{ formatactivityDate(activity_start_time) }}
                        </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">활동 종료 시간:</label>
                    <div class="p-col-12 p-md-10">
                        <span v-if="activity_end_time == null"> N/A </span>
                        <span v-else>
                            {{ formatactivityDate(activity_end_time) }}
                        </span>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">장소:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ post_location }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="daily_intake_amount_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">추가 조건:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ additional_terms }}</p>
                    </div>
                </div>
                <div class="p-d-flex p-jc-end" style="float: left">
                    <!-- <router-link :to="'/EditUsermanagement/' + $route.params.id"> -->
                    <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="editpost"></Button>
                    <!-- </router-link> -->
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
import axios from 'axios';
import PostmanagementService from '../../service/API/PostmanagementService';
import validateCreatepost from '../../validations/PostManagement/validateCreatepost';
// import utils from '@/service/utils';
import moment from 'moment';

export default {
    name: 'ViewUserManagement',
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

            user_location: '',
            post_type: '',
            post_tag: '',
            title: '',
            user_name: '',
            create_date: '',
            post_description: '',
            post_images: [],
            recruitment_place: '',
            recruitment_start: '',
            recruitment_end: '',
            is_involved: '',
            person_involved: '',
            activity_start_time: '',
            activity_end_time: '',
            post_location: '',
            additional_terms: '',
            tagDropdownValues: '',
            tagDropdownValue: null,
            tag_id: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.postmanagementService = new PostmanagementService();
    },

    methods: {
        editpost() {
            let vcheckData = {
                tag_id: this.tag_id.toString(),
            };

            const { isInvalid, error } = validateCreatepost(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('id', this.$route.params.id);
                this.formData.append('tag_id', this.tag_id);
                console.log(this.name);
                return axios.post('admin/post/edit-tags', { post_id: this.$route.params.id, tag_id: this.tag_id }).then(() => {
                    // alert('Admin User Updated successfully.');
                    console.log(this.$route.params.id);
                    this.$router.push({ name: 'PostManagementList' });
                    setTimeout(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '게시물이 성공적으로 업데이트되었습니다.', life: 3000 });
                    }, 1000);
                });
            }
        },

        // postlist() {
        //     const postlistParams = {
        //         page: 1,
        //         limit: this.pagination.pagination_limit,
        //     };
        //     this.loading1 = true;
        //     this.postmanagementService
        //         .getPostList(postlistParams)
        //         .then((res) => {
        //             this.customer1 = res.data.result;

        //             this.FromyearOfBirthDropdownValues = res.data.result;
        //             this.ToyearOfBirthDropdownValues = res.data.result;
        //             //                 this.company_id= this.company.id;
        //             // console.log("this.company_id",this.company_id);

        //             console.log('res', this.customer1);
        //             console.log(res);
        //             this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
        //             this.loading1 = false;
        //         })
        //         .catch((err) => console.log(err));
        // },

        // setPagination(current_page, total_pages, total_records) {
        //     this.pagination.current_page = current_page;
        //     this.pagination.total_pages = total_pages;
        //     this.pagination.total_records = total_records;
        // },

        // get_paginator_page(total, active) {
        //     return utils.paginate(total, active);
        // },

        // paginate(page) {
        //     this.loading1 = true;
        //     // var start_date = this.formatRangeDate(this.date_range.at(0));
        //     // var end_date = this.formatRangeDate(this.date_range.at(1));
        //     this.postmanagementService
        //         .getPostList({ page: page, limit: this.pagination.pagination_limit, apartment_id: this.apartment_id, post_type: this.post_type, tag_id: this.tag_id, title: this.title, nickname: this.nickname, startDate: this.startDate, endDate: this.endDate })
        //         .then((res) => {
        //             this.customer1 = res.data.result;
        //             console.log('paginate', this.customer1);
        //             this.pagination.current_page = page;
        //             this.loading1 = false;
        //             // console.log(res.data);
        //         })
        //         .catch((err) => console.log(err));

        // },
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },
        dateformat(value) {
            if (value) {
                console.log();
                // return moment(String(value)).locale('ko').format('LLL')
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },

        formatRecruitmentDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll');
            }
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
        // this.postlist();

        this.postmanagementService.postview(this.$route.params.id).then((res) => {
            this.user_location = res.data.result.user_location;
            this.post_type = res.data.result.post_type;
            this.post_tag = res.data.result.post_tag;
            this.tag_id = res.data.result.tag_id;
            this.title = res.data.result.title;
            this.user_name = res.data.result.user_name;
            this.create_date = res.data.result.create_date;
            this.post_description = res.data.result.post_description;
            this.post_images = res.data.result.post_images;
            this.recruitment_place = res.data.result.recruitment_place;
            this.recruitment_start = res.data.result.recruitment_start;
            this.recruitment_end = res.data.result.recruitment_end;
            this.activity_start_time = res.data.result.activity_start_time;
            this.activity_end_time = res.data.result.activity_end_time;
            this.post_location = res.data.result.post_location;
            this.additional_terms = res.data.result.additional_terms;
            this.is_involved = res.data.result.is_involved;
            this.person_involved = res.data.result.person_involved;

            console.log(this.username);
        });

        const postlistParams = {
            page: 1,
            limit: 1000,
        };

        this.postmanagementService

            .gettagList(postlistParams)

            .then((res) => {
                this.tagDropdownValues = res.data.result;
                // this.products = data;
                this.loading1 = false;
                // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                console.log(this.customer1);
                // console.log(data);
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

span.p-image.p-component.product-image {
    margin: 0 10px 0 0;
}
</style>
