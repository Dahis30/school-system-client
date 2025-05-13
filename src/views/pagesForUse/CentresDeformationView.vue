<template>
    <div >
        <v-container class=" py-0 my-0"  color="">
            <v-row  class="d-flex justify-center align-center pr-14 mr-14 py-2 my-0">
              <v-col cols="8"  class="pa-2 ma-0" >
                  <v-alert  class=" py-1 my-0  px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Vous pouvez gérer votre centre de formation ici. </v-alert>
              </v-col>
              <v-col  cols="2"   class="pa-2 ma-0" >
                <AddButton :textButton="textButtonAjout" :icon="'data_saver_on'" @userClick="AjouterCentreDeFormation()"></AddButton>
                <CentreDeFormationForm ref="formCreate" @confirmed="getCentresDeFormation()" ></CentreDeFormationForm>
              </v-col>
            </v-row>
        </v-container>

        <v-card class="card-style elevation-11 mx-5 my-0 rounded-xl" color="">
            
            <template v-for="(item, rowIndex) in centres">
        
                <v-row class="" :key="rowIndex" >
                  
                  <v-col cols="4"  > 
                    <CentresDeformationCard @loadData="getCentresDeFormation()" v-if="item[0]"  :centreInfo="item[0]"  />
                  </v-col>
                  <v-col cols="4"  > 
                    <CentresDeformationCard @loadData="getCentresDeFormation()" v-if="item[1]" :centreInfo="item[1]"  />
                  </v-col>
                  <v-col  cols="4"  > 
                    <CentresDeformationCard @loadData="getCentresDeFormation()" v-if="item[2]" :centreInfo="item[2]"  />
                  </v-col>   
                </v-row> 
     
            </template>

        </v-card>


    </div>
  </template>
  <script>
  import CentreDeFormationForm from '@/components/componentsForUser/CentresDeformation/CentreDeFormationForm.vue'
  import CentresDeformationCard from  '@/components/componentsForUser/CentresDeformation/CentresDeformationCard.vue'
  export default{
    name : 'CentresDeformationView',
    components : {CentresDeformationCard , CentreDeFormationForm} ,
    data (){
        return{
            textButtonAjout : 'Ajouter centre de formation' ,
            centres : [] ,
        }
    },
    created(){
        this.getCentresDeFormation();

    },

    methods: {
        AjouterCentreDeFormation (){
          this.$refs.formCreate.openDialog();
        },
        async getCentresDeFormation(){
            try{
                this.enableGlobalLoadingComponent()
                const response = await this.$axios.get('/centres-de-formation' )  
                this.centres = response?.data?.centresDeFormation  
                this.formatCentresJson();
                this.disableGlobalLoadingComponent()
            } 
            catch(error){
                this.disableGlobalLoadingComponent()
                console.error( error) ;
            }
          },

        enableGlobalLoadingComponent(){
          this.$store.dispatch('enableGlobalLoading');
        },
        disableGlobalLoadingComponent(){
            this.$store.dispatch('disableGlobalLoading');
        },






        formatCentresJson (){
            var speceficUsers = [];
            var wantedUsersRow = [] ;
            let lenghtUsers = this.centres.length;
         
    
            if (lenghtUsers < 3){
              this.centres.forEach( (item)=> wantedUsersRow.push(item) )
              speceficUsers.push(wantedUsersRow) ;
            }
            else {
                var count = 0 ;
                var count2 = 0 ;
                let breakLoop = false ;
                let idsProccessed = []
                this.centres.forEach(
                      (item) => {
                              if(!breakLoop){
                                  count2++;
                                  wantedUsersRow.push(item) ;
                                  idsProccessed.push(item.id);
                                  count ++
                                          if (count == 3 && !breakLoop){
                                            speceficUsers.push(wantedUsersRow) ;
                                            wantedUsersRow = [] ;
                                                    if( (lenghtUsers - count2) <= 3  ){
                                                      // console.log( 'idsProccessed: ' + idsProccessed )
                                                      let centres = this.centres.filter( (elt) => !idsProccessed.includes(elt.id) )
                                                      // console.log( 'Le reste des centres : ' + centres)
                                  
                                                      centres.forEach(
                                                      (element) =>  ( wantedUsersRow.push(element) )
                                                      )
                                                      speceficUsers.push(wantedUsersRow) ;
                                                      breakLoop = true ;
                                                    }
                                            count = 0
                              
                                          }
                  
                                }
                      }
                )
            }

            this.centres = speceficUsers ;

        }

    }


        
  
  }
  
  </script>
  