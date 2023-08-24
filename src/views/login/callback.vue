<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
 <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <callbackBind :unionId = "unionId" />
    </div>
    <div class="tab-content" v-else>
      <callbackPatch :unionId = "unionId" />
    </div>
  </section>
  <LoginFooter/>
</template>

<script>
import LoginFooter from './components/login-footer.vue'
import LoginHeader from './components/login-header.vue'
import callbackBind from './components/callback-bind.vue'
import callbackPatch from './components/callback-patch.vue'
import { ref } from 'vue'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginCallback',
  components: { LoginHeader, LoginFooter, callbackBind, callbackPatch },
  setup () {
    const hasAccount = ref(true)
    // 默认已经注册且已绑定
    // 通过QQ的API获取openId也就是后台需要的unionId然后去登录
    // 如果登录失败改qq和小兔鲜绑定
    const isBind = ref(true)
    const store = useStore()
    const router = useRouter()
    const unionId = ref(null)
    // 确保QQ已经登录
    if (QC.Login.check()) {
      QC.Login.getMe(openId => {
        unionId.value = openId
        // 请求小兔鲜后台做QQ登录
        userQQLogin(openId).then(data => {
          // 登录成功： data.result
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeCart').then(() => {
            router.push(store.state.user.redirectUrl)
            Message({ type: 'success', text: 'QQ登录成功' })
          })
        }).catch(e => {
          isBind.value = false
        })
      })
    }
    return { hasAccount, isBind, unionId }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
