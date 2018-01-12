<template>
    <div class="page-wrap">

        <div class="contein">
            <h2>Cabinet</h2>

            <table>
                <tr>
                    <td>name</td>
                    <td> {{data.name1}} </td>
                </tr>
                <tr>
                    <td>Second name</td>
                    <td> {{data.name2}} </td>
                </tr>
                <tr>
                    <td>E-mail</td>
                    <td> {{data.email}} </td>
                </tr>
            </table>
        </div>
    </div>
  
</template>

<script>

    export default {
        data(){
            return{
                name1 : 'asdfasdfas',
                name2 : 'sdfgsdfgsdfgsdfgsdfgsdfg',
                email : 'asdf@ddf.ff'
            }
        },
        computed : {
            data(){
                return{
                    name1 : this.$store.state.user.name1 ,
                    name2 : this.$store.state.user.name2,
                    email : this.$store.state.user.mail
                }
            }
        },
        created : function(){
            this.$store.dispatch('getUserDataToCabinet');
        }
    }

</script>

<style lang="scss" scoped>

    table{width: 460px; text-align: left;  border-spacing: 0px;border: 1px solid silver;
        td{border: 1px solid silver; padding: 5px;}
    }

</style>
