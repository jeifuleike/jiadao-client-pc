// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 数据懒加载模块
 * @param {Element} target Dom对象
 * @param {Function} apiFn API函数
 */
export const useLazyData = apiFn => {
  // 接收拿到的数据
  const result = ref([])
  // 接收dom元素
  const target = ref(null)
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用api拿到数据
        apiFn().then(data => {
          result.value = data.result
          console.log(data.result)
        })
      }
    }, {
      threshold: 0
    }
  )
  return { result, target }
}
