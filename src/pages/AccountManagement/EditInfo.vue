<template>
    <div class="p-grid">
        <Toast />
        <!-- <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" label="Go Back" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div> -->
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>정보 수정</strong>
                </h4>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-5">
                        <label for="nameuser">이름</label>
                        <InputText id="nameuser" :class="`${error.name ? 'p-invalid' : ''}`" type="text" placeholder="이름" :modelValue="mydata.name" v-model="mydata.name" />
                        <div class="text-red">{{ error.name }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col-12 p-md-5">
                        <label for="emailuser">이메일 ID</label>
                        <InputText id="emailuser" type="text" placeholder="User_Id" :modelValue="mydata.email" v-model="mydata.email" disabled />
                    </div>
                </div>
                <!-- <div class="p-d-flex p-jc-end">
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button @click="cancel" icon="pi pi-times" label="Cancel" class="p-mr-2"></Button>
                    <Button ref="popup" @click="confirm($event)" icon="pi pi-check" label="Confirm" class="p-mr-2"></Button>
                </div> -->
                <div class="p-d-flex p-jc-between">
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button label="Primary" class="p-button-outlined p-mr-2 p-mb-2" @click="confirm($event)">저장</Button>
                    <Button label="Primary" class="p-button-outlined p-mr-2 p-mb-2" @click="$router.go(-1)">뒤로가기</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import editInfo from '../../validations/account/EditInfo';
import PasswordService from '../../service/API/PasswordService';
export default {
    data() {
        return {
            dropdownItems: [
                { name: 'male', code: 'm' },
                { name: 'female', code: 'f' },
            ],
            dropdownItem: null,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            products: null,
            selectedProduct: null,
            mydata: {
                name: '',
                email: '',
            },
            error: {},
        };
    },
    created() {
        this.passwordService = new PasswordService();
    },
    methods: {
        open() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        cancel() {
            this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            setTimeout(() => {
                this.$router.go(-1);
            }, 2000);
        },
        confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                group: 'popup',
                message: '계속 진행하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: '확인',
                rejectLabel: '취소',
                accept: () => {
                    let vcheckData = {
                        name: this.mydata.name,
                    };
                    console.log(vcheckData);
                    const { isInvalid, error } = editInfo(vcheckData);
                    if (isInvalid) {
                        this.error = error;
                        console.log(error);
                    } else {
                        this.error = {};
                        console.log('pass');
                        this.passwordService
                            .editInfos(this.mydata.name)
                            .then((res) => {
                                console.warn(res);
                                localStorage.setItem('UserName', this.mydata.name);
                                this.$router.push({ name: 'ComplexManagementList' });
                               
                                setTimeout(() => {
                                    this.$toast.add({ severity: 'info', summary: '확인하다.', detail: '업데이트 완료', life: 3000 });
                                }, 1000);
                            })
                            .catch((res) => alert(res));
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다.', detail: '취소되었습니다.', life: 3000 });
                },
            });
        },
    },
    mounted() {
        this.mydata.name = localStorage.getItem('UserName');
        this.mydata.email = localStorage.getItem('UserEmail');
    },
};
</script>

<style scoped>
.p-fluid .p-button {
    width: auto;
}
</style>
