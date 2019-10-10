<template>
  <div class="course-list">
    <navigation-bar title="热门课程"></navigation-bar>
    <div v-for="(item, index) in courseList" :key="index" class="course-item" @click="goDetail(item)">
      <img src="" alt="" class="course-image" mode="aspectFill">
      <div class="course-msg">
        <p class="course-title">第二届移动互联网营销将在上海举行</p>
        <p class="count">200人已观看</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'

  const PAGE_NAME = 'COURSE_LIST'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar
    },
    data() {
      return {
        courseList: [
          {
            name: '课程',
            id: 1
          }
        ]
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    methods: {
      goDetail(item) {
        let url = `${this.$routes.main.COURSE_DETAIL}?id=${item.id}`
        this.$checkIsTabPage(url) ? wx.switchTab({ url }) : wx.navigateTo({ url })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-list
    width: 100%

    .course-item
      margin: 10px 15px
      display: flex
      align-items: center
      .course-image
        width: 160px
        height: 90px
        flex: 0 0 auto
        border-radius: 4px
        background: #ccc
      .course-msg
        padding: 2px 0 2px 10px
        height: 90px
        box-sizing: border-box
        display: flex
        flex-direction: column
        justify-content: space-between
        flex: 1
        overflow: hidden
      .course-title
        font-size: 15px
        font-family: $font-family-medium
        font-bold()
        color: #1D2023
        line-height: 1.2
        display: -webkit-box
        overflow: hidden
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
      .count
        font-size: $font-size-14
        font-family: $font-family-regular
        color: #999


  .bottom
    padding-bottom: 20px

</style>
