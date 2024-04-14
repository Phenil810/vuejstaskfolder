<template>
    <div class="card p-fluid">
        <h5><b>계정 정보</b></h5>
        <div class="p-field p-grid">
            <label for="name3" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">이름:</label>
            <div class="p-col-12 p-md-10">{{name}}</div>
        </div>
        <div class="p-field p-grid">
            <label for="email3" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">이메일 ID:</label>
            <div class="p-col-12 p-md-10">{{email}}</div>
        </div>
        <div class="p-field p-grid">
            <label for="name3" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0">비밀번호:</label>
            <div class="p-col-12 p-md-10"><Button label="비밀번호 재설정" iconPos="left" class="p-button-outlined p-mr-2 p-mb-2" @click="changepass"></Button></div>
        </div>
        
    </div>
     <div class="p-d-flex p-jc-between">
                    <Button label="Primary" class="p-button-outlined p-mr-2 p-mb-2" @click="editinfo">수정</Button>
                    <Button label="Primary" class="p-button-outlined p-mr-2 p-mb-2" @click="$router.go(-1)">뒤로가기</Button>
                </div>
</template>
<script>
export default {
    data() {
        return {
            name:localStorage.getItem('UserName'),
            email:localStorage.getItem('UserEmail'),
            decodedStr:'',
        }
    },
    methods:{

        
        changepass(){
            this.$router.push({ name: 'ChangePass' });
        },
        editinfo(){

            this.decodedStr = atob(this.email);
            this.$router.push({ name: 'EditInfo' });
        }
    }
};
</script>

<style scoped>
.p-fluid .p-button {
    width: auto;
}
</style>
