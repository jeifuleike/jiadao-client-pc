<template>
  <div class="home-new">
    <homePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 面板内容 -->
      <div ref="target" style="position: relative;height: 426px;">
        <Transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <xtxList :goods="goods" bg="#f0f9f4"></xtxList>
          </ul>
          <homeSkeleton bg=" #f0f9f4" v-else />
        </Transition>
      </div>
    </homePanel>
  </div>
</template>

<script>
import homePanel from './home-panel.vue'
import { getNew } from '@/api/homePage'
import homeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hook'
export default {
  components: { homePanel, homeSkeleton },
  name: 'HomeNew',
  setup () {
    // getNew().then(data => {
    //   goods.value = data.result
    // })
    const { target, result } = useLazyData(getNew)
    return { goods: result, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
}
</style>
