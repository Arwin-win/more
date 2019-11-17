<template>
  <div>
    <ul>
        <li v-for="item in menus" :key="item.path">
            <router-link :to="item.path" >{{item.meta.title}}</router-link>
        </li>
    </ul>
    
    <Button @click="logout">退出</Button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    this.menus = JSON.parse(window.sessionStorage.getItem("menus"));
  },
  data() {
    return {
      menus: []
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped lang="less">
</style>