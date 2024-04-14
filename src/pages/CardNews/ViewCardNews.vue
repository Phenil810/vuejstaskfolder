<template>
    <ConfirmDialog group="dialog" />
    <div class="p-grid">
        <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" :label="$t('button.back')" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div>
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>{{$t('cardnews.details.header')}}</strong>
                </h4>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <strong>
                            <label for="title">{{$t('cardnews.list.title')}} :</label>
                        </strong>
                        <p>{{ mydata.title }}</p>
                    </div>
                    <div class="p-field p-col">
                        <strong>
                            <label for="title">{{$t('cardnews.list.written')}} :</label>
                        </strong>
                        <p>{{ mydata.writtenBy}}</p>
                    </div>
                    <div class="p-field p-col">
                        <strong>
                            <label for="status">{{$t('cardnews.list.status')}} :</label>
                        </strong>
                        <p>{{ mydata.status }}</p>
                    </div>
                    <div class="p-field p-col">
                        <strong><label for="state">{{$t('cardnews.list.image')}} :</label></strong>
                        <div>
                            <Image :src="img_daUrl + mydata.image" :alt="mydata.image" class="product-image" width="137" height="85" preview />
                        </div>
                    </div>
                </div>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col">
                        <strong>
                            <label for="description">{{$t('cardnews.list.description')}} :</label>
                        </strong>
                        <div class="renderHtml" v-html="mydata.desc"></div>
                    </div>
                </div>
                <div class="p-d-flex p-jc-end">
                    <!-- <router-link to="/view-user"
                        ><Button label="info" class="p-button-outlined p-button-info p-mr-2 p-mb-2" disabled><i class="pi pi-eye p-mr-2"></i>point</Button>
                    </router-link>-->
                    <router-link :to="'/card-news/edit/' + $route.params.id">
                        <Button label="help" class="p-button-outlined p-button-help p-mr-2 p-mb-2"> <i class="pi pi-user-edit p-mr-2"></i> {{$t('button.edit')}} </Button>
                    </router-link>
                    <Button @click="del($route.params.id)" label="delete" class="p-button-outlined p-button-danger p-mr-2 p-mb-2"> <i class="pi pi-trash p-mr-2"></i> {{$t('button.delete')}} </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CardnewsService from '../../service/API/CardnewsService';
// import {useRouter} from 'vue-router'
export default {
    data() {
        return {
            dropdownItems: [
                { name: 'male', code: 'male' },
                { name: 'female', code: 'female' },
                { name: 'others', code: 'others' },
            ],
            dropdownItem: null,
            mydata: {
                title: '',
                desc: '',
                status: '',
                writtenBy: '',
                image: '',
            },
        };
    },
     created() {
        this.cardnewsService = new CardnewsService();
    },
    methods: {
        del(id) {
            this.$confirm.require({
                group: 'dialog',
                header: '확인',
                message: '삭제하시겠습니까?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel:"확인",
                rejectLabel:" 취소",
                accept: () => {
                    axios({ method: 'delete', url: `/admin/cardNews/delete`, data: { deleteIdArray: id } }).then((res) => {
                        console.warn(res);
                        this.$router.push({ name: 'CardNewsManagement' });
                    });

                    this.$toast.add({ severity: 'info', summary: '삭제', detail: '성공적으로 삭제되었습니다', life: 3000 });
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
            this.mydata.desc = res.description;
            this.mydata.writtenBy = res.writtenBy;
            this.mydata.image = res.imageUrl;
            localStorage.setItem('desc', res.description);

            if(this.mydata.status === "active"){
                this.mydata.status = "활성";
            } else {
                this.mydata.status = "비활성";
            }
        });
    },
};
</script>

<style scoped>
.product-image {
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
    height: 100px;
}
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
.renderHtml img {
    max-width: 100%;
}
</style>
