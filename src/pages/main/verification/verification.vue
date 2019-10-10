<template>
  <div class="verification">
    <navigation-bar  title="凭证核销"></navigation-bar>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'VERIFICATION'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        wxNum: ''
      }
    },
    onLoad(option) {
      this.wxNum = option.wechat
    },
    methods: {
      // 扫一扫
      _scanQRCode() {
        const self = this
        wx.scanCode({
          success(res) {
            const codeRes = JSON.parse(res.result)
            if (codeRes && codeRes.code) {
              self.code = codeRes.code
              self._verifyOrder()
            } else {
              wx.showToast('获取核销码失败!')
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .verification
    width: 100%
</style>
