<template>
  <div class="cart-sku">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible" ref="target">
      <div class="loading" v-if="loading"></div>
      <goodsSku v-else :skus="goods.skus" :skuId="skuId" :specs="goods.specs" @change="changeSku"/>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getSpecsAndSkus } from '@/api/cart'
import goodsSku from '@/views/goods/components/goods-sku.vue'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  components: { goodsSku },
  name: 'CartSku',
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const visible = ref(false)
    const goods = ref(null)
    const loading = ref(false)
    const store = useStore()
    const currSku = reactive({
      stock: '',
      skuId: props.skuId,
      attrsText: '',
      oldSkuId: props.skuId
    })
    const show = () => {
      visible.value = true
      loading.value = true
      getSpecsAndSkus(props.skuId).then(data => {
        goods.value = data.result
        loading.value = false
      })
      // 开启弹窗时格式化数据
      currSku.stock = ''
      currSku.skuId = props.skuId
      currSku.attrsText = ''
      currSku.oldSkuId = props.skuId
    }
    const changeSku = (sku) => {
      if (sku.skuId) {
        currSku.stock = sku.inventory
        currSku.skuId = sku.skuId
        currSku.attrsText = sku.specsText
      }
    }
    const hide = () => {
      if (currSku.skuId !== currSku.oldSkuId) {
        store.dispatch('cart/updateCart', currSku).then(() => {
          if (!store.state.user.profile.token) {
            store.commit('cart/mergeGoods')
          }
          Message({ type: 'success', text: '修改商品数据成功！' })
        }).catch(() => {
          Message({ text: '网络错误请稍后重试' })
        })
      }
      visible.value = false
      goods.value = null
    }
    const toggle = () => {
      if (visible.value) hide()
      else show()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      hide()
    })
    return { visible, toggle, target, goods, loading, changeSku }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
