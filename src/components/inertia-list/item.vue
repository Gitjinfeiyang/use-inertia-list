<template>
  <div :style="computedStyles" class="inertia-list-item" @touchstart="onItemTouchStart" @touchend="onItemTouchEnd">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed:{
    containerItem(){
      if(!this.$parent.container) return null
      return this.$parent.container.listItems[this.$index]
    },
    computedStyles(){
      if(!this.$parent.container) return {}
      // if(this.$parent.activeItem === this) return {}
      return {
        transform:`translate3d(0,${this.containerItem.location-this.$el.offsetTop - this.$parent.scrollOffset}px,0)`
      }
    },
  },
  methods: {
    onItemTouchStart (e) {
      this.setActiveItem(this)
    },
    onItemTouchEnd (e) {
      // this.setActiveItem(null)
    },
    setActiveItem (item) {
      this.$parent.activeItem = item
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
