<template>

     <v-dialog v-model="isDialogOpen" transition="dialog-top-transition" max-width="1100" >
            <v-card>
                <v-toolbar  dense dark color="primary">
                        <v-toolbar-title>Les détails du formateur</v-toolbar-title>
                        <v-spacer/>
                        <v-btn icon dark @click="closeDialog()"><v-icon>close</v-icon></v-btn>
                </v-toolbar>
                <v-card-text class="py-6">
                    
                    <v-row v-for="(value, key) in formateurInfo" :key="key">
                      <v-col cols="2">
                        <span class="textInfo">{{getFieldLabel(key)}}</span>
                      </v-col>
                      <v-col cols="1">
                        <span class="deuxPoints">:</span>
                      </v-col>
                      <v-col cols="9">

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
    name : 'detailFormateur',
    data(){
        return{
            isDialogOpen : false ,
            formateurInfo : {},
        }
    },
    methods : {
        
        openDialog(formateurInfoParametre){
            // Exclure l'id et ne garder que les champs à afficher
            const { id, ...filtered } = formateurInfoParametre
            console.log(id)
            this.formateurInfo = {}  ;
            this.formateurInfo = {...filtered}
            this.isDialogOpen = true ;
        },
        closeDialog(){
            this.isDialogOpen = false ;
        },


        getFieldLabel(key) {
          const labels = {
            nom: 'Nom',
            prenom: 'Prénom',
            sexe: 'Sexe',
            adresse: 'Adresse',
            email: 'Email',
            numeroTelephone: 'Numéro de Téléphone',
            createdAt: 'Créé le',
            updatedAt: 'Modifié le'
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