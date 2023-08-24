<template>
    <div class="xtx-pagination" v-if="maxPage > 0">
        <a href="javascript:;" :class="{disabled:page === 1}" @click="changePage(-1)">上一页</a>
        <span v-if="PageList[0] !== 1" @click="changePage(-showNum)">...</span>
        <a href="javascript:;" :class="{active: PageList[0] + index === page}" v-for="(i, index) in PageList" :key="i" @click="aPage(i)">{{ i }}</a>
        <span v-if="PageList[PageList.length - 1] !== maxPage" @click="changePage(showNum)">...</span>
        <a href="javascript:;" :class="{disabled:page === maxPage}" @click="changePage(1)">下一页</a>
    </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
// 修改显示页数的数组
const changePageList = (page, maxPage, showNum) => {
  const Intermediate = Math.ceil(showNum / 2)
  const pageList = []
  if (page < Intermediate) {
    for (let i = 1; i <= showNum; i++) {
      pageList.push(i)
    }
  } else if (page > (maxPage - Intermediate)) {
    for (let i = maxPage - showNum + 1; i <= maxPage; i++) {
      pageList.push(i)
    }
  } else {
    const num = Math.floor(showNum / 2)
    for (let i = showNum % 2 === 0 ? (page - num + 1) : (page - num); i <= (page + num); i++) {
      pageList.push(i)
    }
  }
  return pageList
}
export default {
  name: 'XtxPagination',
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    showNum: {
      type: Number,
      default: 3
    },
    maxPage: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    const page = useVModel(props, 'modelValue', emit)
    const PageList = ref([])
    PageList.value = changePageList(page.value, props.maxPage, props.showNum)
    const changePage = val => {
      console.log(val)
      let newPage = page.value + val
      if (newPage < 1) newPage = 1
      else if (newPage > props.maxPage) newPage = props.maxPage
      PageList.value = changePageList(newPage, props.maxPage, props.showNum)
      page.value = newPage
    }
    const aPage = val => {
      page.value = val
      PageList.value = changePageList(val, props.maxPage, props.showNum)
    }
    return { page, changePage, PageList, aPage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
    display: flex;
    justify-content: center;
    padding: 30px;

    >a {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        margin-right: 10px;

        &:hover {
            color: @xtxColor;
        }

        &.active {
            background: @xtxColor;
            color: #fff;
            border-color: @xtxColor;
        }

        &.disabled {
            cursor: not-allowed;
            opacity: 0.4;

            &:hover {
                color: #333
            }
        }
    }

    >span {
        margin-right: 10px;
    }
}</style>
