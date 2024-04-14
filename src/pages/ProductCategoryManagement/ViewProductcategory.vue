<template>
    <ConfirmDialog group="dialog" />
    <div class="p-grid">
        <!-- <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" label="Go Back" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div> -->
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>Category Details</strong>
                </h4>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Category 1:</label>
                    <div class="p-col-12 p-md-10">{{ first_category }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Category 2:</label>
                    <div class="p-col-12 p-md-10">{{ second_category }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Category 3:</label>
                    <div class="p-col-12 p-md-10">{{ third_category }}</div>
                </div>
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">Status:</label>
                    <div class="p-col-12 p-md-10">{{ status }}</div>
                </div>
                
            </div>
        </div>
    </div>
    <div class="p-col-12">
        <div class="p-d-flex p-jc-between">
            <div>
                <router-link :to="'/Editproductcategory/' + $route.params.id"
                    ><Button label="help" class="p-button-outlined p-button-help p-mr-2 p-mb-2"><i class="pi pi-user-edit p-mr-2"></i> Edit</Button></router-link
                >
                <Button @click="del($route.params.id)" label="delete" class="p-button-outlined p-button-danger p-mr-2 p-mb-2"><i class="pi pi-trash p-mr-2"></i> delete</Button>
            </div>
            <div>
                <Button @click="$router.go(-1)" label="Go Back" class="p-button-outlined p-mr-2 p-mb-2" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import ProductCategoryService from '../../service/API/ProductCategoryService';
// import {useRouter} from 'vue-router'
export default {
    data() {
        return {
            disInq: true,
            renderTxt: false,
            replied: false,
            replyText: '',
            replyStatus: 'answered',
            dropdownItems: [
                { name: 'male', code: 'male' },
                { name: 'female', code: 'female' },
                { name: 'others', code: 'others' },
            ],
            dropdownItem: null,
            mydata: {},
            first_category:'',
            second_category: '',
            third_category: '',
            status:'',
        };
    },
    created() {
        this.productCategoryService = new ProductCategoryService();
    },
    methods: {
        reply() {
            if (this.replyText != '') {
                this.inquiryService.inquiryReply(this.$route.params.id, this.replyText, this.replyStatus).then((data) => {
                    console.log(data);
                });
            } else {
                alert('replay text should not blanck');
            }
        },
        del() {
            this.$confirm.require({
                group: 'dialog',
                header: 'Confirmation',
                message: 'Are you sure you want to delete?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    axios({ method: 'delete', url: `/product-category/`+ this.$route.params.id }).then((res) => {
                        console.warn(res);
                        this.$router.push({ name: 'ProductCategorylist' });
                    });

                    this.$toast.add({ severity: 'info', summary: 'Deleted', detail: 'Deleted successfully', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                },
            });
        },
    },
    mounted() {
        this.productCategoryService.productCategoryDetails(this.$route.params.id).then((data) => {
            console.log(data);
            this.first_category = data.first_category;
            this.second_category = data.second_category;
            this.third_category = data.third_category;
            this.status = data.status;
            // this.mydata = data;
        });
    },
};
</script>

<style scoped>
.p-fluid .p-button {
    width: auto;
}
.renderHtml {
    background-color: #fcfcfc;
    padding: 25px;
    border: 1px solid rgba(70, 77, 242, 0.2);
    border-radius: 5px;
    margin-top: 15px;
}
</style>