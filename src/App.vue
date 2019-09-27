<script>
import AppPromise from '@utils/app-promise'
import HTTP from '@utils/http'
import API from '@api'
import { globalMethods } from '@state/helpers'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
  },
  async onLaunch() {
  },
  onShow() {
    AppPromise.getInstance(async resolve => {
      await this.silenceLogin()
      resolve(true)
    })
  },
  methods: {
    ...globalMethods,
    // 静默
    async silenceLogin() {
      // 初始化获取静默授权
      this.codeMsg = await this.$wechat.login()
      if (!this.$storage('token')) {
        let res = await API.Login.getToken({
          data: { code: this.codeMsg.code },
          loading: false,
          toast: false,
          doctor() {
          }
        })
        if (res.error_code !== this.$ERR_OK) return
        this.$storage('token', res.data.access_token)
        this.$storage('userInfo', res.data.customer_info)
        HTTP.setHeaders({ Authorization: res.data.access_token })
      }
    }
  }
}
</script>
