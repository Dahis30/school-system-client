<template>
    <!-- <div> -->
        <v-app  >


            <v-card class="mx-1 my-1 pb-1 pt-2 rounded-xl" >
                <v-row>
                  <v-col class=" py-0 my-0 pr-12 " cols="1"> 

                    <v-btn class="mx-0 my-1 pa-0" @click="mini = !mini"   fab dark x-small color="subPrimary">
                      <i v-if="!mini" class="material-icons">menu_open</i>
                      <i v-if="mini"  class="material-icons">list</i>  
                    </v-btn>
                  </v-col>
                  <v-col class="py-0 my-0"   cols="8"> 
                       <v-alert  class="mt-1 py-0 mb-0  px-0" style="color : var(--v-textColor-base)" shaped dense dark color="primary" >Vous pouvez gérer votre centre de formation ici. </v-alert>
                  </v-col>
                  <v-col class="py-0 my-0"   cols="3"> 
                    <v-switch  class="pt-1 pb-0 px-0 ma-0" dense v-model="modeSombre"  >
                         <template #label>
                            <span style="color: var(--v-textColor-base);" >Mode Sombre</span>
                         </template>
                      </v-switch>  
                  </v-col>
                  
                </v-row>
            </v-card>
        
            <v-card>
                <v-layout>
                  <v-navigation-drawer   class="rounded-xl my-1 ml-1"  :mini-variant.sync="mini" permanent color="primary"  >
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
                      <v-list-item  link :to ="item.path" v-for="(item , id) in navigationItems"  :key="id" prepend-icon="mdi-folder"  value="myfiles">
                        <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                    


                  </v-navigation-drawer>

                    <v-main class="mr-0" :style="mainStyle">
                         <v-card class="card-style mx-1 my-1 rounded-xl" color="">
                             <router-view/>
                         </v-card>
                    </v-main>
                </v-layout>
            </v-card> 
        </v-app>
</template>
<script>

import adminRoutes from '../router/routes/adminRoutes.js'
export default {
  computed: {
    user() {
      // get the current user : 
      let user = this.$store.getters.getUser ;
      user = JSON.parse(user)
      return user  ;
    },
    mainStyle() {
      // Largeur fixe selon l'état du drawer
      const drawerWidth = this.mini ? 56 : 260; // 56px pour mini, 300px pour normal
      return {
        width: `calc(100vw - ${drawerWidth + 16}px)`, // 16px pour les marges
        maxWidth: `calc(100vw - ${drawerWidth + 16}px)`,
        marginRight: '0',
        transition: 'width 0.2s ease' ,
      }
    }
  },
  created(){
    this.navigationItems = adminRoutes ;
    this.modeSombre = this.$vuetify.theme.dark ;

  },
  data(){
    return{
      navigationItems : [] ,
      mini : true ,
      drawer: true,
      modeSombre : null ,
    }
  },
  methods:{
  },
  watch :{
    modeSombre(val){
      if (val) this.$store.dispatch('enableModeSombre');
      if(!val) this.$store.dispatch('disableModeSombre');
      this.$vuetify.theme.dark = val ; 
    }
  },
}
</script>
<style>
.card-style{
  min-height :99vh ;
}
</style>