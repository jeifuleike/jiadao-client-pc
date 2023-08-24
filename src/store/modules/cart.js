import { checkAllCart, deleteCart, getCart, getNewCartGoods, insertCart, mergeLocalCart, updateCart } from '@/api/cart'

// 购物车状态
export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    // 给购物车内添加商品
    insertCart (state, payloed) {
      const goodsIndex = state.list.findIndex(good => good.skuId === payloed.skuId)
      if (goodsIndex > -1) {
        payloed.count = state.list[goodsIndex].count + payloed.count
        state.list.splice(goodsIndex, 1)
        state.list.unshift(payloed)
      } else {
        state.list.unshift(payloed)
      }
    },
    // 删除购物车的商品
    clearCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId.skuId)
      state.list.splice(index, 1)
    },
    // 修改购物车信息
    updateCart (state, goods) {
      let updateGoods = -1
      if (goods.oldSkuId) {
        updateGoods = state.list.find(item => item.skuId === goods.oldSkuId)
      } else {
        updateGoods = state.list.find(item => item.skuId === goods.skuId)
      }
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 如果用户在购物车换规格的时候又选择了相同规格的就合并商品
    mergeGoods (state) {
      const goodsSkuId = []
      state.list.forEach((item, i) => {
        const index = goodsSkuId.findIndex((val) => {
          return val === item.skuId
        })
        if (index === -1) {
          goodsSkuId.push(item.skuId)
        } else {
          const ind = state.list.findIndex(val => val.skuId === item.skuId)
          state.list[ind].count = state.list[ind].count + item.count
          state.list.splice(i, 1)
        }
      })
    },
    // 设置购物车
    setCart (state, payloed) {
      state.list = payloed
    }
  },
  actions: {
    // 合并购物车
    async mergeCart (ctx) {
      const cartList = ctx.state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeLocalCart(cartList)
      // 合并成功清空本地购物车
      ctx.commit('setCart', [])
    },
    // 添加购物车
    insertCart (ctx, payloed) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录了
          insertCart({ skuId: payloed.skuId, count: payloed.count }).then(() => {
            return getCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('insertCart', payloed)
          resolve()
        }
      })
    },
    // 删除购物车
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
        // 登录 TODO
          deleteCart([skuId.skuId]).then(() => {
            return getCart()
          }).then((data) => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 本地
          ctx.commit('clearCart', skuId)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登入了
          getCart().then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 本地
          const PromiseArr = ctx.state.list.map(goods => getNewCartGoods(goods.skuId))
          Promise.all(PromiseArr).then(results => {
            results.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          })
        }
      })
    },
    // 修改购物车商品
    updateCart (ctx, goods) {
      // goods 中：必须有skuId，其他想修改的属性 selected  count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token && !goods.oldSkuId) {
          // 登录 TODO
          updateCart(goods).then(() => {
            return getCart()
          }).then((data) => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else if (ctx.rootState.user.profile.token && goods.oldSkuId) {
          // 保存修改了skuID的商品的数量数据
          const good = ctx.state.list.find(item => item.skuId === goods.oldSkuId)
          const count = good.count
          // 先删除商品
          deleteCart([goods.oldSkuId]).then(() => {
            // 然后再添加商品
            return insertCart({ skuId: goods.skuId, count: count })
          }).then(() => {
            return getCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 本地
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 做有效商品的全选&反选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({ selected, ids }).then(() => {
            return getCart()
          }).then((data) => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除选中的商品
    clearAllCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          // 得到需要删除的商品列表（失效，选中）的skuId集合
          const ids = ctx.getters[isClear ? 'unValidListt' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids).then(() => {
            return getCart()
          }).then((data) => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 本地
          // 遍历购物车列表，删除所有selected为true的商品
          ctx.getters[isClear ? 'unValidList' : 'selectedList'].forEach(item => {
            if (item.selected) {
              ctx.commit('clearCart', { skuId: item.skuId })
            }
          })
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    unValidList (state) {
      return state.list.filter(item => item.stock <= 0 && !item.isEffective)
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总数件
    selectedListTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品金额
    selectedListAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 有效商品是否全选
    validSelected (state, getters) {
      return getters.validList.length !== 0 && getters.validList.every(item => item.selected)
    },
    // 无效商品是否全选
    unValidSelected (state, getters) {
      return getters.unValidList.every(item => item.selected)
    }
  }
}
