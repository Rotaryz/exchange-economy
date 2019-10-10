<template>
  <div class="invite-info">
    <navigation-bar  title="邀请总览"></navigation-bar>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'INVITE_INFO'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
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

  .invite-info
    width: 100%
</style>
