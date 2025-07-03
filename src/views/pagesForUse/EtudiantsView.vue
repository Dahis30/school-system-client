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
        <template v-slot:[`item.nomComplet`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.nomComplet.length > 28" v-bind="attrs" v-on="on" >{{item?.nomComplet.substring(0, 28) }} ...</span>
                <span v-else >{{item?.nomComplet }}</span> 
            </template>
              <span>{{item?.nomComplet }}</span>
            </v-tooltip>
        </template>
        <template v-slot:[`item.nomTuteur`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.nomTuteur.length > 28" v-bind="attrs" v-on="on" >{{item?.nomTuteur.substring(0, 28) }} ...</span>
                <span v-else >{{item?.nomTuteur }}</span> 
            </template>
              <span>{{item?.nomTuteur }}</span>
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

            <!-- cette partier permet d'afficher les details d'un formateur -->
              <ShowMoreOperation @userClick="afficherEtudiant(item)" />
              <detailEtudiant ref="detailEtudiantDialog"  />
            <!--  -->
        </template>
      </v-data-table>

      <!-- Ce dialogue sert uniquement à confirmer la suppression d’un etudiant. -->
      <ConfirmationDialog ref="dialogSuppression" @confirmed="confirmSuppression()" :textConfirmation="textSupression" :textButtonConfirmation="'Supprimer'"  ></ConfirmationDialog>  
       
      
    </div>
  </template>
  <script>
  import EtudiantForm from '@/components/componentsForUser/Etudiants/EtudiantForm.vue'
  import detailEtudiant from '@/components/componentsForUser/Etudiants/detailEtudiant.vue'
  export default{
    name : 'EtudiantsView',
    components:{EtudiantForm , detailEtudiant},
    data(){
      return{
        etudiants : [] ,
        headers: [
          { text: 'Nom complet' , value: 'nomComplet' ,  width: '25%' , align: 'center', },
          { text: 'Telephone' , value: 'numeroTelephone' ,  width: '8%' , align: 'center', },
          { text: 'Nom du tuteur' , value: 'nomTuteur' , width: '25%' , align: 'center'},
          { text: 'Telephone du tuteur' , value: 'numeroTelephoneTuteur' , width: '7%' , align: 'center', divider: true,},
          { text: 'Opérations' , value: 'operations' , width: '35%', align: 'center',},
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
      afficherEtudiant(formateur){
        this.$refs.detailEtudiantDialog.openDialog(formateur);
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
  