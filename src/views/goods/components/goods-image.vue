<template>
  <div class="goods-image">
    <div class="large" v-show="show" :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"></div>
    <div class="middle">
      <img :src="images[currIndex]" alt="" ref="target">
      <div class="layer" v-show="show" :style="layerPosition"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    // 是否显示大图展示
    const show = ref(false)
    // 遮罩层坐标
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 大图的背景定位
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      show.value = !isOutside.value
      // 判断鼠标是否在图片边缘，应保证鼠标在边缘时遮罩层仍不越界
      if (elementX.value < 100) {
        layerPosition.left = '0px'
        largePosition.backgroundPositionX = '0px'
      } else if (elementX.value > 300) {
        layerPosition.left = '200px'
        largePosition.backgroundPositionX = '-400px'
      } else {
        layerPosition.left = `${elementX.value - 100}px`
        largePosition.backgroundPositionX = `${-2 * (elementX.value - 100)}px`
      }

      if (elementY.value < 100) {
        layerPosition.top = '0px'
        largePosition.backgroundPositionY = '0px'
      } else if (elementY.value > 300) {
        layerPosition.top = '200px'
        largePosition.backgroundPositionY = '-400px'
      } else {
        layerPosition.top = `${elementY.value - 100}px`
        largePosition.backgroundPositionY = `${-2 * (elementY.value - 100)}px`
      }
    })
    return { currIndex, show, largePosition, layerPosition, target }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    position: relative;
    cursor: move;

    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, .2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
