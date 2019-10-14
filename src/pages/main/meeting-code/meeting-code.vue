<template>
  <div class="meeting-code">
    <navigation-bar title="参会凭证"></navigation-bar>
    <div class="code-content">
      <div v-for="(item, index) in codeList" :key="index" class="code-item">
        <img src="./pic-voucher_bg@2x.png" alt="" class="code-bg" mode="widthFix">
        <p class="number">{{item.code}}</p>
        <img :src="codeImage[index]" alt="" class="code-image">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import createQrCode from '@utils/create-qr-code.js'

  const PAGE_NAME = 'MEETING_CODE'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        codeList: [],
        codeImage: []
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    onLoad() {
      this.codeList = this.$store.getters['myMeeting/codeList']
      this.createdCodeImage()
    },
    methods: {
      createdCodeImage() {
        this.codeList.forEach(item => {
          let code = createQrCode.svg(`{code: ${item.code}}`)
          this.codeImage.push(code)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .meeting-code
    width: 100%
    min-height: 100vh
    background: $color-background
    .code-content
      padding: 10px
      .code-item
        position: relative
        border-radius: 2px
        font-size: 0
        text-align: center
        margin-bottom: 5px
      .code-bg
        width: 100%
      .number
        font-size: 34px
        font-family: $font-family-medium
        color: $color-text-main
        font-bold()
        position: absolute
        left: 32vw
        top: px2vw(24)
      .code-image
        width: 67vw
        height: @width
        position: absolute
        top: 30vw
        left: 50%
        transform: translateX(-50%)

</style>
