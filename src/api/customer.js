import request from '@utils/http'

export default {
  // 用户详情
  getUserInfo(args) {
    const url = `/business/business-customer/customer/show`
    return request.get({url, ...args})
  }
}
