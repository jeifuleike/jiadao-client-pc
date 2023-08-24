// 提供复用逻辑的函数（钩子）
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { onUnmounted, ref } from 'vue'
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
/**
 * 支付倒计时函数
 */
export const usePayTime = () => {
  // 倒计时逻辑
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    if (time.value <= 0) {
      time.value = 0
      pause()
    }
  }, 1000, false)
  onUnmounted(() => {
    pause()
  })

  // 开启定时器 countdown 倒计时时间
  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }
  // 支付提示
  const visibleDialog = ref(false)
  return {
    start,
    timeText,
    visibleDialog
  }
}
