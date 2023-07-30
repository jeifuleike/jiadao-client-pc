<template>
  <div class="container">
    <div class="container">
      <!-- 面包屑 -->
      <subBread></subBread>
      <!-- 筛选组件 -->
      <subFilter @filter-change = "addReqParams"></subFilter>
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change = "addReqParams"/>
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <goodsItem :good="item" />
          </li>
        </ul>
        <!-- 加载组件 -->
        <XtxInfiniteLoading v-model:loading="loading" v-model:finished="finished" @infinite="loadMore" />
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import subBread from './sub-bread.vue'
import subFilter from './sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import goodsItem from './components/goods-item.vue'
import { useRoute } from 'vue-router'
import { getSubGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: { subBread, subFilter, SubSort, goodsItem },
  setup () {
    // 复选框逻辑
    const isFale = ref(false)
    // 加载条件
    const loading = ref(false)
    // 没有更多数据
    const finished = ref(false)
    // 商品数据
    const goodsList = ref([])
    const route = useRoute()
    // 请求参数对象
    let reqParams = reactive({
      page: 1,
      pageSize: 20
    })
    // 获取更多数据
    const loadMore = () => {
      loading.value = true
      reqParams.categoryId = route.params.idd
      getSubGoods(reqParams).then(data => {
        if (data.result.items.length) {
          goodsList.value.push(...data.result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    // 封装清空数据恢复原始状态的方法
    const cleaReqParams = () => {
      finished.value = false
      goodsList.value = []
      finished.value = false
    }
    // 给存储的对象中加上筛选数据
    const addReqParams = filterParams => {
      reqParams = { ...reqParams, ...filterParams }
      cleaReqParams()
      reqParams.page = 1
    }

    // 监听路由以及各种数据的变化
    watch(() => route.params.id, (newVal, oldVal) => {
      // 当路由发生变化的时候直接清空存商品的list等数据
      if (newVal && `/category/sub/${newVal}` === route.path) {
        cleaReqParams()
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })
    return { isFale, loading, finished, loadMore, goodsList, addReqParams }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}</style>
