<template>
  <div class="goods-sku">
    <dl v-for="item in specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(val, item)"
            v-if="val.picture" :src="val.picture" alt="">
          <span :class="{ selected: val.selected, disabled: val.disabled }" @click="changeSku(val, item)" v-else>{{
            val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import PowerSet from '@/vender/power-set'
const spliter = '·'
// 拿到一个路径字典
const getPathMap = (skus) => {
  // 从所有的sku中筛选出有效的sku
  // 路径字典
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 根据有效的sku使用power-set算法得到子集
      const valueArr = sku.specs.map(val => val.valueName)
      const valueArrPowerSet = PowerSet(valueArr)
      // 遍历子集，往pathMath插入数据
      valueArrPowerSet.forEach(arr => {
        // 根据arr得到字符串的key
        const key = arr.join(spliter)
        // 根据子集路径字典对象中存储 key-value
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 将点击了的按钮存储起来
const getSelectedValues = specs => {
  const arr = []
  // 这样还可以保证按钮的数据顺序一致
  specs.forEach(item => {
    const selectedVal = item.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
// 更新按钮的禁用状态
const updataDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedValues(specs)
    spec.values.forEach(val => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值得到key
      const key = selectedArr.filter(v => v).join(spliter)
      // 设置禁用状态
      val.disabled = !pathMap[key]
    })
  })
}
// 默认选中功能
const initDefaultSelected = (specs, skus, skuId) => {
  // 1.找出sku的信息
  const sku = skus.find(sku => sku.id === skuId)
  specs.forEach((item, i) => {
    const val = item.values.find(val => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}

export default {
  name: 'GoodsSku',
  props: {
    specs: {
      type: Array,
      default: () => ([])
    },
    skus: {
      type: Array,
      default: () => ([])
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const pathMap = getPathMap(props.skus)
    // 组件初始化的时候更新按钮禁用状态
    if (props.skuId) {
      initDefaultSelected(props.specs, props.skus, props.skuId)
    }
    updataDisabledStatus(props.specs, pathMap)
    const changeSku = (val, obj) => {
      if (val.disabled) return
      const isFales = val.selected
      obj.values.forEach(element => {
        element.selected = false
      })
      if (!isFales) {
        val.selected = true
      }
      // 点击按钮时更新禁用
      updataDisabledStatus(props.specs, pathMap)
      // 当用户点击完全部按钮的时候给父组件传递数据
      const selectedArr = getSelectedValues(props.specs).filter(val => val)
      if (selectedArr.length === props.specs.length) {
        const skuId = pathMap[selectedArr.join(spliter)]
        const sku = props.skus.find(sku => sku.id === skuId[0])
        // 传递
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        emit('change', {})
      }
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
