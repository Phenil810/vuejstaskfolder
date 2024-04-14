<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>가입 경로 추가</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">가입 경로</label>
                            <InputText type="text" :class="`${error.title ? 'p-invalid' : ''}`" placeholder="가입 경로" v-model="title" id="title2"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">노출</label>
                            <div>
                                <InputSwitch :class="`${error.status ? 'p-invalid' : ''}`" trueValue="active" v-model="status" />
                                <div class="text-red">{{ error.status }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button label="저장" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="addSubscriptionpathmanagement"></Button>
                <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetSubscriptionpathmanagement"></Button>
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
// import ApartmentService from '../../service/API/ApartmentService';
import SubscriptionpathmanagementService from '../../../service/API/SubscriptionpathmanagementService';
import validateCreateSubscriptionpathmanagement from '../../../validations/Subscriptionpathmanagement/validateCreateSubscriptionpathmanagement';
import utils from '@/service/utils';
export default {
    name: 'Subscriptionpathmanagementadd',
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
            pagination: {
                current_page: 1,
                pagination_limit: 10,
                total_pages: 0,
                total_records: 0,
            },
            title: '',
            status: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            error: {},
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.subscriptionpathmanagementService = new SubscriptionpathmanagementService();
    },
    mounted() {
        this.Subscriptionpathmanagementlist();
    },
    methods: {
        getStatus(values) {
            return values === 'active' ? true : false;
        },
        Subscriptionpathmanagementlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.subscriptionpathmanagementService
                .getSubscriptionpathmanagementList(postlistParams)
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
            this.subscriptionpathmanagementService
                .getSubscriptionpathmanagementList({ page: page, limit: this.pagination.pagination_limit, title: this.title, startDate: this.startDate, endDate: this.endDate })
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
        resetSubscriptionpathmanagement() {
            (this.title = ''), (this.status = ''), this.Subscriptionpathmanagementlist();
        },
        addSubscriptionpathmanagement() {
            let vcheckData = {
                title: this.title,
                status: this.status,
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreateSubscriptionpathmanagement(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('title', this.title);
                this.formData.append('status', this.status == '' ? 'inactive' : 'active');
                console.log(this.formData);
                return axios.post('/admin/recomendation/add', { title: this.title, status: this.status == '' ? 'inactive' : 'active' }).then(() => {
                    // alert('Subscription added successfully.');
                    this.$router.push({ name: 'Subscriptionpathmanagementlist' });
                    setTimeout(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '구독이 성공적으로 추가되었습니다.', life: 3000 });
                    }, 1000);
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
</style>