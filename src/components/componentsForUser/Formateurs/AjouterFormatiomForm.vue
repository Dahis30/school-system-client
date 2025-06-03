
<template>



       <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="1000" >
            <v-card>
                <v-toolbar  dense dark color="primary">
                        <v-spacer/>
                        <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
                </v-toolbar>

                <PrivateLoading :isLoading="LoadingComponent" />

               
                    <v-card-text>
                        <v-form ref="Form" @submit.prevent="handleSubmit()" class="mx-3 px-4 mt-0 pt-0">

                            <v-container >
                                <v-row justify="center" align="center">
                                    <v-col  class="py-0 px-1 ma-0" cols="4">
                                        <v-autocomplete :rules="obligationRules" outlined shaped dense v-model="formationForm.formationObject" return-object 
                                        :items="formationsDisponibles" label="Formation *"  placeholder="Formation" item-text="titre"  item-value="id" style="font-size:16px" >
                                            <template slot="selection" slot-scope="{ item }"> {{ item.titre }} </template> 
                                            <template slot="item" slot-scope="{ item }">{{ item.titre }} </template>  
                                        </v-autocomplete>
                                    </v-col>

                                    <v-col class="py-0 px-1 ma-0" cols="4">
                                        <v-autocomplete :rules="obligationRules" outlined shaped dense v-model="formationForm.typeDePaiement" return-object 
                                        :items="typesDePaiements" label="Type de paiement *"  placeholder="Type de paiement" item-text="titre"  item-value="id" style="font-size:16px" >
                                        </v-autocomplete>
                                    </v-col> 

                                    <v-col v-if="formationForm.typeDePaiement == 'montant fixe'"  class="py-0 px-1 ma-0" cols="3">
                                         <v-text-field type="number" :rules="obligationRules" v-model="formationForm.montant" label="Montant fixe" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                    </v-col> 

                                     <v-col v-if="formationForm.typeDePaiement == 'pourcentage'" class="py-0 px-1 ma-0" cols="3">
                                         <v-text-field type="number" :rules="pourcentageRules" v-model="formationForm.pourcentage" label="pourcentage" outlined dense shaped color="subPrimary" bg-color="subPrimary" ></v-text-field>
                                    </v-col> 

                                    <v-col  class="py-0 px-1 mx-0 mt-0 mb-7" cols="1">
                                        <AddOperation v-if="!LoadingComponent" :spanText="'Ajouter formation'"  @userClick="associerFormationAuFormateur()" />
                                    </v-col> 
                                </v-row>
                            </v-container>

                        </v-form>
                        
                        <v-data-table :headers="headers" :items="formationsDeFormateur" class="elevation-3 mx-2 my-0 py-0" dense>

                            <template v-slot:[`item.Formation.titre`]="{ item }" >
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <span v-if="item?.Formation.titre.length > 20" v-bind="attrs" v-on="on" >{{item?.Formation.titre.substring(0, 20) }} ...</span>
                                    <span v-else >{{item?.Formation.titre }}</span> 
                                </template>
                                  <span>{{item?.Formation.titre }}</span>
                                </v-tooltip>
                            </template>

                            <template v-slot:[`item.Formation.description`]="{ item }" >
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <span v-if="item?.Formation.description.length > 30" v-bind="attrs" v-on="on" >{{item?.Formation.description.substring(0, 30) }} ...</span>
                                    <span v-else >{{item?.Formation.description }}</span> 
                                </template>
                                  <span>{{item?.Formation.description }}</span>
                                </v-tooltip>
                            </template>



                            <template  v-slot:[`item.operations`]="{ item }"  >
                                <!-- la partie de suppresion -->
                                  <DeleteOperation @userClick="supprimerFormationAuFormateur(item)" />
                                <!--  -->

                            </template>

                        </v-data-table>


                        <!-- Ce dialogue sert uniquement à confirmer la suppression d’une formation au formateur. -->
                        <ConfirmationDialog ref="dialogSuppression" @confirmed="confirmSuppression()" :textConfirmation="textSupression" :textButtonConfirmation="'Supprimer'"  ></ConfirmationDialog>  
    

                    </v-card-text>
                
            </v-card>
      </v-dialog>

