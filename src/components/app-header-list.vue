<template>
    <div class="layer">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <a href="#">
                    <img :src="item.picture" alt="">
                    <p>{{ item.name }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'headerList',
  props: {
    list: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.layer {
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
</style>
