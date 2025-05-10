<template>

    <!-- <template> -->
      <v-card  class="mx-auto pb-0 pt-1 px-0"  max-width="380" >
    
        <v-img height="250" width="390" :src="require('@/assets/GestionCentresDeFormation/centreDeFormation.png')" ></v-img>
        <!-- :src="require('@/assets/GestionUtilisateures/userMasculin.png')" -->
        <v-card-title class="my-0 py-0" >{{centreInfo?.nom}}</v-card-title>
        <v-card-text class="my-0 py-0">
          <div> Adresse : {{centreInfo?.adresse}}</div>
        </v-card-text>
         <v-card-text class="my-0 py-0">
          <div >
              Créé le : {{centreInfo?.createdAt}} 
          </div>
          <div >
              Dernière modification effectuée le : {{centreInfo?.updatedAt ?? '-'}}
          </div>
        </v-card-text>
    
        <v-divider class="mx-4 my-0 py-0"></v-divider>

        
        <v-card-actions>
          <v-row>


            <v-col cols="4" >
              <v-tooltip color="primary" bottom open-delay="200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"  class="mx-2" fab dark small color="primary"  >
                      <v-icon dark>delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Supprimer ce centre de formation.</span>
              </v-tooltip>
            </v-col>

            <v-col cols="4" >
              <v-tooltip color="primary" bottom open-delay="200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"  class="mx-2" fab dark small color="primary"  >
                      <v-icon dark>edit</v-icon>
                    </v-btn>
                  </template>
                  <span>Modifier ce centre de formation.</span>
              </v-tooltip>
            </v-col>

            <v-col cols="4" >
              <v-tooltip color="primary" bottom open-delay="200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click="demarerCentre()" class="mx-2" fab dark small color="primary"  >
                      <v-icon dark>slideshow</v-icon>
                    </v-btn>
                  </template>
                  <span>Commencer la gestion de ce centre de formation.</span>
              </v-tooltip>
            </v-col>
            



          </v-row>
        </v-card-actions>


      </v-card>
  </template>
  
  <script>
  export default {
    name: 'CardUser',
    props: {
        centreInfo :  {
                        default: {},
                        Required : true ,
                      },
    },
    methods : {
      demarerCentre(){


        this.$store.dispatch('clearCentreDeFormation');
        this.$store.dispatch("saveCentreDeFormation" , JSON.stringify(this.centreInfo) );
        console.log('current centre de formation : ' + this.$store.getters.getCentreDeFormation );

        this.$router.push('/formations');

      },
    }
  }
  </script>

  <style scoped >
  </style>
  