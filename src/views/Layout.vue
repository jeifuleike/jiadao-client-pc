<template>
    <!-- 顶部通栏 -->
    <topnav/>
    <!-- 头部组件 -->
    <headerVue/>
    <!-- 吸顶组件 -->
    <appHeaderSticky/>
    <!-- 内容容器 -->
    <div class="main">
      <!-- 二级路由 -->
      <RouterView />
    </div>
    <!-- 底部组件 -->
    <footerVue/>
</template>

<script>
import topnav from '@/components/topnav.vue'
import headerVue from '@/components/header.vue'
import footerVue from '@/components/footer.vue'
import { useStore } from 'vuex'
import appHeaderSticky from '@/components/app-header-sticky.vue'
export default {
  name: 'LayoutVue',
  components: {
    topnav,
    headerVue,
    footerVue,
    appHeaderSticky
  },
  setup () {
    const store = useStore()
    // 头部分类模块的铺设
    store.dispatch('header/loadGetClassification')
  }
}
</script>

<style scoped lang="less">
</style>
