<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread >
        <XtxBreadItem v-if="goods" to="/">首页</XtxBreadItem>
        <XtxSkeleton v-else height="20" width="35" bg="#e4e4e4"></XtxSkeleton>
        <XtxBreadItem v-if="goods" :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxSkeleton v-else height="20" width="35" bg="#e4e4e4"></XtxSkeleton>
        <XtxBreadItem v-if="goods" :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxSkeleton v-else height="20" width="35" bg="#e4e4e4"></XtxSkeleton>
        <XtxBreadItem v-if="goods" >{{ goods.name }}</XtxBreadItem>
        <XtxSkeleton v-else height="20" width="120" bg="#e4e4e4"></XtxSkeleton>
      </XtxBread>
       <!-- 商品信息 -->
       <div class="goods-info">
        <div class="media" v-if="goods">
          <goodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName/>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import goodsImage from './components/goods-image.vue'
import { useRoute } from 'vue-router'
import { GetProductGoods } from '@/api/product'
import { nextTick, ref, watch } from 'vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, goodsImage, GoodsSales, GoodsName },
  setup () {
    // 使用独立出去的商品信息
    const goods = useGoods()
    console.log(goods)
    return { goods }
  }
}
// 获取商品信息
const useGoods = () => {
  // 1.获取商品详情，进行渲染
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, newVal => {
    if (newVal && `/product/${route.params.id}` === route.path) {
      console.log(1)
      GetProductGoods(route.params.id).then(data => {
        goods.value = null
        // 为了让组件先销毁再添加数据
        nextTick(() => {
          console.log(data.result)
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
