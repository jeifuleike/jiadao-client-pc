<template>
  <div class="home-category">
    <ul class="menu" @mouseleave="listChildrenId = null">
      <!-- 一级 -->
      <li v-for="item in list" :key="item.id" @mouseenter="mouList(item.id)"
        :style="{ background: item.id === listChildrenId ? '#27BA9B' : 'transparent' }">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <!-- 二级 -->
        <!-- 加载占位符 -->
        <template v-if="!item.children">
          <XtxSkeleton width="50" height="25" v-for="i in 2" :key="i" style="margin: 5px;"/>
        </template>
        <template v-else>
          <RouterLink v-for="sub in item.children.slice(0, 2)" :key="sub.id" :to="`/category/sub/${sub.id}`">
            {{ sub.name }}
          </RouterLink>
        </template>
      </li>
      <!-- 弹层 -->
      <div class="layer">
        <h4>{{listChildrenId === 'brand'?'品牌推荐':'分类推荐'}} <small>根据您的购买或浏览记录推荐</small></h4>
        <ul v-if="listChildrenId && !(listChildrenId === 'brand')">
          <li v-for="item in listChildren" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img v-lazy="item.picture">
              <div class="info">
                <p class="name ellipsis-2">{{ item.name }}</p>
                <p class="desc ellipsis">{{ item.desc }}</p>
                <p class="price"><i>¥</i>{{ item.price }}</p>
              </div>
            </RouterLink>
          </li>
        </ul>
        <!-- 品牌模块 -->
        <ul v-if="listChildrenId === 'brand'">
          <li class="brand" v-for="item in listChildren" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture">
              <div class="info">
                <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="desc ellipsis-2">{{ item.desc }}</p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { hotpp } from '@/api/category'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    // 侧边栏数据铺设
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{
        id: 'brand-children',
        name: '品牌推荐'
      }],
      goods: []
    })
    const list = computed(() => {
      // 基于vuex中的数据  截取children中的前俩项
      // 基于一个数组 针对于数据的每一项都做处理 然后返回一个全新的数组 map
      const list = store.state.header.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    // 侧边栏推荐内容的显示与改变
    const listChildrenId = ref(null)
    const mouList = id => {
      listChildrenId.value = id
    }
    const listChildren = computed(() => {
      const child = list.value.find(item => item.id === listChildrenId.value)
      return child.goods
    })

    // 获取品牌数据
    hotpp().then(data => {
      brand.goods = data.result
    })

    return { list, listChildrenId, mouList, listChildren }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  // 左侧菜单
  .menu {
    >li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      // 显示弹层
      &:hover {
        background: @xtxColor;
      }

      // end
    }

    // 弹层默认不显示
    .layer {
      width: 990px;
      height: 500px;
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      left: 250px;
      top: 0;
      display: none;
      padding: 0 15px;

      h4 {
        font-size: 20px;
        font-weight: normal;
        line-height: 80px;

        small {
          font-size: 16px;
          color: #666;
        }
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 310px;
          height: 120px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fff;

          &:nth-child(3n) {
            margin-right: 0;
          }

          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding: 10px;

            &:hover {
              background: #e3f9f4;
            }

            img {
              width: 95px;
              height: 95px;
            }

            .info {
              padding-left: 10px;
              line-height: 24px;
              overflow: hidden;

              .name {
                font-size: 16px;
                color: #666;
              }

              .desc {
                color: #999;
              }

              .price {
                font-size: 22px;
                color: @priceColor;

                i {
                  font-size: 16px;
                }
              }
            }
          }
        }

        li.brand {
          height: 180px;

          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info{
              p{
                margin-top: 8px;
              }
              .place{
                color: #999;
              }
            }
          }
        }
      }
    }

    &:hover {
      .layer {
        display: block;
      }
    }
  }
}</style>
