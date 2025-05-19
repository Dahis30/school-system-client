<template>

     <v-tooltip color="DeleteOperationColor" bottom open-delay="200">
           <template v-slot:activator="{ on, attrs }">
             <v-btn v-bind="attrs" v-on="on" @click="userClicked()" class="my-0 mx-1 pa-0"  dark x-small color="DeleteOperationColor"  >
               <v-icon v-bind="attrs" v-on="on" small  >delete</v-icon>
             </v-btn>
           </template>
           <span>Supprimer</span>
     </v-tooltip>
</template>
<script>
export default {
  name:'DeleteOperation',
  methods : {
        userClicked(){
            this.$emit('userClick')
        }
  },
}

</script>