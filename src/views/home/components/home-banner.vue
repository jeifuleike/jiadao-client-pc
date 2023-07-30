<template>
  <div class="container">
    <xtxCarousel class="container" :photoList="list"></xtxCarousel>
  </div>
</template>

<script>
import xtxCarousel from '@/components/library/xtx-carousel.vue'
import { getHomeBanner } from '@/api/homePage'
import { ref } from 'vue'
export default {
  components: { xtxCarousel },
  name: 'HomeBanner',
  setup () {
    const list = ref([])
    getHomeBanner().then(data => {
      list.value.push(...data.result)
    })
    return { list }
  }
}
</script>

<style scoped lang="less">
.container{
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.xtx-carousel{
  /deep/.carousel-btn.prev {
    left: 270px;
  }
  /deep/ .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
