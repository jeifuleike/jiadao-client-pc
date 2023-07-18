<template>
  <!-- vue2.0需要根元素，而vue3.0可以是代码片段，Fragment -->
  <div>
    <p>{{ $store.state.user.profile.id }}</p>
    <XtxButton type="primary" @click="fn">测试修改</XtxButton>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const fn = () => {
      store.commit('user/setId', '')
    }
    return { fn }
  }
}
</script>

<style lang="less" scoped></style>
