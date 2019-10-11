import {mapGetters, mapActions, mapMutations} from 'vuex'

export const myMeetingComputed = {
  ...mapGetters('myMeeting', ['codeList'])
}
export const myMeetingMethods = {
  ...mapActions('myMeeting', ['setCode']),
  ...mapMutations('myMeeting', [])
}
