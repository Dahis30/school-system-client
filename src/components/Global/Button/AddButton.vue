<template>
    <v-btn @click='userClicked()' color="ConfiramationButtonColor" small rounded>
      {{textButton}}
      <v-icon v-if="icon">{{icon}}</v-icon> 
    </v-btn>

</template>
<script>
  export default{
    name : 'AddButton',  
    props : {
        textButton : {
            default : 'confirmer' ,
            // Required : true 
        },
        icon : {
            default : '' ,
            // Required : true 
        }
    },


    
    methods: {
        userClicked(){
            this.$emit('userClick')
        }
    }


  
  }

</script>
  