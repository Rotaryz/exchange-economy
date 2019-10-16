<template>
  <div class="course-list">
    <navigation-bar title="热门课程"></navigation-bar>
    <div v-if="courseList.length" class="course-content">
      <div v-for="(item, index) in courseList" :key="index" class="course-item" @click="goDetail(item)">
        <img :src="item.cover_image" alt="" class="course-image" mode="aspectFill">
        <div class="course-msg">
          <p class="course-title">{{item.name}}</p>
          <p class="count">{{item.read_count}}人已观看</p>
        </div>
      </div>
    </div>
    <empty v-if="!courseList.length && loaded" :image="empty" :imgWidth="100" :paddingTop="60" tip="课程排期中、敬请期待"></empty>
    <loading-more v-if="isLoading"></loading-more>
    <isEnd v-if="isEnd && courseList.length"></isEnd>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import NavigationBar from '@components/navigation-bar/navigation-bar'
  import Empty from '@components/empty/empty'
  import LoadingMore from '@components/loading-more/loading-more'
  import IsEnd from '@components/is-end/is-end'

  const PAGE_NAME = 'COURSE_LIST'

  export default {
    name: PAGE_NAME,
    components: {
      NavigationBar,
      Empty,
      LoadingMore,
      IsEnd
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
        loaded: false,
        isLoading: false,
        isEnd: false
      }
    },
    computed: {
      // ...Helpers.computed,
    },
    onShow() {
      this.getCourseList(true)
    },
    onReachBottom() {
      if (this.isEnd) return
      this.page++
      this.getCourseList(false)
    },
    methods: {
      getCourseList(loading) {
        if (this.page > 1) {
          this.isLoading = true
        }
        API.Course.getCourseList({
          data: {
            page: this.page
          },
          loading
        })
          .then(res => {
            this.isLoading = false
            if (this.page === 1) {
              this.courseList = []
              this.loaded = true
              this.isEnd = false
            }
            if (+this.page === +res.meta.last_page) {
              this.isEnd = true
            }
            this.courseList = [...this.courseList, ...res.data]
          })
          .catch(() => {
            this.isLoading = false
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
    min-height: 100vh
    display: flex
    flex-direction: column
    .course-content
      flex: 1
    .course-item
      margin: 10px 15px 20px
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
