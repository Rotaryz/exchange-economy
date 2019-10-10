<template>
  <div class="meeting-list">
    <navigation-bar title="全部会议"></navigation-bar>
    <!-- 最新会议 -->
    <div class="goods-box">
      <ul class="goods-list" v-if="goodsList.length && totalPage > 0">
        <li class="goods-item-wrap" v-for="item in goodsList" :key="item.id" @click="goodsJump(item)">
          <image :src="item.goods_cover_image" lazy-load mode="aspectFill" alt="" class="goods-item-top">
            <img v-if="item.video.id" src="./icon-play_big@2x.png" lazy-load mode="widthFix" alt="" class="goods-play-auto">
          </image>
          <div class="goods-item-content">
            <div class="goods-item-title">
              <span class="goods-label" :class="{'goods-label-null': item.saleable * 1 === 0}">{{item.saleable * 1 === 0 ? '人数已满' : '报名中'}}</span><p class="goods-title-text">{{item.name}}</p>
            </div>
            <div class="describe-goods-time">时间：{{item.meeting_time}}</div>
            <div class="describe-goods-time">地点：{{item.description}}</div>
          </div>
        </li>
      </ul>
      <empty v-else :imgWidth="109" :paddingTop="2.4" tip="会议排期中，敬请期待"></empty>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'

  const PAGE_NAME = 'MEETING_LIST'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty
    },
    data() {
      return {
        params: {
          limit: 10,
          page: 1
        },
        loading: false,
        totalPage: 0,
        goodsList: []
      }
    },
    onShow() {
      this.getCourseList()
    },
    // 下拉加载
    onReachBottom() {
      if (this.params.page + 1 > this.totalPage || this.loading) return
      this.params.page++
      this.getCourseList()
    },
    computed: {
      // ...Helpers.computed,
    },
    methods: {
      // ...Helpers.methods,
      // 会议列表
      getCourseList() {
        this.loading = true
        API.Goods.meetingList({ data: this.params, loading: false }).then(res => {
          if (this.params.page === 1) this.goodsList = []
          this.goodsList = [...this.goodsList, ...res.data]
          this.totalPage = res.meta.last_page
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      goodsJump(item) {
        let url = `${this.$routes.main.GOODS_DETAIL}?id=${item.id}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .meeting-list
    min-height: 100vh
    background: $color-background
    overflow-x: hidden
    box-sizing: border-box
  .goods-box
    padding: 15px 15px 0
    box-sizing: border-box
    .goods-item-wrap
      border-radius: 4px
      overflow: hidden
      margin-bottom: 15px
      .goods-item-top
        width: 100%
        display: block
        position: relative
        height: px2vw(194)
      .goods-play-auto
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        margin: auto
        width: 40px
        height: @width
        display: block
      .goods-item-content
        background: $color-white
        padding: 13px 10px 13px 13px
        box-sizing: border-box
        .goods-item-title
          font-bold()
          color: $color-text-main
          font-size: $font-size-16
          layout(row)
          align-items: center
          margin-bottom: 10px
          .goods-label
            padding: 0 5.5px
            height: 17px
            text-align: center
            line-height: 18px
            border-radius: 9px
            margin-right: 5px
            color: $color-white
            font-bold()
            background: $color-main
            display: inline-block
            font-size: $font-size-12
          .goods-label-null
            background: $color-999
            color: $color-white
          .goods-title-text
            flex: 1
            no-wrap()

        .describe-goods-time
          font-bold()
          color: #999
          font-size: $font-size-14
          word-wrap:break-word
        .goods-time-bottom
          margin-bottom: 4.5px
</style>
