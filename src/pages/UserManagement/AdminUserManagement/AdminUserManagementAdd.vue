<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>이메일 ID 추가</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">이메일 주소</label>
                            <InputText type="text" :class="`${error.email ? 'p-invalid' : ''}`" placeholder="이메일 ID 입력" v-model="email" id="title2"></InputText>
                            <div class="text-red">{{ error.email }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="addAdminUserManagement"></Button>
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
import validateCreateAdminUserManagement from '../../../validations/Usermanagementgs/validateCreateAdminUserManagement';
export default {
    name: 'AdminUserManagementAdd',
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
            email: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            error: {},
            success:'',
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
        // this.apartmentService = new ApartmentService();
    },
    mounted() {},
    methods: {
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
        addAdminUserManagement() {
            var self = this;
            let vcheckData = {
                email: self.email,
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreateAdminUserManagement(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                
                self.formData.append('email', self.email);
                console.log(self.success);
                return axios.post('/admin/user/add-email', { email: self.email }).then(() => {
                    // alert('Admin Email added successfully.');
                    self.$router.push({ name: 'AdminUserManagementlist' });
                    setTimeout(() => {
                        self.$toast.add({ severity: 'info', summary: '확인.', detail: '관리자 이메일이 성공적으로 추가되었습니다.', life: 3000 });
                    }, 1000);
                })
                .catch(function (err) {
                        console.log(err.response.data.message);
                        
                        // alert('이메일이 이미 존재합니다');
                        self.$toast.add({ severity: 'error', summary: '거부됨.', detail: '이메일이 이미 존재합니다', life: 3000 });
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