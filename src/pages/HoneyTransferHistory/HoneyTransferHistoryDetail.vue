<template>
    <div class="p-grid">
        <Toast />
        <ConfirmDialog group="dialog" />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>상세</strong>
                </h4>
                

                <div class="p-field p-grid">
                    <label for="material_name_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">단지명:</label>
                    <div class="p-col-12 p-md-10 url">
                        <p>{{ apartment_name }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_name_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">꿀 발송인:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ from_user }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">꿀 수신인:</label>
                    <div class="p-col-12 p-md-10">
                        <p>{{ to_user }}</p>
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="standard_en" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">꿀 거래 금액:</label>
                    <div class="p-col-12 p-md-10">
                        {{ point }}
                    </div>
                </div>

                <div class="p-field p-grid">
                    <label for="material_description_ko" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">발송일자:</label>
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
import HoneyTransferHistoryService from '../../service/API/HoneyTransferHistoryService';
// import utils from '@/service/utils';
import moment from 'moment';
// import { stat } from 'fs';

export default {
    name: 'HoneyTransferHistoryDetail',
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

         
            create_date: '',
            apartment_name: '',
            from_user: '',
            point: '',
            to_user: '',
            product_id: '',
            user_id: '',
            transaction_id: '',
            is_requested_by_user: '',
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.honeyTransferHistoryService = new HoneyTransferHistoryService();
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
        this.honeyTransferHistoryService.honeyTransferHistoryview(this.$route.params.id).then((res) => {
            this.id = res.data.result.id;
            this.apartment_name = res.data.result.apartment_name;
            this.from_user = res.data.result.from_user;
            this.to_user = res.data.result.to_user;
            this.create_date = res.data.result.create_date;
            this.point = res.data.result.point;

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