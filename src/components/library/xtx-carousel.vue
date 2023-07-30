<template>
  <div class='xtx-carousel' @mouseenter="cleanTimer()" @mouseleave="autoPlayFn()">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(item, index) in photoList" :key="item.id" :class="{ fade: index === listIndex }">
        <RouterLink :to="item.hrefUrl">
          <img v-lazy="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="prev()"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next" @click="next()"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="i in photoList.length" :key="i" @click="listIndex = i-1"
        :class="{ active: i-1 === listIndex }"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'xtxCarousel',
  props: {
    photoList: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // index记录现在显示哪张图片
    const listIndex = ref(0)
    // 自动轮播图
    let timer = null
    // 创建定时器
    const autoPlayFn = () => {
      if (props.autoPlay) {
        clearInterval(timer)
        timer = setInterval(() => next(), props.duration)
      }
    }
    // 当组件创建传入图片后调用创建定时器方法
    watch(() => props.photoList, () => {
      autoPlayFn()
    }, { immediate: true })

    // 点击上一张按钮的方法
    const prev = () => {
      listIndex.value--
      if (listIndex.value === -1) {
        listIndex.value = props.photoList.length - 1
      }
    }

    // 点击下一张按钮的方法
    const next = () => {
      listIndex.value++
      if (listIndex.value === props.photoList.length) {
        listIndex.value = 0
      }
    }
    // 清除定时器方法
    const cleanTimer = () => {
      if (timer) clearInterval(timer)
    }
    // 使用 onUnmounted 钩子，在组件销毁前清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { listIndex, prev, next, autoPlayFn, cleanTimer }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, .2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        ~span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, .2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
