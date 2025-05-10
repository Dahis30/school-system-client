<template>
    <div>
      <v-container class=" py-0 my-0"  color="">
        <v-row  class="px-0 mx-0 py-0 my-0">
          <v-col cols="12" md="9" class="mx-0 px-0" >
              <v-alert  class=" py-1 my-0 mx-0 px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Veuillez valider ou supprimer les demandes d'inscription selon la confirmation du client. </v-alert>
          </v-col>
          <v-col cols="12" md="1" class="mx-3" > <v-btn @click="validerDemandes()" color="ConfiramationButtonColor" small rounded > valider  <v-icon>verified</v-icon> </v-btn></v-col>
          <v-col cols="12" md="1" class="mx-3" > <v-btn @click="supprimerDemandes()" color="CancelButtonColor" small rounded > supprimer  <v-icon>delete</v-icon> </v-btn></v-col>
        </v-row>
      </v-container>
      <v-data-table :loading="loading" item-key="id" show-select dense v-model="selectedDemandes" :headers="headers" :items="demandes" class="elevation-3 mx-2 my-0 py-0" ></v-data-table>
      
    </div>
  </template>
  <script>
  export default{
    name : 'DemandeInscriptionView',
    data(){
      return{
        demandes : [] ,
        selectedDemandes : [],
        headers: [
          { text: 'Id', align: 'start', value: 'id',},
          { text: 'Nom', value: 'nom' },
          { text: 'Prenom', value: 'prenom' },
          { text: 'Sexe', value: 'sexe' },
          { text: 'Email', value: 'email' },
          { text: 'Mot de passe', value: 'motDePass' },
          { text: 'Numero de Telephone', value: 'numeroTelephone' },
        ],
        loading : false ,
      }
    },
    created(){
      this.obtenirDemandes();
    },
    methods:{

      async obtenirDemandes (){
        try{
          this.enableGlobalLoadingComponent();
          this.loading = true ;
          const response = await this.$axios.get('/demande/inscription' )  
          this.demandes = response?.data?.demandes  
          this.loading = false ;
          this.disableGlobalLoadingComponent();
        }
        catch(error){
          this.disableGlobalLoadingComponent();
          console.error( error) ;
          this.loading = false ;
        }
      },


      async validerDemandes (){
        try{
          this.enableGlobalLoadingComponent();
          const response = await this.$axios.post('/demande/inscription/validate' , this.selectedDemandes )  
          this.demandes = response?.data?.demandes
          this.obtenirDemandes();  
        }
        catch(error){
          console.error( error) ;
        }
      },

      async supprimerDemandes (){
        try{
          this.enableGlobalLoadingComponent();
          const response = await this.$axios.post('/demande/inscription/delete' , this.selectedDemandes )  
          this.demandes = response?.data?.demandes
          this.obtenirDemandes(); 
          this.disableGlobalLoadingComponent(); 
        }
        catch(error){
          this.disableGlobalLoadingComponent();
          console.error( error) ;
        }
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
  