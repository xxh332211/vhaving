<template>
  <div id="app">
    <router-view></router-view>
    <modal v-if="modal.show" @closemodal-y="confirmyes" @closemodal-n="confirmno"></modal>
  </div>
</template>

<script>
  import Modal from './components/modal/modal.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        index: 0
      }
    },
    computed: {
      ...mapGetters(['modal'])
    },
    methods: {
      ...mapActions(['confirmyes', 'confirmno'])
    },
    components: {
      modal: Modal
    }
  }
</script>
<style lang="stylus">
    #app
      padding-top:1px
      margin-top:-1px
</style>
