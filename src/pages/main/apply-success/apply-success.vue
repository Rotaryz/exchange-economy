<template>
  <div class="apply-success">
    <navigation-bar title="报名成功"></navigation-bar>
    <div class="apply-success-box">
      <img src="./pic-payok@2x.png" alt="" class="apply-icon">
      <p class="apply-text">报名成功</p>
      <div class="success-btn">查看报名</div>
      <div class="success-btn success-back">回到首页</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'APPLY_SUCCESS'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    methods: {
      // ...Helpers.methods,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .apply-success
    width: 100%
  .apply-success-box
    padding-top: 67px
    .apply-icon
      display: block
      width: 90px
      height: @width
      margin: 0 auto 7px
    .apply-text
      font-bold()
      color: #3F454B
      font-size: $font-size-20
      margin-bottom: 40px
      text-align: center
    .success-btn
      width: 180px
      height: 40px
      line-height: 40px
      text-align: center
      margin: 0 auto
      font-family: $font-family-regular
      color: $color-text-main
      font-size: $font-size-14
      background: #FFF8F3
      border-radius: 20px
      border-1px(#FF802F, 20px)
      margin-bottom: 15px
    .success-back
      border-1px(#D2D2D2, 20px)
      background: $color-white
</style>
