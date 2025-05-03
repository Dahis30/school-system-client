<template>

    <v-card outlined color="primary" class=" px-0 py-0" max-height="200" max-width="140"  >
        <v-img v-if="userInfo?.sexe== 'Homme'" style="background-color: var(--v-primary-base) ;" cover max-width="100%" max-height="100%"  class="my-0 mx-0 " :src="require('@/assets/GestionUtilisateures/userMasculin.png')"></v-img> 
        <v-img v-if="userInfo?.sexe== 'Femme'" style="background-color: var(--v-primary-base) ;" cover max-width="100%" max-height="100%"  class="my-0 mx-0 " :src="require('@/assets/GestionUtilisateures/userFeminin.png')"></v-img>

        <v-card-item>
            <div class="my-0 text-subtitle-1">
                
                

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="userInfo?.prenom.length > 6" v-bind="attrs" v-on="on" >{{userInfo?.prenom.substring(0, 5) }} ...</span>
                <span v-else >{{userInfo?.prenom }}</span> 
            </template>
              <span>{{userInfo?.prenom }}</span>
            </v-tooltip>

            -

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <span v-if="userInfo?.nom.length > 6" v-bind="attrs" v-on="on" >{{userInfo?.nom.substring(0, 4) }} ...</span>
                <span v-else >{{userInfo?.nom }}</span> 
            </template>
              <span>{{userInfo?.nom }}</span>
            </v-tooltip>

            
            
            </div>
        </v-card-item>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'CardUser',
    props: {
        userInfo :  {
                        default: {},
                    },
    }
  }
  </script>

  <style scoped >
  </style>
  