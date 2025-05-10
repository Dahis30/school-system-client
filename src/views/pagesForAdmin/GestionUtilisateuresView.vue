<template>
    <div >
      <v-container fluid>

       <template v-for="(item, rowIndex) in users">
        
            <v-row class="" :key="rowIndex" >
              
              <v-col cols="2"  > 
                <CardUser v-if="item[0]"  :userInfo="item[0]"  />
              </v-col>
              <v-col cols="2"  > 
                <CardUser v-if="item[1]" :userInfo="item[1]"  />
              </v-col>
              <v-col  cols="2"  > 
                <CardUser v-if="item[2]" :userInfo="item[2]"  />
              </v-col>      
              <v-col cols="2"  > 
                <CardUser v-if="item[3]" :userInfo="item[3]"  />
              </v-col>
              <v-col cols="2"  > 
                <CardUser v-if="item[4]" :userInfo="item[4]"  />
              </v-col>
              <v-col cols="2"  > 
                <CardUser v-if="item[5]" :userInfo="item[5]"  />
              </v-col>


            </v-row> 
     
       </template>
      </v-container>
    </div>
  </template>
  <script>
  import CardUser from  '@/components/ComponentsForAdmin/GestionUtilisateures/CardUser.vue'
  export default{
    name : 'GestionUtilisateuresView',
    components : { CardUser},
    data(){
      return{
        users : [] ,
      }
    },
    created(){
      this.getUsers();
      
    },
    methods:{
      async getUsers(){
        try{
            this.enableGlobalLoadingComponent()
            const response = await this.$axios.get('/users-information' )  
            this.users = response?.data?.users  
            this.formatUsers();
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

      formatUsers (){
        var speceficUsers = [];
        var wantedUsersRow = [] ;
        var count = 0 ;
        var count2 = 0 ;
        let lenghtUsers = this.users.length;
        let breakLoop = false ;
        let idsProccessed = []

        this.users.forEach(
              (item) => {
    
                      if(!breakLoop){
                          count2++;
                          wantedUsersRow.push(item) ;
                          idsProccessed.push(item.id);
                          count ++

                                  if (count == 6 && !breakLoop){
                                    speceficUsers.push(wantedUsersRow) ;
                                    // console.log('wantedUsersRow : ' + wantedUsersRow)
                                    wantedUsersRow = [] ;
                  

                                            if( (lenghtUsers - count2) <= 6  ){
                                              // console.log( 'idsProccessed: ' + idsProccessed )
                                              let users = this.users.filter( (elt) => !idsProccessed.includes(elt.id) )
                                              // console.log( 'Le reste des users : ' + users)
                          
                                              users.forEach(
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

        this.users = speceficUsers ;



      }

    }
  }
  
  </script>
  