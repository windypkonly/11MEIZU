<template>
    <div class="swiper" :style="swiperSize">
<!--      轮播图-->
      <ul class="swiper-ul" :style="listWrapper" @transitionend="setDuration">
        <li class="swiper-list" v-for="(item,index) in data" :key="index">
          <a :href="item.href">
            <img :style="swiperSize" :src="item.imgUrl" alt="">
          </a>
        </li>
        <li v-if="data.length > 1" class="swiper-list" :key="data.length + 1">
          <a :href="data[0].href">
            <img :style="swiperSize" src="data[0].imgUrl" alt="">
          </a>
        </li>
      </ul>
<!--      切换按钮-->
      <ul class="swiper-pagination">
        <li v-for="(item,index) in data" @click="changeImg(index)" :class="{'active': activeIndex === index}" :key="index"></li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      height: {
        type: Number,
        default: 500
      },
      width: {
        type: Number,
        default: 1240
      },
      delay: {
        type: Number,
        default: 5000
      }
    },
    computed: {
      swiperSize () {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        };
      },
      listWrapper () {
        return {
          width: `${(this.data.length + 1) * this.width}px`,
          height: `${this.height}px`,
          transform: `translateX(-${this.activeIndex * this.width}px)`,
          transitionDuration: this.haveDuration ? '.3s' : ''
        };
      }
    },
    data () {
      return {
        activeIndex: 0,
        timer: null,
        haveDuration: true
      };
    },
    mounted () {
      this.setTimer();
    },
    methods: {
      setTimer () {
        clearInterval(this.timer);
        this.time = setInterval(() => {
          if (this.activeIndex === (this.data.length)) {
            this.activeIndex = 0;
            this.haveDuration = false;
          } else {
            this.activeIndex++;
            this.haveDuration = true;
          }
        }, this.delay);
      },
      changeImg (index) {
        this.activeIndex = index;
        this.haveDuration = true;
      },
      setDuration () {
        if (this.activeIndex === this.data.length) {
          this.activeIndex = 0;
          this.haveDuration = false;
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .swiper{
    width: 1240px;
    height: 500px;
    position: relative;
    overflow: hidden;

    .swiper-ul{
      font-size: 0;
    }

    .swiper-list{
      display: inline-block;
    }
    .swiper-pagination{
      position: absolute;
      left: 30%;
      bottom: 20px;

      li{
        display: inline-block;
        width: 8px;
        height: 8px;border-radius: 50%;
        margin: 0 5px;
        background-color: #fff;
        cursor: pointer;

        &.active{
          background-color: transparent;
          border: 1px solid #fff;
        }
      }
    }
  }

</style>
