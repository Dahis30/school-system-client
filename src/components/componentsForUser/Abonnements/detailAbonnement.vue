<template>

     <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="1300" >
            <v-card>
                <v-toolbar  dense dark color="primary">
                        <v-toolbar-title>Les détails d'abonnement</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
                </v-toolbar>
                <v-card-text class="py-6">

                    <v-row>
                        <v-col cols="6" >

                            <table class="table styled-table">  
                                <thead>
                                    <tr class="top-header">
                                        <td colspan="2" rowspan="2">L'aonnement est : {{abonnementInfo?.Statut}} </td>
                                    </tr>
                                </thead>
                                <tbody>
        
                                    <tr >
                                        <td >Etudiant</td>
                                        <td >{{abonnementInfo?.Etudiant?.nomComplet}}</td>
                                    </tr>
                                          
                                    <tr >
                                        <td >Formateur</td>
                                        <td >
                                            <v-tooltip bottom>
                                              <template v-slot:activator="{ on, attrs }">
                                                <span v-if="abonnementInfo?.Formateur?.nom.length > 15" v-bind="attrs" v-on="on" >{{abonnementInfo?.Formateur?.nom.substring(0, 15) }} ...</span>
                                                <span v-else >{{abonnementInfo?.Formateur?.nom }}</span> 
                                            </template>
                                              <span>{{abonnementInfo?.Formateur?.nom }}</span>
                                            </v-tooltip>

                                            -

                                            <v-tooltip bottom>
                                              <template v-slot:activator="{ on, attrs }">
                                                <span v-if="abonnementInfo?.Formateur?.prenom.length > 15" v-bind="attrs" v-on="on" >{{abonnementInfo?.Formateur?.prenom.substring(0, 15) }} ...</span>
                                                <span v-else >{{abonnementInfo?.Formateur?.prenom }}</span> 
                                            </template>
                                              <span>{{abonnementInfo?.Formateur?.prenom }}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>      
                                    
                                    <tr >
                                        <td >Formation</td>
                                        <td >
                                            <v-tooltip bottom>
                                              <template v-slot:activator="{ on, attrs }">
                                                <span v-if="abonnementInfo?.Formation?.titre.length > 25" v-bind="attrs" v-on="on" >{{abonnementInfo?.Formation?.titre.substring(0, 25) }} ...</span>
                                                <span v-else >{{abonnementInfo?.Formation?.titre }}</span> 
                                            </template>
                                              <span>{{abonnementInfo?.Formation?.titre }}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                    
                                    <tr >
                                        <td >DateDebut</td>
                                        <td >{{abonnementInfo?.DateDebut}}</td>
                                    </tr> 

                                    <tr >
                                        <td >DateFin</td>
                                        <td >{{abonnementInfo?.DateFin}}</td>
                                    </tr>
                                                                        
                                    <tr >
                                        <td >Montant d'abonnement</td>
                                        <td >{{abonnementInfo?.MontantAbonnement}}</td>
                                    </tr>
                                                                        
                                    <tr >
                                        <td >Montant du formateur</td>
                                        <td >{{abonnementInfo?.MontantFormateur}}</td>
                                    </tr>

                                                                        
                                    <tr >
                                        <td >Commentaire</td>
                                        <td >
                                            <v-tooltip bottom>
                                              <template v-slot:activator="{ on, attrs }">
                                                <span v-if="abonnementInfo?.Commentaire.length > 25" v-bind="attrs" v-on="on" >{{abonnementInfo?.Commentaire.substring(0, 25) }} ...</span>
                                                <span v-else >{{abonnementInfo?.Commentaire }}</span> 
                                            </template>
                                              <span>{{abonnementInfo?.Commentaire }}</span>
                                            </v-tooltip>
                                        </td>
                                    </tr>
                                                                        
                                    <tr >
                                        <td >Statut</td>
                                        <td >{{abonnementInfo?.Statut}}</td>
                                    </tr>
                                                                        
                                    <tr >
                                        <td >créé le</td>
                                        <td >{{abonnementInfo?.createdAt}}</td>
                                    </tr>
                                                                        
                                    <tr >
                                        <td >modifier le</td>
                                        <td >{{abonnementInfo?.updatedAt}}</td>
                                    </tr>

        
                                </tbody>
        
                            </table>

                        </v-col>
                        <v-col cols="6">
                            le tabeleau des reglements ici ...
                        </v-col>
                    </v-row>


                </v-card-text>
            </v-card>
      </v-dialog>


</template>
<script>
export default {
    name : 'detailEtudiant',
    data(){
        return{
            isDialogOpen : false ,
            abonnementInfo : {},
        }
    },
    methods : {
        
        openDialog(abonnement){
            this.abonnementInfo = {...abonnement}
            this.isDialogOpen = true ;
        },
        closeDialog(){
            this.isDialogOpen = false ;
        },


        getFieldLabel(key) {
          const labels = {
            nomComplet: 'Nom complet',
            numeroTelephone: 'Numéro de téléphone',
            nomTuteur: 'Nom du tuteur',
            adresse: 'Adresse',
            numeroTelephoneTuteur: 'Numéro de téléphone du tuteur',
            niveauScolaire: 'Niveau scolaire',
            groupe: 'Groupe',
            createdAt: 'Créé le',
            updatedAt: 'Modifié le',
          }
          return labels[key] || key
        },


        formatValue(key, value) {
          if (value === null || value === undefined) return '-'  
          // Formatage spécifique pour les dates
          if (key === 'createdAt' || key === 'updatedAt') {
            return new Date(value).toLocaleDateString('fr-FR')
          }
          return value
        }
    },
}

</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid  var(--v-primary-base);
}
th,
td {
  width: max-content;
  border: 1px solid  var(--v-primary-base);
}
td {
  text-align: center;
  font-size: 15px;
  color : var(--v-textColor-base) ;
}
.top-header{
    background-color: var(--v-primary-base);
}
</style>