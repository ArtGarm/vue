<template>

    <div class="contein">
        <form class="form-users" v-on:submit.prevent="onSubmit">
            <div class="title-form">
                <h2>Login form</h2>
            </div>
            <div class="inputer">
                <input type="email" name="email" placeholder="E-mail" 
                    v-model="email"
                    :class="{error : validation.email }"
                >
            </div>
            <div class="inputer">
                <input type="password" name="pass" placeholder="Pass"
                    v-model="pass"
                    :class="{error : validation.pass }"
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
        name: 'LoginForm',
        data (){
            return{
                email : '',
                pass : ''
            }
        },
        computed :{
            validation (){
                return {
					email : !emailRE.test( this.email ),
                    pass: isEmpty( this.pass )
				}
            },
            valid : function(){
				let val = this.validation;
				let stek = true ;
				Object.keys( val ).forEach(function (key) {
					stek = ( !val[key] && stek ) ? true : false ;
                });
                console.log( stek );
				return stek;		
            }
            
        },
        methods : {
            onSubmit(){
                if( this.valid ){
                    this.$store.dispatch('loginUser', {
                        mail : this.email,
                        pass : this.pass
                    }).then( () => {
                        
                        if ( this.$store.state.userLogin ) {
                            
                            this.$router.replace('/cabinet');
                            this.reloadForm();
                        }
                        
                    });	
                }
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