<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建分类</button>
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
</div>

</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import api from '../../api/api.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'category',
  data () {
    return {
      show: {
        panel: false,
        auth: false
      },
      nav: {
        parent: '系统管理',
        child: '分类管理'
      },
      title: '',
      method: {
        list: 'role_list'
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
        {name: 'No', text: '编号', holder: '请输入人编号...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Name', text: '名称', holder: '请输入名称...', type: 'input', sub: 'input', check: 'is_null'},
        {
          name: 'Type',
          size: 'small',
          type: 'select',
          text: '类型',
          text1: '请选择类型',
          list: [{Name: '单数据类型', Id: 'menu'}, {Name: '会员等级', Id: 'auth'}]
        },
        {name: 'Description', text: '描述', holder: '请输入描述内容...', type: 'textarea', sub: 'textarea'}
        // {name: 'role', text: '用户角色', type: 'multi', sub: 'multi', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]},
        // {name: 'part', text: '选择部门', type: 'multi', sub: 'multi', list: [{title: '技术', id: 1}, {title: '产品', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]}
      ],
      types: [],
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '类型', list: [{title: '单据类型', id: ''}, {title: '会员等级', id: '1'}, {title: '权限', id: '2'}]}
        // {name: 'role', size: 'small', type: 'multi', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
      ]
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel
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
        {name: 'save', text: '保存', url: 'category_insert'}
      ]
      this.resetsingle()
      for (let i in this.show) {
        if (i === name) {
          this.show[i] = !this.show[i]
        } else {
          this.show[i] = false
        }
      }
      this.title = '创建分类'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      api.post({JSON: JSON.stringify(updata)}, 'category_delete').then((item) => {
        console.log('item', item)
        this.getdata()
      })
    },
    edit (idx) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'category_update'}
      ]
      this.show.panel = !this.show.panel
      this.title = '编辑分类'
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
