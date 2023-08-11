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
        <div class="spec" v-if="goods">
          <GoodsName :good="goods"/>
           <!-- 规格组件 -->
          <GoodsSku :specs = "goods.specs" :skus = "goods.skus" @change="changeSku"/>
          <!-- 选择有多少件组件 -->
          <XtxNumbox  label="数量" v-model="num" :max="goods.inventory"/>
          <XtxButton type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodId = "$route.params.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn></GoodsWarn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="$route.params.id"/>
          <GoodsHot :goodsId="$route.params.id" type="2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import goodsImage from './components/goods-image.vue'
import { useRoute } from 'vue-router'
import { GetProductGoods } from '@/api/product'
import { nextTick, provide, ref, watch } from 'vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, goodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup () {
    // 使用独立出去的商品信息
    const goods = useGoods()
    const num = ref(1)
    // sku改变时候触发
    const changeSku = (sku) => {
      console.log(sku)
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    provide('good', goods)
    console.log(goods)
    return { goods, changeSku, num }
  }
}
// 获取商品信息
const useGoods = () => {
  // 1.获取商品详情，进行渲染
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, newVal => {
    if (newVal && `/product/${route.params.id}` === route.path) {
      GetProductGoods(route.params.id).then(data => {
        goods.value = null
        // 为了让组件先销毁再添加数据
        nextTick(() => {
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
