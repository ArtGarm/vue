<template>

  <div class="first-wrap">
    <div class="name">
      <h1>Welcome to {{ name }}</h1>
    </div>
    <div class="siders">
      <div class="login">
        <router-link to="/login">Login</router-link>
      </div>
      <div class="register">
        <router-link to="/register">Register</router-link>
      </div>
      <div class="register">
        <router-link to="/cabinet" :class="{ notVisible : !isLogined }" >Cabinet</router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
      name(){
          return this.$store.state.projectName
      },
      isLogined(){
          return this.$store.state.userLogined
      }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .siders{display: flex; align-items: center; justify-content: center;}
  a{width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; border: 2px solid #ff6c00; border-radius: 50%; margin: 0 15px; color: #ff6c00; font-weight: 700; text-decoration: none;font-size: 24px; }
  .notVisible{ display: none; }

</style>
