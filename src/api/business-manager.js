import request from '@utils/http'

export default {
  // 获取管理员信息
  getManagerInfo(args) {
    const url = `/business-manager/business/manager/show`
    return request.post({url, ...args})
  },
  // 管理员登录
  managerLogin(args) {
    const url = `/business-manager/business/auth/post-login`
    return request.post({url, ...args})
  },
  // 邀请总览数据
  getInviteInfo(args) {
    const url = `/business-manager/business/manager/data-statistics`
    return request.post({url, ...args})
  },
  // 核销
  verify(args) {
    const url = `/business-manager/business-customer/coupon/verify`
    return request.post({url, ...args})
  },
  // 拉新列表
  getCustomerList(args) {
    const url = `/business-manager/business-share/record/new-customer-list`
    return request.get({url, ...args})
  },
  // 购票列表
  getBuyTicketList(args) {
    const url = `/business-manager/business-share/record/buy-ticket-list`
    return request.get({url, ...args})
  }
}
