<template>
    <v-btn @click='userClicked()' color="subPrimary" type="submit" small rounded>
      {{textButton}}
      <v-icon v-if="icon">{{icon}}</v-icon> 
    </v-btn>

</template>
<script>
  export default{
    name : 'ConfiramationButton',  
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
  