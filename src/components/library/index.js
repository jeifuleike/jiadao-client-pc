// 扩展vue原有功能： 全局组件，自定义指令，挂载原型方法
// vue3插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上进行扩展
import defaultImg from '@/assets/images/200.png'
import Message from './Message'

// 批量导入一个文件夹内的文件
// context(目录路径, 是否加载子目录, 加载文件的匹配正则)
const importFn = require.context('./', false, /\.vue$/)
// importFn.keys()会返回找到的文件的相对路径
export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive
    // 根据keys批量注册
    importFn.keys().forEach(element => {
      // 导入组件
      const component = importFn(element).default
      // 进行注册
      app.component(component.name, component)
    })
    // 定义指令
    defineDirective(app)

    // 定义一个原型函数
    app.config.globalProperties.$message = Message
  }
}

// 定义指令
const defineDirective = (app) => {
  // 图片懒加载指令 v-lazy
  // 先存储图片地址不能在sec上，当图片进入可视区，将你存储图片地址设置给图片元素即可。
  app.directive('lazy', {
    // 当指令的DOM创建好后会调用钩子函数：mounted
    /**
     *
     * @param {*} el 指令挂载的dom元素本身
     * @param {*} binding 传入暂存的图片地址
     */
    mounted (el, binding) {
      // 编写各种指令代码
      // 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        // isIntersecting来判断元素是否进入可视区
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 当进入可视区触发该方法后把指令的值设置给该元素的src上
          // 处理图片加载失败
          el.onerror = () => {
            // 加载数失败，设置默认图片
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        // 编写各种配置
        // 当元素一进入可视区后立马执行函数
        threshold: 0
      })
      // 使用observe方法来注册观察元素
      observe.observe(el)
    }
  })
}
