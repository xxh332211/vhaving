<template>
  <div id="home">
    <div id="nav">
      <div class="nav-top">
        <img src="../assets/logo.png" alt="" class="logo">
      </div>
      <ul class="nav-list level">
        <li class="top-li" v-for="(item, idx) in navlist">
          <p class="title" v-bind:class="{active:idx == index}" @click="index = idx"><img class="t-logo" src="../assets/icon1-s.png" alt=""><span class="t-name">{{item.name}}</span></p>
          <ul class="level-1" v-bind:class="{lactive:idx == index}">
            <li class="level-li" v-for="it in item.level1"><router-link :to="{name:it.link}">{{it.name}}</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="content">
      <div class="content-top">
        <notice v-if="notice.show" @closenotice='togglenotice'></notice>
        <img src="../assets/zhuye.png" alt="" class="home-icon"><span class="hello">欢迎页</span><span class="welcome">欢迎来到V联网后台管理</span>
        <div class="personal">
          <img src="../assets/logo.png" alt="" class="person-icon" @click="slideshow = !slideshow">
          <span class="trangle" @click="slideshow = !slideshow"></span>
          <div class="slidedown" v-if="slideshow">
            <ul>
              <li @click="info()"><img src="../assets/info.png" alt="">个人信息</li>
              <li @click="quit()"><img src="../assets/exit.png" alt="">安全退出</li>
            </ul>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Notice from '../components/notice/Notice.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'home',
    data () {
      return {
        slideshow: false,
        index: 0,
        navlist: [
          {
            name: '系统管理',
            level1: [
              {name: '用户管理', link: 'User'},
              {name: '会员管理', link: 'Member'},
              {name: '菜单管理', link: 'Menu'},
              {name: '部门管理', link: 'Part'},
              {name: '角色管理', link: 'Role'},
              {name: '租户管理', link: 'Tennet'},
              {name: '仓库管理', link: 'Stock'},
              {name: '分类管理', link: 'Category'},
              {name: '供应商管理', link: 'Supplier'}
            ]
          },
          {
            name: '商品管理',
            level1: [
              {name: '首页', link: 'Index'}
            ]
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['current', 'notice'])
    },
    components: {
      notice: Notice
    },
    methods: {
      throttle (method, context) {
        clearTimeout(method.t)
        method.t = setTimeout(() => {
          method.call(context)
        }, 500)
      },
      quit () {
        // api.post({JSON: JSON.stringify({No: this.user, Password: this.password})}, 'login').then((item) => {
        // console.log('item', item)
        // if (item.responsecode === '200') {
        this.$router.push({name: 'Login'})
        // }
      // })
      },
      info () {
        this.slideshow = false
      },
      handleResize () {
        // let percent = window.innerWidth / 1920
        // let font = 625 * percent
        // document.querySelector('html').style.fontSize = font + '%'
      },
      ...mapActions([
        'togglenotice'
      ])
    },
    mounted: function () {
      this.handleResize()
      window.addEventListener('resize', () => {
        this.throttle(this.handleResize)
      })
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>
<style lang="stylus">
  @import '../lib/stylus/common.styl'
  @import '../lib/stylus/nav.styl'
</style>
