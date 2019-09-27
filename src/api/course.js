import request from '@utils/http'

export default {
  // 课程详情
  getCourseInfo(args) {
    const url = `/exchange-platform/business/course/course/show`
    return request.get({url, ...args})
  },
  // 课程列表
  getCourseList(args) {
    const url = `/exchange-platform/business/course/course/index`
    return request.get({url, ...args})
  }
}
