<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>수정</h5>
                    <h5><strong>퍼센트 적용률 :</strong></h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">댓글 (%) </label>
                            <InputText type="text"  placeholder="Enter Percentage" v-model="hot_issue_comment" id="name" onkeypress="return /[0-9]/i.test(event.key)"></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">좋아요 (%) </label>
                            <InputText type="text"  placeholder="Enter Percentage" v-model="hot_issue_like" id="name" onkeypress="return /[0-9]/i.test(event.key)"></InputText>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-6 p-mb-lg-0 p-field">
                            <label for="title2">뷰 (%) </label>
                            <InputText type="text"  placeholder="Enter Percentage" v-model="hot_issue_view" id="name" onkeypress="return /[0-9]/i.test(event.key)"></InputText>
                        </div>
                    </div>

                    <div v-show="render" class="text-red">댓글, 좋아요, 뷰의 적용 퍼센트 (%) 총 합은 100% 이어야 합니다.</div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left">
                <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="editHoneymanagement"></Button>
            </div>

            <div class="p-d-flex p-jc-end p-ai-center" style="float: right">
                <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
            </div>
            <br />
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import validateCreateHotPostManagement from '../../validations/HotPostManagement/validateCreateHotPostManagement';
import HotPostManagementService from '../../service/API/HotPostManagementService';
export default {
    name: 'AddProductManagement',
    data() {
        return {
            btnDisabled: false,
            render: false,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            activity_type: '',
            activity_limit: '',
            honey_per_activity: '',
            hot_issue_percent: '',
            hot_issue_comment: '',
            hot_issue_like: '',
            hot_issue_view: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            displayType: '',
            status: '',
            error: {},
            id: '',
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.hotPostManagementService = new HotPostManagementService();
    },
    mounted() {
        this.hotPostManagementService.gethotPostManagementview(this.$route.params.id).then((res) => {
            this.hot_issue_comment = res.data.result[0].percentage;
            this.hot_issue_like = res.data.result[1].percentage;
            this.hot_issue_view = res.data.result[2].percentage;

            console.log(res.data.result);
        });
    },
    methods: {
        

        editHoneymanagement() {
            var self = this;
            let vcheckData = {
                hot_issue_comment: self.hot_issue_comment.toString(),
                hot_issue_like: self.hot_issue_like.toString(),
                hot_issue_view: self.hot_issue_view.toString(),
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreateHotPostManagement(vcheckData);
            if (isInvalid) {
                self.error = error;
                console.log(error);
            } else {
                self.formData.append('id', self.$route.params.id);
                self.formData.append('hot_issue_comment', self.hot_issue_comment);
                self.formData.append('hot_issue_like', self.hot_issue_like);
                self.formData.append('hot_issue_view', self.hot_issue_view);

                // console.log(self.name);
                return axios
                    .post('/admin/post/edit-hot-issue', { id: self.$route.params.id, hot_issue_comment: self.hot_issue_comment.toString(), hot_issue_like: self.hot_issue_like.toString(), hot_issue_view: this.hot_issue_view.toString() })
                    .then(() => {
                        // alert('아파트가 성공적으로 추가되었습니다.');
                        self.$router.push({ name: 'HotPostManagementList' });
                        setTimeout(() => {
                            self.$toast.add({ severity: 'info', summary: '확인.', detail: 'Promotional post update successfully', life: 3000 });
                        }, 1000);
                        self.render = false;
                    })
                    .catch(function (err) {
                        console.log(err.response.data.message);

                        // self.$toast.add({ severity: 'error', summary: '거부됨.', detail: err.response.data.message, life: 3000 });
                        self.render = true;
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