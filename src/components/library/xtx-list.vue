<template>
    <li v-for="item in goods" :key="item.id" :style="{ backgroundColor: bg }">
        <RouterLink :to="`/product/${item.id}`">
            <img v-lazy="item.picture" alt="">
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price" v-if="item.price">&yen;{{ item.price }}</p>
            <p class="desc" >{{item.alt}}</p>
        </RouterLink>
    </li>
</template>

<script>
export default {
  name: 'xtxList',
  props: {
    goods: {
      type: Array,
      default: () => []
    },
    bg: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style scoped lang="less">
li {
    width: 306px;
    height: 406px;
    .hoverShadow();

    img {
        width: 306px;
        height: 306px;
    }

    p {
        font-size: 22px;
        padding: 12px 30px 0 30px;
        text-align: center;
    }

    .price {
        color: @priceColor;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
}
</style>
