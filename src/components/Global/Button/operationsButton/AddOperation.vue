<template>

     <v-tooltip color="AddOperationColor" bottom open-delay="200">
           <template v-slot:activator="{ on, attrs }">
             <v-btn v-bind="attrs" v-on="on" @click="userClicked()" class="my-0 mx-1 pa-0"  dark x-small color="AddOperationColor"  >
               <v-icon v-bind="attrs" v-on="on" small  >add</v-icon>
             </v-btn>
           </template>
           <span>{{spanText}}</span>
     </v-tooltip>
</template>
<script>
export default {
  name:'AddOperation',
  props:{
    spanText : {
        default : 'Ajouter' ,
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