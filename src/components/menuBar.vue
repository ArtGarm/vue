<template>

    <div class="menu-wrap">
        <ul>
            <li>
                 <router-link to="/">main</router-link>
            </li>
            <li>
                 <router-link to="/login">login</router-link>
            </li>
            <li>
                 <router-link to="/register">register</router-link>
            </li>
            <li>
                 <router-link to="/cabinet" :class="{ disabled : logined }">cabinet</router-link>
            </li>
        </ul>
    </div>
  
</template>

<script>

    export default {
        name: 'NavigationMenu',
        computed :{
            logined (){
                return !this.$store.state.userLogined ;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .menu-wrap{display: block; position: fixed; width: 80px; background-color: #ff6c00; top: 80px; left: 0; bottom: 0;
        ul{list-style: none; padding: 0px; margin: 0; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; align-content: center; height: 100%;
            li{width: 100%; margin: 10px 0;}
        }
        a{ width: 60px; height: 60px; margin: 0 auto; border: 2px solid #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #fff; text-decoration: none;
            &.disabled{ pointer-events: none; background-color: gray;}
        }
    }

</style>
