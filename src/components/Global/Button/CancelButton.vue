<template>
    <v-btn @click='userClicked()'  color="subPrimary" outlined small rounded>
      {{textButton}}
      <v-icon v-if="icon">{{icon}}</v-icon> 
    </v-btn>
</template>
<script>
  export default{
    name : 'CancelButton',  
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
  