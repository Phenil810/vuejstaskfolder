<template>
    <Toast />
    <div class="login-body">
        <div class="login-wrapper">
            <div class="login-panel">

                
                <a @click="goDashboard" class="logo">
                    <img src="/assets/layout/images/gs_community_logo.png" alt="samsung" style="margin-bottom: 20px; height: 40px" />
                    <h3 style="color: #002; line-height: 0.5em">환영합니다</h3>
                    <p>계정에 로그인하십시오.</p>
                </a>

                   
                    <InputText @keyup.enter="Login" type="text"  placeholder="이메일 입력" v-model="login_user" id="email" :class="`${error.login_user ? 'p-invalidusername' : ''}`" />
                    <!-- <InputText @keyup.enter="Login" id="email" placeholder="Email" v-model="login_user" :class="`${error.login_user ? 'p-invalid' : ''}`" /> -->
                    <div class="text-redx">{{ error.login_user }}</div>
                    <div class="text-redx">{{ email_err }}</div>
                    
                    
                

                <Password @keyup.enter="Login" id="password" placeholder="**********" :feedback="newLocal" v-model="login_password" :class="`${error.login_password ? 'p-invalid' : ''}`"  toggle-mask />
                <div class="text-redx">{{ error.login_password }}</div>
                <div class="text-redx">{{ pass_err }}</div>
                <div class="field-checkbox" style="text-align: left; display: flex; max-width: 250px; font-size: 10px; padding-bottom: 10px">
                    <Checkbox id="rem" :binary="true" v-model="remember" @change="rememberMe()"></Checkbox>
                    <label for="rem" style="padding-left: 5px">로그인 상태 유지</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div style="padding-left: 16%; text-decoration: underline"><router-link :to="'/forgotpassword'" style="color: black">비밀번호 재설정</router-link></div>
                </div>
                <Button label="로그인" type="button" @click="Login" class="colorchange"></Button>
                <!-- <a href="#" @click="open">{{ $t('Forget Password') }}</a> -->
                <!-- <a href="#">forget dfc password?</a> -->
                <!-- <p>Don’t you have an account, <a href="#">sign up</a></p> -->
            </div>
        </div>
        <Dialog :header="$t('password.recovery_DFC')" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
            <div class="p-field p-fluid">
                <label for="username">{{ $t('password.p_email') }}:</label>
                <InputText :class="`${error.resetemail ? 'p-invalid' : ''}`" id="username" type="email" v-model="resetemail" />
                <small v-show="helptxt">{{ $t('password.help') }}</small>
                <div class="text-redx">{{ error.resetemail }}{{ errmsg }}</div>
            </div>
            <template #footer>
                <Button :label="$t('password.send_mail')" @click="resetpass" icon="pi pi-check" class="p-button-primary" />
                <!-- <Button label="Dismiss" @click="close" icon="pi pi-pi-times" class="p-button-danger" /> -->
            </template>
        </Dialog>
    </div>

</template>

<script>
import validateLogin from '../validations/validateLogin';
import validateReset from '../validations/validateReset';
import axios from 'axios';
export default {
    data() {
        return {
            errmsg: '',
            helptxt: true,
            resetemail: '',
            display: false,
            email_err: '',
            pass_err: '',
            login_user: '',
            login_password: '',
            error: {},
            errors: {},
            remember: true,
        };
    },
    mounted() {
        this.remember = localStorage.getItem('save') == 'true' ? true : false;
        if (localStorage.getItem('save') == 'true') {
            this.email = localStorage.getItem('Uid');
            this.password = localStorage.getItem('Upass');
        }
    },
    methods: {
        rememberMe() {
            localStorage.setItem('save', this.remember);
            if (this.remember == true) {
                localStorage.setItem('Uid', this.email);
                localStorage.setItem('Upass', this.password);
            } else {
                localStorage.removeItem('Uid');
                localStorage.removeItem('Upass');
            }
        },
        open() {
            this.display = true;
        },
        close() {
            this.display = false;
        },
        async Login() {
            let credentials = {
                login_user: this.login_user,
                login_password: this.login_password,
            };
            const { isInvalid, error } = validateLogin(credentials);
            if (isInvalid) {
                this.error = error;
                console.log(error);
            } else {
                var self = this;
                this.error = {};
                // console.log('pass');
                await axios({
                    method: 'post',
                    url: 'admin/login',
                    // data: credentials
                    data: { login_user: window.btoa(this.login_user), login_password: window.btoa(this.login_password) },
                })
                    .then(function (response) {
                        console.log(response);
                        if (response.data.status === 200) {
                            console.log(response.data.status);
                            // localStorage.removeItem("expirytoken");
                            // this.$router.push({ name: 'dashboard' });
                            localStorage.setItem('token', response.data.data.token);
                            localStorage.setItem('userType', response.data.data.userType);
                            localStorage.setItem('UserName', response.data.data.name);
                            localStorage.setItem('UserEmail', response.data.data.email);
                            localStorage.setItem('otp', response.data.data.otp);
                            if (response.data.data.userType === 'super_admin') {
                                window.location = '/';
                            } else {
                                localStorage.setItem('refcode', response.data.data.referralCode);
                                localStorage.setItem('dfc_Id', response.data.data.userId);
                                window.location = '/client-lookup';
                            }
                        }
                    })
                    .catch(function (err) {
                        let text = err.response.data.message;
                        let result = text.match('Password');
                        let result1 = text.match('Email Does Not Exists');
                        console.log(text);
                        if (result == 'Password') {
                            self.pass_err = 'invalid password.';
                            self.email_err = '';
                        } else if (result1 == 'Email Does Not Exists') {
                            self.pass_err = '';
                            self.email_err = 'invalid email.';
                        } else {
                            // alert('Email or, password is incorrect');
                            self.$toast.add({ severity: '오류', summary: '이메일 또는 비밀번호가 잘못되었습니다.', life: 3000 });
                        }
                    });
            }
        },
        resetpass() {
            let vcheckData = {
                resetemail: this.resetemail,
            };
            const { isInvalid, error } = validateReset(vcheckData);
            if (isInvalid) {
                this.error = error;
                this.helptxt = false;
                // console.log(error);
            } else {
                this.errmsg = '';
                var self = this;
                this.helptxt = true;
                this.error = {};
                axios({
                    method: 'post',
                    url: '/admin/dfc/resetPassword',
                    data: { email: this.resetemail },
                })
                    .then(function () {
                        self.close();
                        self.$toast.add({ severity: 'success', summary: '비밀번호가 성공적으로 변경되었습니다', detail: ` 새로운 비밀번호가 ${self.resetemail}로 발송되었습니다  `, life: 5000 });
                    })
                    .catch((err) => {
                        this.helptxt = false;
                        this.errmsg = err.response.data.message;
                    });
            }
        },
        goDashboard() {
            window.location = '/';
        },
    },
};
</script>
<style scoped>
.colorchange:focus {
    background-color: #fff;
    color: blue;
}

.p-password .pi-eye {
    top: 42%;
}

.p-invalidusername{
    border: 1px solid red !important;
}


</style>
