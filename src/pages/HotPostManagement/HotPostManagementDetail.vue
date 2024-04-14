<template>
    <div class="p-grid">
        <Toast />
        <ConfirmDialog group="dialog" />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>공지글 & 인기글 상세</strong>
                </h4>
                <div class="p-field p-grid">
                    <label for="category_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시글 이미지:</label>
                    <div class="p-col-12 p-md-10" style="display: contents">
                                <div v-for="(post_images, img) in post_images" :key="img" style="margin: 5px">
                                    <span v-if="post_images == []">이미지를 사용할 수 없음</span>

                                    <span v-else>
                                        <Image :src="post_images" alt="이미지를 사용할 수 없음" width="150" height="100" preview/>

                                    </span>

                                    <!-- <Image :src="post_images" alt="이미지를 사용할 수 없음" width="150" height="100" preview/> -->
                                </div>
                            
                        <!-- <Image :src="product_image" alt="이미지를 사용할 수 없음" class="product-image" width="137" height="85" /> -->
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시글 제목:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p>{{ title }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">게시글 설명:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ description }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">단지명:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ apartment_name }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">작성자:</label>
                    <div class="p-col-12 p-md-10">
                       {{ user_name }}
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">작성 일자:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ formatDate(create_date) }}</p>
                    </div>
                </div>
                <div class="p-d-flex p-jc-end" style="float: right">

                    <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                </div>
                <br />
            </div>
        </div>

        
    </div>
</template>


<script>
// import axios from 'axios';
import PromotionalPostManagementService from '../../service/API/PromotionalPostManagementService';
// import utils from '@/service/utils';
import moment from 'moment';
// import { stat } from 'fs';

export default {
    name: 'ProductManagementview',
    data() {
        return {
            getUserId: null,
            getUserId1: null,
            gettarnsactionId: null,
            gettarnsactionId1: null,
            render: true,
            display: false,
            delivereddisplay: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            name: '',

            id: '',
            result: [],
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
            description: '',
            product_image: '',
            honey: '',
            create_date: '',
            username: '',
            apartment_name: '',
            user_name: '',
            product_status: '',
            product_id: '',
            user_id: '',
            transaction_id:'',
            is_requested_by_user:'',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.promotionalPostManagementService = new PromotionalPostManagementService();
    },

    methods: {
        
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll ');
            }
        },

        formatDateproductlist(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },

    },

    mounted() {
        // this.productManagementViewlist();
        this.promotionalPostManagementService.promotionalPostManagementview(this.$route.params.id).then((res) => {
            this.id = res.data.result.id;
            this.post_images = res.data.result.post_images.toString().split(",");
            this.title = res.data.result.title;
            this.description = res.data.result.description;
            this.apartment_name = res.data.result.apartment_name;
            this.user_name = res.data.result.user_name;
            this.create_date = res.data.result.create_date;
            console.log(res.data.result);
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