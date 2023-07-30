<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" @click="index = 0" class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"></a>
      <a href="javascript:;" @click="index = 1" class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }"></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
        <ul class="list" v-if="brands.length" :style="{ transform: `translateX(${-index * 1240}px)` }">
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture">
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240" height="305" />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { useLazyData } from '@/hook'
import { hotpp } from '@/api/category'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 拿到数据
    const { target, result } = useLazyData(() => hotpp(10))
    // 设置index控制左右按钮
    const index = ref(0)
    return { brands: result, box: target, index }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 1s;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}</style>
