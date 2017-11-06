<template>
<transition name="modal">
    <div class="modal-mask" v-if="show">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>{{msg.title}}</h3>
                </div>
                <div class="modal-body">
                    <p>{{msg.body}}</p>
                </div>
                <div class="modal-footer">
                        <button class="modal-default-button" @click="cancel()">
                            取消
                        </button>
                        <button class="modal-default-button" @click="sure()">
                            确定
                        </button>
                </div>
            </div>
        </div>
    </div>
</transition> 
</template>

<script>
  export default {
    name: 'confirm',
    data () {
      return {
        show: false,
        resolve: '',
        reject: '',
        promise: ''
      }
    },
    props: {
      msg: ''
    },
    methods: {
      cancel () {
        this.show = false
      },
      sure () {
        console.log()
        this.resolve(true)
        this.show = false
      },
      confirm () {
        this.show = true
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
        return this.promise
      }
    }
  }
</script>

<style scoped lang="stylus">
.modal-mask
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  .modal-wrapper
    display: table-cell;
    vertical-align: middle;
    .modal-container
      cursor:default
      width: 300px;
      height: 150px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      .modal-header
        user-select:none;
        h3
        user-select:none;
        margin-top: 0;
        color: #42b983;
.modal-body
  user-select:none;
  margin: 20px 0;
.modal-default-button
  background-color: white;
  padding: 0.3em;
  float: right;
  width: auto;
  border-radius: 10%;
  margin-left: 20px;
.modal-enter
  opacity: 0;
.modal-leave-active
  opacity: 0;
.modal-enter .modal-container,
.modal-leave-active .modal-container
  transform: scale(1.1);
</style>
