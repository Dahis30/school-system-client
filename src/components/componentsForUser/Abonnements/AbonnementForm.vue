<template>

    <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="1000">
        <v-card>
            <v-toolbar dense dark color="primary">
                <v-spacer />
                <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
            </v-toolbar>


            <!-- abonnementFormObject : {{ abonnementForm }} -->
            <v-form ref="Form" @submit.prevent="handleSubmit()" class="mx-3 px-4 py-3">
                <v-card-text>
                    <v-row>

                        <v-col class="ma-0 px-1 py-0" cols='6' >
                            <v-menu class="ma-0 pa-0" v-model="menuDateDebut"  transition="scale-transition" offset-y min-width="auto" >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="abonnementForm.DateDebut" :rules="obligationRules" label="Date Debut" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                              </template>
                              <v-date-picker color="subPrimary" v-model="abonnementForm.DateDebut" no-title  locale="fr-FR"></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col class="ma-0 px-1 py-0" cols='6' >
                            <v-menu class="ma-0 pa-0" v-model="menuDateFin"  transition="scale-transition" offset-y min-width="auto" >
                              <template v-slot:activator="{ on, attrs }" >
                                <v-text-field v-model="abonnementForm.DateFin" :rules="obligationRules" label="Date Fin " prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"
                                outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                              </template>
                              <v-date-picker color="subPrimary" v-model="abonnementForm.DateFin" no-title  locale="fr-FR"></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-autocomplete :rules="obligationRules" outlined shaped dense v-model="abonnementForm.Etudiant" return-object 
                            :items="etudiants" label="Etudiant *"  placeholder="Etudiant" item-text="nomComplet"  item-value="id" style="font-size:16px" >
                                <template slot="selection" slot-scope="{ item }"> 
                                    <span v-if="item?.nomComplet.length > 50"  >{{item?.nomComplet.substring(0, 50) }} ...</span>
                                    <span v-else >{{item?.nomComplet }}</span> 
                                </template> 
                                <template slot="item" slot-scope="{ item }">
                                    <span v-if="item?.nomComplet.length > 50"  >{{item?.nomComplet.substring(0, 50) }} ...</span>
                                    <span v-else >{{item?.nomComplet }}</span> 
                                </template>  
                            </v-autocomplete>
                        </v-col>

                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-autocomplete :rules="obligationRules" outlined shaped dense v-model="abonnementForm.Formation" return-object 
                            :items="formations" label="Formation *"  placeholder="Formation" item-text="nom"  item-value="id" style="font-size:16px" >
                                <template slot="selection" slot-scope="{ item }">
                                    <span v-if="item?.titre.length > 45"  >{{item?.titre.substring(0, 45) }} ...</span>
                                    <span v-else >{{item?.titre }}</span> 
                                </template> 
                                <template slot="item" slot-scope="{ item }">
                                    <span v-if="item?.titre.length > 45"  >{{item?.titre.substring(0, 45) }} ...</span>
                                    <span v-else >{{item?.titre }}</span> 
                                </template>  
                            </v-autocomplete>
                        </v-col>

                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-autocomplete :rules="obligationRules" outlined shaped dense v-model="abonnementForm.Formateur" return-object 
                            :items="formateurs" label="Formateur *"  placeholder="Formateur" item-text="nom"  item-value="id" style="font-size:16px" >
                                <template slot="selection" slot-scope="{ item }">
                                    <span v-if="item?.nom.length + item?.prenom.length  > 40"  >{{(item?.nom + ' - ' +  item?.prenom).substring(0, 40) }} ...</span>
                                    <span v-else >{{item?.nom }}  -  {{item?.prenom }} </span>
                                </template> 
                                <template slot="item" slot-scope="{ item }">
                                    <span v-if="item?.nom.length > 20 || item?.prenom.length  > 20"  >{{(item?.nom ).substring(0, 20) }} ... - {{(item?.prenom ).substring(0, 20) }} ...</span>
                                    <span v-else >{{item?.nom }}  -  {{item?.prenom }} </span>
                                </template>  
                            </v-autocomplete>
                        </v-col>

                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="abonnementForm.MontantFormateur" :rules="obligationRules" label="Montant Formateur"
                                type="number" outlined dense shaped color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>
                        
                        <v-col class="ma-0 px-1 py-0" cols='6'>
                            <v-text-field v-model="abonnementForm.MontantAbonnement" :rules="obligationRules" label="Montant d'abonnement"
                                type="number" outlined dense shaped color="subPrimary" bg-color="subPrimary"></v-text-field>
                        </v-col>

                        
                        <v-col  class="ma-0 px-1 py-0" cols =6>
                          <v-autocomplete v-model="abonnementForm.Statut" :items="statutsAbonnement" :rules="obligationRules" label="Statut" outlined shaped dense deletable-chips ></v-autocomplete>
                        </v-col>


                        <v-col  class="ma-0 px-1 py-0" cols='12'>
                            <v-textarea v-model="abonnementForm.Commentaire" label="Commentaire" outlined dense shaped color="subPrimary" bg-color="subPrimary" >
                              <template v-slot:label>
                                <div>
                                  Commentaire <small>(facultatif)</small>
                                </div>
                              </template>
                            </v-textarea>
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
  import statuts from '@/constants/statuts/statutsAbonnement'
  export default{
    name : 'AbonnementForm',  
    props : {
        centreId : {
            Required : false ,
        },
        // isForEdit :{
        //     default : false ,
        //     Required : false ,
        // }
    },
    data (){
        return {
            isForEdit : false ,
            isDialogOpen : false ,
            EtudiantToEditInfo : {},
            abonnementForm :  {
                id : '' ,
                DateDebut : '',
                DateFin : '' ,
                Etudiant: '',
                Formateur: '',
                Formation: '',
                MontantFormateur : '' ,
                MontantAbonnement : '' ,
                Commentaire : '' ,
                Statut : '' ,

            },
            defautAbonnementForm :  {
                id : '' ,
                DateDebut : '',
                DateFin : '' ,
                Etudiant: '',
                Formateur: '',
                Formation: '',
                MontantFormateur : '',
                MontantAbonnement : '' ,
                Commentaire : '' ,
                Statut : '' ,
            },
            etudiants : [],
            formateurs : [] ,
            formations : [], 
            menuDateDebut : false ,
            menuDateFin : false ,
            statutsAbonnement : [],

        }
    },
    computed : {
        obligationRules(){ return obligationRules  } ,
        confirmationButtonText () {
            return this.isForEdit ? 'MODIFIER' : 'AJOUTER' ;
        }
    },
    created(){
        this.obtenirEtudiants() ;
        this.obtenirFormateures() ;
        this.obtenirFormations() ;

        this.statutsAbonnement = statuts  ;
    },

    
    methods: {

        
        async obtenirEtudiants (){
          try{
            const response = await this.$axios.get('/etudiants/' + this.centreId )  
            this.etudiants = response?.data?.etudiants  
          }
          catch(error){
            console.error( error) ;
          }
        },
        
        async obtenirFormateures (){
          try{
            const response = await this.$axios.get('/formateurs/' + this.centreId )  
            this.formateurs = response?.data?.formateurs  
          }
          catch(error){
            console.error( error) ;
          }
        },
        
        async obtenirFormations (){
          try{
            const response = await this.$axios.get('/formation/' + this.centreId )  
            this.formations = response?.data?.formations  
          }
          catch(error){
            console.error( error) ;
          }
        },

        openDialog(){
            this.abonnementForm = {...this.defautAbonnementForm };
            this.isDialogOpen = true ;
            if(this.isForEdit == true) this.abonnementForm = {...this.EtudiantToEditInfo} ;
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
                    this.isForEdit ? await this.updateAbonnement() : await this.createAbonnement();
                    this.disableGlobalLoadingComponent();
                    this.confirm()
                }
                catch(error){
                    this.disableGlobalLoadingComponent();
                    console.error( error) ;
                }
            }
            
            
        },


        async createAbonnement(){
            let url = '/abonnements/' + this.centreId ;
            const response = await this.$axios.post( url , this.abonnementForm)
            console.log(response) ;
            this.abonnementForm = {...this.defautAbonnementForm };
        },
        async updateAbonnement(){
            let url = '/abonnements' ;
            const response = await this.$axios.put( url , this.abonnementForm)
            console.log(response) ;
            this.abonnementForm = {...this.defautAbonnementForm };

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
  