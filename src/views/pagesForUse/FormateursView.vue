<template>
    <div>
      <v-container  class="py-0 ma-0"  color="">
        <v-row   class="px-0 mx-0 py-0 my-0">
          <v-col cols="10" md="8"    class="mx-0 px-0" >
              <v-alert  class=" py-1 my-0 mx-0 px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Veuillez valider ou supprimer les formateurs selon votre besoin. </v-alert>
          </v-col>
          <v-col cols="2" md="1"   class="ml-13 pl-12" > 
            <AddButton @userClick="ajouterFormateur()" :textButton="'Ajouter formateur'" :icon="'data_saver_on'" />
            <FormateurForm ref="ajoutForm" :centreId="getCurrentCentre?.id" @mustToLoadData="obtenirFormateures()"></FormateurForm>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :loading="loading"  dense  :headers="headers" :items="formateurs" class="elevation-3 mx-2 my-0 py-0" >
     
     
        <template v-slot:[`item.nom`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.nom.length > 10" v-bind="attrs" v-on="on" >{{item?.nom.substring(0, 10) }} ...</span>
                <span v-else >{{item?.nom }}</span> 
            </template>
              <span>{{item?.nom }}</span>
            </v-tooltip>
        </template>


        <template v-slot:[`item.prenom`]="{ item }" >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="item?.prenom.length > 10" v-bind="attrs" v-on="on" >{{item?.prenom.substring(0, 10) }} ...</span>
                <span v-else >{{item?.prenom }}</span> 
            </template>
              <span>{{item?.prenom }}</span>
            </v-tooltip>
        </template>
     
        <template  v-slot:[`item.operations`]="{ item }"  >

            <!-- la partie de modification -->
              <UpdateOperation @userClick="modifierFormateur(item)" />
              <FormateurForm ref="modificationForm" :isForEdit="true" @mustToLoadData="obtenirFormateures()" />
            <!--  -->
            <!-- la partie de suppresion -->
              <DeleteOperation @userClick="supprimerFormateur(item)" />
            <!--  -->

            <!-- cette partie pour gerer les formations de formateur -->
              <AddOperation :spanText="'Ajouter formation'"  @userClick="AjouterFormation(item)" />
              <AjouterFormatiomForm ref="formationsForm" :centreId="getCurrentCentre?.id" />
            <!--  -->

            <!-- cette partier permet d'afficher les details d'un formateur -->
              <ShowMoreOperation @userClick="afficherFormateur(item)" />
              <detailFormateur ref="detailFormateurDialog"  />
            <!--  -->
        </template>
      </v-data-table>

      <!-- Ce dialogue sert uniquement à confirmer la suppression d’un formateur. -->
      <ConfirmationDialog ref="dialogSuppression" @confirmed="confirmSuppression()" :textConfirmation="textSupression" :textButtonConfirmation="'Supprimer'"  ></ConfirmationDialog>  
       
      
    </div>
  </template>
  <script>
  import FormateurForm from '@/components/componentsForUser/Formateurs/FormateurForm.vue'
  import AjouterFormatiomForm from '@/components/componentsForUser/Formateurs/AjouterFormatiomForm.vue'
  import detailFormateur from '@/components/componentsForUser/Formateurs/detailFormateur.vue'
  export default{
    name : 'FormateursView',
    components:{FormateurForm , AjouterFormatiomForm , detailFormateur},
    data(){
      return{
        formateurs : [] ,
        headers: [
          { text: 'Nom', value: 'nom' , align: 'center', },
          { text: 'Prenom', value: 'prenom' , align: 'center', },
          { text: 'Sexe', value: 'sexe' , align: 'center', },
          { text: 'Adresse', value: 'adresse' , align: 'center', },
          { text: 'Email', value: 'email' , align: 'center',},
          { text: 'Numero de Telephone', value: 'numeroTelephone' , align: 'center', divider: true, },
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
      afficherFormateur(formateur){
        this.$refs.detailFormateurDialog.openDialog(formateur);
      },
      AjouterFormation(item){
        this.$refs.formationsForm.formateurId = item?.id ;
        this.$refs.formationsForm.openDialog();

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
  