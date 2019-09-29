import request from '@utils/http'

export default {
  // 课程详情
  getMeetingInfo(args) {
    const url = `/business/meeting/meeting/show`
    return request.get({url, ...args})
  },
  // 课程列表
  getMeetingList(args) {
    const url = `/business/meeting/meeting/index`
    return request.get({url, ...args})
  },
  // 课程预约
  bookMeeting(args) {
    const url = `/business/meeting-appointment/appointment/create`
    return request.post({url, ...args})
  }
}
