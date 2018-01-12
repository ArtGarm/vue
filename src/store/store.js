import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/firebase';

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
    state :{
        projectName : '',
        userRegister : false,
        userLogined : false,
        userHash : '',
        user : {}
    },
    getters: {

    },
    mutations:{

        toogle ( state, name ){
            state.projectName = name;
        },

        userRegisterState( state, status ){
            state.userRegister = status;
        },
        
        userLoginedState ( state, status ){
            state.userHash = status[1] ;
            state.userLogined = status[0] ;
        },
        
        userData( state, snapshot ) {
            console.log( snapshot );
            state.user = snapshot;
        }

    },
    actions:{

        getFirebase( context ){
            this.projectName = firebase.database.ref('projectName').on('value', function(snapshot){
                context.commit('toogle', snapshot.val() );
            }) ;
        },

        setNewUser : ( context , addUser ) => {

            return new Promise((resolve, reject) => {
                var result = true;

                firebase.database.ref('list_users').once('value').then( function (snapshot) {
                    let curr = snapshot.val();
                    

                    Object.keys( curr ).forEach(function (key) {

                        if ( curr[key].mail == addUser.mail ) {
                            result = false; 
                        }
                        
                    });

                    if ( !result ) {

                        context.commit('userRegisterState', false );
                        alert ( 'this email already register' );
                        
                    } else {

                        context.commit('userRegisterState', true );
                        firebase.database.ref('list_users').push( addUser );    
                        alert('new user is added');                    

                    }
                    
                });
                resolve();
            })

        },

        loginUser : ( context , logUser ) => {
            return new Promise((resolve, reject) => {
                var result = false;

                firebase.database.ref('list_users').once('value').then( function (snapshot) {
                    let hash = '';
                    let curr = snapshot.val();
                
                    Object.keys( curr ).forEach(function (key) {

                        if ( curr[key].mail == logUser.mail && curr[key].pass == logUser.pass ) {
                            result = true; 
                            console.log( key );
                            hash = key ;
                        }
                        
                    });

                    if ( result ) {

                        localStorage.setItem( 'vuefirstLoginHash' , hash );
                        context.commit('userLoginedState', [ true , hash ] );
                        
                    } else {

                        context.commit('userLoginedState', [ false , 0 ] );
                        alert('user is not exist');                    
                    }
                    
                });
                resolve();
            })
        },

        isIalreadyLogined : ( context ) =>{
            if ( localStorage.getItem('vuefirstLoginHash') != null && localStorage.getItem('vuefirstLoginHash') != '' ){
                context.commit('userLoginedState', [ true , localStorage.getItem('vuefirstLoginHash') ] );
            }
        },

        getUserDataToCabinet : (context) => {
            if ( context.state.userHash != '' ) {
                console.log( 'list_users/' + context.state.userHash );
                firebase.database.ref('list_users/' + context.state.userHash ).once('value').then( function (snapshot) {
                    
                    context.commit('userData', snapshot.val() );

                });
            }
        },

        logOut : ( context ) =>{
            return new Promise((resolve, reject) => {
                localStorage.setItem( 'vuefirstLoginHash' , '' ); 
                context.commit('userLoginedState', [ false , 0 ] );
                context.commit('userData', '' );
                resolve();
            })            
        }


    }
})