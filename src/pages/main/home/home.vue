<template>
  <div class="home">
    <navigation-bar title="兑换商城" :showArrow="false" titleColor="#000" :isOpacity="true"></navigation-bar>
    <div class="location-city">
      <img src="./icon-current_city@2x.png" alt="" class="location-img">
      <div class="location-text">当前城市: 广州市</div>
    </div>
    <!-- 轮播图 -->
    <div class="banner-box">
      <swiper
        class="banner"
        autoplay
        interval="5000"
        display-multiple-items="1"
        previous-margin="0px"
        next-margin="0px"
        circular
        :current="bannerIndex"
        @change="handleSetBannerIndex">
        <block
          v-for="(item,index) in bannerArray"
          :key="index"
        >
          <swiper-item
            class="banner-item"
          >
            <div class="b-item-wrapper"
                 @click="handleBannerJump(item)"
            >
              <img
                v-if="item.detail.image_url"
                class="item-img"
                lazy-load
                mode="aspectFill"
                :src="item.detail.image_url"
              >
            </div>
          </swiper-item>
        </block>
      </swiper>
      <div class="dot-wrapper">
        <p class="dot-item">{{bannerIndex+1}}</p>
        <p class="dot-item">/</p>
        <p class="dot-item">{{bannerArray.length}}</p>
      </div>
    </div>
    <!-- 最新课程 -->
    <div class="goods-box">
      <div class="new-goods-title">
        <img src="./icon-new_curriculum@2x.png" alt="" class="new-goods-img">
        <div class="new-goods-text">最新课程</div>
      </div>
      <section class="goods"></section>
      <ul class="goods-list">
        <li class="goods-item-wrap">
          <img src="https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750" alt="" class="goods-item-top">
          <div class="goods-item-content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'HOME'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        bannerIndex: 0,
        cms: '',
        bannerArray: [
          {detail: {image_url: 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'}},
          {detail: {image_url: 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'}},
          {detail: {image_url: 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/08/29/1567070867535-109527.png?imageMogr2/thumbnail/750x750'}}
        ]
      }
    },
    async onLoad() {},
    methods: {
      handleSetBannerIndex(e) {
        this.bannerIndex = e.target.current
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $bannerWidth = 375
  @import "~@design"

  .home
    min-height: 100vh
    background: $color-background
    overflow-x: hidden
    padding-bottom: 15px
    box-sizing: border-box
  .location-city
    padding: 13.5px 15px
    box-sizing: border-box
    layout(row)
    align-items: center
    .location-img
      display: block
      width: 12.5px
      height: 14.5px
      margin-right: 5px
    .location-text
      font-family: $font-family-regular
      color: $color-text-main
      font-size: $font-size-16
  .banner-box
    position: relative
    .banner
      height: px2vw(211)
      .banner-item
        width: px2vw($bannerWidth)
        height: 100%
        margin: 0 atuo
        .b-item-wrapper
          margin: 0 auto
          position: relative
          width: px2vw($bannerWidth)
          height: px2vw(211)
          .item-img
            background: $image-color
            width: px2vw($bannerWidth)
            height: px2vw(211)
            border-radius: 2px
    .dot-wrapper
      position: absolute
      right: px2vw(12)
      bottom: px2vw(12)
      display: flex
      width: 35px
      height: 17.5px
      background-image url("./pic-switch.png")
      background-size: 100% 100%
      layout(row, block, nowrap)
      align-items: center
      justify-content space-around
      box-sizing: border-box
      padding: 0 3px
      .dot-item
        font-family: $font-family-regular
        font-size: $font-size-10;
        color: #F1F5EB;
        line-height: 1

  .goods-box
    padding: 0 15px
    box-sizing: border-box
    .new-goods-title
      layout(row)
      align-items: center
      padding: 25px 0 15px
      .new-goods-img
        display: block
        width: 12.5px
        height: 14.5px
        margin-right: 5px
      .new-goods-text
        font-family: $font-family-medium
        color: $color-text-main
        font-size: $font-size-16
    .goods-item-wrap
      margin-bottom: 20px
      border-radius: 4px
      overflow: hidden
      .goods-item-top
        width: 100%
        display: block
        height: px2vw(194)
      .goods-item-content
        background: $color-white
        .goods-item-content
          padding: 13px 10px 13px 13px
          box-sizing: border-box
  .home
    width: 100%
</style>
