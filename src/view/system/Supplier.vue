<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
       
  <div class="role main">
  		<filters :filters="filters"
             :method="method"></filters>
      <div class="option">
      <button class="btn" @click="create()">创建供应商</button>
    	</div>
      <tables :param="param"
      				:options="options"
              :column="column"
              :filters="filters"></tables>
  </div>
  <transition name="slide-fade">
    <tabs @close="close" v-if="show.tabs" :types="types" :lgds="lgds">
    </tabs>
  </transition>
</div>

</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import Tabs from '../../components/Tabs.vue'
import api from '../../api/api.js'
import { mapGetters, mapActions } from 'vuex'
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'role',
  data () {
    return {
      nav: {
        parent: '系统管理',
        child: '供应商管理'
      },
      show: {
        panel: false,
        tabs: false
      },
      title: '',
      column: [
        {text: '序号', name: 'id'},
        {text: '系统编号', name: 'name'},
        {text: '供应商名称', name: 'time'},
        {text: '联系人', name: 'id'},
        {text: '结算方式', name: 'id'},
        {text: '操作方式', name: 'id'},
        {text: '开票模式', name: 'id'},
        {text: '合同终止时间', name: 'id'},
        {text: '供应商状态', name: 'id'}
      ],
      param: {
        url: '/supplier'
      },
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '供应商状态', list: [{title: '全部', id: '1'}, {title: '未提交', id: '2'}, {title: '审核中', id: '3'}, {title: '未通过', id: '4'}, {title: '生效', id: '5'}, {title: '失效', id: '6'}]},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '合同编号'},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '合同状态', list: [{title: '待审批', id: '1'}, {title: '生效', id: '2'}, {title: '失效', id: '3'}]},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '结算方式', list: [{title: '账期', id: '1'}, {title: '授信额度', id: '2'}, {title: '现款现贷', id: '3'}]},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '开票模式', list: [{title: '无票', id: '1'}, {title: '普通增票', id: '2'}, {title: '专用增票', id: '3'}]},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '操作模式', list: [{title: '代发', id: '1'}, {title: '自发', id: '2'}]},
        {name: 'Type', size: 'small', type: 'select', val: '', text: '配送模式', list: [{title: '集采', id: '1'}, {title: '通用', id: '2'}]}
//        {name: 'part2', size: 'small', type: 'select', text: '菜单', list: [{title: '系统管理', id: 1}, {title: '商品信息管理', id: 2}, {title: '销售管理', id: 3}, {title: '采购管理', id: 4}, {title: '入库管理', id: 5}, {title: '在库管理', id: 6}, {title: '出库管理', id: 7}, {title: '退货管理', id: 8}, {title: '入款管理', id: 9}]}
      ],
      options: [
        {name: '编辑', method: this.edit}
      ],
      method: {
        list: 'menu_list'
      }
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel,
    tabs: Tabs
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
        {name: 'quit', text: '通过', url: ''},
        {name: 'sure', text: '拒绝', url: 'supplier_insert'},
        {name: 'quit', text: '保存', url: ''},
        {name: 'quit', text: '提交', url: ''}
      ]
      this.lgds = [
        {name: 'quit', text: '保存', url: ''},
        {name: 'sure', text: '提交', url: 'supplier_insert'}
      ]
      console.log(name)
      this.resetsingle()
      this.show.tabs = !this.show.tabs
      this.title = '创建供应商'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      api.post({JSON: JSON.stringify(updata)}, 'supplier_delete').then((item) => {
        console.log('item', item)
        this.getdata()
      })
      console.log(idx, id)
    },
    edit (idx) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'supplier_delete'}
      ]
      this.show = !this.show
      this.title = '创建供应商'
    },
    tabs (idx) {
      this.create('tabs')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
  
</style>
