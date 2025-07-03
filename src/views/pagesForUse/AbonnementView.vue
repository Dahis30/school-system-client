<template>
    <div>
      <v-container  class="py-0 ma-0"  color="">
        <v-row   class="px-0 mx-0 py-0 my-0">
          <v-col cols="10" md="8"    class="mx-0 px-0" >
              <v-alert  class=" py-1 my-0 mx-0 px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Veuillez gérer vos abonnements selon vos besoins. </v-alert>
          </v-col>
          <v-col cols="2" md="1"   class="ml-13 pl-12" > 
            <AddButton @userClick="ajouterAbonnement()" :textButton="'Ajouter abonnement'" :icon="'data_saver_on'" />
            <AbonnementForm ref="abonnementDialog" :centreId="getCurrentCentre?.id" @mustToLoadData="obtenirAbonnements()"></AbonnementForm>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :loading="loading"  dense  :headers="headers" :items="abonnements" class="elevation-3 mx-2 my-0 py-0" >
       
        <template v-slot:[`item.Etudiant`]="{ item }" >

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.Etudiant?.nomComplet.length > 15" v-bind="attrs" v-on="on" >{{item?.Etudiant?.nomComplet.substring(0, 15) }} ...</span>
                <span v-else >{{item?.Etudiant?.nomComplet }}</span> 
            </template>
              <span>{{item?.Etudiant?.nomComplet }}</span>
            </v-tooltip>

        </template>
      
        <template v-slot:[`item.Formateur`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.Formateur?.nom.length > 11" v-bind="attrs" v-on="on" >{{item?.Formateur?.nom.substring(0, 11) }} ...</span>
                <span v-else >{{item?.Formateur?.nom }}</span> 
            </template>
              <span>{{item?.Formateur?.nom }}</span>
            </v-tooltip>

            -

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.Formateur?.prenom.length > 7" v-bind="attrs" v-on="on" >{{item?.Formateur?.prenom.substring(0, 7) }} ...</span>
                <span v-else >{{item?.Formateur?.prenom }}</span> 
            </template>
              <span>{{item?.Formateur?.prenom }}</span>
            </v-tooltip>



        </template>

        <template v-slot:[`item.Formation`]="{ item }" >

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.Formation?.titre.length > 19" v-bind="attrs" v-on="on" >{{item?.Formation?.titre.substring(0, 19) }} ...</span>
                <span v-else >{{item?.Formation?.titre }}</span> 
            </template>
              <span>{{item?.Formation?.titre }}</span>
            </v-tooltip>

        </template>

        <template  v-slot:[`item.operations`]="{ item }"  >

            <!-- la partie de modification -->
              <UpdateOperation @userClick="modifierAbonnement(item)" />
            <!--  -->
            <!-- la partie de suppresion -->
              <DeleteOperation @userClick="supprimerAbonnement(item)" />
            <!--  -->

            <!-- cette partier permet d'afficher les details d'un abonnement -->
              <ShowMoreOperation @userClick="afficherAbonnement(item)" />
              <detailAbonnement ref="detailAbonnementDialog"  />
            <!--  -->
        </template>
      </v-data-table>

      <!-- Ce dialogue sert uniquement à confirmer la suppression d’un abonnement. -->
      <ConfirmationDialog ref="dialogSuppression" @confirmed="confirmSuppression()" :textConfirmation="textSupression" :textButtonConfirmation="'Supprimer'"  ></ConfirmationDialog>  
       
      
    </div>
  </template>
  <script>
  import AbonnementForm from '@/components/componentsForUser/Abonnements/AbonnementForm.vue'
  import detailAbonnement from '@/components/componentsForUser/Abonnements/detailAbonnement.vue'
  export default{
    name : 'AbonnementView',
    components:{AbonnementForm , detailAbonnement},
    data(){
      return{
        abonnements : [] ,
        headers: [
          { text: 'Etudiant' , value: 'Etudiant' ,  width: '15%' , align: 'center', },
          { text: 'Formateur' , value: 'Formateur' ,  width: '20%' , align: 'center', },
          { text: 'Formation' , value: 'Formation' , width: '18%' , align: 'center'},
          { text: 'Date debut' , value: 'DateDebut' , width: '10%' , align: 'center'},
          { text: 'Date fin' , value: 'DateFin' , width: '10%' , align: 'center', },
          { text: 'Montant' , value: 'MontantAbonnement' , width: '9%' , align: 'center', divider: true,},
          { text: 'Opérations' , value: 'operations' , width: '20%', align: 'center',},
        ],
        loading : false ,
        IdToDelete : null ,
        textSupression : 'Êtes-vous sûr de vouloir supprimer ce abonnement ?',
      }
    },
    created(){
      this.obtenirAbonnements();
    },
    computed:{
      getCurrentCentre(){
        let centreDeFormation = this.$store.getters.getCentreDeFormation ;
        centreDeFormation = JSON.parse(centreDeFormation)
        return centreDeFormation  ;
      }
    },
    methods:{

      async obtenirAbonnements (){
        try{
          this.enableGlobalLoadingComponent();
          this.loading = true ;
          const response = await this.$axios.get('/abonnements/' + this.getCurrentCentre?.id )  
          this.abonnements = response?.data?.abonnements  
          this.loading = false ;
          this.disableGlobalLoadingComponent();
        }
        catch(error){
          this.disableGlobalLoadingComponent();
          console.error( error) ;
          this.loading = false ;
        }
      },

      ajouterAbonnement(){
        this.$refs.abonnementDialog.isForEdit = false ;
        this.$refs.abonnementDialog.openDialog();
      },
      modifierAbonnement(item){
        this.$refs.abonnementDialog.isForEdit = true ;
        this.$refs.abonnementDialog.EtudiantToEditInfo = {...item} ;
        this.$refs.abonnementDialog.openDialog();
      },
      supprimerAbonnement(item){
        this.IdToDelete = null ;
        this.IdToDelete = item.id ;
        this.$refs.dialogSuppression.openDialog();
      },
      async confirmSuppression(){
        const response = await this.$axios.delete('/abonnements/' + this.IdToDelete  )  
        console.log(response);
        await this.obtenirAbonnements();
      },
      afficherAbonnement(abonnement){
        this.$refs.detailAbonnementDialog.openDialog(abonnement);
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
  