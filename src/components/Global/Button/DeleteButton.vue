<template>
    <v-btn @click='userClicked()'  color="CancelButtonColor" outlined small rounded>
      {{textButton}}
      <v-icon v-if="icon">{{icon}}</v-icon> 
    </v-btn>
</template>
<script>
  export default{
    name : 'DeleteButton',  
    props : {
        textButton : {
            default : 'annuler' ,
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
  