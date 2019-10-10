<template>
  <div class="verify-result">
    <navigation-bar  :title="titleText"></navigation-bar>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'VERIFY_RESULT'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        titleText: '核销成功'
      }
    },
    onLoad(option) {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .verify-result
    width: 100%
</style>
