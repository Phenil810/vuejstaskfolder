<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>단지 추가</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">단지명</label>
                            <InputText type="text" :class="`${error.name ? 'p-invalid' : ''}`" placeholder="단지명 입력" v-model="name" id="title2"></InputText>
                            <div class="text-red">{{ error.name }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">시/도 선택</label>
                            <Dropdown v-model="state_id" :class="`${error.state_id ? 'p-invalid' : ''}`" :options="apartmentStateDropdownValues" optionValue="id" optionLabel="name" placeholder="선택" @change="statedropdown(state_id)"  />
                            <div class="text-red">{{ error.state_id }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">구 선택</label>
                            <MultiSelect
                                v-model="dist_id"
                                :class="`${error.dist_id ? 'p-invalid' : ''}`"
                                display="chip"
                                :options="DistrictdropdownValues"
                                optionValue="id"
                                optionLabel="name"
                                placeholder="선택"
                                @click="districtdropdown()"
                                @change="districtdropdown(dist_id)"
                                :maxSelectedLabels="3"
                                class="w-full md:w-20rem"
                            />
                            <div class="text-red">{{ error.dist_id }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">동 선택</label>
                            <MultiSelect
                                v-model="city_id"
                                :class="`${error.city_id ? 'p-invalid' : ''}`"
                                display="chip"
                                :options="citydropdownValues"
                                optionValue="id"
                                optionLabel="name"
                                placeholder="선택"
                                @click="citydropdown()"
                                :maxSelectedLabels="3"
                                class="w-full md:w-20rem"
                            />
                            <div class="text-red">{{ error.city_id }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="addComplexmanagement"></Button>
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
import ApartmentService from '../../service/API/ApartmentService';
import validateCreateApartment from '../../validations/apartment/validateCreateApartment';
export default {
    name: 'AddComplexManagement',
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
            state_id: '',
            dist_id: '',
            city_id: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            apartmentStateDropdownValues: '',
            apartmentStateDropdownValue: null,
            DistrictdropdownValues: '',
            DistrictdropdownValue: null,
            citydropdownValues: '',
            citydropdownValue: null,
            currentstateId: '',
            currentdistrictId: '',
            error: {},
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.apartmentService = new ApartmentService();
    },
    mounted() {
        this.statedropdown();
        this.districtdropdown();
        this.citydropdown();
    },
    methods: {
        statedropdown(value) {
            this.currentstateId = value;
            console.log(this.currentstateId, 'id..');
            this.dist_id = ''; 
            this.city_id = '';
            this.apartmentService

                .getStateList()

                .then((res) => {
                    this.apartmentStateDropdownValues = res.data.result;
                    // this.products = data;
                    this.loading1 = false;
                    // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                    // console.log(data);
                });
        },

        districtdropdown(value) {
            this.currentdistrictId = value;
            this.city_id = '';

            let data = {
                state_id: this.currentstateId,
            };

            this.apartmentService

                .getDistrictList(data)

                .then((res) => {
                    this.DistrictdropdownValues = res.data.result;
                    // this.products = data;
                    this.loading1 = false;
                    // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                    // console.log(data);
                });
        },

        citydropdown() {
            let data = {
                dist_id: this.currentdistrictId,
            };

            this.apartmentService

                .getcitytList(data)

                .then((res) => {
                    this.citydropdownValues = res.data.result;
                    // this.products = data;
                    this.loading1 = false;
                    // this.products.forEach((customer) => (customer.createdDate = new Date(customer.createdDate)));
                    // console.log(data);
                });
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
        addComplexmanagement() {
            var self = this;
            let vcheckData = {
                name: self.name,
                state_id: self.state_id.toString(),
                dist_id: self.dist_id.toString(),
                city_id: self.city_id.toString(),
            };

            const { isInvalid, error } = validateCreateApartment(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                self.formData.append('name', self.name);

                console.log(self.name);
                return axios
                    .post('/admin/apartment/add', {
                        name: self.name,
                        state_id: self.state_id,
                        dist_id: self.dist_id,
                        city_id: self.city_id,
                    })
                    .then(() => {
                        // alert('아파트가 성공적으로 추가되었습니다.');
                        self.$router.push({ name: 'ComplexManagementList' });
                        setTimeout(() => {
                            self.$toast.add({ severity: 'info', summary: '확인.', detail: '아파트가 성공적으로 추가되었습니다.', life: 3000 });
                        }, 1000);
                    })
                    .catch(function (err) {
                        // console.log(err.response.data.message);
                        if (err.response.data.message == 'pleaseSelectCity') {
                            self.$toast.add({ severity: 'error', summary: '거부됨.', detail: '구에 속한 동을 선택해주세요', life: 3000 });
                        } else {
                            // alert('이메일이 이미 존재합니다');
                            self.$toast.add({ severity: 'error', summary: '거부됨.', detail: err.response.data.message, life: 3000 });
                        }
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