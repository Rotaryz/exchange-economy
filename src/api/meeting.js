import request from '@utils/http'

export default {
  // 会议详情
  getMeetingInfo(args) {
    const url = `/business/meeting/meeting/show`
    return request.get({url, ...args})
  },
  // 会议列表
  getMeetingList(args) {
    const url = `/business/meeting/meeting/index`
    return request.get({url, ...args})
  },
  // 会议预约
  bookMeeting(args) {
    const url = `/business/meeting-appointment/appointment/create`
    return request.post({url, ...args})
  },
  // 我的会议列表
  getMyMeetingList(args) {
    const url = `/business/meeting-order/order/index`
    return request.get({url, loading: false, ...args})
  },
  // 我的会议详情
  getMyMeetingDetail(args) {
    const url = `/business/meeting-order/order/show`
    return request.get({url, loading: false, ...args})
  }
}
