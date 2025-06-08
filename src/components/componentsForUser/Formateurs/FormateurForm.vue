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
                                  <v-text-field :rules="obligationRules" v-model="formateurForm.nom" label="Nom" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                                <v-col  class="ma-0 pa-0" cols =12>
                                  <v-text-field :rules="obligationRules" v-model="formateurForm.prenom" label="Prenom" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                                <v-col  class="ma-0 pa-0" cols =12>
                                  <v-autocomplete v-model="formateurForm.sexe" :items="sexes" label="Sexe" outlined shaped dense deletable-chips ></v-autocomplete>
                                </v-col>
                                 <v-col  class="ma-0 pa-0" cols =12>
                                  <v-text-field type="number" :rules="obligationRules" v-model="formateurForm.numeroTelephone" label="Numero de telephone" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                                 <v-col  class="ma-0 pa-0" cols =12>
                                  <v-text-field :rules="obligationRules" v-model="formateurForm.email" label="Email" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                </v-col>
                                <v-col  class="ma-0 pa-0" cols =12>
                                  <v-text-field :rules="obligationRules" v-model="formateurForm.adresse" label="Adresse" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
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
  import sexes from '@/constants/sexes/sexes'
  export default{
    name : 'FormateurForm',  
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
            formateurToEditInfo : {},
            formateurForm : {
                id : '' ,
                nom : '' ,
                prenom : '' ,
                sexe : '' ,
                numeroTelephone : '',
                email : '' ,
                adresse : '' ,
            } ,
            defautFormateurForm : {
                id : '' ,
                nom : '' ,
                prenom : '' ,
                sexe : '' ,
                numeroTelephone : '',
                email : '' ,
                adresse : '' ,
            } ,
        }
    },
    computed : {
        obligationRules(){ return obligationRules  } ,
        sexes(){ return sexes } ,
        confirmationButtonText () {
            return this.isForEdit ? 'MODIFIER' : 'AJOUTER' ;
        }
    },



    
    methods: {
        openDialog(){
            this.formateurForm = {...this.defautFormateurForm };
            this.isDialogOpen = true ;
            if(this.isForEdit == true) this.formateurForm = {...this.formateurToEditInfo} ;
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
                    this.isForEdit ? await this.updateCentre() : await this.createFormateur();
                    this.disableGlobalLoadingComponent();
                    this.confirm()
                }
                catch(error){
                    this.disableGlobalLoadingComponent();
                    console.error( error) ;
                }
            }
            
            
        },


        async createFormateur(){
            let url = '/formateurs/' + this.centreId ;
            const response = await this.$axios.post( url , this.formateurForm)
            console.log(response) ;
            this.formateurForm = {...this.defautFormateurForm };
        },
        async updateCentre(){
            let url = '/formateurs' ;
            const response = await this.$axios.put( url , this.formateurForm)
            console.log(response) ;
            this.formateurForm = {...this.defautFormateurForm };

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
  