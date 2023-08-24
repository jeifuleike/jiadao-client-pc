<template>
  <div class="register">
    <loginHeader>欢迎注册</loginHeader>
    <div class="bj">
        <div class="center">
            <CallbackPatch />
        </div>
    </div>
    <LoginFooter />
  </div>
</template>

<script>
import CallbackPatch from './callback-patch.vue'
import LoginFooter from './login-footer.vue'
import loginHeader from './login-header.vue'
export default {
  components: { loginHeader, LoginFooter, CallbackPatch },
  name: 'regiSter'
}
</script>

<style scoped lang="less">
.bj {
    background: url(../../../assets/images/login-bg.png) no-repeat center / cover;
    display: flex;
    justify-content: end;
    align-items: center;
    height: 600px;
    padding-right: 150px;
    .center {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
    }
}
/deep/ .xtx-form{
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 500px;
    .xtx-form-item {
    width: 400px;
    display: block;
    text-align: center;
    padding-bottom: 0;
    .field {
        margin-left: 40px;
    }
}
}

</style>
