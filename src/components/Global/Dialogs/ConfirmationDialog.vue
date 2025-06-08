<template>

       <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="600" >
            <v-card>
                <v-toolbar  dense dark color="primary">
                        <v-spacer/>
                        <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                    <div  class="textConfirmation pa-3">{{textConfirmation}}</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <CancelButton :textButton="'Annuler'" @userClick="closeDialog()"></CancelButton>       
                    <ConfiramationButton :textButton="textButtonConfirmation"  @userClick="confirm()"></ConfiramationButton>       
                </v-card-actions>
            </v-card>
      </v-dialog>

</template>
<script>
  export default{
    name : 'ConfirmationDialog',  
    props : {
        textConfirmation: {
            default : '' ,
            Required : true 
        },
        textButtonConfirmation: {
            default : 'Confirmer' ,
            Required : true 
        },
    },
    data (){
        return {
            isDialogOpen : false ,
        }
    },


    
    methods: {
        openDialog(){
            this.isDialogOpen = true ;
        },
        closeDialog(){
            this.isDialogOpen = false ;
        },
        confirm(){
            this.$emit('confirmed') ;
            this.closeDialog() ;
        }
    }


  
  }

</script>
<style scope >
 .textConfirmation{
    font-size: 17px;
    font-weight: bold;
 }

</style>
  