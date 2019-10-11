import request from '@utils/http'

export default {
  // 课程列表
  getCourseList(args) {
    const url = `/business/course/course/index`
    return request.get({url, loading: false, ...args})
  },
  // 课程详情
  getCourseDetail(args) {
    const url = `/business/course/course/show`
    return request.get({url, loading: false, ...args})
  }
}
