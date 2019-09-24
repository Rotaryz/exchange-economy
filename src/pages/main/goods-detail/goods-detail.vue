<template>
  <div class="goods-detail">
    <navigation-bar title="课程详情"></navigation-bar>
    goods-detail
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'GOODS_DETAIL'

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

  .goods-detail
    width: 100%
</style>
