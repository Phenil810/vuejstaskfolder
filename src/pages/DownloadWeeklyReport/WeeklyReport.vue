<template>
    <div class="p-grid">
        <Toast />
        <div class="p-col-12">
            <div class="card p-fluid">
                <h4>
                    <strong>검색</strong>
                </h4>
                <div class="p-formgrid p-grid p-mb-3">
                    

                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">등록일자(from)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="startDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>

                    <div class="p-field p-col-12 p-md-3">
                        <label for="pass">등록일자(to)</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="endDate" dateFormat="yy.mm.dd" :placeholder="$t('search.placeholder.date')"></Calendar>
                    </div>
                </div>

                <div class="p-d-flex p-jc-between p-ai-lg-center p-ai-start p-mt-6 p-flex-column p-flex-lg-row">
                    <div class="p-mb-4 p-mb-lg-0">
                        <!-- <Button :label="$t('button.today')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="today"></Button>
                        <Button :label="$t('button.lastWeek')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastweek"></Button>
                        <Button :label="$t('button.lastMonth')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastmonth"></Button>
                        <Button :label="$t('button.last6Months')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastsixmonth"></Button> -->
                        <!-- <Button :label="$t('button.lastYear')" icon="pi pi-calendar" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="lastyear"></Button> -->
                    </div>
                    <div>
                        <Button label="주간 보고서 다운로드"  iconPos="left" class="p-button p-button-sm p-mr-2 p-mb-2" @click="searchweekly"></Button>
                        <!-- <Button label="초기화" icon="pi pi-replay" iconPos="left" class="p-button p-button-outlined p-button-sm p-mr-2 p-mb-2" @click="resetPost"></Button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { useRoute } from 'vue-router';

import WeeklyReportService from '../../service/API/WeeklyReportService';
// import axios from 'axios';

import moment from 'moment';
export default {
    data() {
        return {
            selected: [],
            render: true,
            display: false,
            position: 'center',
            visibleLeft: false,
            visibleRight: false,
            visibleTop: false,
            visibleBottom: false,
            visibleFull: false,
            
            // complexvalue: [],
            statusTrue: true,
            statusFalse: false,
           
            idFrozen: false,
            products: null,
            expandedRows: [],
          
            startDate:'',
            endDate:'',
            searchdate:'',
            searchenddate:'',
          
           


            
        };
    },
    customerService: null,
    productService: null,
    created() {
        this.weeklyReportService = new WeeklyReportService();
    },
    mounted() {
        

    },
    watch: {},
    methods: {
        
        

        addDay(val){
            const date = new Date(val);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return (val = yyyy + '-' + mm + '-' + dd );
        },
        
        searchweekly() {
            if ( this.startDate == '' && this.endDate == '') {
                this.$toast.add({ severity: 'error', summary: this.$t('error message'), detail: this.$t('Please enter one or more search values.'), life: 3000 });
            } else {
                if(this.startDate!=''){
                    this.searchdate = this.addDay(this.startDate)
                } else {
                    this.searchdate = ""
                }

                if(this.endDate!=''){
                    this.searchenddate = this.addDay(this.endDate)
                } else {
                    this.searchenddate = ""
                }
                let searchParams = {
                   
                    startDate: this.searchdate,
                    endDate: this.searchenddate,
                    // children: this.children,
                    // startDate: start_date,
                    // endDate: end_date,
                };
                console.log('searchParams', searchParams);

                this.weeklyReportService
                    .getweeklyreport(searchParams)
                    .then((res) => {
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'WeeklyReport.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                        console.log('res', res);
                        
                       
                        this.loading1 = false;
                    })
                    .catch(() => {
                        
                        this.loading1 = false;
                    });
            }
        },
        

        open() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        toggle(event) {
            this.$refs.op.toggle(event);
        },

        onRowExpand(event) {
            this.$toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
        },
        onRowCollapse(event) {
            this.$toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
        },
        expandAll() {
            this.expandedRows = this.products.filter((p) => p.id);
            this.$toast.add({ severity: 'success', summary: 'All Rows Expanded', life: 3000 });
        },
        collapseAll() {
            this.expandedRows = null;
            this.$toast.add({ severity: 'success', summary: 'All Rows Collapsed', life: 3000 });
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        formatDate(value) {
            if (value) {
                return moment.utc(value).locale('ko').format('ll - LTS');
            }
        },
        

        
       
    },
};
</script>


<style lang="scss" scoped>
.p-datatable-tbody {
    .p-button {
        white-space: nowrap;
    }
}
.p-fluid {
    .p-button {
        width: auto;
    }
}

.p-button.p-button-text {
    background-color: #221ed9;
    color: white;
    border-color: transparent;
}
</style>