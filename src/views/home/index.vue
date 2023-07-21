<template>
    <div class="container">
      <div class="home-entry">
        <div class="container">
          <!-- 左侧分类组件 -->
          <homeCategoryVue/>
          <!-- 轮播图 -->
        </div>
      </div>
    </div>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
export default {
  name: 'HomePage',
  components: {
    homeCategoryVue
  }
}
</script>

<style scoped lang="less">
.container{
  height: 700px;
}
</style>
