<template>

     <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="1100" >
            <v-card>
                <v-toolbar  dense dark color="primary">
                        <v-toolbar-title>Les détails d'etudiant</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
                </v-toolbar>
                <v-card-text class="py-6">
                    
                    <v-row v-for="(value, key) in etudiantInfo" :key="key">
                      <v-col cols="3">
                        <span class="textInfo">{{getFieldLabel(key)}}</span>
                      </v-col>
                      <v-col cols="1">
                        <span class="deuxPoints">:</span>
                      </v-col>
                      <v-col cols="8">

                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <span class="textInfo" v-if="value.length > 70" v-bind="attrs" v-on="on" > {{value.substring(0, 70) }} ...</span>
                                <span class="textInfo" v-else > {{formatValue(key , value) }} </span> 
                            </template>
                              <span class="textInfo" > {{ formatValue(key , value) }} </span>
                            </v-tooltip>

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
            etudiantInfo : {},
        }
    },
    methods : {
        
        openDialog(etudiantInfoParametre){
            // Exclure l'id et ne garder que les champs à afficher
            const { id, ...filtered } = etudiantInfoParametre
            console.log(id)
            this.etudiantInfo = {}  ;
            this.etudiantInfo = {...filtered}
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

<style scoped >

.textInfo{
    font-weight: bold ;
    text-align: right ;
}
.deuxPoints{
    font-weight: bold ;
}
</style>