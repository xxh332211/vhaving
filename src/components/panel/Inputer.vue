<template>
  <div class="s-list">
    <label for="">{{child.text}}：</label>
    <input v-if="child.sub === 'input'" type="input" v-model="val" :placeholder="child.holder" @input="change()">
    <input v-if="child.sub === 'password'" type="password" v-model="val" :placeholder="child.holder" @input="change()">
    <input v-if="child.sub === 'email'" type="email" v-model="val" :placeholder="child.holder" @input="change()">
    <input v-if="child.sub === 'date'" type="date" v-model="val" :placeholder="child.holder" @input="change()">
    <input v-if="child.sub === 'url'" type="url" v-model="val" :placeholder="child.holder" @input="change()">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'inputer',
  props: {
    child: ''
  },
  data () {
    return {
      val: ''
    }
  },
  computed: {
    ...mapGetters(['single'])
  },
  mounted () {
    this.val = this.single[this.child.name] || ''
    this.$emit('toparent', {name: this.child.name, val: this.val})
  },
  methods: {
    change () {
      if (this.child.must === 'int') {
        this.val = this.val.replace(/\D/g, '')
        this.val = Number(this.val)
      }
      this.$emit('toparent', {name: this.child.name, val: this.val})
    }
  }
}
</script>

<style scoped lang="stylus">
  .s-list
      overflow:hidden
      padding:.1rem 0
      // text-align: justify
      // text-align-last: justify
      // text-justify: inter-ideograph
      label
        line-height:.5rem
        margin-right:.15rem
        width:.8rem
        display:inline-block
        height:.5rem
        text-align:right
      input
        padding:0 .1rem
        width:3.5rem
        height:.5rem
        border:.01rem solid #c6c6c6
        border-radius:.06rem
</style>
