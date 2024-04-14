<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>{{ $t('mediapress.edit_mediapress') }}</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title2">{{ $t('mediapress.list.title') }}</label>
                            <InputText type="text" :class="`${error.title ? 'p-invalid' : ''}`" placeholder="Title" id="title2" v-model="title"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title2">{{ $t('mediapress.list.y_link') }}</label>
                            <InputText type="text" :class="`${error.link ? 'p-invalid' : ''}`" placeholder="link" id="title2" v-model="link"></InputText>
                            <div class="text-red">{{ error.link }}</div>
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="state2">{{ $t('mediapress.list.status') }}</label>
                            <Dropdown v-model="dropdownValue" modelValue="dropdownValues[0].name" :options="dropdownValues" optionLabel="code" :placeholder="status" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button :label="$t('button.Cancel')" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                    <Button :label="$t('button.confirm')" icon="pi pi-save" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="confirm($event)"></Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
// import { QuillEditor } from '@vueup/vue-quill';
import MediaService from '../../service/API/MediaService';
import validateEditMediaPress from '../../validations/mediapress/EditMediaPress';

export default {
    name: 'CreateBanner',
    // props: ['dog', 'image'],
    // components: {
    //     QuillEditor,
    // },
    data() {
        return {
            // modelname: localStorage.getItem('desc'),
            // editorOption: {
            //     toolbar: 'essential',
            //     contentType: 'text',
            //     placeholder: 'Type your comment....',
            //     readonly: true,
            //     theme: 'snow',
            // },
            dropdownValues: [
                { name: 'active', code: '활성' },
                { name: 'inactive', code: '비활성' },
            ],
            dropdownValueTypes: [{ name: 'main_banner' }, { name: 'banner_top' }, { name: 'banner_bottom' }],
            dropdownValue: null,
            dropdownValueType: null,
            title: null,
            subtitle: null,
            link: null,
            files: null,
            filesName: null,
            file: null,
            image: '',
            fileName: null,
            fileExtension: '',
            filesExtension: '',
            formData: new FormData(),
            error: {},
            status: '',
            fileName1: null,
            fileName2: null,
            display: false,
        };
    },
    created() {
        this.mediaService = new MediaService();
    },
    mounted() {
        this.mediaService.viewMediaPress(this.$route.params.id).then((res) => {
            this.title = res.title;
            this.status = res.status;
            this.link = res.link;
            localStorage.setItem('desc', res.description);
            console.log(res);
            if (this.status === 'active') {
                this.status = '활성';
            } else {
                this.status = '비활성';
            }
        });
    },
    methods: {
        reinitialize() {
            (this.dropdownValue = null), (this.dropdownValueType = null), (this.title = null), (this.subtitle = null), (this.link = null), (this.fileName = null), (this.file = {});
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.formData.append('fileImage', files[0]);
            this.file = files[0];
            this.fileName = this.file.name;
            this.fileExtension = this.fileName.replace(/^.*\./, '');
            console.log(this.fileName);
        },
        onFileChanges(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.formData.append('mobileImage', files[0]);
            this.files = files[0];
            this.filesName = this.files.name;
            this.filesExtension = this.filesName.replace(/^.*\./, '');
            console.log(this.filesName);
        },
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
                message: '삭제하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: '네',
                rejectLabel: ' 아니요',
                accept: () => {
                    let vcheckData = {
                        title: this.title,
                        // state: this.dropdownValue == null ? '' : 'something',
                        link: this.link,
                        // desc: this.modelname,
                        // file: this.file == '' ? '' : 'something',
                    };
                    const { isInvalid, error } = validateEditMediaPress(vcheckData);
                    if (isInvalid) {
                        this.error = error;
                        console.log(error);
                    } else {
                        this.formData.append('title', this.title);
                        this.formData.append('id', this.$route.params.id);
                        // this.formData.append('description', this.modelname);
                        this.formData.append('link', this.link);
                        this.formData.append('status', this.dropdownValue?.name === undefined ? 'active' : this.dropdownValue?.name);
                        console.log(this.formData);
                        return axios.put('/admin/mediaPress/edit', this.formData).then((res) => {
                            this.$router.push({ name: 'MediaPressManagement' });
                            console.log(res);
                        });
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다.', detail: '취소되었습니다', life: 3000 });
                },
            });
        },
        editBanner() {},
    },
};
</script>

<style scoped>
.img-info {
    font-size: 11px;
    font-weight: 400;
    color: rgb(48, 48, 48);
}
.quill-invalid {
    border: 1px solid red;
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
</style>
