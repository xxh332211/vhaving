<template>
  <div id="login">
    <div class="login-title">
      <img src="../assets/logo-l.png" alt="">
    </div>
    <div class="login-form">
      <div class="form-wrap">
        <img src="../assets/username.png" alt="" class="icon">
        <input type="text" class="msg" placeholder="用户名" v-model="user">
      </div>
      <div class="form-wrap">
      <img src="../assets/password.png" alt="" class="icon">
        <input type="password" class="msg" placeholder="密码" v-model="password">
      </div>
      <div class="form-wrap">
        <div class="form-item">
        <img src="../assets/validate.png" alt="" class="icon">
          <input type="text" class="msg" placeholder="验证码" v-model="code">
        </div>
        <a href="javascript:;" class="code"></a>
      </div>
      <button class="tologin" @click="login()">登录</button>
    </div>
  </div>
</template>

<script>
import api from '../api/api.js'
export default {
  name: 'login',
  data () {
    return {
      user: '',
      password: '',
      code: ''
    }
  },
  methods: {
    login () {
      if (!this.user) {
        window.alert('请输入用户名')
        return
      }
      if (!this.password) {
        window.alert('请输入密码')
        return
      }
      if (!this.code) {
        window.alert('请输入验证码')
        return
      }
      api.post({JSON: JSON.stringify({No: this.user, Password: this.password})}, 'login').then((item) => {
        console.log('item', item)
        if (item.responsecode === '200') {
          this.$router.push({name: 'Role'})
        }
      })
      // this.$cookie.set('test', '卡死')
      // console.log('sdssdsdsd', this.$cookie.get('test'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  #login
    .login-title
      text-align:center
      margin-top:1.55rem
      img
        vertical-align:top
    .tologin
      width:100%
      height:.5rem
      background:#3eaee1
      color:#fff
      margin-top:.1rem
      border:0
      font-size:.18rem
      letter-spacing:.06rem
      text-indent:.06rem
    .login-form
      width:6rem
      height:4rem
      margin:.7rem auto 0
      background:#fff
      border-radius:.08rem
      border:.01rem solid #9d9d9d
      padding:.65rem .49rem 0
      .form-wrap
        margin-bottom:.2rem
        position:relative
        .icon
          position:absolute
          width:.2rem
          height:.2rem
          top:.15rem
          left:.09rem
        .code
          width:1.3rem
          top:0
          right:0
          position:absolute
          height:.5rem
          border:.01rem solid #bfbfbf
        .form-item
          margin-right:1.45rem
          position:relative
        input
          height:.5rem
          width:100%
          border:.01rem solid #bfbfbf
          padding-left:.36rem
          &:focus
            border:.01rem solid #3eaee1

</style>
