<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // 用法
    // 1.tempate标签去除，单文件组件
    // 2.返回值就是组件内容
    // 3.h第一个参数 为标签名称 第二个参数 为标签属性对象 第三个参数 为这个标签内的全部子节点
    // 拿到插槽内的全部元素
    const items = this.$slots.default()
    // 定义一个空的数组来接收修改后的元素
    const dymanicItems = []
    // 对数组进行变量，在每一个子元素后面加上i标签
    items.forEach((item, index) => {
      dymanicItems.push(item)
      if (index < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang='less'>
// 去掉 scoped 属性，目的，让样式作用到xtx-bread-item组件
.xtx-bread {
    display: flex;
    padding: 25px 10px;

    &-item {
        a {
            color: #666;
            transition: all .4s;

            &:hover {
                color: @xtxColor;
            }
        }
    }

    i {
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 22px;
    }
}</style>
