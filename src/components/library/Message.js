// 将组件函数化调用
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-msssage-container')
document.body.appendChild(div)

// 定时消失的定时器
let timer = null

export default ({ type, text }) => {
  // 渲染组件
  // 1.导入消息组件
  // 2.将消息提示组件编译为虚拟节点
  const vnode = createVNode(XtxMessage, { type, text })
  // 3.准备一个装载消息提示组件的容器
  // 将虚拟节点渲染在容器里
  // render(虚拟节点，DOM容器)
  render(vnode, div)
  // 3s后销毁组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
