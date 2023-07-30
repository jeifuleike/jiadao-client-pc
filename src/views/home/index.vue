<template>
  <div class="container">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类组件 -->
        <homeCategoryVue />
        <!-- 轮播图 -->
        <homeBanner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
    <HomeHot></HomeHot>
    <!-- 热门品牌 -->
    <HomeBrand></HomeBrand>
    <!-- 居家模块 -->
    <HomeProduct></HomeProduct>
    <!-- 最新专题 -->
    <homeSpecial></homeSpecial>
  </div>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
import homeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import homeSpecial from './components/home-special.vue'
export default {
  name: 'HomePage',
  components: {
    homeCategoryVue,
    homeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    homeSpecial
  }
}
</script>

<style scoped lang="less"></style>
