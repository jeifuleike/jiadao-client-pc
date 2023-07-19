<template>
    <ul class="app-header-nav">
        <li class="home">
            <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-for="(item,index) in $store.state.header.list" :key="index">
            <a href="#">{{ item.name }}</a>
            <!-- hover 显示 start -->
            <div class="laye">
                <appHeaderList :list="item.children"/>
            </div>
            <!-- hover 显示 end -->
        </li>
    </ul>
</template>

<script>
import { onMounted } from 'vue'
import appHeaderList from './app-header-list.vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  components: {
    appHeaderList
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      // 头部分类模块的铺设
      if (store.state.header.list.length === 0) {
        store.dispatch('header/loadGetClassification')
      }
    })
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    >li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        >a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;
        }

        &:hover {
            >a {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }
        }

        // ++ 初始样式 不显示
        .laye {
            position: absolute;
            left: -200px;
            top: 56px;
            height: 0;
            overflow: hidden;
            opacity: 0;
            box-shadow: 0 0 5px #ccc;
            transition: all 0.2s 0.1s;
        }

        // hover之后显示出来
        &:hover {
            >a {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }

            >.laye {
                height: 120px;
                opacity: 1;
            }
        }

        // ++ end
    }
}
</style>
