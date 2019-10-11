<template>
  <div class="course-list">
    <navigation-bar title="热门课程"></navigation-bar>
    <div v-for="(item, index) in courseList" :key="index" class="course-item" @click="goDetail(item)">
      <img :src="item.cover_image" alt="" class="course-image" mode="aspectFill">
      <div class="course-msg">
        <p class="course-title">{{item.name}}</p>
        <p class="count">{{item.read_count}}人已观看</p>
      </div>
    </div>
    <empty v-if="!courseList.length && loaded" :image="empty" :paddingTop="100" tip="暂无会议"></empty>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'

  const PAGE_NAME = 'COURSE_LIST'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty
    },
    data() {
      return {
        courseList: [
          {
            name: '课程',
            id: 1
          }
        ],
        page: 1,
        loaded: false
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    onShow() {
      this.getCourseList(true)
    },
    onReachBottom() {
      this.page++
      this.getCourseList(false)
    },
    methods: {
      getCourseList(loading) {
        API.Course.getCourseList({
          data: {
            page: this.page
          },
          loading
        })
          .then(res => {
            if (this.page === 1) {
              this.courseList = []
              this.loaded = true
            }
            this.courseList = [...this.courseList, ...res.data]
          })
      },
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
