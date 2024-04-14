<template>
    <div class="card">
        <Toast />
        <!-- <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" :label="$t('button.back')" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div> -->

        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>{{ $t('Banner.edit_banner') }}</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title">{{ $t('FrontendPopup.Editpopup.title') }}</label>
                            <InputText id="title" :class="`${error.title ? 'p-invalid' : ''}`" type="text" placeholder="제목" v-model="data.title" />
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="exposure">{{ $t('FrontendPopup.tablelist.exposure') }}</label>
                            <div class="p-field p-col-12 p-md-3">
                                <InputSwitch trueValue="active" v-model="data.status" />
                                <!-- <div class="text-red">{{ error.title }}</div> -->
                            </div>
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="subtitle2">
                                {{ $t('FrontendPopup.Editpopup.Uploadimage') }}
                                <span class="img-info">(File Type jpg,jpeg,png )</span>
                            </label>
                            <div class="custom-select">
                                <span v-if="!fileName">{{ $t('button.select_file') }}</span>
                                <span v-else>{{ fileName }}</span>
                                <input type="file" class="select-file" v-on:change="onFileChange" />
                                <Button :label="$t('button.select_file')" class="SelectBtn n-wrap" />
                            </div>
                            <div>
                                <div class="text-red" v-show="render1">{{ $t('validation.invalidFile') }}</div>
                                <Image :src="img_daUrl + fileName1" :alt="fileName1" class="product-image" width="137" height="85" preview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button :label="$t('FrontendPopup.Editpopup.back')" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                    <router-link :to="'/FrontendPreview-Popup/' + data.id">
                        <Button :label="$t('FrontendPopup.Editpopup.preview')" class="p-button p-button-sm p-mr-2 p-mb-2" icon="pi pi-eye"></Button>
                    </router-link>
                    <Button :label="$t('FrontendPopup.Editpopup.publish')" icon="pi pi-check" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="confirm($event)"></Button>
                </div>
            </div>
        </form>
        <Dialog :header="$t('FrontendPopup.Editpopup.Uploadimage')" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
            <div class="p-field p-fluid">
                <img :src="img_daUrl + fileName1" :alt="fileName1" class="product-image" />
            </div>
            <template #footer>
                <Button :label="$t('button.ok')" @click="close" icon="pi pi-pi-times" class="p-button-primary" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import axios from 'axios';
import validateEditFrontend from '../../validations/frontendpopup/editfrontendpopup';
import FrontendPopup from '../../service/API/FrontendPopup';
export default {
    data() {
        return {
            data: {
                title: '',
                status: '',
            },
            file: '',
            error: {},
            render1: false,
            fileName: null,
            fileExtension: '',
            filesExtension: '',
            formData: new FormData(),
            display: false,
            comparefile:''
        };
    },
    created() {
        this.frontendPopup = new FrontendPopup();
    },

    methods: {
        imagehover() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        onFileChange(e) {
            this.formData.delete('file');
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            this.file = files[0];
            if (!allowedExtensions.exec(this.file.name)) {
                this.render1 = true;
                return false;
            } else {
                this.render1 = false;
                this.fileName = this.file.name;
                this.formData.append('fileImage', files[0]);
            }
            this.fileExtension = this.fileName.replace(/^.*\./, '');
            console.log(this.fileName);
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
                    console.log(this.data.title);
                    let vcheckData = {
                        title: this.data.title,
                    };
                    this.formData.delete('title');
                    this.formData.delete('id');
                    this.formData.delete('status');
                    console.log(vcheckData);
                    const { isInvalid, error } = validateEditFrontend(vcheckData);
                    if (isInvalid) {
                        this.error = error;
                        console.log(error);
                    } else {
                        this.error = {};
                        // console.log('pass');
                        // if(this.fileName==this.comparefile){
                        //     this.formData.append('fileImage', this.fileName);
                        // }
                        this.formData.append('title', this.data.title);
                        this.formData.append('id', this.$route.params.id);
                        this.formData.append('status', this.data.status == false ? 'inactive' : 'active');
                        axios.put('/admin/frontPopupManagment/edit', this.formData).then((res) => {
                            this.$router.push({ name: 'FrontendPopup' });
                            console.log(res);
                        });

                        this.$toast.add({ severity: 'info', summary: '확인', detail: '성공적으로 등록되었습니다.', life: 3000 });
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다.', detail: '취소되었습니다', life: 3000 });
                },
            });
        },
    },

    mounted() {
        this.frontendPopup.frontendpopupedit(this.$route.params.id).then((res) => {
            console.log('res', res);
            this.data = res;
            this.fileName1= res.imageUrl;
            this.fileName=res.fileName;
            this.comparefile=res.fileName;
        });
    },
};
</script>

<style scoped>
.img-info {
    font-size: 11px;
    font-weight: 400;
    color: rgb(48, 48, 48);
}
.product-image {
    padding-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px !important;
    height: 100px;
    float: right;
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
.custom-select-invalid {
    position: relative;
    border: 1px solid red;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
}
</style>