<template>
     <v-tooltip color="UpdateOperationColor" bottom open-delay="200">
           <template v-slot:activator="{ on, attrs }">
             <v-btn v-bind="attrs" v-on="on" @click="userClicked()" class="my-0 mx-1 pa-0"  dark x-small color="UpdateOperationColor"  >
               <v-icon v-bind="attrs" v-on="on" small  >visibility</v-icon>
             </v-btn>
           </template>
           <span>{{spanText}}</span>
     </v-tooltip>
</template>
<script>
export default {
  name:'ShowMoreOperation',
  props:{
    spanText : {
        default : 'voir plus' ,
        Required : false ,
    }
  },
  methods : {
        userClicked(){
            this.$emit('userClick')
        }
  },
}

</script>