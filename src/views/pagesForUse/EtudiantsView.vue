<template>
    <div>
      <v-container  class="py-0 ma-0"  color="">
        <v-row   class="px-0 mx-0 py-0 my-0">
          <v-col cols="10" md="8"    class="mx-0 px-0" >
              <v-alert  class=" py-1 my-0 mx-0 px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Veuillez valider ou supprimer les etudiants selon votre besoin. </v-alert>
          </v-col>
          <v-col cols="2" md="1"   class="ml-13 pl-12" > 
            <AddButton @userClick="ajouterFormation()" :textButton="'Ajouter etudiant'" :icon="'data_saver_on'" />
            <EtudiantForm ref="ajoutForm" :centreId="getCurrentCentre?.id" @mustToLoadData="obtenirFormations()"></EtudiantForm>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :loading="loading"  dense  :headers="headers" :items="etudiants" class="elevation-3 mx-2 my-0 py-0" >
        <template v-slot:[`item.titre`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.titre.length > 35" v-bind="attrs" v-on="on" >{{item?.titre.substring(0, 35) }} ...</span>
                <span v-else >{{item?.titre }}</span> 
            </template>
              <span>{{item?.titre }}</span>
            </v-tooltip>
        </template>
        <template v-slot:[`item.description`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.description.length > 50" v-bind="attrs" v-on="on" >{{item?.description.substring(0, 50) }} ...</span>
                <span v-else >{{item?.description }}</span> 
            </template>
              <span>{{item?.description }}</span>
            </v-tooltip>
        </template>
        <template  v-slot:[`item.operations`]="{ item }"  >

            <!-- la partie de modification -->
              <UpdateOperation @userClick="modifierFormation(item)" />
              <EtudiantForm ref="modificationForm" :isForEdit="true" @mustToLoadData="obtenirFormations()"></EtudiantForm>
            <!--  -->
            <!-- la partie de suppresion -->
              <DeleteOperation @userClick="supprimerFormation(item)" />
            <!--  -->
        </template>
      </v-data-table>

      <!-- Ce dialogue sert uniquement à confirmer la suppression d’un etudiant. -->
      <ConfirmationDialog ref="dialogSuppression" @confirmed="confirmSuppression()" :textConfirmation="textSupression" :textButtonConfirmation="'Supprimer'"  ></ConfirmationDialog>  
       
      
    </div>
  </template>
  <script>
  import EtudiantForm from '@/components/componentsForUser/Etudiants/EtudiantForm.vue'
  export default{
    name : 'EtudiantsView',
    components:{EtudiantForm},
    data(){
      return{
        etudiants : [] ,
        headers: [
          { text: 'nomComplet', value: 'nomComplet' , width: '15%' , align: 'center', },
          { text: 'numeroTelephone', value: 'numeroTelephone' , width: '10%' , align: 'center', },
          { text: 'nomTuteur', value: 'nomTuteur' , width: '15%' , align: 'center', },
          { text: 'numeroTelephoneTuteur', value: 'numeroTelephoneTuteur' , width: '10%' , align: 'center', },
          { text: 'niveauScolaire', value: 'niveauScolaire' , width: '10%' , align: 'center', },
          { text: 'groupe', value: 'groupe' , width: '10%' , align: 'center', },
          { text: 'adresse', value: 'adresse' , width: '15%' , align: 'center', },
        // { text: 'créé le', value: 'createdAt' , width: '10%' , align: 'center', },
        //  { text: 'modifier le', value: 'updatedAt' , width: '5%' , align: 'center',divider: true, },
          { text: 'Opérations' , value: 'operations' , width: '15%', align: 'center',},
        ],
        loading : false ,
        IdToDelete : null ,
        textSupression : 'Êtes-vous sûr de vouloir supprimer ce etudiant ?',
      }
    },
    created(){
      this.obtenirFormations();
    },
    computed:{
      getCurrentCentre(){
        let centreDeFormation = this.$store.getters.getCentreDeFormation ;
        centreDeFormation = JSON.parse(centreDeFormation)
        return centreDeFormation  ;
      }
    },
    methods:{

      async obtenirFormations (){
        try{
          this.enableGlobalLoadingComponent();
          this.loading = true ;
          const response = await this.$axios.get('/etudiants/' + this.getCurrentCentre?.id )  
          this.etudiants = response?.data?.etudiants  
          this.loading = false ;
          this.disableGlobalLoadingComponent();
        }
        catch(error){
          this.disableGlobalLoadingComponent();
          console.error( error) ;
          this.loading = false ;
        }
      },

      ajouterFormation(){
        this.$refs.ajoutForm.openDialog();
      },
      modifierFormation(item){
        this.$refs.modificationForm.EtudiantToEditInfo = {...item} ;
        this.$refs.modificationForm.openDialog();
      },
      supprimerFormation(item){
        this.IdToDelete = null ;
        this.IdToDelete = item.id ;
        this.$refs.dialogSuppression.openDialog();
      },
      async confirmSuppression(){
        const response = await this.$axios.delete('/etudiants/' + this.IdToDelete  )  
        console.log(response);
        await this.obtenirFormations();
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
  