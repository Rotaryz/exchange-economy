import request from '@utils/http'

export default {
  /**
   * 课程列表[v1.5.3]
   * @param data
   * @param loading
   * @returns {*}
   */
  courseList(args) {
    const url = `/business/course/course/index`
    return request.get({url, ...args})
  },
  /**
   * 页面详情
   * @param data
   * @param loading
   * @returns {*}
   */
  pageDetail(args) {
    const url = `/business/content/module/page`
    return request.get({ url, ...args })
  },
  /**
   * 课程详情[v1.5.3]
   * @param data
   * @param loading
   * @returns {*}
   */
  getGoodsDetail(args) {
    const url = `/business/course/course/show`
    return request.get({ url, ...args })
  }
}
