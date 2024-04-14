<template>
    <div class="p-col-12 p-pb-0">
        <Button @click="$router.go(-1)" :label="$t('button.back')" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
    </div>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>{{ $t('cardnews.addnew_cardnews') }}</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title2">{{ $t('cardnews.list.title') }}</label>
                            <InputText :class="`${error.title ? 'p-invalid' : ''}`" type="text" placeholder="제목" id="title2" v-model="title"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title2">{{ $t('cardnews.list.written') }}</label>
                            <InputText :class="`${error.written ? 'p-invalid' : ''}`" type="text" placeholder="작성자" id="title2" v-model="writtenby"></InputText>
                            <div class="text-red">{{ error.written }}</div>
                        </div>

                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="state2">{{ $t('cardnews.list.status') }}</label>
                            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="code" placeholder="활성" />
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="subtitle2">
                                {{ $t('button.uploadimage') }}
                                <span class="img-info">(File Type jpg,jpeg,png,gif )</span>
                            </label>
                            <div :class="`${error.file ? 'custom-select-invalid' : 'custom-select'}`">
                                <span v-if="!fileName">{{ $t('button.select_file') }}</span>
                                <span v-else>{{ fileName }}</span>
                                <input type="file" class="select-file" v-on:change="onFileChange" />
                                <Button :label="$t('button.select_file')" class="SelectBtn n-wrap" />
                            </div>
                            <div class="text-red" v-show="render1">{{ $t('validation.invalidFile') }}</div>
                            <div class="text-red">{{ error.file }}</div>
                            <img id="frame" src width="100px" height="100px" />
                        </div>
                    </div>
                </div>
                <div class="p-col-12 p-field">
                    <label>{{ $t('cardnews.list.description') }} :</label>
                    <span class="p-float-label">
                        <div :class="`${error.desc ? 'quill-invalid' : 'quill-valid'}`">
                            <input type="file" @change="uploadFunction" id="getFile" hidden />
                            <Quill-Editor style="min-height: 200px;overflow:auto;" v-model:content="modelname" ref="myQuillEditor" :options="editorOption" contentType="html" class="ql-toolbar" @paste="hello" />
                        </div>
                    </span>
                    <div class="text-red">{{ error.desc }}</div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button :label="$t('button.back')" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
                    <Button :label="$t('button.confirm')" icon="pi pi-save" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="confirm($event)"></Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
// import ImageUploader from 'quill-image-uploader';
import BlotFormatter from 'quill-blot-formatter';
import validateCreateCardNews from '../../validations/cardnews/AddCardNews';
import CardnewsService from '../../service/API/CardnewsService';
import axios from 'axios';
export default {
    name: 'CreateBanner',
    components: {
        QuillEditor,
    },
    data() {
        return {
            render1: false,
            modelname: '',
            selectedFile: '',
            // editorOption: {
            //     // toolbar: 'full',
            //     contentType: 'text',
            //     placeholder: '댓글을 입력하세요 ....',
            //     readonly: true,
            //     theme: 'snow',
            //     modules: {
            //   toolbar: {
            //     container: [["bold", "image"]],
            //     handlers: {
            //       image: function() {
            //         document.getElementById('file').click()
            //       }
            //     }
            //   },
            //   imageResize: {
            //     modules: ["Resize", "DisplaySize", "Toolbar"]
            //   }
            // }

            // },
            editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            ['link', 'video', 'image'],
                            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                            ['blockquote', 'code-block'],

                            [{ header: 1 }, { header: 2 }], // custom button values
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                            [{ direction: 'rtl' }], // text direction

                            //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],

                            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                            [{ font: [] }],
                            [{ align: [] }],

                            ['clean'],
                        ],
                        handlers: {
                            image: function () {
                                document.getElementById('getFile').click();
                            },
                        },
                        modules: {
                            name: 'blotFormatter',
                            module: BlotFormatter,
                        },
                    },
                },
            },
            dropdownValues: [
                { name: 'active', code: '활성' },
                { name: 'inactive', code: '비활성' },
            ],
            dropdownValueTypes: [{ name: 'main_banner' }, { name: 'banner_top' }, { name: 'banner_bottom' }],
            dropdownValue: 'active',
            dropdownValueType: null,
            title: '',
            writtenby: '',
            link: '',
            file: '',
            image: '',
            fileName: '',
            fileExtension: '',
            formData: new FormData(),
            error: {},
        };
    },
    created() {
        this.cardnewsService = new CardnewsService();
    },

    methods: {
        uploadFunction(e) {
            console.log(e.target.files[0]);
            this.selectedFile = e.target.files[0];
            var form = new FormData();
            form.append('image', this.selectedFile);
            console.log(form);
            //upload image to server
            axios
                .post('admin/editor-uploads/files', form)
                .then((r) => {
                    console.log('success');
                    console.log(r);
                    if (r.data.status == 200 && r.data.data.imageUrl) {
                        console.log(this.img_daUrl + r.data.data.imageUrl);
                        const imgLink = this.img_daUrl + r.data.data.imageUrl;
                        const range = this.$refs.myQuillEditor.getQuill().getSelection();
                        this.$refs.myQuillEditor.getQuill().insertEmbed(range.index, 'image', `${imgLink}`);
                        document.getElementById('getFile').value = '';
                    }
                })
                .catch(() => {
                    document.getElementById('getFile').value = '';
                });
        },
        
        hello() {
            this.container.style.position = 'fixed';
            this.container.style.zIndex = '-1';
        },
        onFileChange(e) {
            this.formData.delete('fileImage');
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.file = files[0];
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
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
                    let vcheckData = {
                        title: this.title,
                        written: this.writtenby,
                        desc: this.modelname,
                        file: this.fileName == '' ? '' : 'something',
                    };
                    this.formData.delete('title');
                    this.formData.delete('writtenBy');
                    this.formData.delete('status');
                    this.formData.delete('description');
                    const { isInvalid, error } = validateCreateCardNews(vcheckData);
                    if (isInvalid) {
                        this.error = error;
                        console.log(error);
                    } else {
                        this.formData.append('title', this.title);
                        this.formData.append('description', this.modelname);
                        this.formData.append('writtenBy', this.writtenby);
                        this.formData.append('status', this.dropdownValue.name == undefined ? this.dropdownValue : this.dropdownValue.name);
                        console.log(this.formData);
                        return axios.post('/admin/cardNews/add', this.formData).then((res) => {
                            this.$router.push({ name: 'CardNewsManagement' });
                            console.log(res);
                        });
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다', detail: '취소되었습니다', life: 3000 });
                },
            });
        },
        addcardnews() {},
    },
};
</script>

<style scoped>
.quill-invalid {
    border: 1px solid red;
}
.img-info {
    font-size: 11px;
    font-weight: 400;
    color: rgb(48, 48, 48);
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
