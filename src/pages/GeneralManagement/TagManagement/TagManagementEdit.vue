<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>태그 수정</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">태그</label>
                            <InputText type="text" :class="`${error.name ? 'p-invalid' : ''}`" placeholder="태그" v-model="name" id="title2"></InputText>
                            <div class="text-red">{{ error.name }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">텍스트 색상</label>
                            <br>
                           
                            <Dropdown v-model="color" :class="`${error.color ? 'p-invalid' : ''}`" :options="dropdownValues" optionLabel="name" optionValue="code" placeholder="하나를 고르시 오" />
                            <div class="text-red">{{ error.color }}</div>
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
                <Button label="저장" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="editTag"></Button>
                <!-- <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resettag"></Button> -->
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
import TagManagementService from '../../../service/API/TagManagementService';
import validateEditTag from '../../../validations/tag/validateEditTag';
import utils from '@/service/utils';
export default {
    name: 'TagManagementadd',
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
            dropdownValues: [
                { name: '라이트블루', code: '#458AED' },
                { name: '주황색', code: '#FF9067' },
                { name: '녹색', code: '#93C04F'},
                { name: '다크오렌지', code: '#FF6744' },
                { name: '라이트오렌지', code: '#FBBA7C' },
                { name: '노란색', code: '#FDAA2E' },
                { name: '회색', code: '#A8A08D' },
            ],
            dropdownValue: null,
            name: '',
            status: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            error: {},
            color: '',
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.tagManagementService = new TagManagementService();
    },
    mounted() {
        this.tagManagementlist();

        this.tagManagementService.tagManagementview(this.$route.params.id).then((res) => {
            this.name = res.data.result.name;
            this.color = res.data.result.color;
            this.status = res.data.result.status;
            this.create_date = res.data.result.create_date;
            this.created_by = res.data.result.created_by;
            this.create_date = res.data.result.create_date;

            console.log(res.data.result);
        });
    },
    methods: {
        getStatus(values) {
            return values === 'active' ? true : false;
        },
        tagManagementlist() {
            const postlistParams = {
                page: 1,
                limit: this.pagination.pagination_limit,
            };
            this.loading1 = true;
            this.tagManagementService
                .getTagManagementList(postlistParams)
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
            this.tagManagementService
                .getTagManagementList({ page: page, limit: this.pagination.pagination_limit, name: this.name, startDate: this.startDate, endDate: this.endDate })
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
        resettag() {
            (this.name = ''), (this.status = ''), this.tagManagementlist();
        },
        editTag() {
            let vcheckData = {
                name: this.name,
                status: this.status,
                color: this.color,
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateEditTag(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('id', this.$route.params.id);
                this.formData.append('name', this.name);
                this.formData.append('status', this.status == '' ? 'inactive' : 'active');
                this.formData.append('color', this.color);
                console.log(this.formData);
                return axios.post('/admin/tags/edit', { id: this.$route.params.id ,name: this.name, status: this.status == '' ? 'inactive' : 'active', color: this.color}).then(() => {
                    // alert('Tag added successfully.');
                    this.$router.push({ name: 'TagManagementlist' });
                    setTimeout(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '태그가 성공적으업데이트 다.', life: 3000 });
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