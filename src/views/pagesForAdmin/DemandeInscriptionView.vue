<template>
    <div>
      <v-container class=" py-0 my-0"  color="">
        <v-row  class="px-0 mx-0 py-0 my-0">
          <v-col cols="12" md="9" class="mx-0 px-0" >
              <v-alert  class=" py-1 my-0 mx-0 px-0" style="color :black" shaped dense dark color="#E7BC91" >Veuillez valider ou supprimer les demandes d'inscription selon la confirmation du client. </v-alert>
          </v-col>
          <v-col cols="12" md="1" class="mx-3" > <v-btn @click="validerDemandes()" color="#E7BC91" small rounded > valider  <v-icon>verified</v-icon> </v-btn></v-col>
          <v-col cols="12" md="1" class="mx-3" > <v-btn @click="supprimerDemandes()" color="#E7BC91" small rounded > supprimer  <v-icon>delete</v-icon> </v-btn></v-col>
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
          { text: 'ID', align: 'start',
            // sortable: false,
            value: 'id',
          },
          { text: 'NOM', value: 'nom' },
          { text: 'prenom', value: 'prenom' },
          { text: 'email', value: 'email' },
          { text: 'mot De Passe', value: 'motDePass' },
          { text: 'numero de Telephone', value: 'numeroTelephone' },
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
          this.loading = true ;
          const response = await this.$axios.get('/demande/inscription' )  
          this.demandes = response?.data?.demandes  
          this.loading = false ;
        }
        catch(error){
          console.error( error) ;
          this.loading = false ;
        }
      },


      async validerDemandes (){
        try{
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
          const response = await this.$axios.post('/demande/inscription/delete' , this.selectedDemandes )  
          this.demandes = response?.data?.demandes
          this.obtenirDemandes();  
        }
        catch(error){
          console.error( error) ;
        }
      },

    }
  
  }
  
  </script>
  