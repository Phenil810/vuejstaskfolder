<template>
    <ConfirmDialog group="dialog" />
    <div class="p-grid">
        <!-- <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" label="Go Back" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div> -->
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4><strong>{{ $t('usermanagement.list.User Details') }}</strong></h4>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{ $t('usermanagement.list.Nickname') }}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.nickname }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{ $t('usermanagement.list.Id') }}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.id }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{ $t('usermanagement.list.Name') }}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.name }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{ $t('usermanagement.list.Gender') }}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.gender }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Age Group')}}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.age_group }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Marital Status')}}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.married==true?'married':'unmarried' }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Children')}}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.has_children==true?'Yes':'No' }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Childs Age')}}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.children_age }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Pets')}}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.has_pets == 'true' ? 'Yes' : 'No' }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Pets Type')}}:</label>
                    <div class="p-col-12 p-md-10">{{ mydata.pet_type }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Account Status')}}:</label>
                    <SelectButton v-model="value1" :options="options" @click="updateData"/>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Point')}}:</label>
                    <div class="p-col-12 p-md-10">{{mydata.points}}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">{{$t('usermanagement.list.Registration date & Time')}}:</label>
                    <div class="p-col-12 p-md-10">{{ formatDateTime(mydata.created_date) }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="p-col-12 p-p-0">
        <div class="card">
            <div class="p-d-flex p-jc-between p-mb-2">
                    <div>
                        <h5>{{ $t('usermanagement.list.Point List') }}</h5>
                    </div>
                    <div>
                        <!-- <Button label="Primary" class="p-mr-2 p-mb-2" @click="excelUpload"><i class="pi pi-download p-mr-2"></i>{{ $t('Upload Excel') }}</Button> -->
                        <Button label="Primary" class="p-mr-2 p-mb-2" @click="exceldownload"><i class="pi pi-download p-mr-2"></i>{{ $t('button.downloadExcel') }}</Button>
                    </div>
                </div>
            <DataTable :value="pointHistory" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll" v-model:selection="selected">
                <!-- v-model:selection="selected" -->
                <ConfirmDialog group="dialog" />

                <template #empty> No Data found. </template>
                <template #loading> Loading data. Please wait. </template>

                <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                <Column field="slNO" :header="$t('#')" style="min-width: 12rem">
                    <template #body="{ index }">
                        <span class="p-column-title">Name</span>
                        {{ index + 1 }}
                    </template>
                </Column>
                <Column field="store_name" :header="$t('usermanagement.list.Shopname')" style="min-width: 12rem" :sortable="true">
                    <template #body="{ data }">
                        <span class="p-column-title">Shop Name</span>
                        {{ data.store_name }}
                    </template>
                </Column>
                <Column field="total_amount" :header="$t('usermanagement.list.Score')" style="min-width: 12rem" :sortable="true">
                    <template #body="{ data }">
                        <span class="p-column-title">Amount</span>
                        {{formatCurrency(data.points)}}
                    </template>
                </Column>
                <Column field="created_date" :header="$t('usermanagement.list.Date&Time')" style="min-width: 12rem" :sortable="true">
                    <template #body="{ data }">
                        <span class="p-column-title">Date & Time</span>
                        {{ formatDateTime(data.created_date) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <div class="p-col-12">
        <div class="p-d-flex p-jc-between">
            <div>
                <!-- <router-link :to="'/user/edit-user/' + $route.params.id"
                    ><Button label="help" class="p-button-outlined p-button-help p-mr-2 p-mb-2"><i class="pi pi-user-edit p-mr-2"></i> Edit</Button></router-link
                > -->
                <Button @click="del($route.params.id)" label="삭제" class="p-button-outlined p-button-danger p-mr-2 p-mb-2"><i class="pi pi-trash p-mr-2"></i> 삭제</Button>
            </div>
            <div>
                <Button @click="$router.go(-1)" label="뒤로가기" class="p-button-outlined p-mr-2 p-mb-2" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import UserService from '../../service/API/UserService';
// import {useRouter} from 'vue-router'
export default {
    data() {
        return {
            dropdownItems: [
                { name: 'male', code: 'male' },
                { name: 'female', code: 'female' },
                { name: 'others', code: 'others' },
            ],
            dropdownItem: null,
            mydata: {},
            pointHistory: [],
            value1:'',
            options: ['inactive', 'active'],
            uid:'',
        };
    },
    created() {
        this.userService = new UserService();
    },
    methods: {
        exceldownload() {
            this.userService
                .getPointHistoryExcel(parseInt(this.$route.params.id))
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'PointHistorylist.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
        },
         formatCurrency(value) {
            return value.toLocaleString();
        },
        updateData(){
             this.userService
                            .updateUser(
                                this.$route.params.id,
                                this.mydata.nickname,
                                this.mydata.name,
                                this.mydata.gender.name,
                                this.mydata.age_group.code,
                                this.mydata.married.code,
                                this.value1,
                                this.mydata.has_children.code,
                                this.mydata.children,
                                this.mydata.has_pets.code,
                                this.mydata.pets
                            )
                            .then(() => {
                            })
                            .catch(() => alert());
        },
        // currenyformat(val){
        //     return val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        // },
        formatDateTime(value) {
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
            if (hr < 10) {
                hr = '0' + hr;
            }
            if (min < 10) {
                min = '0' + min;
            }
            if (sec < 10) {
                sec = '0' + sec;
            }
            return (value = yyyy + '.' + mm + '.' + dd + ' ' + ' ' + hr + ':' + min + ':' + sec);
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
            console.log(res);
            this.mydata = res;
            this.value1=res.status;
            this.pointHistory = res.point_history;
            // console.log(this.mydata.nickname)
            console.log(res.point_history);
        });
    },
};
</script>
<style scoped>
.p-fluid .p-button {
    width: auto;
}
</style>
