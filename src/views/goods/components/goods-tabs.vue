<template>
    <div class="goods-tabs" v-if="good">
        <nav>
            <a :class="{ active: activeName === 'GoodsDetial' }" href="javascript:;" @click="activeName = 'GoodsDetial'">商品详情</a>
            <a :class="{ active: activeName === 'GoodsComment' }" href="javascript:;" @click="activeName = 'GoodsComment'">商品评价<span>{{ good.commentCount }}</span></a>
        </nav>
        <!-- 切换内容的地方 -->
        <keep-alive>
            <component :is="activeName"></component>
        </keep-alive>
    </div>
</template>

<script>
import { inject, ref } from 'vue'
import GoodsDetial from './goods-detial.vue'
import GoodsComment from './goods-comment.vue'
export default {
  components: { GoodsDetial, GoodsComment },
  name: 'GoodsTab',
  setup () {
    const activeName = ref('GoodsDetial')
    const good = inject('good')
    console.log(good)
    return { activeName, good }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: @priceColor;
                font-size: 16px;
                margin-left: 10px;
            }

            &:first-child {
                border-right: 1px solid #f5f5f5;
            }

            &.active {
                &::before {
                    content: "";
                    position: absolute;
                    left: 40px;
                    bottom: -1px;
                    width: 72px;
                    height: 2px;
                    background: @xtxColor;
                }
            }
        }
    }
}</style>
