<template>

    <div class="contein">
        <form class="form-users" v-on:submit.prevent="onSubmit">
            <div class="title-form">
                <h2>Register form</h2>
            </div>
            <div class="inputer">
                <input type="email" name="email" placeholder="E-mail" 
                    v-model.trim="email" 
                    :class="{error : validation.email }"
                >
            </div>
            <div class="inputer">
                <input type="text" name="name1" placeholder="First name" 
                    v-model.trim="name1"
                    :class="{error : validation.name1 }"
                >
            </div>
            <div class="inputer">
                <input type="text" name="name2" placeholder="Second name" 
                    v-model.trim="name2"
                    :class="{error : validation.name2 }"
                >
            </div>
            <div class="inputer">
                <input type="password" name="pass1" placeholder="Pass" 
                    v-model="pass1"
                    :class="{error : validation.pass1 }"
                >
            </div>
            <div class="inputer">
                <input type="password" name="pass2" placeholder="Confirm pass" 
                    v-model="pass2"
                    :class="{error : validation.pass2 }"
                >
            </div>
            <div class="submiter">
                <button :class="{ valid : valid }" >
                    <span> submit </span>
                </button>
            </div>
        </form>
    </div>
  
</template>

<script>
    /* test funk */
        var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

        function isEmpty( el ) {
            if ( el != '' ){
                return false;
            } else {
                return true;
            }
        }

        function passDiff( elOrigin, elConfirm ) {
            if ( elOrigin != elConfirm  ){
                return true;
            } else {
                return false;
            }
        }
    /* test funk */


    export default {
        name: 'RegisterForm',
        data (){
            return{
                email : '',
                name1 : '',
                name2 : '',
                pass1 : '',
                pass2 : ''
            }
        },
        computed :{
            validation (){
                return {
					email : !emailRE.test( this.email ),
                    name1 : isEmpty( this.name1 ),
                    name2 : isEmpty( this.name2 ),
                    pass1 : isEmpty( this.pass1 ),
                    pass2 : passDiff( this.pass1 , this.pass2 ),
				}
            },
            valid : function(){
				let val = this.validation;
				let stek = true ;
				Object.keys( val ).forEach(function (key) {
					stek = ( !val[key] && stek ) ? true : false ;
                });
				return stek;		
            },
            
            isRegister (){
                return this.$store.state.userRegister ;
            }
        },
        methods : {
            onSubmit(){
                if( this.valid ){

                    this.$store.dispatch('setNewUser', {
                        mail : this.email,
                        name1 : this.name1,
                        name2 : this.name2,
                        pass : this.pass1
                    }).then( ( status ) => {
                        console.log( status );

                        if ( isRegister ) {
                            this.reloadForm();
                            this.$router.replace('/login');
                        }
                        
                    });	

                }
            },
            reloadForm(){
				this.email = '';
				this.name1 = '';
				this.name2 = '';
                this.pass1 = '';
                this.pass2 = '';
			}
        }

    }


</script>

<style lang="scss" scoped>

    input, button{ width: 340px; display: block; height: 48px; padding: 10px; margin: 0 auto; font-size: 14px; box-sizing: border-box; outline: none;}
    .submiter, .inputer{ padding: 10px 0; }
    input.error{box-shadow: 0px 0px 5px 0px rgba(255,15,15,1); }

    button{ background-color: gray; color: #fff; font-size: 20px; border: none;
        &.valid {background-color: #ff6c00; cursor: pointer;}
    }

</style>
