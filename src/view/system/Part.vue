<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建部门</button>
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
  <confirm ref="dialog" :msg="confirms"></confirm>
</div>

</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import api from '../../api/api.js'
import Confirm from '../../components/Modal/Confirm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'part',
  data () {
    return {
      confirms: {
        title: '提示',
        body: '确定删除?'
      },
      show: {
        panel: false,
        auth: false
      },
      nav: {
        parent: '系统管理',
        child: '部门管理'
      },
      title: '',
      method: {
        list: 'part_list'
      },
      column: [
        {text: '序号', name: 'Disp_index'},
        {text: '编号', name: 'No'},
        {text: '名称', name: 'Name'},
        {text: '最后操作时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '删除', method: this.del}
      ],
      panels: [
        {name: 'No', text: '编号', holder: '请输入编号...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Name', text: '名称', holder: '请输入名称...', type: 'input', sub: 'input', check: 'is_null'},
        // {name: 'ParentId', text: '上级部门', holder: '部门名称...', type: 'input', sub: 'input'},
        {
          name: 'ParentId',
          size: 'small',
          type: 'select',
          text: '上级部门',
          text1: '选择部门',
          list: [{Name: '顶级部门', Id: '00000000-0000-0000-0000-000000000000'}],
          get: {url: 'part_list'},
          param: {PageNo: 1, Search: ''}
        },
        {name: 'Description', text: '描述', holder: '请输入描述内容...', type: 'textarea', sub: 'textarea'},
        {name: 'UserId', text: '描述', holder: '请输部门成员或手机号', type: 'searcher', sub: 'searcher', get: {url: 'user_list'}, param: {PageNo: 1, Search: ''}}
        // {name: 'Status', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 1}, {text: '否', val: 2}]},
        // {name: 'Description', text: '描述', holder: '请输入描述内容...', type: 'textarea', sub: 'textarea'},
        // {name: 'FuncIdList', text: '', holder: '', type: 'manage', sub: 'manage'}
        // {name: 'role', text: '用户角色', type: 'multi', sub: 'multi', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]},
        // {name: 'part', text: '选择部门', type: 'multi', sub: 'multi', list: [{title: '技术', id: 1}, {title: '产品', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]}
      ],
      types: [],
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''}
        // {name: 'role', size: 'small', type: 'multi', text: '选择部门', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
      ]
    }
  },
  // mounted () {
  //   this.alerts({title: '你好啊', msg: '哈哈哈'})
  // },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel,
    confirm: Confirm
  },
  computed: {
    ...mapGetters([
      'list'
    ])
  },
  methods: {
    ...mapActions(['resetsingle', 'getdata', 'alerts']),
    close (data) {
      this.show[data.name] = false
    },
    create (name) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'part_insert'}
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
      this.title = '创建部门'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      this.$refs.dialog.confirm().then(() => {
        api.post({JSON: JSON.stringify(updata)}, 'part_delete').then((item) => {
          this.getdata()
        })
      })
    },
    edit (idx) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'part_update'}
      ]
      this.show.panel = !this.show.panel
      this.title = '编辑部门'
    },
    auth (idx) {
      this.create('auth')
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
