//头部导航栏组件
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.account">
            <li><RouterLink to="/member"><i class="iconfont icon-user"></i>{{ profile.account }}</RouterLink></li>
            <li><a href="javascript:;" @click="clearUser">退出登录</a></li>
        </template>
        <template v-else>
            <li><RouterLink to="/login">请先登录</RouterLink></li>
            <li><RouterLink to="/register" href="javascript:;">免费注册</RouterLink></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup () {
    const store = useStore()
    const profile = computed(() => store.state.user.profile)
    const router = useRouter()
    const clearUser = () => {
      store.commit('user/setUser', {})
      store.commit('cart/setCart', [])
      router.push('/login')
    }
    return { profile, clearUser }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // ~选择器的作用就是选择这个元素后的所有兄弟节点
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
