<template>
    <div class="p-col-12 p-pb-0">
        <Button @click="$router.go(-1)" :label="$t('button.back')"  icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
    </div>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>{{$t('cardnews.edit_cardnews')}}</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title2">{{$t('cardnews.list.title')}}</label>
                            <InputText :class="`${error.title ? 'p-invalid' : ''}`" type="text" placeholder="title" id="title2" v-model="mydata.title"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="title2">{{$t('cardnews.list.written')}}</label>
                            <InputText :class="`${error.written ? 'p-invalid' : ''}`" type="text" placeholder="written-by" id="title2" v-model="mydata.writtenBy"></InputText>
                            <div class="text-red">{{ error.written }}</div>
                        </div>

                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="state2">{{$t('cardnews.list.status')}}</label>
                            <Dropdown id="state2" v-model="mydata.status" :options="dropdownValues" optionLabel="code" :placeholder="mydata.status" />
                        </div>
                        <div class="p-col-12 p-mb-2 p-lg-3 p-mb-lg-0 p-field">
                            <label for="subtitle2">
                                {{$t('cardnews.list.deskbanner')}}
                                <span class="img-info">(File Type jpg,jpeg,png,gif )</span>
                            </label>
                            <div :class="`${error.file ? 'custom-select-invalid' : 'custom-select'}`">
                                <span v-if="!fileName">{{$t('button.select_file')}}</span>
                                <span v-else>{{ fileName }}</span>
                                <input type="file" class="select-file" v-on:change="onFileChange" />
                                <Button :label="$t('button.select_file')" class="SelectBtn n-wrap" />
                            </div>
                            <div class="text-red">{{ error.file }}</div>
                            <div>
                                <Image :src="img_daUrl + fileName1" :alt="fileName1" class="product-image" width="137" height="85" preview/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-col-12 p-field">
                    <label>{{$t('cardnews.list.description')}} :</label>
                    <span class="p-float-label">
                        <div :class="`${error.desc ? 'quill-invalid' : 'quill-valid'}`">
                            <!-- <Quill-Editor style="min-height: 200px" v-model:content="modelname" ref="myQuillEditor" :options="editorOption" contentType="html"  toolbar="full" /> -->
                            <input type="file" @change="uploadFunction" id="getFile" hidden />
                            <Quill-Editor style="min-height: 200px" v-model:content="modelname" ref="myQuillEditor" :options="editorOption" contentType="html" />
                        </div>
                    </span>
                    <div class="text-red">{{ error.desc }}</div>
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center">
                <div>
                    <ConfirmPopup group="popup"></ConfirmPopup>
                    <Button :label="$t('button.Cancel')" icon="pi pi-times" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="cancel"> </Button>
                    <Button :label="$t('button.confirm')" icon="pi pi-check" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="confirm($event)"></Button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import validateCreateCardNews from '../../validations/cardnews/AddCardNews';
import CardnewsService from '../../service/API/CardnewsService';
import axios from 'axios';
export default {
    data() {
        return {
            dropdownValues: [
                { name: 'active', code: '활성' },
                { name: 'inactive', code: '비활성' },
            ],
              editorOption: {
                modules: {
                    toolbar: {
                        container: [
                            ['link','video', 'image'],
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
                    },
                },
            },

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
            modelname: localStorage.getItem('desc'),
            selectedFile: '',
            filesName: null,
            file: null,
            fileName: null,
            fileExtension: '',
            formData: new FormData(),
            fileName1: '',
            mydata: {
                title: '',
                status: '',
                writtenBy: '',
            },
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
        open() {
            this.display = true;
        },
        close() {
            this.display = false;
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
        cancel() {
           this.$toast.add({ severity: 'error', summary: '오류가 발생했습니다.', detail: '취소되었습니다', life: 3000 });
            setTimeout(() => {
                this.$router.go(-1);
            }, 2000);
        },
        confirm(event) {
            this.$confirm.require({
                target: event.currentTarget,
                group: 'popup',
                message: '이대로 진행하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel:"확인",
                rejectLabel:" 취소",
                accept: () => {
                    let vcheckData = {
                        title: this.mydata.title,
                        // state: this.dropdownValue == null ? '' : 'something',
                        written: this.mydata.writtenBy,
                        desc: this.modelname == '<p><br></p>' ? '' : this.modelname,
                        file: this.fileName == '' ? '' : 'something',
                    };
                    this.formData.delete('title');
                    this.formData.delete('id');
                    this.formData.delete('writtenBy');
                    this.formData.delete('status');
                    this.formData.delete('description');
                    const { isInvalid, error } = validateCreateCardNews(vcheckData);
                    if (isInvalid) {
                        this.error = error;
                        console.log(error);
                    } else {
                        this.formData.append('title', this.mydata.title);
                        this.formData.append('writtenBy', this.mydata.writtenBy);
                        this.formData.append('description', this.modelname);
                        this.formData.append('id', this.$route.params.id);
                        this.formData.append('status', this.dropdownValue?.name === undefined ? this.mydata.status=='활성'?'active':'inactive' : this.mydata.status?.name);
                        console.log(this.formData);
                        return axios.put('/admin/cardNews/edit', this.formData).then((res) => {
                            localStorage.removeItem('desc');
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
    },
    mounted() {
        this.cardnewsService.viewCardnews(this.$route.params.id).then((res) => {
            this.mydata.title = res.title;
            this.mydata.status = res.status;
            this.modelname = res.description;
            this.fileName1 = res.imageUrl;
            this.mydata.writtenBy = res.writtenBy;
            console.log(res);

            if(this.mydata.status === "active") {
                this.mydata.status = "활성";
            } else {
                this.mydata.status = "비활성";
            }
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
    width: 150px;
    height: 100px;
    float: right;
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
.quill-invalid {
    border: 1px solid red;
}
.p-fluid .p-button {
    width: auto;
}
</style>
