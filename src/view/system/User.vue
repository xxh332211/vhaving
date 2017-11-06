<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建用户</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"
              :filter="filters"></tables>
  </div>
  <transition name="slide-fade">
    <panel :panels="panels" :types="types" @close="close" v-if="show.panel">
      <span slot="title">{{title}}</span>
    </panel>
  </transition>
  <transition name="slide-fade">
    <auth @close="close" :authid="authId" v-if="show.auth">
      <span slot="title">用户权限</span>
    </auth>
  </transition>
  <transition name="slide-fade">
    <panelword :panelwords="panelwords" :types="types" @close="close" v-if="show.panelword">
      <span slot="title">重置密码</span>
    </panelword>
  </transition>
<confirm ref="dialog" :msg="confirms"></confirm>
</div>

</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import Auth from '../../components/Auth.vue'
import Panelword from '../../components/Panelword.vue'
import Confirm from '../../components/Modal/Confirm.vue'
import api from '../../api/api.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user',
  data () {
    return {
      confirms: {
        title: '提示',
        body: '确定删除?'
      },
      show: {
        panel: false,
        auth: false,
        panelword: false
      },
      nav: {
        parent: '系统管理',
        child: '用户管理'
      },
      title: '',
      authId: '',
      method: {
        list: 'user_list'
      },
      column: [
        {text: '序号', name: 'Disp_index'},
        {text: '用户名', name: 'No'},
        {text: '姓名', name: 'Name'},
        {text: '手机号码', name: 'Phone'},
        {text: '用户角色', name: 'Disp_index'},
        {text: '所属部门', name: 'Disp_index'},
        {text: '最后登录时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '权限', method: this.auth},
        {name: '冻结', method: this.freeze},
        {name: '删除', method: this.del},
        {name: '密码重置', method: this.panelword}
      ],
      panels: [
        {name: 'No', text: '用户名', holder: '请输入用户名*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Password', text: '密码', holder: '请输入密码*...', type: 'input', sub: 'password', check: 'is_null'},
        {name: 'Name', text: '姓名', holder: '请输入姓名*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Phone', text: '手机', holder: '请输入手机号*...', type: 'input', sub: 'input', check: 'is_mobile'},
        {name: 'Email', text: '邮箱', holder: '请输入邮箱', type: 'input', sub: 'email', check: 'is_email'},
        {name: 'Status', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 1}, {text: '否', val: 0}]},
        {name: 'RoleIdList', text: '用户角色', type: 'multi', sub: 'multi', get: {url: 'role_list'}, param: {PageNo: 1, Search: ''}, list: []},
        {name: 'DeptIdList', text: '选择部门', type: 'multi', sub: 'multi', get: {url: 'part_list'}, param: {PageNo: 1, Search: ''}, list: []}
      ],
      panelwords: [
        // {name: '', text: '旧密码', holder: '请输入旧密码*...', type: 'input', sub: 'password'},
        {name: 'Password', text: '新密码', holder: '请输入新密码*...', type: 'input', sub: 'password'},
        {name: 'Repassword', text: '确认密码', holder: '请再次输入新密码*...', type: 'input', sub: 'password'}
      ],
      types: ['sure', 'quit'],
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''}
        // {name: 'active', size: 'small', type: 'select', text: '是否激活', list: [{title: '是', id: 1}, {title: '否', id: 2}]},
        // {name: 'role', size: 'small', type: 'multi', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
      ]
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel,
    auth: Auth,
    panelword: Panelword,
    confirm: Confirm
  },
  computed: {
    ...mapGetters([
      'list'
    ])
  },
  methods: {
    ...mapActions(['resetsingle', 'getdata']),
    close (data) {
      this.show[data.name] = false
    },
    create (name) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'user_insert'}
      ]
      console.log(name)
      this.resetsingle()
      for (let i in this.show) {
        if (i === name) {
          this.show[i] = !this.show[i]
        } else {
          this.show[i] = false
        }
      }
      this.title = '用户创建'
    },
    edit (idx) {
      this.types = [
          {name: 'quit', text: '退出', url: ''},
          {name: 'save', text: '保存', url: 'user_update'}
      ]
      this.show.panel = !this.show.panel
      this.title = '编辑用户'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      this.confirms.body = '确定删除？'
      this.$refs.dialog.confirm().then(() => {
        api.post({JSON: JSON.stringify(updata)}, 'user_delete').then((item) => {
          this.getdata()
        })
      })
    },
    freeze (idx, id) {
      let status = this.list[idx].Status === 1 ? 0 : 1
      this.confirms.body = this.list[idx].Status === 1 ? '确定冻结？' : '确定解冻？'
      this.$refs.dialog.confirm().then(() => {
        api.post({JSON: JSON.stringify({Id: id, Status: status})}, 'user_freeze').then((item) => {
          this.getdata()
        })
      })
    },
    auth (idx, id) {
      this.authId = id
      this.create('auth')
      console.log('mappppp', this.authId)
    },
    panelword (idx) {
      console.log('OPOPOPOPOP')
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'sure', text: '确定', url: 'user_repassword'}
      ]
      this.show.panelword = !this.show.panelword
      this.title = '重置密码'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
  .slide-fade-enter-active
    transition: all .3s ease
    -webkit-transition: all .3s ease
  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-active
    transform: translateX(10px)
    -webkit-transform: translateX(10px)
    opacity: 0
</style>
