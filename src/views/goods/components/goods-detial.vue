<template>
    <div class="goods-detail" v-if="good">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in good.details.properties" :key="item.value">
        <span class="dt">{{item.name}}</span>
        <span class="dd">{{item.value}}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in good.details.pictures" :key="item" :src="item" alt="">
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'GoodsDetial',
  setup () {
    const good = inject('good')
    return { good }
  }
}
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
