<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>수정</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">활동 타입</label>
                            <InputText  type="text" placeholder="활동 유형을 입력하세요." v-model="activity_type"  id="name"  disabled></InputText>
                        </div>
                    </div>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">1일 최대 부여 횟수(일반)</label>
                            <InputText type="text" :class="`${error.activity_limit ? 'p-invalid' : ''}`" v-model="activity_limit"  placeholder="일일 활동 한도를 입력하세요."  id="name" onkeypress="return /[0-9]/i.test(event.key)" ></InputText>

                            <div class="text-red">{{ error.activity_limit }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">1일 최대 부여 횟수(VIP)</label>
                            <InputText type="text" :class="`${error.vip_activity_limit ? 'p-invalid' : ''}`" v-model="vip_activity_limit"  placeholder="일일 VIP 사용자 활동을 입력하십시오."  id="name" onkeypress="return /[0-9]/i.test(event.key)" ></InputText>

                            <div class="text-red">{{ error.vip_activity_limit }}</div>
                        </div>
                    </div>

                    <!-- <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">꿀 지급 개수</label>
                            <InputText type="text" :class="`${error.honey_per_activity ? 'p-invalid' : ''}`" v-model="honey_per_activity"  placeholder="활동당 꿀(포인트)을 입력해주세요."  id="name" onkeypress="return /[0-9]/i.test(event.key)" ></InputText>
                            <div class="text-red">{{ error.honey_per_activity }}</div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="editHoneymanagement"></Button>
            </div>
            <br>
           
            
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import validateCreatePostManagement from '../../validations/RewardManagement/validateCreatePostManagement';
import RewardManagementListService from '../../service/API/RewardManagementListService';
export default {
    name: 'AddProductManagement',
    data() {
        return {
            btnDisabled: false,
            render: true,
            render2: false,
              render3: false,
              render4: false,
              render4Value : '',
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,        
            activity_type: '',
            activity_limit:'',
            honey_per_activity:'',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            displayType:'',
            status:'',
            error: {},
            id:'',
            formData: new FormData(),
            vip_activity_limit:'',
        };
    },
    customerService: null,
    productService: null,
    created() {
         this.rewardManagementListService = new RewardManagementListService();
    },
    mounted() {
       
        this.rewardManagementListService.gethoneyview(this.$route.params.id).then((res) => {
            this.activity_type = res.data.result.activity_type;
            if(res.data.result.activity_type == 'post'){
                this.activity_type = '게시물 등록';
            }else if(res.data.result.activity_type == 'comment'){
                this.activity_type = '댓글 등록';
            }else if(res.data.result.activity_type == 'reply'){
                this.activity_type = '대댓글 등록';
            }else {
                this.activity_type = '';
            }
            this.activity_limit = res.data.result.activity_limit;
            this.honey_per_activity = res.data.result.honey_per_activity;
            this.vip_activity_limit =  res.data.result.vip_activity_limit;
            console.log(res);
        });
    },
    methods: {
      
       
        
        editHoneymanagement() {
            var self = this;
            let vcheckData = {
                activity_limit: self.activity_limit.toString(),
                honey_per_activity: self.honey_per_activity.toString(),
                vip_activity_limit: self.vip_activity_limit.toString(),
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreatePostManagement(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                self.formData.append('id', self.$route.params.id);
                self.formData.append('activity_limit', self.activity_limit);
                self.formData.append('honey_per_activity', self.honey_per_activity);
                
                // console.log(self.name);
                return axios.post('/admin/reward/honey-edit', { id: self.$route.params.id,activity_limit: self.activity_limit,honey_per_activity: self.honey_per_activity ,vip_activity_limit: self.vip_activity_limit }  ).then(() => {
                    // alert('아파트가 성공적으로 추가되었습니다.');
                    self.$router.push({ name: 'RewardManagementList' });
                    setTimeout(() => {
                        self.$toast.add({ severity: 'info', summary: '확인.', detail: '꿀이 성공적으로 업데이트되었습니다.', life: 3000 });
                    }, 1000);
                })
                .catch(function (err) {
                        // console.log(err.response.data.message);
                        
                        // alert('이메일이 이미 존재합니다');
                        self.$toast.add({ severity: 'error', summary: '거부됨.', detail: err.response.data.message, life: 3000 });
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

.product-image {
    padding-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
    height: 100px;
    float: right;
}
</style>