<template>
  <div id="app" class="page-wrap">

    <div class="top-row">
        <router-link to="/">back to main</router-link>
        <div class="name"></div>
        <button @click='logOut()' class="logout" :class="{ notVisible : !isLogined }" >
          <span> logout </span>
        </button>
    </div>

    <navigation-menu></navigation-menu>

    <router-view/>

  </div>
</template>

<script>

import NavigationMenu from '@/components/menuBar';

export default {
    name: 'app',
    components: {
        NavigationMenu
    },
    computed : {
        isLogined(){
            return this.$store.state.userLogined
        }
    },
    methods : {
      logOut(){
          this.$store.dispatch('logOut').then( ()=>{
             this.$router.replace('/');
          })
      }
    },
    created : function(){

      this.$store.dispatch('isIalreadyLogined');
      
      this.$store.dispatch('getFirebase');

    }
}

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body{margin: 0;}
  body *{box-sizing: border-box;}
  .page-wrap>.contein{overflow-y: auto;}

  .top-row{position: fixed; top: 0; left: 0; right: 0; background-color: #ff6c00; height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px;}
  .top-row a{ text-decoration: none; color: #fff; display: inline-block; padding: 5px 10px; position: relative; border:  1px solid #fff; border-radius: 12px;}

  .top-row a.router-link-exact-active{display: none;}

  .top-row a:before{ content: '<'; margin-right: 5px;}
  .page-wrap{ width: 100%; height: 100vh; display: block; padding: 100px 100px 15px;}
  .logout{padding: 8px 10px;background-color: #ff6c00; border: none; border: 2px solid #fff; color:  #fff; font-size: 18px;}
  .notVisible{display: none;}
  input{outline: none; }
</style>
