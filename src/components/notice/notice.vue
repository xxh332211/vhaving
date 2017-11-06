<template>
  <transition name='notice' mode='out-in'>
  <div :class="'notification fixed '+notice.type" v-if="notice.show">
    <!-- <div class="delete" @click="$emit('closenotice')"></div> -->
    <div class="content">
      {{ notice.msg }}
    </div>
  </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'notice'
    ])
  }
}
</script>

<style scoped lang="stylus">
  .delete
    -moz-appearance: none
    -webkit-appearance: none
    background: rgba(51,51,51,0.2)
    cursor: pointer
    display: inline-block
    height: 24px
    position: relative
    vertical-align: top
    width: 24px
    float: right
    position: fixed
    right: 0
    top: 0
    &:before,
    &:after
      background: #fff
      content: ""
      display: block
      height: 2px
      left: 50%
      margin-left: -25%
      margin-top: -1px
      position: absolute
      top: 50%
      width: 50%
    &:before
      transform: rotate(45deg)
    &:after
      transform: rotate(-45deg)
    &:hover
      background: rgba(51,51,51,0.5)
  .notification
    boxsizing: border-box
    width: 100%
    height: 100px
    line-height: 2
    z-index: 3
    position: fixed
    top: 0
    left: 250px
    &.success
      color: white
      background: #22ac38
    &.error
      color: white
      background: #E60012
    .content
      font-size: 24px
      color: #fff
      position: absolute
      top: 20%
      right: 50%
      transform: translateX(-50%)
  .notice-enter-active, .notice-leave-active
    transition: opacity .5s
  .notice-enter, .notice-leave-active
    opacity: 0
</style>
