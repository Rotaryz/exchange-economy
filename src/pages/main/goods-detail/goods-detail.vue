<template>
  <div class="goods-detail">
    <navigation-bar title="会议详情"></navigation-bar>
    <!--轮播图-->
    <div class="banner-box-white">
      <section class="banner-box">
        <div class="header-swiper" v-if="hasVideo">
          <div class="banner">
            <block>
              <div class="banner-item">
                <video class="item-img" id="goodsVideo" :src="goodsMsg.banner_videos[0].video_url" :poster="videoPoster" :muted="true" :show-mute-btn="true" :show-center-play-btn="false" :enable-progress-gesture="false" @ended='videoEnd' @waiting="videoWaiting" @progress="videoLoaded"></video>
                <img v-if="goodsBanner[0].image_url" :class="!playBefore?'hide':''" :src="goodsBanner[0].image_url" mode="aspectFill" class="item-img video-img">
                <div class="play-btn" @click="playVideo && playVideo(false)">
                  <img v-if="imageUrl&&!videoPlaying" :src="imageUrl + '/yx-image/2.6.5/icon-play_big@2x.png'" mode="aspectFill" class="play-btn-icon" @click.stop="playVideo && playVideo(true)">
                </div>
              </div>
            </block>
          </div>
        </div>
        <div class="header-swiper" v-else>
          <swiper v-if="goodsBanner && goodsBanner.length" :current="swiperIdx" class="banner" @change="bannerChange" interval="5000">
            <block v-for="(item, index) in goodsBanner" :key="index">
              <swiper-item class="banner-item">
                <img :src="item.image_url + '?' + goodsMsg.image_view" class="item-img item-img-one" mode="aspectFill">
                <img :src="item.image_url" class="item-img item-img-two" mode="aspectFill">
              </swiper-item>
            </block>
          </swiper>
          <article class="banner-number" v-if="goodsBannerLength !== 0">
            <div></div>
            <!--<div v-if="hasVideo" class="banner-btn-con">-->
              <!--<div :class="currentNum===0?'active':''" class="banner-number-box banner-btn" @click="changeCurrentNum(0)">-->
                <!--<img v-if="imageUrl&&currentNum===0" :src="imageUrl + '/yx-image/2.6.5/icon-play_white@2x.png'" mode="aspectFill" class="banner-btn-icon">-->
                <!--<img v-if="imageUrl&&currentNum!==0" :src="imageUrl + '/yx-image/2.6.5/icon-play_black@2x.png'" mode="aspectFill" class="banner-btn-icon">-->
                <!--视频-->
              <!--</div>-->
              <!--<div :class="currentNum!==0?'active':''" class="banner-number-box banner-btn" @click="changeCurrentNum(1)">图片</div>-->
            <!--</div>-->
            <div :style="{opacity: currentNum!==0?'1':'0'}" class="banner-number-box">{{currentNum}}/{{goodsBannerLength}}</div>
          </article>
        </div>
      </section>
    </div>
    <!--商品信息-->
    <section class="goods-info">
      <div class="title has-title">
        <!--<span class="title-label">报名中</span>-->
        {{goodsMsg.name}}
      </div>
      <div class="meeting-number">会议人数: {{goodsMsg.meeting_number}}</div>
      <!--<div class="goods-text-box">-->
        <!--<text class="goods-text">{{goodsMsg.description}}</text>-->
      <!--</div>-->
      <div class="meeting-des-box">
        <img src="./time@2x.png" alt="" class="des-box-img">
        <div class="des-box-text">{{goodsMsg.meeting_time}}</div>
      </div>
      <div class="meeting-des-box">
        <img src="./icon-current@2x.png" alt="" class="des-box-img">
        <div class="des-box-text">{{goodsMsg.description}}</div>
      </div>
      <div class="goods-share">
        <div v-if="goodsMsg.appointment_numbers&&goodsMsg.appointment_numbers.length" class="goods-share-title">他们已经报名</div>
        <div class="goods-share-box">
          <div v-if="goodsMsg.appointment_numbers&&goodsMsg.appointment_numbers.length" class="share-box-left">
            <img v-for="(item, index) in goodsMsg.appointment_numbers" :key="index" :src="item||imageUrl + '/yx-image/2.1/default_avatar@2x.png'" alt="" class="share-box-img">
            <div v-if="hideAppointment">...</div>
          </div>
          <div class="share-box-right" @click="_showShareModal">邀请好友报名</div>
        </div>
      </div>
    </section>
    <!--商品详情-->
    <section class="goods-detail-box">
      <div class="goods-detail-title">
        <div class="goods-detail-icon"></div>
        <div class="goods-detail-text">会议介绍</div>
      </div>
      <img v-for="(item, index) in goodsMsg.detail_images" v-if="item.image_url" :src="item.image_url" lazy-load="true" class="detail-img" mode="widthFix" :key="index">
    </section>
    <div class="fixed-btn">
      <div class="fixed-btn-phone" @click="_bookBack">
        <img src="./icon-index1@2x.png" alt="" class="btn-phone-img">
        <div class="btn-phone-text">首页</div>
      </div>
      <div class="fixed-btn-phone" @click="_bookCourse">
        <img src="./icon-consultation@2x.png" alt="" class="btn-phone-img">
        <div class="btn-phone-text">咨询</div>
      </div>
      <div class="fixed-btn-btn" :class="{'fixed-btn-null': goodsMsg.saleable * 1 === 0}" @click="_bookApply">{{goodsMsg.saleable * 1 === 0 ? '人数已满' : '现在报名'}}</div>
    </div>
    <div class="share-modal" :class="{show: showShare}">
      <div class="share-mask" @click="_hideShareModal"></div>
      <section class="share-bottom">
        <button  open-type="share" class="share-btn" @click="_hideShareModal">
          <img v-if="imageUrl" :src="imageUrl + '/yx-image/goods/pic-wechat@2x.png'" class="item-icon" mode="aspectFill">
          <p class="text button">分享好友</p>
        </button>
        <nav class="share-btn" @click="_handleSavePoster">
          <img v-if="imageUrl" :src="imageUrl + '/exchange/icon-conserve_img@2x.png'" class="item-icon" mode="aspectFill">
          <p class="text">生成海报</p>
        </nav>
      </section>
    </div>
    <div class="poster-wrapper" id="sharePoster">
      <img src="" class="poster-bg" mode="aspectFill">
      <div class="poster-con">
        <img src="" class="poster-banner" mode="aspectFill">
        <div class="poster-title">
          <img src="" class="tag-img" mode="aspectFill">
          <span class="share-title"></span>
          <div class="title-residual"></div>
        </div>
        <div class="code-box">
          <img src="" class="code-img" mode="aspectFill">
          <div class="code-text">扫一扫立即报名</div>r
        </div>
      </div>
    </div>
    <we-paint ref="wePaint" @drawDone="_savePoster"></we-paint>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import WePaint from '@components/we-paint/we-paint'
  import { baseURL } from '@utils/config'
  import AppPromise from '@utils/app-promise'
  import { resolveQueryScene } from '@utils/common'
  import { goodsComputed, goodsMethods } from '@state/helpers'
  import storage from '@utils/storage'

  const PAGE_NAME = 'GOODS_DETAIL'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      WePaint
    },
    data() {
      return {
        onLoad: true,
        courseId: '',
        goodsMsg: {},
        swiperIdx: 0,
        currentNum: 1,
        screenW: 375,
        isIos: false,
        videoPoster: '',
        videoPlaying: false,
        playBefore: true,
        videoLoading: false,
        videoContext: '',
        shareInfo: {
          title: '',
          title2: ''
        },
        showShare: false,
        shareQRCode: '',
        shareImg: '',
        hideAppointment: false,
        shareId: ''
      }
    },
    computed: {
      ...goodsComputed,
      goodsBanner() {
        return this.goodsMsg.banner_images || []
      },
      goodsBannerLength() {
        return this.goodsBanner.length || 0
      },
      hasVideo() {
        return (this.goodsMsg.banner_videos && this.goodsMsg.banner_videos[0] && this.goodsMsg.banner_videos[0].video_url) || false
      }
      // ...Helpers.computed,
    },
    onLoad(options) {
      AppPromise.getInstance().then(res => {
        if (options.scene) {
          // 小程序扫码进来
          console.log(options.scene, 'options.scene')
          let query = resolveQueryScene(options.scene)
          this.courseId = query.goodsId
          this.shareId = query.shareId
        } else {
          // 普通参数进来
          this.courseId = options.id
          this.shareId = options.shareId
        }
        this._getCourseInfo()
        if (this.shareId && this.shareId > 0) {
          storage('shareId', this.shareId)
          if (!storage('token')) return
          this.bindShareAction()
          return
        }
        if (storage('token') && storage('shareId')) {
          this.shareId = storage('shareId')
          this.bindShareAction()
        }
      })
      this.getSystemInfo()
    },
    onShow() {
      !this.onLoad && this._getCourseInfo()
      this.onLoad = false
    },
    onShareAppMessage() {
      // 分享锁
      let url
      const flag = Date.now()
      console.log(storage('businessUserInfo'))
      if (storage('businessUserInfo').id) {
        url = `${this.$routes.main.GOODS_DETAIL}?imageMogr2/thumbnail/!425x340r%7CimageView2/1/w/425/h/340&id=${this.courseId}&flag=${flag}&shareId=${storage('businessUserInfo').id}`
      } else {
        url = `${this.$routes.main.GOODS_DETAIL}?imageMogr2/thumbnail/!425x340r%7CimageView2/1/w/425/h/340&id=${this.courseId}&flag=${flag}`
      }
      console.log(url)
      return {
        title: this.goodsMsg.name,
        path: url, // 商品详情
        imageUrl: this.goodsBanner[0].image_url,
        success: (res) => {
          // 转发成功
        },
        fail: (res) => {
          // 转发失败
        }
      }
    },
    methods: {
      // ...Helpers.methods,
      ...goodsMethods,
      // 获取系统信息
      getSystemInfo() {
        let res = wx.getSystemInfoSync()
        let system = res.system
        this.isIos = /Ios/i.test(system)
        this.screenW = res.screenWidth
      },
      // 获取会议详情
      _getCourseInfo() {
        console.log(`this.courseId = ` + this.courseId)
        API.Meeting.getMeetingInfo({data: {id: this.courseId}}).then(res => {
          this.goodsMsg = res.data
          this.courseId = res.data.id
          // 有视频的情况
          if (this.goodsMsg.banner_videos && this.goodsMsg.banner_videos[0] && this.goodsMsg.banner_videos[0].video_url) {
            this.currentNum = 0// 默认为1，如果有视频设为0
            this.videoContext = wx.createVideoContext('goodsVideo')
            // 如果不是苹果，显示视频封面
            if (!this.isIos) {
              this.videoPoster = this.goodsMsg.banner_videos[0].video_cover_image
            }
          }
          let maxLength = parseInt((this.screenW - 120) / 18)
          let _length = this.goodsMsg.name.replace(/[a-zA-Z0-9]/ig, '').length
          let overLength = (_length + (this.goodsMsg.name.length - _length) / 2) - maxLength
          // maxLength为最大宽度，_length为除字母和数字以外的文字长度，overLength为超出最大宽度的部分
          if (overLength > 0) {
            this.shareInfo.title = this.goodsMsg.name.slice(0, maxLength)
            this.shareInfo.title2 = this.goodsMsg.name.slice(maxLength)
          } else {
            this.shareInfo.title = this.goodsMsg.name
          }
          if (this.goodsMsg.appointment_numbers.length > 5) {
            this.hideAppointment = true
            this.goodsMsg.appointment_numbers = this.goodsMsg.appointment_numbers.slice(0, 5)
          } else {
            this.hideAppointment = false
          }
        })
      },
      // 轮播图切换后的方法
      bannerChange(e) {
        if (e.mp.detail.source !== 'touch') return
        let curNum = e.target.current * 1 + !this.hasVideo
        this.changeCurrentNum(curNum)
      },
      // 切换当前轮播图
      changeCurrentNum(curNum) {
        if (curNum !== this.currentNum) {
          this.currentNum = curNum
          // 有视频的情况
          if (this.hasVideo && this.videoContext) {
            this.swiperIdx = curNum
            // 不是视频页的时候暂停播放
            if (curNum !== 0) {
              this.videoContext.pause()
              this.videoPlaying = false
            }
          }
        }
      },
      // 视频播放
      playVideo(play) {
        this.videoPlaying = play
        this.playBefore = false
        !this.videoContext && (this.videoContext = wx.createVideoContext('goodsVideo'))
        if (play) {
          this.videoContext && this.videoContext.play()
        } else {
          this.videoContext && this.videoContext.pause()
        }
      },
      // 视频等待
      videoWaiting() {
        this.videoLoading = true
      },
      // 视频加载中
      videoLoaded() {
        this.videoLoading = false
      },
      // 视频播放结束
      videoEnd() {
        this.videoPlaying = false
        this.videoContext.exitFullScreen()
      },
      // 预约会议，马上报名
      _bookCourse() {
        this.setLinkList(this.goodsMsg.meeting_wechats)
        wx.navigateTo({ url: `${this.$routes.main.JOIN_GUIDE}` })
        // API.Meeting.bookMeeting({data: {meeting_id: this.goodsMsg.id}}).then(res => {
        // })
      },
      _bookBack() {
        wx.switchTab({ url: `${this.$routes.main.HOME}` })
      },
      _bookApply() {
        if (this.goodsMsg.saleable * 1 === 0) return
        wx.navigateTo({ url: `${this.$routes.main.APPLY_INFO}?id=${this.goodsMsg.id}` })
      },
      // 显示分享modal
      _showShareModal() {
        this.showShare = true
        this._getQrCode()
      },
      // 隐藏分享modal
      _hideShareModal() {
        this.showShare = false
      },
      // 获取分享二维码
      _getQrCode(savePoster = false) {
        let url
        if (storage('businessUserInfo').id) {
          url = `${baseURL.api}/common/file/qrcode/miniprogram-load?program=business&path=pages/goods-detail?g=${this.courseId}&si=${storage('businessUserInfo').id}`
        } else {
          url = `${baseURL.api}/common/file/qrcode/miniprogram-load?program=business&path=pages/goods-detail?g=${this.courseId}`
        }
        this.shareQRCode = url
        savePoster && this._handleSavePoster()
      },
      // 保存海报按钮
      _handleSavePoster() {
        if (!this.shareQRCode) {
          // 没有二维码，重新获取二维码并画海报
          this._getQrCode(true)
          return
        }
        // 如果已画过图，就直接保存
        // if (this.shareImg) {
        //   this._savePoster(this.shareImg)
        //   return
        // }
        let options = {
          canvasId: 'we-paint',
          multiple: 1,
          panel: {
            el: '.poster-wrapper'
          },
          els: [
            {
              el: '.poster-con',
              drawType: 'rect',
              color: '#fff'
            },
            {
              el: '.poster-bg',
              drawType: 'img',
              mode: 'aspectFill',
              source: this.$imageUrl + '/exchange/pic-poster_bg@2x.png',
              unLoad: false
            },
            {
              el: '.poster-banner',
              drawType: 'img',
              source: this.goodsBanner[0].image_url + '?imageMogr2/thumbnail/!690x388r%7CimageView2/1/w/690/h/388',
              unLoad: false
            },
            {
              el: '.poster-wrapper .tag-img',
              drawType: 'img',
              mode: 'aspectFill',
              source: this.$imageUrl + '/exchange/pic-enrolment@2x.png',
              unLoad: false,
              yAdjust: -2
            },
            {
              el: '.poster-wrapper .share-title',
              drawType: 'text',
              source: this.shareInfo.title,
              fontSize: 18,
              color: '#1D2023'
            },
            {
              el: '.poster-wrapper .title-residual',
              drawType: 'text',
              source: this.shareInfo.title2,
              fontSize: 18,
              color: '#1D2023'
            },
            {
              el: '.poster-wrapper .code-text',
              drawType: 'text',
              source: '扫一扫立即报名',
              fontSize: 14,
              color: '#888888',
              yAdjust: 20
            },
            {
              el: '.poster-wrapper .code-img',
              drawType: 'img',
              mode: 'aspectFill',
              source: this.shareQRCode,
              yAdjust: 16
            }
          ]
        }
        this.$refs.wePaint.action(options)// 绘图
      },
      // 保存海报到本地
      _savePoster(pic) {
        this.shareImg = pic
        let self = this
        wx.saveImageToPhotosAlbum({
          filePath: pic,
          success: (res) => {
            wx.showToast('海报保存成功')
            self._hideShareModal()
          },
          fail: (e) => {
            // 没有授权，重新调起授权
            wx.showModal({
              content: '保存海报需进行相册授权，请到小程序设置中打开授权',
              confirmText: '去授权',
              confirmColor: '#FC3E3E',
              success(res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting && res.authSetting['scope.writePhotosAlbum']) {
                        pic && self._savePoster(pic)
                      }
                    }
                  })
                }
              }
            })
          }
        })
      },
      phoneCall() {
        let num = wx.getStorageSync('phone')
        wx.makePhoneCall({
          phoneNumber: num
        })
      },
      // 绑定关系
      bindShareAction() {
        let data = {
          share_manager_id: this.shareId,
          object_id: storage('userInfo').id,
          object_type: 1
        }
        API.Goods.bindShare({data}).then(res => {
          wx.removeStorageSync('shareId')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .goods-detail
    min-height: 100vh
    background: $color-background
    overflow-x: hidden
    padding-bottom: 60px
    box-sizing: border-box
  .goods-info
    padding: 20px 15px 15px
    background: $color-white
    margin-bottom: 12px
    .title
      width: 100%
      font-bold()
      color: $color-text-main
      font-size: $font-size-18
      min-height: 20px
      line-height: $font-size-20
      no-wrap-plus()
    .has-title
      width: 100%
      no-wrap-plus()
      margin-bottom: 12px
    .meeting-number
      font-bold()
      color: $color-text-main
      font-size: $font-size-15
      padding-bottom: 18px
      border-bottom-1px($color-line)
    .meeting-des-box
      padding: 18px 0
      layout(row)
      align-items: center
      border-bottom-1px($color-line)
      .des-box-img
        width: 14px
        height: @width
        display: block
        margin-right: 6.5px
      .des-box-text
        font-bold()
        color: $color-999
        font-size: $font-size-15
        flex: 1
    .title-label
      font-size: $font-size-12
      font-bold()
      display: inline-block
      border-radius: 9.5px
      width: 48px
      height: 17px
      text-align: center
      line-height: 18px
      color: $color-white
      background: $color-main
      margin-right: 5px
      position: relative
      top: -2px
    .goods-text-box
      border-top-1px($color-line)
      padding: 15px 0
      word-break: break-all
      .goods-text
        font-family: $font-family-regular
        color: #333
        font-size: $font-size-14
    .goods-share
      background: $color-background-module
      border-radius: 2px
      padding: 10px
      box-sizing: border-box
      margin-top: 18px
      .goods-share-title
        font-family: $font-family-regular
        color: $color-text-sub
        font-size: $font-size-12
        margin-bottom: 6px
      .goods-share-box
        layout(row)
        align-items: center
        justify-content: space-between
        .share-box-left
          flex: 1
          /*max-width: 55.6vw*/
          overflow: hidden
          layout(row,block,nowrap)
          align-items: center
          font-family: $font-family-regular
          color: $color-text-sub
          font-size: $font-size-16
          .share-box-img
            min-width: 24px
            width: 24px
            height: 24px
            border-radius: 50%
            margin-right: 5px
            display: block
        .share-box-right
          font-family: $font-family-regular
          color: $color-white
          font-size: $font-size-14
          margin-left: 8px
          width: 104px
          height: 26px
          line-height: 26px
          text-align: center
          background: $color-main
          border-radius: 22.5px
  .goods-detail-box
    background: $color-white
    padding: 0 15px
    box-sizing: border-box
    .goods-detail-title
      padding: 15px 0
      layout(row)
      align-items: center
      .goods-detail-icon
        width: 3px
        height: 14px
        background: $color-main
        margin-right: 5px
      .goods-detail-text
        font-bold()
        color: $color-text-main
        font-size: $font-size-16
        line-height: $font-size-16
    .detail-img
      display: block
      width: 100%
      height: auto
  .fixed-btn
    position: fixed
    left: 0
    bottom: 0
    width: 100vw
    height: 60px
    layout(row)
    align-items: center
    background: $color-white
    padding-right: 15px
    box-sizing: border-box
    .fixed-btn-phone
      padding: 0 15px
      .btn-phone-img
        width: 22px
        height: @width
        display: block
        margin: 0 auto 3px
      .btn-phone-text
        font-family: $font-family-regular
        color: $color-text-main
        font-size: $font-size-12
        text-align: center
    .fixed-btn-btn
      flex: 1
      background: $color-main
      text-align: center
      height: 40px
      line-height: 40px
      font-bold()
      color: $color-white
      font-size: $font-size-16
      border-radius: 22.5px
    .fixed-btn-null
      color: $color-white
      background: $color-999
  // banner图
      .banner-box-white
        background: $color-white
        padding-top: 18px
        box-sizing: border-box
      .banner-box
        position :relative
        border-radius: 2px
        margin: 0 15px
        overflow: hidden
        .header-title-wrapper
          position: absolute
          left: 12px
          right :@left
          bottom: 0
          transition: opacity 0.3s
  .header-swiper
    width: 100%
    height: px-change-vw(211)
    position: relative
    .banner
      width: 100%
      height: px-change-vw(211)
      .banner-item
        width: 100%
        height: 100%
        position: relative
        .item-img
          width: 100%
          height: 100%
          position: absolute
          left: 0
          top: 0
        .video-img
          transition: all 0.3s
          &.hide
            opacity: 0
            z-index: -1
        .play-btn
          width: 100%
          height: 70%
          position: absolute
          left: 0
          top: 15%
          z-index: 9
          layout()
          justify-content: center
          align-items: center
          .play-btn-icon
            width: 50px
            height: @width
        .item-img-one
          z-index: 1
        .item-img-two
          z-index: 2
        .play
          all-center()
          height: 63px
          width: 63px
    .banner-number
      box-sizing: border-box
      width: 100%
      padding: 0 12px
      position: absolute
      bottom: 36px
      left: 0
      layout(row)
      align-items: center
      justify-content: space-between
      .banner-number-box
        display: inline-block
        font-size: $font-size-11
        background: rgba(17,17,17,0.2)
        color: $color-white
        box-sizing: border-box
        padding: 2px 8px
        border-radius: 20px
        opacity: .75
        transition: all 0.3s
        &.banner-btn
          min-width: 48px
          padding: 3px 8px
          margin: 0 5px
          background: $color-white
          font-size: $font-size-10
          color: $color-text-main
          font-family: $font-family-regular
          text-align: center
          opacity: .75
          &.active
            /*background: linear-gradient(90deg, #FD4C46 0%, #FB6C21 73%)*/
            background: $color-main
            color: $color-white
            opacity: 1
          .banner-btn-icon
            width: 7px
            height: 7.5px

  /*分享*/
  .share-modal
    width: 100vw
    height: 100vh
    position: fixed
    left: 0
    bottom: 0
    right: 0
    z-index: -999
    transition: opacity .25s
    &.show
      z-index: 999
      .share-bottom
        bottom: 0
  .share-mask
    width: 100vw
    height: 100vh
    position: absolute
    left: 0
    top: 0
    background: rgba(17, 17, 17, 0.7)
  .share-bottom
    display: flex
    box-sizing: border-box
    position: absolute
    bottom: -200px
    left: 0
    z-index:9
    background: $color-white
    width: 100%
    padding: 28px 0 22px
    transition: all .25s
    .share-btn
      background: $color-white
      flex: 1
      position: relative
      border-none()
      .item-icon
        width:  45px
        height: @width
        display: block
        margin: 0 auto 7.5px
      .text
        line-height: 1
        font-family: $font-family-regular
        font-size: 14px
        color: $color-text-sub
        text-align: center
  .poster-wrapper
    box-sizing: border-box
    position: fixed
    bottom: -200vh
    left: -200vw
    z-index: -9
    margin: auto
    background: #fff
    width: px-change-vw(375)
    height: px-change-vw(500)
    padding: px-change-vw(15.5)
    .poster-bg
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
      height: 100%
      z-index: -1
    .poster-con
      .poster-banner
        width: px-change-vw(343)
        height: px-change-vw(194)
      .poster-title
        box-sizing: border-box
        height: 50px
        padding: 15px
        font-bold()
        font-size: 18px
        color: $color-text-main
        .title-tag
          display: inline-block
          transform :translateY(-3px)
          box-sizing: border-box
          width: auto
          height: 18px
          line-height: 18px
          padding: 0 6px
          margin-right: 5px
          background: #fc3e3e
          border-radius: 9px
          font-size: 11px
          font-family: $font-family-regular
          color: $color-white
        .tag-img
          width: 48px
          height: 17px
          margin-right: 5px
      .code-box
        layout()
        justify-content: center
        .code-img
          margin: 0 auto 5.5px
          width: px-change-vw(156.5)
          height: px-change-vw(161.5)
        .code-text
          width: 98px
          margin: 0 auto 20px
          line-height: 1
          text-align: center
          color: #888888
          font-size: 14px
          font-family: $font-family-regular
</style>