</template>
<script>
  import obligationRules from '@/constants/vuetifyRules/obligationRules'
  import pourcentageRules from '@/constants/vuetifyRules/pourcentageRules'
  export default{
    name : 'AjouterFormatiomForm',  
    props : {
        centreId : {
            default : null ,
            Required : true ,
        },
        isForEdit :{
            default : false ,
            Required : false ,
        }
    },
    data (){
        return {
            isDialogOpen : false ,
            formateurId : '' ,
            formationsDeFormateur : [] ,
            formationsDisponibles : [] ,
            formationForm : {
                formationObject: {},
                typeDePaiement : null ,
                montant : null ,
                pourcentage : null ,
            },

            defaultFormationForm : {
                formationObject: {},
                typeDePaiement : null ,
                montant : null ,
                pourcentage : null ,
            },

            typesDePaiements : ["pourcentage" , "montant fixe"] ,

            headers: [
              { text: 'Titre', value: 'Formation.titre',  align: 'center',  width: '30%'},
              { text: 'Description', value: 'Formation.description' , align: 'center',width: '40%' },
              { text: 'Type de paiement', value: 'TypeDePaiement' , align: 'center',width: '7%' },
              { text: 'montant fixe', value: 'montant' , align: 'center',width: '10%' },
              { text: 'Pourcentage', value: 'pourcentage' , align: 'center',  divider: true, width: '10%' },
              { text: 'Opérations' , value: 'operations' , align: 'center', width: '3%'},
            ],
            LoadingComponent : true ,
            IdFormationToDelete : null ,
            textSupression : 'Êtes-vous sûr de vouloir supprimer cette formation a ce formateur ?',

        }
    },
    computed : {
        obligationRules(){ return obligationRules  } ,
        pourcentageRules(){ return pourcentageRules  } ,
    },
    
    methods: {
        openDialog(){
            this.clearData();
            this.getFormations();
            this.isDialogOpen = true ;
        },
        closeDialog(){
            this.isDialogOpen = false ;
        },
        clearData (){
            this.formationForm  = { ...this.defaultFormationForm} ;
            this.formationsDeFormateur = [] ;
            this.formationsDisponibles = [] ;
        },
        async getFormations(){
            try{
                this.LoadingComponent = true ;
             
                this.clearData();
                let url ;
                let response ;
                url = '/formateur/' + this.formateurId + "/getCurrentFormations" ;
                response = await this.$axios.get( url )
                this.formationsDeFormateur = response?.data?.formations ;
                
                url = '/formateur/' + this.formateurId + "/getFormationsDisponibles/" + this.centreId ;
                response = await this.$axios.get( url )
                this.formationsDisponibles = response?.data?.formations ;

                this.LoadingComponent = false ;
            }
            catch(error){
                this.LoadingComponent = false ;
            }

        },

        async associerFormationAuFormateur(){
            try{
                if(!this.$refs.Form.validate()) return ;
                this.LoadingComponent = true ;
                let url = '/formateur/' + this.formateurId + "/associerFormationAuFormateur" ;
                const response = await this.$axios.post( url , this.formationForm)
                console.log(response) ;
                this.formationForm = {...this.defaultFormationForm };
                console.log(" formation form : " +  JSON.stringify(this.formationForm) )
                console.log("button d'ajoutt")
                this.LoadingComponent = false ;

                this.getFormations() ;
            }
            catch(error){
                this.LoadingComponent = false ;
                console.error( error) ;
            }

        },

        
        supprimerFormationAuFormateur(item){
          this.IdFormationToDelete = null ;
          this.IdFormationToDelete = item.id ;
          this.$refs.dialogSuppression.openDialog();
        },

        async confirmSuppression(){
            const response = await this.$axios.delete("/formateur/" + this.IdFormationToDelete + "/retirerFormationAuFormateur"  )  
            console.log(response);
            await this.getFormations();
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
  