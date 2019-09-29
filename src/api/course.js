import request from '@utils/http'

export default {
  // 课程详情
  getCourseInfo(args) {
    const url = `/business/course/course/show`
    return request.get({url, ...args})
  },
  // 课程列表
  getCourseList(args) {
    const url = `/business/course/course/index`
    return request.get({url, ...args})
  },
  // 课程预约
  bookCourse(args) {
    const url = `/business/course-appointment/appointment/create`
    return request.post({url, ...args})
  }
}
