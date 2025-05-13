<template>

       <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="600" >
            <v-card>
                <v-toolbar  dense dark color="primary">
                        <v-spacer/>
                        <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
                </v-toolbar>

                <v-form ref="Form" @submit.prevent="handleSubmit()" class="mx-3 px-4 py-3">
                    <v-card-text>
                            <v-row>
                                <v-col class="ma-0 pa-0" cols =12>
                                  <v-text-field :rules="obligationRules" v-model="centreForm.nom" label="Nom" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                                <v-col  class="ma-0 pa-0" cols =12>
                                  <v-text-field :rules="obligationRules" v-model="centreForm.adresse" label="Adresse" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                            </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <CancelButton  @userClick="closeDialog()"></CancelButton>       
                        <ConfiramationButton :textButton="confirmationButtonText"></ConfiramationButton>       
                    </v-card-actions>
                </v-form>
            </v-card>
      </v-dialog>

</template>
<script>
  import obligationRules from '@/canstants/rules/obligationRules'
  export default{
    name : 'CentreDeFormationForm',  
    props : {
        centreToEditInfo : {
            Required : false ,
        },
        isForEdit :{
            default : false ,
            Required : false ,
        }
    },
    data (){
        return {
            isDialogOpen : false ,
            centreForm : {
                id : '' ,
                nom : '' ,
                adresse : '' ,
            } ,
            defaultCentreForm : {
                id : '' ,
                nom : '' ,
                adresse : '' ,
            } ,
        }
    },
    computed : {
        obligationRules(){ return obligationRules  } ,
        confirmationButtonText () {
            return this.isForEdit ? 'MODIFIER' : 'AJOUTER' ;
        }
    },



    
    methods: {
        openDialog(){
            this.centreForm = {...this.defaultCentreForm };
            this.isDialogOpen = true ;
            if(this.isForEdit == true) this.centreForm = {...this.centreToEditInfo} ;
        },
        closeDialog(){
            this.isDialogOpen = false ;
        },
        confirm(){
            this.$emit('confirmed') ;
            this.closeDialog() ;
        },
        handleSubmit(){
            if(this.$refs.Form.validate()){

                try{
                    this.enableGlobalLoadingComponent();
                    this.isForEdit ? this.updateCentre() : this.createCentre();
                    this.disableGlobalLoadingComponent();
                    this.confirm()
                }
                catch(error){
                    this.disableGlobalLoadingComponent();
                    console.error( error) ;
                }
            }
            
            
        },


        async createCentre(){
            let url = '/centres-de-formation' ;
            const response = await this.$axios.post( url , this.centreForm)
            console.log(response) ;
            this.centreForm = {...this.defaultCentreForm };
        },
        async updateCentre(){
            let url = '/centres-de-formation' ;
            const response = await this.$axios.put( url , this.centreForm)
            console.log(response) ;
            this.centreForm = {...this.defaultCentreForm };

        },



        
        enableGlobalLoadingComponent(){
          this.$store.dispatch('enableGlobalLoading');
        },
        disableGlobalLoadingComponent(){
            this.$store.dispatch('disableGlobalLoading');
        },

    }


  
  }

</script>
<style scope >
 .textConfirmation{
    font-size: 17px;
    font-weight: bold;
 }

</style>
  