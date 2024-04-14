<template>
    <div class="p-grid">
        <ConfirmDialog group="dialog" />
        <Toast />
        <!-- <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" label="Go Back" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div> -->
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>Edit Details</strong>
                </h4>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <label for="nameuser">Nick Name</label>
                        <InputText id="nameuser" :class="`${error.nickname ? 'p-invalid' : ''}`" type="text" placeholder="Nick_Name" :modelValue="mydata.nickname" v-model="mydata.nickname" />
                        <div class="text-red">{{ error.nickname }}</div>
                    </div>
                    <div class="p-field p-col">
                        <label for="emailuser">Id</label>
                        <InputText id="emailuser" type="text" placeholder="Id" :modelValue="mydata.id" v-model="mydata.id" disabled />
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <label for="nameuser">Name</label>
                        <InputText id="nameuser" :class="`${error.name ? 'p-invalid' : ''}`" type="text" placeholder="Name" :modelValue="mydata.name" v-model="mydata.name" />
                        <div class="text-red">{{ error.name }}</div>
                    </div>
                    <div class="p-field p-col">
                        <label for="emailuser">Gender</label>
                        <Dropdown id="state" :class="`${error.gender ? 'p-invalid' : ''}`" v-model="mydata.gender" :options="genders" optionLabel="name" :placeholder="mydata.gender"></Dropdown>
                        <div class="text-red">{{ error.gender }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <label for="agegroup">Age Group</label>
                        <Dropdown id="state" v-model="mydata.age_group" :options="age_groups" optionLabel="name" :placeholder="mydata.age_group"></Dropdown>
                        <div class="text-red">{{ error.ageGroup }}</div>
                    </div>
                    <div class="p-field p-col">
                        <label for="emailuser">Marital status</label>
                        <Dropdown id="state" v-model="mydata.married" :options="marital_statuss" optionLabel="name" :placeholder="mydata.married == true ? 'married' : 'unmarried'"></Dropdown>
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <label for="agegroup">Children</label>
                        <Dropdown id="state" v-model="mydata.has_children" :options="childrens" optionLabel="name" :placeholder="mydata.has_children == true ? 'Yes' : 'No'"></Dropdown>
                        <div class="text-red">{{ error.hChildren }}</div>
                    </div>
                    <div class="p-field p-col">
                        <label for="emailuser">Children's Age</label>
                        <Dropdown id="state" v-model="dropdownItem" :options="childrensAge" optionLabel="name" placeholder="Select One"></Dropdown>
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <label for="agegroup">Pets</label>
                        <Dropdown id="state" v-model="mydata.has_pets" :options="pets" optionLabel="name" :placeholder="mydata.has_pets == true ? 'Yes' : 'No'"></Dropdown>
                        <div class="text-red">{{ error.name }}</div>
                    </div>
                    <div class="p-field p-col">
                        <label for="emailuser">Pet's Type</label>
                        <InputText id="emailuser" type="text" placeholder="pets type" :modelValue="petType" v-model="mydata.id" disabled />
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <label for="agegroup">Account Status</label>
                        <Dropdown id="state" v-model="mydata.status" :options="accountStatus" optionLabel="name" :placeholder="mydata.status"></Dropdown>
                        <div class="text-red">{{ error.name }}</div>
                    </div>
                    <div class="p-field p-col">
                        <label for="emailuser">Point</label>
                        <InputText id="emailuser" type="text" placeholder="points" :modelValue="mydata.points" v-model="mydata.points" disabled />
                        <div class="text-red">{{ error.email }}</div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-between">
                <ConfirmPopup group="popup"></ConfirmPopup>
                <div>
                    <Button ref="popup" @click="confirm($event)" label="Save" class="p-mr-2"></Button>
                    <Button @click="del($route.params.id)" label="Delete" class="p-mr-2 p-button-outlined"></Button>
                </div>
                <div>
                    <Button @click="$router.go(-1)" label="Back" class="p-mr-2 p-button-outlined" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import validateEditUser from '../../validations/user/validateEditUser';
import UserService from '../../service/API/UserService';
import axios from 'axios';
export default {
    data() {
        return {
            genders: [
                { name: 'male', code: 'm' },
                { name: 'female', code: 'f' },
            ],
            age_groups: [
                { name: '25~35', code: '25 ~ 35' },
                { name: '35~45', code: '35 ~ 45' },
                { name: '45~55', code: '45 ~ 55' },
                { name: '55~65', code: '55 ~ 65' },
            ],
            marital_statuss: [
                { name: 'married', code: true },
                { name: 'unmarried', code: false },
            ],
            childrens: [
                { name: 'Yes', code: true },
                { name: 'No', code: false },
            ],
            pets: [
                { name: 'Yes', code: true },
                { name: 'No', code: false },
            ],
            accountStatus: [
                { name: 'Active', code: 'Active' },
                { name: 'Inactive', code: 'Inactive' },
            ],
            childrensAge: [
                { name: 'Infant', code: 'Infant' },
                { name: 'School Age', code: 'School Age' },
                { name: 'Adult Age', code: 'Adult Age' },
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
            mydata: {},
            error: {},
            petType: '',
        };
    },
    created() {
        this.userService = new UserService();
    },
    methods: {
        open() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                group: 'popup',
                message: '이대로 진행하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: '확인',
                rejectLabel: ' 취소',
                accept: () => {
                    let vcheckData = {
                        nickname: this.mydata.nickname,
                        name: this.mydata.name,
                        gender: this.mydata.gender,
                        ageGroup: this.mydata.age_group,
                        maritalStatus: String(this.mydata.married),
                        hChildren: String(this.mydata.has_children),
                    };
                    console.log(vcheckData);
                    const { isInvalid, error } = validateEditUser(vcheckData);
                    if (isInvalid) {
                        this.error = error;
                        console.log(error);
                    } else {
                        this.error = {};
                        console.log('pass');
                        this.userService
                            .updateUser(
                                this.$route.params.id,
                                this.mydata.nickname,
                                this.mydata.name,
                                this.mydata.gender.name,
                                this.mydata.age_group.code,
                                this.mydata.married.code,
                                this.mydata.status,
                                this.mydata.has_children.code,
                                this.mydata.children,
                                this.mydata.has_pets.code,
                                this.mydata.pets
                            )
                            .then((res) => {
                                console.warn(res);
                                this.$router.push({ name: 'User' });
                            })
                            .catch((res) => alert(res));
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다.', detail: '취소되었습니다.', life: 3000 });
                },
            });
        },
        del(id) {
        this.$confirm.require({
            group: 'dialog',
            header: '확인',
            message: '삭제하시겠습니까?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: '확인',
            rejectLabel: ' 취소',
            accept: () => {
                axios({ method: 'patch', url: `/user/delete`, data: { id: id, status: 'deleted' } }).then((res) => {
                    console.warn(res);
                    this.$router.push({ name: 'User' });
                });

                this.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다.', life: 3000 });
            },
            reject: () => {
                this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
            },
        });
    },
    },
    mounted() {
        this.userService.viewUser(this.$route.params.id).then((res) => {
            this.mydata = res;
            console.log(res);
            //Code
            let objArray = res.pets;
            let output = [];
            for (let item of objArray) {
                output.push(item.type);
            }
            this.petType = output.toString();
        });
    },
};
</script>

<style scoped>
.p-fluid .p-button {
    width: auto;
}
</style>
