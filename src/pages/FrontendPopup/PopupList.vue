<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card">
                <h4>
                    <strong>{{ $t('FrontendPopup.s-header') }}</strong>
                </h4>
                <DataTable :value="popuplist" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" :loading="loading1" :filters="filters1" responsiveLayout="scroll" v-model:selection="selected">
                    <ConfirmDialog group="dialog" />

                    <template #empty> 계정을 찾을 수 없습니다. </template>
                    <template #loading> 로딩 중입니다. 잠시만 기다려주세요.  </template>
                    <Column field="name" :header="$t('Sl.No.')">
                        <template #body="{ index }">
                            <span class="p-column-title">Sl.No.</span>
                            {{ index + 1 }}
                        </template>
                    </Column>
                    <!-- <column selectionMode="multiple" style="width: 16px; text-align: center" /> -->
                    <Column field="ReferralCode" :header="$t('FrontendPopup.tablelist.title')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Title</span>
                            {{ data.title }}
                        </template>
                    </Column>
                    <Column :header="$t('FrontendPopup.tablelist.exposure')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Exposure</span>
                            <InputSwitch v-model="data.status" trueValue="active" @change="switchValue(data.id, data.status)" />
                        </template>
                    </Column>
                    <Column :header="$t('FrontendPopup.tablelist.lastModified')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">LastModified</span>
                            {{ formatDate(data.updatedDate) }}
                        </template>
                    </Column>
                    <Column :header="$t('FrontendPopup.tablelist.action')" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span class="p-column-title">Action</span> 
                            <router-link :to="'/FrontendEdit-Popup/' + data.id">
                            <Button label="help" class="p-button-outlined p-button-help p-mr-2 p-mb-2"><i class="pi pi-user-edit p-mr-2"></i> {{ $t('button.edit') }}</Button>
                             </router-link>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

    </div>
</template>

<script>
// import { useRoute } from 'vue-router';
import axios from 'axios';
import FrontendPopup from '../../service/API/FrontendPopup';
export default {
    data() {
        return {
            popuplist: null,
            loading1: true,
        }
    },
    created() {
        this.frontendPopup = new FrontendPopup();
    },
    methods: {
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
            return (value = yyyy + '/' + mm + '/' + dd + ' ' + ' ' + hr + ':' + min + ':' + sec);
        },

        switchValue(ids, switchstatus) {
            console.log(ids, switchstatus);
            axios({ method: 'put', url: '/admin/frontPopupManagment/activate-deactivate', data: { id: ids, status: switchstatus === false ? 'inactive' : 'active' } }).then(function (response) {
                console.log(response);
            });
        },
    },
    mounted(){
        this.frontendPopup.frontendpopuplist().then((res) => {
            this.popuplist = res;
            this.loading1=false;
        });
    },
}
</script>