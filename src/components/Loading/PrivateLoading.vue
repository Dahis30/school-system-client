<template>
    <div class="ma-2 pa-1" >
         <v-progress-linear v-if="isLoading"   color="primary" indeterminate rounded height="6" ></v-progress-linear>           
    </div>

</template>

<script>

export default {
    name : 'PrivateLoading',
    props : {
        isLoading : {
            default : true ,
            Required : true
        }


    },
    data (){
        return{
        }
    },


}



</script>