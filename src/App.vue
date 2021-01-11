<template>
  <div id="app">
    <list>
      <div> - top -</div>
      <item v-for="item in 10" :key="item">
        <div class="item">
          Item {{item}}
        </div>
      </item>
      <div> - bottom -</div>
    </list>
  </div>
</template>

<script>
import List from './components/inertia-list/list.vue'
import Item from './components/inertia-list/item.vue'
export default {
  components: {
    List,
    Item
  }
}
</script>

<style lang="scss">
*{
    margin:0; padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100vh;
  overflow:hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.item{
  background:#f1f1f1;
  margin:30px 10px;
  padding:30px;
}
</style>
