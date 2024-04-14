<template>
    <div class="card">
        <Toast />
        <form>
            <div class="p-grid p-fluid">
                <div class="p-col-12">
                    <h5>상품 추가</h5>
                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">상품명</label>
                            <InputText type="text" :class="`${error.title ? 'p-invalid' : ''}`"  placeholder="상품명" v-model="title" id="title2" maxlength="100"></InputText>
                            <div class="text-red">{{ error.title }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">설명</label>
                            <Textarea type="text" :class="`${error.description ? 'p-invalid' : ''}`"  placeholder="설명 (최대 200자)" v-model="description"  id="title2" maxlength="200"></Textarea>
                            <div class="text-red">{{ error.description }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="subtitle2">
                                상품 이미지
                                <span class="img-info">(파일 형식: jpg,jpeg,png )(이미지 너비 924px and 고저 860px 및 크기 1MB )</span>
                            </label>
                            <div
                                :class="`${error.file ? 'custom-select-invalid' : 'custom-select'}`"
                            >
                                <span v-if="!fileName">{{ $t('button.select_file') }}</span>
                                <span v-else>{{ fileName }}</span>
                                <input type="file" class="select-file" v-on:change="onFileChange" />
                                <Button label="파일 선택" class="SelectBtn n-wrap" />
                            </div>
                            <div class="text-red">{{ error.file }}</div>
                            <div class="text-red" v-show="render1">{{ $t('validation.invalidFile') }}</div>
                            <!-- add larger image  -->
                            <div class="text-red" v-show="render2">이미지 크기는 1MB 미만이어야 합니다.</div>
                            <!-- file is too large  -->
                            <div class="text-red" v-show="render3">파일이 너무 큽니다</div>
                            <div class="text-red" v-show="render4">{{render4Value}}</div>
                            <img id="frame" src width="100px" height="100px" />
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">상품 금액(꿀)</label>
                            <InputText type="text" :class="`${error.honey ? 'p-invalid' : ''}`"  placeholder="상품 금액(꿀)" v-model="honey"  id="title2" onkeypress="return /[0-9]/i.test(event.key)"></InputText>
                            <div class="text-red">{{ error.honey }}</div>
                        </div>
                    </div>

                    <div class="p-grid p-formgrid p-mb-3">
                        <div class="p-col-12 p-mb-2 p-lg-5 p-mb-lg-0 p-field">
                            <label for="title2">노출</label>
                            <br>
                            <InputSwitch v-model="status" trueValue="active"/>
                            <!-- <div class="text-red">{{ error.url }}</div> -->
                        </div>
                    </div>

                    
                </div>
            </div>
            <div class="p-d-flex p-jc-end p-ai-center" style="float: left;">
                <Button label="저장" :disabled="btnDisabled" iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="addProductmanagement"></Button>
                <Button label="뒤로가기" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="$router.go(-1)"></Button>
            </div>
            
            <br>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import validateCreateProduct from '../../validations/product/validateCreateProduct';
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
            render1: false,
            file: '',
            files: '',
            fileName:'',
            product_image: '',
            fileExtension: '',
            filesExtension: '',
            fileExtensions: '',
            filesExtensions: '',
            title: '',
            description:'',
            honey:'',
            customer1: null,
            loading1: true,
            idFrozen: false,
            products: null,
            expandedRows: [],
            status:'',
            error: {},
            formData: new FormData(),
        };
    },
    customerService: null,
    productService: null,
    created() {
        // this.apartmentService = new ApartmentService();
    },
    mounted() {},
    methods: {

        getStatus(values) {
            return values === 'active' ? true : false;
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
       
        // onFileChange(e) {
        //     var files = e.target.files || e.dataTransfer.files;
        //     if (!files.length) return;
        //     this.file = files[0];
        //     var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        //     if (!allowedExtensions.exec(this.file.name)) {
        //         this.render1 = true;
        //         return false;
        //     } else {
        //         this.render1 = false;
        //         this.product_image = this.file.name;
        //         this.formData.append('product_image', files[0]);
        //     }
        //     this.fileExtension = this.product_image.replace(/^.*\./, '');
        //     console.log(this.product_image);
        // },

        onFileChange(e) {
              var files = e.target.files || e.dataTransfer.files;
              // if (!files.length) return;
              this.file = files[0];
              var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
              if (!allowedExtensions.exec(this.file.name)) {
                  this.render1 = true;
                  this.render2 = false;
                  this.render4 = false
              } else {
                let reader = new FileReader
              reader.readAsDataURL(this.file)
              reader.onload = (e) =>{
                let url = e.target.result
                this.image_url = url
              }
                  this.render1 = false;
                  if (this.file.size > 1000000) {
                      // alert('파일이 너무 큽니다  ');
                      this.render2 = true;
                      this.btnDisabled = true
                  } else {
                    this.btnDisabled = false
                    this.render2 = false;
                    this.fileName = this.file.name;
                    this.upload(e)
                    
                  }
              }
              this.fileExtension = this.fileName.replace(/^.*\./, '');
              console.log(this.fileName)
          },
          upload(e){
            var files = e.target.files || e.dataTransfer.files;
            var img = new Image();
              img.src = window.URL.createObjectURL(e.target.files[0]);
              img.onload = () => {
                  if (img.width > 924 || img.height > 860) {
                     this.btnDisabled = true
                     this.render4Value = `860px x 924px 사이즈의 이미지를 업로드 해주세요.`
                     this.render4 = true
                    //   alert(`Sorry, this image doesn't look like the size we wanted.It's
                    //     ${img.width} x ${img.height} but we require 343 x 138 size image.`);
                  } else {
                    this.btnDisabled = false
                    this.render4 = false
                    this.fileName = this.file.name;
                    this.formData.append('product_image', files[0]);

                    

                  }
              };
          },
        addProductmanagement() {
            // var self = this;
            let vcheckData = {
                title: this.title,
                description: this.description,
                honey: this.honey,
                status: this.status ? 'active' : 'inactive',
                file: this.fileName == '' ? '' : 'something',
                
            };
           console.log(vcheckData)
            const { isInvalid, error } = validateCreateProduct(vcheckData);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                this.formData.append('title', this.title);
                this.formData.append('description', this.description);
                this.formData.append('honey', this.honey);
                this.formData.append('status', this.status == 'active' ? 'active' : 'inactive');
                // console.log(self.name);
                return axios.post('/admin/products/add', this.formData ).then(() => {
                    // alert('아파트가 성공적으로 추가되었습니다.');
                    this.$router.push({ name: 'ProductManagementList' });
                    setTimeout(() => {
                        this.$toast.add({ severity: 'info', summary: '확인.', detail: '제품이 성공적으로 추가되었습니다.', life: 3000 });
                    }, 1000);
                })
                .catch(function (err) {
                        // console.log(err.response.data.message);
                        
                        // alert('이메일이 이미 존재합니다');
                        this.$toast.add({ severity: 'error', summary: '거부됨.', detail: err.response.data.message, life: 3000 });
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
</style>