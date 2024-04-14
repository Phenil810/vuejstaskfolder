<template>
    <div>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>공지사항 추가</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">제목</label>
                            <InputText type="text" :class="`${error.title ? 'p-invalid' : ''}`" placeholder="제목" v-model="title" id="title2"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">내용</label>
                            <Textarea type="text" :class="`${error.description ? 'p-invalid' : ''}`" placeholder="내용" v-model="description" id="title2"></Textarea>
                            <div class="text-red">{{ error.description }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="subtitle2">
                                이미지
                                <!-- <span class="img-info">(파일 형식: jpg,jpeg,png )(이미지 너비 200px )</span> -->
                            </label>
                            <div class="custom-select">
                                <span v-if="!fileName">이미지 선택</span>
                                <span v-else>{{ fileName }}</span>
                                <input type="file" class="select-file" v-on:change="onFileChange" />
                                <Button label="파일 선택" class="SelectBtn n-wrap" />
                            </div>
                            <div class="text-red" v-show="render1">{{ $t('validation.invalidFile') }}</div>
                            <img id="frame" src width="100px" height="100px" />
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">링크 텍스트</label>
                            <InputText type="text" :class="`${error.link_text ? 'p-invalid' : ''}`" placeholder="링크 텍스트" v-model="link_text" id="title2"></InputText>
                            <div class="text-red">{{ error.link_text }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">URL</label>
                            <InputText type="text" :class="`${error.url ? 'p-invalid' : ''}`" placeholder="URL" v-model="url" id="title2"></InputText>
                            <div class="text-red">{{ error.url }}</div>
                        </div>
                    </div>

                    
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left; margin-top: -18px">
                <Button label="저장" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="openResponsive" ></Button>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <!-- <Button :label="$t('Back')" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button> -->
                    <!-- <Button :label="$t('Confirm')" icon="pi pi-check" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2"></Button> -->
                </div>
            </div>
        </form>
        </div>
    

    <Dialog header="" v-model:visible="displayResponsive" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '15vw' }">
        <p class="text-choose">
            작성한 공지사항을 저장하시겠습니까?
        </p>
        <template #footer>
            <div class="p-d-flex p-jc-end p-ai-center dual-btn" style="float: left">
                <Button label="저장"  @click="addNotice" id="reject" />
            </div>
            <div class="p-d-flex p-jc-end p-ai-center dual-btn" style="float: right">
                <Button label="취소"  @click="closeResponsive" class="p-button p-button p-button-outlined" />
            </div>
        </template>
    </Dialog>
</div>
</template>

<script>
import axios from 'axios';
// import ApartmentService from '../../service/API/ApartmentService';
import validateCreateNoticeManagement from '../../../validations/NoticeManagement/validateCreateNoticeManagement';
export default {
    name: 'NoticeManagementadd',
    data() {
        return {
            render: true,
            render1: false,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            name: '',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            error: {},
            formData: new FormData(),
            title: '',
            description: '',
            link_text: '',
            url: '',
            files: null,
            file: '',
            notice_image: '',
            fileName: '',
            fileExtension: '',
            filesExtension: '',
            displayResponsive: false,
        };
    },
    customerService: null,
    productService: null,
    created() {
        // this.apartmentService = new ApartmentService();
    },
    mounted() {},
    methods: 
    {
        openResponsive() {
            let vcheckData = {
                title: this.title,
                description: this.description,
                url: this.url,
                link_text: this.link_text,
            };
            const { isInvalid, error } = validateCreateNoticeManagement(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.displayResponsive = true;
            }
            
        },
        closeResponsive() {
            this.displayResponsive = false;
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
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.file = files[0];
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            if (!allowedExtensions.exec(this.file.name)) {
                this.render1 = true;
                return false;
            } else {
                this.render1 = false;
                this.fileName = this.file.name;
                this.formData.append('notice_image', files[0]);
            }
            this.fileExtension = this.fileName.replace(/^.*\./, '');
            console.log(this.fileName);
        },

       

        addNotice() {
            let vcheckData = {
                title: this.title,
                description: this.description,
                url: this.url,
                link_text: this.link_text,
            };
            //    this.formData.delete('notification_title');
            //     this.formData.delete('description');
            //     this.formData.delete('notification_type');
            //     this.formData.delete('user_ids_arr');
            const { isInvalid, error } = validateCreateNoticeManagement(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('title', this.title);
                this.formData.append('description', this.description);
                this.formData.append('url', this.url);
                this.formData.append('link_text', this.link_text);
                console.log(this.name);
                return axios.post('/admin/notice/add', this.formData).then(() => {
                    // alert('Notice added successfully.');
                    
                    this.$router.push({ name: 'NoticeManagementlist' });
                    setTimeout(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '성공적으로 저장', life: 3000 });
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


p.text-choose {
    text-align: center;
    font-size: 19px;
}


</style>