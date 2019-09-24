<template>
  <div class="home">
    <navigation-bar title="兑换商城" :showArrow="false" titleColor="#000" :isOpacity="true"></navigation-bar>
    <div class="location-city"></div>
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
        hh: 'heooloa a '
      }
    },
    async onLoad() {},
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .home
    width: 100%
  .location-city
    padding: 13.5px 15px
    box-sizing: border-box
    layout(row)
    align-items: center
  .home
    width: 100%
</style>
