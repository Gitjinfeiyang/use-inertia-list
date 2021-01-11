<template>
<div class="inertia-list" ref="container" @scroll="onTouchMove">
  <slot></slot>
</div>
</template>

<script>
import Container from './container'

export default {
  data () {
    return {
      activeItem: null,
      lastCursor: 0,
      lastTime: 0,
      slideSpeed: 0,
      container:null,
      scrollOffset:0
    }
  },
  mounted(){
    const list = this.$children.map((item,index) => {
      item.$index = index
      return {
        location:item.$el.offsetTop,
        size:item.$el.offsetHeight
      }
    })
    this.container = new Container({
      list
    })
    this.lastCursor = this.$refs.container.scrollTop
    this.activeItem = this.$children[Math.floor(this.$children.length/2)]
  },
  methods: {
    onTouchMove (e) {
      const offset = (this.lastCursor - this.$refs.container.scrollTop)
        this.lastCursor = this.$refs.container.scrollTop
        this.scrollOffset += offset
      if (this.activeItem) {
        this.container.moveItem(this.activeItem.containerItem,offset)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inertia-list{
  height:100%;
  overflow: auto;
}
</style>
