<template>
    <!-- <div> -->
        <v-app  >


            <v-card class="mx-1 my-1 pb-1 pt-0 rounded-xl" >
                <v-row>
                  <v-col class="" cols="3"> 
                    <v-btn x-small  color="#D4A276" rounded @click="mini = !mini" v-if="!mini"> Cacher les menus </v-btn> 
                    <v-btn  x-small color="#D4A276" rounded @click="mini = !mini" v-if="mini"> Afficher les menus </v-btn>
                  </v-col>
                  <v-col   cols="3">hi drower {{ drawer }}</v-col>
                  <v-col   cols="3"> hi </v-col>
                  <v-col   cols="3"> hi </v-col>
                  
                </v-row>
            </v-card>
        
            <v-card>
                <v-layout>
                  <v-navigation-drawer   class="rounded-xl my-1"  :mini-variant.sync="mini" permanent color="#E7BC91"  >
                    <v-list dense >
                      <v-list-item class="px-2" >
                        <v-list-item-avatar>
                          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="text-h6">
                            {{ user.nom }}  {{ user.prenom }} 
                          </v-list-item-title>
                          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list dense nav rounded>
                      <v-list-item link :to ="item.path" v-for="(item , id) in navigationItems"  :key="id" prepend-icon="mdi-folder" title="My Files" value="myfiles">
                        <!-- <v-icon slot="prependIcon" large color="primary">mdi-star</v-icon> -->
                        <v-list-item-icon>
                          <v-icon>mdi-folder</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>


                  </v-navigation-drawer>

                    <v-main class="" >
                         <v-card class="card-style mx-2 my-1 rounded-xl" color="">
                             <router-view/>
                         </v-card>
                    </v-main>
                </v-layout>
            </v-card> 
        </v-app>
</template>
<script>

import schoolNavigation from '../router/routes/schoolNavigation.js'
export default {
  computed: {
    // Get the current dossier from the Vuex store
    user() {
      // get the current user : 
      let user = this.$store.getters.getUser ;
      // let user = localStorage.getItem('user') ;
      user = JSON.parse(user)
      // console.log('keeeeeeeeeeeeeyyyyyyys' + Object.keys(user))
      // console.log('typeeeeeeeeooooooooooof ' +typeof (user))
      return user  ;
    },
  },
  created(){
    this.navigationItems = schoolNavigation ;

  },
  data(){
    return{
      navigationItems : [] ,
      mini : true ,
      drawer: true,
    }
  },
  methods:{
    navigateToMenu(item){
      this.$router.push(item.path);

    },

  },
}
</script>
<style>
.card-style{
  min-height :99vh ;
}
</style>