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
                                  <v-text-field :rules="obligationRules" v-model="formationForm.titre" label="Titre" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                                <v-col  class="ma-0 pa-0" cols =12>
                                    <v-textarea v-model="formationForm.description" label="Description" outlined dense shaped color="subPrimary" bg-color="subPrimary" >
                                      <template v-slot:label>
                                        <div>
                                          Description <small>(facultatif)</small>
                                        </div>
                                      </template>
                                    </v-textarea>
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
  import obligationRules from '@/constants/vuetifyRules/obligationRules'
  export default{
    name : 'FormationForm',  
    props : {
        centreId : {
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
            formationToEditInfo : {},
            formationForm : {
                id : '' ,
                titre : '' ,
                description : '' ,
            } ,
            defautformationForm : {
                id : '' ,
                titre : '' ,
                description : '' ,
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
            this.formationForm = {...this.defautformationForm };
            this.isDialogOpen = true ;
            if(this.isForEdit == true) this.formationForm = {...this.formationToEditInfo} ;
        },
        closeDialog(){
            this.isDialogOpen = false ;
        },
        confirm(){
            this.$emit('mustToLoadData') ;
            this.closeDialog() ;
        },
        async handleSubmit(){
            if(this.$refs.Form.validate()){

                try{
                    this.enableGlobalLoadingComponent();
                    this.isForEdit ? await this.updateFormation() : await this.createFormation();
                    this.disableGlobalLoadingComponent();
                    this.confirm()
                }
                catch(error){
                    this.disableGlobalLoadingComponent();
                    console.error( error) ;
                }
            }
            
            
        },


        async createFormation(){
            let url = '/formation/' + this.centreId ;
            const response = await this.$axios.post( url , this.formationForm)
            console.log(response) ;
            this.formationForm = {...this.defautformationForm };
        },
        async updateFormation(){
            let url = '/formation' ;
            const response = await this.$axios.put( url , this.formationForm)
            console.log(response) ;
            this.formationForm = {...this.defautformationForm };

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
  