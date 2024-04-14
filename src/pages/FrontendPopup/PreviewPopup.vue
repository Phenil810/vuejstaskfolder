<template>
    <ConfirmDialog group="dialog" />
    <div class="p-grid">
        <div class="p-col-12 p-pb-0">
            <Button @click="$router.go(-1)" :label="$t('button.back')" icon="pi pi-angle-left" class="p-button-text p-mr-2 p-mb-2" />
        </div>
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4><strong>{{ $t('FrontendPopup.edit-header') }}</strong></h4>
                <div class="p-formgrid p-grid">
                    <div class="p-field p-col p-md-3">
                        <strong> <label for="nameuser">{{ $t('FrontendPopup.Editpopup.title') }} :</label></strong>
                        <p>{{ data.title }}</p>
                    </div>
                    <div class="p-field p-col p-md-3">
                        <strong><label for="emailuser">{{$t('Banner.list.link')}} :</label></strong>
                        <p>{{ data.imageUrl }}</p>
                    </div>
                    
                    <div class="p-field p-col p-md-3">
                        <strong><label for="mobileuser">{{$t('FrontendPopup.tablelist.exposure')}} :</label></strong>
                        <p>{{ data.status }}</p>
                    </div>

                    <div class="p-field p-col p-md-3">
                        <strong><label for="state">{{ $t('FrontendPopup.Editpopup.Uploadimage') }} :</label></strong>
                        <div>
                            <Image :src="img_daUrl + fileName1" :alt="fileName1" class="product-image" width="137" height="85" preview />
                        </div>
                    </div>
                    
                </div>
                <div class="p-d-flex p-jc-end">
                    <router-link :to="'/FrontendEdit-Popup/' + $route.params.id"
                        ><Button label="help" class="p-button-outlined p-button-help p-mr-2 p-mb-2"><i class="pi pi-user-edit p-mr-2"></i> {{$t('button.edit')}}</Button></router-link
                    >
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import FrontendPopup from '../../service/API/FrontendPopup';
export default {
    data() {
        return {
            data:{},
            fileName1:''
        }
    },
     created() {
        this.frontendPopup = new FrontendPopup();
    },
     mounted(){
         this.frontendPopup.frontendpopupedit(this.$route.params.id).then((res) => {
            console.log("res",res);
            this.data = res;
            this.fileName1 = res.imageUrl;
            if(this.data.status === "active") {
                this.data.status = "활성";
            } else {
                this.data.status = "비활성";
            }
        })
    },
}
</script>
<style scoped>
.product-image {
    padding-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px !important;
    height: 100px;
}
</style>