<template>
  <div class="xtx-skeleton shan" :style="{ width: width + 'px', height: height + 'px' }">
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>

<script>
export default {
  name: 'XtxSkeleton',
  // 容许定制的参数包括: 背景/宽度/高度
  props: {
    bg: {
      type: String,
      default: 'rgba(255, 255, 255, 0.1)'
    },
    width: {
      type: String,
      default: '100'
    },
    height: {
      type: String,
      default: '100'
    }
  }
}
</script>

<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;

  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
/* 将 shan 类名添加到 xtx-skeleton 的父元素上 */
.shan::after {
  content: "";
  position: absolute;
  animation: shan 1.5s ease 0s infinite;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-45deg);
}

@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
