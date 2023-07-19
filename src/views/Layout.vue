<template>
    <!-- 顶部通栏 -->
    <topnav/>
    <!-- 头部组件 -->
    <headerVue/>
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
export default {
  name: 'LayoutVue',
  components: {
    topnav,
    headerVue,
    footerVue
  }
}
</script>

<style scoped lang="less">
.container{
}
</style>
