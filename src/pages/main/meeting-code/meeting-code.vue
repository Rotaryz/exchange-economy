<template>
  <div class="meeting-code">
    <navigation-bar title="参会凭证"></navigation-bar>
    <div class="code-content">
      <div v-for="(item, index) in codeList" :key="index" class="code-item">
        <img src="./pic-voucher_bg@2x.png" alt="" class="code-bg" mode="widthFix">
        <p class="number">12345678</p>
        <img src="" alt="" class="code-image">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'MEETING_CODE'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        codeList: []
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    onLoad() {
      this.codeList = this.$store.getters['myMeeting/codeList']
    },
    methods: {
      // ...Helpers.methods,
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
      padding: 15px
      .code-item
        position: relative
        border-radius: 2px
        font-size: 0
        text-align: center
        margin-bottom: 10px
      .code-bg
        width: 100%
        box-shadow: 0 1px 12px 0 rgba(0,0,0,0.04);
      .number
        font-size: 34px
        font-family: $font-family-medium
        color: $color-text-main
        font-bold()
        position: absolute
        left: 114px
        top: 17px
      .code-image
        width: 232px
        height: @width
        position: absolute
        top: 120px
        left: 50%
        transform: translateX(-50%)
        background: #ccc

</style>
