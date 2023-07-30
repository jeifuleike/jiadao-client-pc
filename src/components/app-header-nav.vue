<template>
    <ul class="app-header-nav">
        <li class="home">
            <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-for="(item, index) in $store.state.header.list" :key="index" @mousemove="show(item)" @mouseleave="hide(item)">
            <RouterLink @click="hide(item)" :to="`/category/${item.id}`" href="#">{{ item.name }}</RouterLink>
            <!-- hover 显示 start -->
            <div class="layer" :class="{open:item.open}">
                <ul>
                    <li v-for="(items, index) in item.children" :key="index">
                        <RouterLink @click="hide(item)" :to="`/category/sub/${items.id}`" href="#">
                            <img v-lazy="items.picture" alt="">
                            <p>{{ items.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <!-- hover 显示 end -->
        </li>
    </ul>
</template>

<script>

import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    const show = item => {
      store.commit('header/show', item.id)
    }
    const hide = item => {
      store.commit('header/hide', item.id)
    }
    return { show, hide }
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
        margin-right: 30px;
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
        .layer {
            &.open{
                height: 120px;
                opacity: 1;
            }
            position: absolute;
            left: -200px;
            top: 56px;
            height: 0;
            overflow: hidden;
            opacity: 0;
            box-shadow: 0 0 5px #ccc;
            transition: all 0.2s 0.1s;
            width: 1240px;
            background-color: #fff;

            ul {
                display: flex;
                flex-wrap: wrap;
                padding: 0 70px;
                align-items: center;
                height: 124px;

                li {
                    width: 110px;
                    text-align: center;

                    img {
                        width: 60px;
                        height: 60px;
                    }

                    p {
                        padding-top: 10px;
                    }

                    &:hover {
                        p {
                            color: @xtxColor;
                        }
                    }
                }
            }
        }

        // hover之后显示出来
        &:hover {
            >a {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }
        }
        .active {
            >a {
                color: @xtxColor;
                border-bottom: 1px solid @xtxColor;
            }
        }

        // ++ end
    }
}
</style>
