<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="openDialog">切换地址</XtxButton>
      <XtxButton class="btn" @click="openAddressEdit">添加地址</XtxButton>
    </div>
  </div>
  <XtxDialog title="切换收货地址" v-model:visible="visible">
      <div @click="clickDialog = item" :class="{ active:clickDialog?.id === item.id }" class="text item" v-for="item in list" :key="item.id">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact}}</li>
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
        </ul>
      </div>
      <!-- vue3.0 仅支持v-slot+template写法 -->
      <template v-slot:footer>
        <XtxButton type="gray" @click="visible = false" style="margin-right:20px">取消</XtxButton>
        <XtxButton type="primary" @click="confirmAddress" >确认</XtxButton>
      </template>
    </XtxDialog>
    <!-- 收获地址添加组件 -->
    <AddressEdit ref="addressEdit" @on-success="successHandler"/>
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './addres-edit.vue'
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const showAddress = ref(null)
    if (props.list.length) {
      showAddress.value = props.list.find(item => item.isDefault === 1)
      if (!showAddress.value) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
      emit('change', showAddress.value?.id)
    }
    const clickDialog = ref(showAddress.value)
    const visible = ref(false)
    // 打开对话框
    const openDialog = () => {
      visible.value = true
    }
    // 确认地址
    const confirmAddress = () => {
      visible.value = false
      showAddress.value = clickDialog.value
      // 默认通知一个地址ID给父
      emit('change', showAddress.value?.id)
    }
    const addressEdit = ref(null)
    const openAddressEdit = (showAddress) => {
      addressEdit.value.open(showAddress)
    }
    // 成功
    const successHandler = (formData) => {
      const json = JSON.stringify(formData)
      // 需要克隆下，不然使用的是对象的引用
      // eslint-disable-next-line vue/no-mutating-props
      props.list.unshift(JSON.parse(json))
    }
    return { showAddress, visible, clickDialog, openDialog, confirmAddress, addressEdit, openAddressEdit, successHandler }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
