<template>
    <div class="p-grid">
        <Toast />
        <ConfirmDialog group="dialog" />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>상품 상세</strong>
                </h4>
                <div class="p-field p-grid">
                    <label for="category_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">상품명:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ title }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">설명:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p>{{ description }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">상품 이미지:</label>
                    <div class="p-col-12 p-md-10">
                        <Image :src="product_image" alt="이미지를 사용할 수 없음" class="product-image" width="137" height="85" />
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">상품 금액(꿀):</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ honey }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">노출:</label>
                    <div class="p-col-12 p-md-10">
                        <InputSwitch v-model="status" trueValue="active" />
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">등록일자:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ formatDate(create_date) }}</p>
                    </div>
                </div>
                <div class="p-d-flex p-jc-end" style="float: left">
                    <router-link :to="'/EditProductManagement/' + $route.params.id">
                        <Button label="help" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2">
                            <i class="pi pi-user-edit p-mr-2"></i>
                            수정
                        </Button>
                    </router-link>

                    <Button class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="deleteNote($route.params.id)"> 삭제</Button>
                </div>
                <br />
            </div>
        </div>

        
    </div>
</template>


<script>
// import axios from 'axios';
import ProductmanagementService from '../../service/API/ProductmanagementService';
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
        this.productmanagementService = new ProductmanagementService();
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

        productlist() {
            const productlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.productmanagementService
                .getProductList(productlistParams)
                .then((res) => {
                    this.customer1 = res.data.result;
                    console.log('res', this.customer1);
                    console.log(res);
                    this.setPagination(res.data.current_page, res.data.total_pages === 0 ? 1 : res.data.total_pages, res.data.total_records);
                    this.loading1 = false;
                })
                .catch((err) => console.log(err));
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
                    self.productmanagementService
                        .delete({ id: id })
                        .then(function (response) {
                            console.log(response);

                            self.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
                            self.productlist();
                            setTimeout(() => {
                                self.$router.push({ name: 'ProductManagementList' });
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
    },

    mounted() {
        // this.productManagementViewlist();
        this.productlist();
        const productlistviewParams = {
            id: this.$route.params.id,
        };
        this.productmanagementService.productview(productlistviewParams).then((res) => {
            this.id = res.data.id;
            this.title = res.data.title;
            this.description = res.data.description;
            this.product_image = res.data.image;
            this.honey = res.data.honey;
            this.status = res.data.status;
            this.create_date = res.data.create_date;
            this.user_id = res.data.result.user_id;
            this.transaction_id = res.data.result.transaction_id;

            console.log(this.transaction_id);
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