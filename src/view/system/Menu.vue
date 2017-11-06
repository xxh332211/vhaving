<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
    <filters :filters="filters"
             :method="method"></filters>
    <div class="option">
      <button class="btn" @click="create()">创建菜单</button>
    </div>
      <tables :method="method"
              :column="column"
              :options="options"
              :filter="filters"></tables>
  </div>
  <transition name="slide-fade">
    <panel :panels="panels" :types="types" @close="close" v-if="show">
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
  name: 'menu',
  data () {
    return {
      confirms: {
        title: '提示',
        body: '确定删除?'
      },
      show: false,
      nav: {
        parent: '系统管理',
        child: '菜单管理'
      },
      title: '',
      method: {
        list: 'menu_list'
      },
      column: [
        {text: '序号', name: 'Disp_index'},
        {text: '编号', name: 'No'},
        {text: '名称', name: 'Name'},
        {text: '类型', name: 'Type'},
        {text: '父菜单', name: 'Remark'},
        {text: '排序', name: 'Status'},
        {text: '最后操作时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '删除', method: this.del}
      ],
      panels: [
        {name: 'No', text: '编号', holder: '请输入编号*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Name', text: '名称', holder: '请输入名称*...', type: 'input', sub: 'input', check: 'is_null'},
        {
          name: 'Type',
          size: 'small',
          type: 'select',
          text: '类型',
          text1: '请选择类型',
          list: [{Name: '菜单', Id: 'menu'}, {Name: '权限', Id: 'auth'}]
        },
        {
          name: 'ParentId',
          size: 'small',
          type: 'select',
          text: '父菜单',
          text1: '选择父菜单',
          list: [{Name: '顶级菜单', Id: '00000000-0000-0000-0000-000000000000'}],
          get: {url: 'menu_list'},
          param: {PageNo: 1, Search: '', Type: ''}
        },
        {name: 'DispIndex', text: '排序', holder: '请输入序号*...', type: 'input', sub: 'input', must: 'int'},
        {name: 'Url', text: 'URL', holder: '请输入URL地址*...', type: 'input', sub: 'url', check: 'is_null'},
        {
          name: 'Status',
          text: '是否激活',
          type: 'radio',
          sub: 'radio',
          radioval: [{text: '是', val: 1}, {text: '否', val: 0}]
        },
        {name: 'Description', text: '描述', holder: '请输入描述内容*...', type: 'textarea', sub: 'textarea'}
      ],
      types: [],
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '类型', list: [{title: '全部', id: ''}, {title: '菜单', id: '1'}, {title: '权限', id: '2'}]}
//        {name: 'part2', size: 'small', type: 'select', text: '菜单', list: [{title: '系统管理', id: 1}, {title: '商品信息管理', id: 2}, {title: '销售管理', id: 3}, {title: '采购管理', id: 4}, {title: '入库管理', id: 5}, {title: '在库管理', id: 6}, {title: '出库管理', id: 7}, {title: '退货管理', id: 8}, {title: '入款管理', id: 9}]}
      ]
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel,
    confirm: Confirm
  },
  computed: {
    ...mapGetters(['list'])
  },
  methods: {
    ...mapActions(['resetsingle', 'getdata', 'notice']),
    close (data) {
      this.show = false
    },
    create (name) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'menu_insert'}
      ]
      this.resetsingle()
      this.show = !this.show
      this.title = '创建菜单'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      this.$refs.dialog.confirm().then(() => {
        api.post({JSON: JSON.stringify(updata)}, 'menu_delete').then((item) => {
          if (item.responsecode === '241') {
            this.notice({msg: '请先删除子菜单', type: 'error'})
            return
          }
          this.getdata()
        })
      })
    },
    edit (idx) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'menu_update'}
      ]
      this.show = !this.show
      this.title = '编辑菜单'
    },
    auth (idx) {
      this.create('auth')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">

</style>
