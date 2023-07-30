<template>
    <div class="home-new">
        <homePanel title="人气推荐" sub-title="人气爆款 不容错过">
            <template #right>
                <XtxMore path="/" />
            </template>
            <!-- 面板内容 -->
            <div ref="target" style="position: relative;height: 426px;">
                <Transition name="fade">
                    <ul v-if="goods.length" ref="pannel" class="goods-list">
                        <xtxList :goods="goods"></xtxList>
                    </ul>
                    <HomeSkeleton v-else />
                </Transition>
            </div>
        </homePanel>
    </div>
</template>
<script>
import homePanel from './home-panel.vue'
import { getHot } from '@/api/homePage'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hook'
export default {
  name: 'HomeHot',
  components: { homePanel, HomeSkeleton },
  setup () {
    const { target, result } = useLazyData(getHot)
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
