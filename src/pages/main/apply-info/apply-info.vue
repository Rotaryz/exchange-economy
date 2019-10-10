<template>
  <div class="apply-info">
    <navigation-bar title="报名信息"></navigation-bar>
    <div class="apply-box">
      <div class="apply-top-info">
        <image :src="goodsMsg.cover_image" lazy-load mode="aspectFill" alt="" class="goods-item-top"></image>
        <div class="top-info-box">
          <div class="top-info-title">{{goodsMsg.name}}</div>
          <div class="top-des-time top-des-time-bottom">时间：{{goodsMsg.meeting_time}}</div>
          <div class="top-des-time">地点：{{goodsMsg.description}}</div>
        </div>
      </div>
      <div class="apply-number-box">
        <div class="number-item number-item-line">
          <div class="number-item-left">参会人数</div>
          <div class="num-btn-box1">
            <button class="left" @click.stop="subNum" formType="submit">
              <img v-if="showOrderNum" src="./icon-jian1@2x.png" class="right-add" alt="">
              <img v-else src="./icon-jian2@2x.png" class="right-add" alt="">
            </button>
            <div class="count ">{{orderNum}}</div>
            <button class="right" @click.stop="addNum" formType="submit">
              <img src="./icon-jia@2x.png" class="right-add" alt="">
            </button>
          </div>
        </div>
        <div class="number-item">
          <div class="number-item-left">场地费</div>
          <div class="number-item-number">{{goodsMsg.price}}元</div>
        </div>
      </div>
      <div class="apply-input-box">
        <div class="input-item">
          <div class="input-item-left">姓名</div>
          <div class="input-item-right">
            <input type="text" class="info-input" placeholder="请输入姓名" placeholder-class="info-input-placeholder">
          </div>
        </div>
        <div class="input-item">
          <div class="input-item-left">手机号</div>
          <div class="input-item-right">
            <input type="number" class="info-input" placeholder="请输入手机号" placeholder-class="info-input-placeholder">
            <div class="input-btn">微信授权手机</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sure-box">
      <div class="sure-box-btn sure-box-btn-fail">确认报名</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'APPLY_INFO'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        showOrderNum: true,
        orderNum: 1,
        courseId: '',
        goodsMsg: {}
      }
    },
    onLoad(options) {
      console.log(options.id)
      this.courseId = options.id
      this._getCourseInfo()
    },
    computed: {
      // ...Helpers.computed,
    },
    methods: {
      // 获取会议详情
      _getCourseInfo() {
        console.log(`this.courseId = ` + this.courseId)
        API.Meeting.getMeetingInfo({data: {id: this.courseId}}).then(res => {
          this.goodsMsg = res.data
          console.log(this.goodsMsg)
          this.courseId = res.data.id
        })
      },
      subNum() {
        if (this.orderNum > 1) {
          this.orderNum--
        }
        if (this.orderNum <= 1) {
          this.showOrderNum = true
        }
      },
      addNum() {
        if (this.orderNum > 0) {
          this.showOrderNum = false
        }
        this.orderNum++
      }
      // ...Helpers.methods,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .apply-info
    min-height: 100vh
    background: $color-background
    overflow-x: hidden
    box-sizing: border-box
  .apply-box
    padding: 10px 15px 0
    box-sizing: border-box
    .apply-top-info
      background: $color-white
      border-radius: 4px
      overflow: hidden
      margin-bottom: 10px
      border-1px($color-line)
      .goods-item-top
        width: 100%
        display: block
        position: relative
        height: px2vw(194)
      .top-info-box
        padding: 13.5px 10px 15px
        box-sizing: border-box
        .top-info-title
          font-bold()
          color: $color-text-main
          font-size: $font-size-16
          margin-bottom: 14px
        .top-des-time
          font-bold()
          color: $color-999
          font-size: $font-size-14
          line-height: $font-size-14
        .top-des-time-bottom
          margin-bottom: 7px
    .apply-number-box
      background: $color-white
      border-radius: 4px
      overflow: hidden
      margin-bottom: 10px
      border-1px($color-line)
      .number-item
        height: 50px
        layout(row)
        align-items: center
        justify-content: space-between
        padding: 0 15px
        .number-item-left
          font-family: $font-family-regular
          color: $color-text-main
          font-size: $font-size-14
        .number-item-number
          font-family: $font-family-regular
          color: $color-text-main
          font-size: $font-size-14
      .number-item-line
        border-bottom-1px($color-line)
  .apply-input-box
    background: $color-white
    border-radius: 4px
    overflow: hidden
    margin-bottom: 10px
    border-1px($color-line)
    .input-item
      layout(row)
      height: 50px
      align-items: center
      padding: 0 15px
      .input-item-left
        font-family: $font-family-regular
        color: $color-text-main
        font-size: $font-size-14
        width: 68px
      .input-item-right
        flex: 1
        position: relative
        .info-input
          font-family: $font-family-regular
          color: $color-text-main
          font-size: $font-size-14
        .info-input-placeholder
          font-family: $font-family-regular
          color: $color-999
          font-size: $font-size-14
        .input-btn
          position: absolute
          width: 90px
          height: 32px
          line-height: 32px
          background: #3FBB39
          text-align: center
          right: 0
          top: 0
          bottom: 0
          margin: auto
          font-family: $font-family-regular
          color: $color-white
          font-size: $font-size-12
          border-radius: 32px
  .sure-box
    position: fixed
    left: 0
    bottom: 0
    width: 100vw
    height: 60px
    background: $color-white
    padding: 10px 15px
    box-sizing: border-box
    .sure-box-btn
      font-bold()
      color: $color-white
      font-size: $font-size-16
      background: #FC3E3E
      border-radius: 45px
      height: 40px
      line-height: 40px
      text-align: center
    .sure-box-btn-fail
      opacity: 0.5

  .num-btn-box1
    width: 102px
    height: 24px
    border-radius: 4px
    border-1px(#EEEEEE, 4px, solid, 2px)
    layout(row)
    .left, .right
      width: 24px
      height: 100%
      color: #919191
      font-size: $font-size-14
      layout(row)
      justify-content: center
      align-items: center
      .cut
        width: 10px
        height: 1.5px
        background: #625E61
      .cut1
        background: #D1D1D1
      .right-add
        width: 10px
        height: 10px
        display: block
    .right
      .add1
        width: 11px
        height: 1.5px
        background-color: #625E61
      .add2
        width: 1.5px
        height: 10px
        background-color: #625E61
        transform: translateX(-6px)
    .count
      width: 50px
      height: 24px
      line-height: 24.5px
      text-align: center
      border-left: 1px solid $color-white
      border-right: 1px solid $color-white
      font-bold()
      font-size: $font-size-14
    .left
      border-right: 1px solid #eee
    .right
      border-left: 1px solid #eee
  .apply-info
    width: 100%
</style>
