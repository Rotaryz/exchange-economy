<template>
  <div class="mine">
    <navigation-bar  title="5G新营销加群"></navigation-bar>
    <div class="top-box">
      <div class="title">报名请加微信号，还能获得更多课程 ↓↓↓</div>
      <div class="copy-con">34grdy65y5656</div>
      <div class="copy-btn" @click="copyNumber">点击复制微信号</div>
    </div>
    <div class="guide-con">
      <div class="title">操作指引：</div>
      <img src="/static/images/user.png" alt="" class="guide-img" mode="aspectFill">
    </div>
    <div class="share-modal" :class="{show: showShare}">
      <div class="share-mask" @click="_hideShareModal"></div>
      <section class="share-bottom">
        <button  open-type="share" class="share-btn" @click="_hideShareModal">
          <img v-if="imageUrl" :src="imageUrl + '/yx-image/goods/pic-wechat@2x.png'" class="item-icon" mode="aspectFill">
          <p class="text button">分享好友</p>
        </button>
        <nav class="share-btn" @click="_handleSavePoster">
          <img v-if="imageUrl" :src="imageUrl + '/yx-image/goods/icon-poster@2x.png'" class="item-icon" mode="aspectFill">
          <p class="text">生成海报</p>
        </nav>
      </section>
      <div class="poster-wrapper" id="sharePoster">
        <div class="poster-con">
          <img :src="shareInfo.img" class="poster-banner" mode="aspectFill">
          <div class="poster-title">
            <span class="title-tag">报名中</span>
            <span class="share-title">{{shareInfo.title}}</span>
          </div>
          <div class="code-box">
            <img src="./poster-qrcode.png" class="code-img" mode="aspectFill">
            <div class="code-text">扫一扫立即报名</div>
          </div>
        </div>
      </div>
    </div>
    <we-paint :preview='false' :loading="false" ref="wePaint" @drawDone="_savePoster"></we-paint>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import WePaint from '@components/we-paint/we-paint'

  const PAGE_NAME = 'MINE'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      WePaint
    },
    data() {
      return {
        shareInfo: {
          title: '第一期赞播《美业5G新营销》之异业联盟',
          img: 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/09/25/1569397929504-168145.jpeg?imageMogr2/thumbnail/750x750'
        },
        showShare: false,
        shareQRCode: '',
        shareImg: ''
      }
    },
    onLoad() {
    },
    onShow() {
    },
    methods: {
      copyNumber() {
        this._showShareModal()
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
      _getQrCode() {
        this.shareQRCode = 'https://exchange-platform-1254297111.picgz.myqcloud.com/dev/2019/09/25/1569397929504-168145.jpeg?imageMogr2/thumbnail/750x750'
        this._handleSavePoster()
      },
      // 保存海报按钮
      _handleSavePoster() {
        console.log('_handleSavePoster')
        if (!this.shareQRCode) {
          // 没有二维码，重新获取二维码并画海报
          this._getQrCode()
          return
        }
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
              el: '.poster-banner',
              drawType: 'img',
              mode: 'aspectFill',
              // source: this.shareInfo.img,
              source: 'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F01%2F1561952187961-%E5%BC%80%E5%BF%83%E6%9E%9C.jpg',
              unLoad: false
            // },
            // {
            //   el: '.poster-wrapper .title-tag',
            //   drawType: 'text',
            //   source: '报名中',
            //   fontSize: 14,
            //   color: '#3F454B'
            // },
            // {
            //   el: '.poster-wrapper .share-title',
            //   drawType: 'text',
            //   source: this.shareInfo.title,
            //   fontSize: 14,
            //   color: '#3F454B'
            // },
            // {
            //   el: '.poster-wrapper .code-text',
            //   drawType: 'text',
            //   source: '扫一扫立即报名',
            //   fontSize: 14,
            //   color: '#3F454B'
            // },
            // {
            //   el: '.poster-wrapper .code-img',
            //   drawType: 'img',
            //   mode: 'aspectFill',
            //   source: this.shareQRCode
            }
          ]
        }
        this.$refs.wePaint && this.$refs.wePaint.action(options)// 绘图
        // let options = {
        //   canvasId: 'we-paint',
        //   multiple: 1,
        //   panel: {
        //     el: '.panel'
        //   },
        //   els: [
        //     {
        //       el: '.panel',
        //       drawType: 'rect',
        //       color: '#fff'
        //     },
        //     {
        //       el: '.h-avatar',
        //       drawType: 'img',
        //       source: 'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F01%2F1561952187961-%E5%BC%80%E5%BF%83%E6%9E%9C.jpg',
        //       mode: 'aspectFill',
        //       unLoad: false
        //     }
        //   ]
        // }
        // this.$refs.wePaint.action(options)
      },
      // 保存海报到本地
      _savePoster(pic) {
        this.shareImg = pic
        // let self = this
        // wx.saveImageToPhotosAlbum({
        //   filePath: pic,
        //   success: (res) => {
        //     wx.showToast('海报保存成功')
        //     this._hideShareModal()
        //   },
        //   fail: (e) => {
        //     // 没有授权，重新调起授权
        //     wx.showModal({
        //       content: '保存海报需进行相册授权，请到小程序设置中打开授权',
        //       confirmText: '去授权',
        //       confirmColor: '#FC3E3E',
        //       success(res) {
        //         if (res.confirm) {
        //           wx.openSetting({
        //             success: (res) => {
        //               if (res.authSetting && res.authSetting['scope.writePhotosAlbum']) {
        //                 pic && self._savePoster(pic)
        //               }
        //             }
        //           })
        //         }
        //       }
        //     })
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .mine
    box-sizing: border-box
    width: 100%
    min-height: 100vh
    background: #fff
  .top-box,.guide-con
    padding: 20px 20px 25px
    background: #fff
  .title
    line-height: 1
    color: $color-text-main
    font-family: $font-family-medium
    font-size: 16px
  .top-box
    border-bottom: 11.5px solid $color-background
  .copy-con
    height: 50px
    line-height: 50px
    margin: 25px 0 15px
    color: $color-text-main
    font-family: $font-family-medium
    font-size: 16px
    text-align: center
    background: #fff8f3
    border-1px(#ff802f, 2px)
  .copy-btn
    height: 45px
    line-height: 45px
    background: #3FBB39
    text-align: center
    color: #fff
    font-family: $font-family-regular
    font-size: 16px
    border-radius: 2px
  .guide-con
    padding-top: 25px
    .guide-img
      margin-top: 15px

  .share-modal
    width: 100vw
    height: 100vh
    position: fixed
    left: 0
    bottom: -100vh
    right: 0
    z-index: 999
    transition: all .25s
    &.show
      bottom :0
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
    bottom: 0
    left: 0
    z-index:9
    background: $color-white
    width: 100%
    padding: 28px 0 22px
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
    position: absolute
    top: 45%
    transform :translateY(-50%)
    left: 0
    right: 0
    margin: auto
    background: #fff
    width: px-change-vw(270)
    padding: px-change-vw(15)
    z-index: 9
    .poster-con
      border-1px(#cccccc)
      .poster-banner
        width: 100%
        height: px-change-vw(124.16)
      .poster-title
        padding: 15px
        font-family: $font-family-medium
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
      .code-box
        layout()
        justify-content: center
        .code-img
          margin: 0 auto 5.5px
          width: px-change-vw(156.5)
          height: px-change-vw(161.5)
        .code-text
          margin-bottom: 20px
          line-height: 1
          text-align: center
          color: #888888
          font-size: 14px
          font-family: $font-family-regular
</style>
