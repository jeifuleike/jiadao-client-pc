<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">
        <div v-if="loading"  class="loading"></div>
        <div class="order-list" v-else>
          <div class="none" v-if="orderList.length === 0">暂无数据</div>
          <orderItem @on-cancel = "onCancelOrder" @on-delete-order="onDeleteOrder"
          @on-confirm = "onConfirmOrder"
          @on-logistics = "onLogisticsOrder"
          v-for="item in orderList" :key="item.id" :order="item" />
        </div>
        <XtxPagination
      v-if="total > requestParams.pageSize"
      v-model="requestParams.pa"
      :maxPage="Math.ceil(total/requestParams.pageSize)" />
      </XtxTabsPanel>
    </XtxTabs>
    <orderCancel ref="orderCancelCom"/>
    <OrderLogistics ref="logisticsOrderCom" />
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constant'
import { confirmOrder, delteOrder, findOrderList } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
import OrderLogistics from './components/order-logistics'
export default {
  name: 'MemberOrderPage',
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
  },
  setup () {
    const activeName = ref('all')
    const tabClick = (tab) => {
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }
    // 筛选条件
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 发请求获取数据
    const orderList = ref([])
    const loading = ref(false)
    const total = ref(0)
    // 使用侦听器，监听 requestParams 的改变
    const findOrderListFn = () => {
      loading.value = true
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(requestParams, () => {
      findOrderListFn()
    }, { immediate: true })

    // 分页事件
    const changePager = (np) => {
      requestParams.page = np
    }

    // 删除订单
    const onDeleteOrder = (item) => {
      Confirm({ text: '您确认删除该条订单吗？' }).then(() => {
        delteOrder([item.id]).then(() => {
          Message({ text: '删除订单成功', type: 'success' })
          findOrderListFn()
        })
      }).catch(e => {})
    }

    return {
      activeName,
      orderStatus,
      tabClick,
      requestParams,
      orderList,
      loading,
      total,
      changePager,
      onDeleteOrder,
      ...handlerCancel(),
      ...useConfirmOrder(),
      ...useLogisticsOrder()
    }
  }
}
export const handlerCancel = () => {
  const orderCancelCom = ref(null)
  const onCancelOrder = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item)
  }
  return { onCancelOrder, orderCancelCom }
}
// 封装逻辑-确认收货
export const useConfirmOrder = () => {
  const onConfirmOrder = (item) => {
    // item 就是你要确认收货的订单
    Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
      confirmOrder(item.id).then(() => {
        Message({ text: '确认收货成功', type: 'success' })
        // 确认收货后状态变成 待评价
        item.orderState = 4
      })
    })
  }
  return { onConfirmOrder }
}
// 封装逻辑-查看物流
const useLogisticsOrder = () => {
  const logisticsOrderCom = ref(null)
  const onLogisticsOrder = (item) => {
    logisticsOrderCom.value.open(item)
  }
  return { onLogisticsOrder, logisticsOrderCom }
}
</script>
<style scoped lang="less">
.order-list {
  background: #fff;
  padding: 20px;
}

.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}

.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
