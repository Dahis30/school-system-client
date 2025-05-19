<template>
    <div>
      <v-container  class="py-0 ma-0"  color="">
        <v-row   class="px-0 mx-0 py-0 my-0">
          <v-col cols="10" md="8"    class="mx-0 px-0" >
              <v-alert  class=" py-1 my-0 mx-0 px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Veuillez valider ou supprimer les formateurs d'inscription selon la confirmation du client. </v-alert>
          </v-col>
          <v-col cols="2" md="1"   class="ml-13 pl-12" > 
            <AddButton @userClick="ajouterFormateur()" :textButton="'Ajouter un formateur'" :icon="'data_saver_on'" />
            <FormateurForm ref="ajoutForm" :centreId="getCurrentCentre?.id" @mustToLoadData="obtenirFormateures()"></FormateurForm>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :loading="loading"  dense  :headers="headers" :items="formateurs" class="elevation-3 mx-2 my-0 py-0" >
        <template  v-slot:[`item.operations`]="{ item }"  >

            <!-- la partie de modification -->
              <UpdateOperation @userClick="modifierFormateur(item)" />
              <FormateurForm ref="modificationForm" :isForEdit="true" @mustToLoadData="obtenirFormateures()"></FormateurForm>
            <!--  -->
            <!-- la partie de suppresion -->
              <DeleteOperation @userClick="supprimerFormateur(item)" />
            <!--  -->
        </template>
      </v-data-table>

      <!-- Ce dialogue sert uniquement à confirmer la suppression d’un formateur. -->
      <ConfirmationDialog ref="dialogSuppression" @confirmed="confirmSuppression()" :textConfirmation="textSupression" :textButtonConfirmation="'Supprimer'"  ></ConfirmationDialog>  
       
      
    </div>
  </template>
  <script>
  import FormateurForm from '@/components/componentsForUser/Formateurs/FormateurForm.vue'
  export default{
    name : 'FormateursView',
    components:{FormateurForm},
    data(){
      return{
        formateurs : [] ,
        headers: [
          { text: 'Id', align: 'start', value: 'id',},
          { text: 'Nom', value: 'nom' , align: 'center', },
          { text: 'Prenom', value: 'prenom' , align: 'center', },
          { text: 'Sexe', value: 'sexe' , align: 'center', },
          { text: 'Adresse', value: 'adresse' , align: 'center', },
          { text: 'Email', value: 'email' , align: 'center',},
          { text: 'Numero de Telephone', value: 'numeroTelephone' , align: 'center', },
          { text: 'créé le', value: 'createdAt' , align: 'center', },
          { text: 'modifier le', value: 'updatedAt' , align: 'center', },
          { text: 'Opérations' , value: 'operations' , align: 'center',},
        ],
        loading : false ,
        IdToDelete : null ,
        textSupression : 'Êtes-vous sûr de vouloir supprimer ce formateur ?',
      }
    },
    created(){
      this.obtenirFormateures();
    },
    computed:{
      getCurrentCentre(){
        let centreDeFormation = this.$store.getters.getCentreDeFormation ;
        centreDeFormation = JSON.parse(centreDeFormation)
        return centreDeFormation  ;
      }
    },
    methods:{

      async obtenirFormateures (){
        try{
          this.enableGlobalLoadingComponent();
          this.loading = true ;
          const response = await this.$axios.get('/formateurs/' + this.getCurrentCentre.id )  
          this.formateurs = response?.data?.formateurs  
          this.loading = false ;
          this.disableGlobalLoadingComponent();
        }
        catch(error){
          this.disableGlobalLoadingComponent();
          console.error( error) ;
          this.loading = false ;
        }
      },

      ajouterFormateur(){
        this.$refs.ajoutForm.openDialog();
      },
      modifierFormateur(item){
        this.$refs.modificationForm.formateurToEditInfo = {...item} ;
        this.$refs.modificationForm.openDialog();
      },
      supprimerFormateur(item){
        this.IdToDelete = null ;
        this.IdToDelete = item.id ;
        this.$refs.dialogSuppression.openDialog();
      },
      async confirmSuppression(){
        const response = await this.$axios.delete('/formateurs/' + this.IdToDelete  )  
        console.log(response);
        await this.obtenirFormateures();
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
  