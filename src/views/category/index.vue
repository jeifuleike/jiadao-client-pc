<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <xtx-carousel :photoList="banner" style="height:500px"></xtx-carousel>
      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="items in topCates.children" :key="items.id">
        <div class="head">
          <h3>- {{ items.name }} -</h3>
          <p class="tag">{{ items.desc }}</p>
          <XtxMore :path="`/category/sub/${items.id}`" />
        </div>
        <div class="body">
          <goodsItem v-for="i in items.goods" :good="i" :key="i.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHomeBanner } from '@/api/homePage'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import goodsItem from './components/goods-item.vue'
import { getTopCategory } from '@/api/category'
export default {
  components: { goodsItem },
  name: 'TopCategory',
  setup () {
    // 轮播图数据获取
    const banner = ref([])
    getHomeBanner().then(data => {
      banner.value = data.result
    })
    // 全部分类数据获取
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      return store.state.header.list.find(item => item.id === route.params.id)
    })

    // 获取一级类目的数据
    const topCates = ref([])
    const getSubList = () => {
      getTopCategory(route.params.id).then(data => {
        topCates.value = data.result
      })
    }
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/${newVal}` === route.path) getSubList()
    }, { immediate: true })
    return { banner, topCategory, topCates }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
.fade-right-enter-from,
.fade-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all .5s;
}
.fade-right-enter-to,
.fade-right-leave-from {
  transform: none;
  opacity: 1;
}
</style>
