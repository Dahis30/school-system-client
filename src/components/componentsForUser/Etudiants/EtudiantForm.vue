<template>

    <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="1000">
        <v-card>
            <v-toolbar dense dark color="primary">
                <v-spacer />
                <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
            </v-toolbar>

            <v-form ref="Form" @submit.prevent="handleSubmit()" class="mx-3 px-4 py-3">
                <v-card-text>
                    <v-row>
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field :rules="obligationRules" v-model="etudiantForm.nomComplet" label="Nom complet"
                                outlined dense shaped color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="etudiantForm.numeroTelephone" label="Numero telephone" outlined dense
                                shaped color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="etudiantForm.nomTuteur" label="Nom Tuteur" outlined dense shaped
                                color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="etudiantForm.numeroTelephoneTuteur" label="Numero telephone tuteur"
                                outlined dense shaped color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="etudiantForm.niveauScolaire" label="Niveau scolaire" outlined dense
                                shaped color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="etudiantForm.groupe" label="Groupe" outlined dense shaped
                                color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        <v-col class="ma-0 px-1 py-0" cols='12'>
                            <v-text-field v-model="etudiantForm.adresse" label="Adresse" outlined dense shaped
                                color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <CancelButton @userClick="closeDialog()"></CancelButton>
                    <ConfiramationButton :textButton="confirmationButtonText"></ConfiramationButton>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

</template>
<script>
  import obligationRules from '@/constants/vuetifyRules/obligationRules'
  export default{
    name : 'EtudiantForm',  
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
            EtudiantToEditInfo : {},
            etudiantForm :  {
                id : '' ,
                nomComplet: '',
                numeroTelephone: '',
                nomTuteur: '',
                numeroTelephoneTuteur: '',
                niveauScolaire: '',
                groupe: '',
                adresse: '' ,
            },
            defautEtudiantForm :  {
                id : '' ,
                nomComplet: '',
                numeroTelephone: '',
                nomTuteur: '',
                numeroTelephoneTuteur: '',
                niveauScolaire: '',
                groupe: '',
                adresse: '' ,
            }
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
            this.etudiantForm = {...this.defautEtudiantForm };
            this.isDialogOpen = true ;
            if(this.isForEdit == true) this.etudiantForm = {...this.EtudiantToEditInfo} ;
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
            let url = '/etudiants/' + this.centreId ;
            const response = await this.$axios.post( url , this.etudiantForm)
            console.log(response) ;
            this.etudiantForm = {...this.defautEtudiantForm };
        },
        async updateFormation(){
            let url = '/etudiants' ;
            const response = await this.$axios.put( url , this.etudiantForm)
            console.log(response) ;
            this.etudiantForm = {...this.defautEtudiantForm };

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
  