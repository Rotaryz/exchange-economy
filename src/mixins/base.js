import API from '@api'
import * as wechat from '@utils/wechat'
export default {
  methods: {
    // 获取当前页面的完整路径
    $getUrl(path = '', query = '') {
      let url = path || (this.$root.$mp.page && this.$root.$mp.page.route)
      let status = this.$checkIsTabPage(url)
      query = query || this.$root.$mp.query
      if (!status) {
        let string = ''
        for (let value in query) {
          string += `&${value}=${query[value]}`
        }
        url = string ? `${url}?${string.slice(1)}` : url
      }
      return url
    },
    // 获取缓存
    $storage(key, val) {
      if (val) wx.setStorageSync(key, val)
      else return wx.getStorageSync(key)
    },
    // button收集手机formId
    async $getFormId(e) {
      const token = this.$storage('token')
      if (!token) {
        return
      }
      let formId = e.mp.detail.formId
      API.Form.getFormId({ data: { form_ids: [formId] }, loading: false, toast: false })
    },
    // 判断是否需要跳转登录页面
    async $checkToken() {
      let that = this
      let url = this.$getUrl()
      /* eslint-disable no-undef */
      let token = this.$storage('token')
      if (!token) {
        let codeMsg = await wechat.login()
        let tokenJson = await API.Login.getToken({
          data: { code: codeMsg.code },
          loading: false,
          toast: false,
          doctor() {
            wx.reLaunch({ url: that.$routes.main.LOGIN })
            wx.setStorageSync('targetPage', url)
            return false
          }
        })
        wx.setStorageSync('token', tokenJson.data.access_token)
        wx.setStorageSync('userInfo', tokenJson.data.customer_info)
        HTTP.setHeaders({ Authorization: tokenJson.data.access_token })
        /* eslint-disable no-undef */
        let page = getCurrentPages()[getCurrentPages().length - 1]
        page.onLoad(page.options)
        page.onShow()
        return true
      }
      return true
    }
  }
}
