<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>수정</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">글자수 (bytes)</label>
                            <InputText  type="text" placeholder="글자 수 제한을 입력하세요." v-model="post_chracter"  id="name"  disabled></InputText>
                        </div>
                    </div>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">꿀 차등 지급 개수</label>
                            <InputText type="text" :class="`${error.charcter_honey_per_activity ? 'p-invalid' : ''}`" v-model="charcter_honey_per_activity"  placeholder="꿀 수를 입력하세요."  id="name" onkeypress="return /[0-9]/i.test(event.key)" ></InputText>

                            <div class="text-red">{{ error.charcter_honey_per_activity }}</div>
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
import validateCreatePostRegistrationRewards from '../../validations/RewardManagement/validateCreatePostRegistrationRewards';
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
            charcter_honey_per_activity:'',
            post_chracter:'',
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
         this.rewardManagementListService = new RewardManagementListService();
    },
    mounted() {
       
        this.rewardManagementListService.getPostRegistrationRewardsview(this.$route.params.id).then((res) => {
          
             this.post_chracter = res.data.result.post_chracter;
             this.charcter_honey_per_activity = res.data.result.charcter_honey_per_activity;

            console.log(res);
        });
    },
    methods: {
      
       
        
        editHoneymanagement() {
            var self = this;
            let vcheckData = {
                charcter_honey_per_activity: self.charcter_honey_per_activity.toString(),
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreatePostRegistrationRewards(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                self.formData.append('id', self.$route.params.id);
                self.formData.append('charcter_honey_per_activity', self.charcter_honey_per_activity);
                
                // console.log(self.name);
                return axios.post('/admin/reward/post-register-honey-edit', { id: self.$route.params.id,post_chracter: self.post_chracter,charcter_honey_per_activity: self.charcter_honey_per_activity , language: 'en' }  ).then(() => {
                    //  alert('아파트가 성공적으로 추가되었습니다.');
                    self.$router.push({ name: 'RewardManagementList' });
                    setTimeout(() => {
                        self.$toast.add({ severity: 'info', summary: '확인.', detail: '업데이트가 완료되었습니다' , life: 3000 });
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