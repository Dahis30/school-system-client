<template>
  <v-app id="app">

      <template v-if="$route.meta.layout"><component :is="$route.meta.layout" /> </template>
      <template v-else > <router-view/></template>
    
  </v-app>
</template>
<script>

export default {
  created(){
    this.isUserStillConnected ();
  },
  methods:{
    async isUserStillConnected(){
      
        try{
          // Cette condition vérifie la présence d'un token dans le localStorage. S'il n'y a pas de token, l'utilisateur doit être redirigé automatiquement vers la page de login et l'exécution de la fonction doit s'arrêter.
          if(!localStorage.getItem('token')){
            if(this.$route.path != '/login' && this.$route.path != '/register' ) this.$router.push('/login');
            return
          }

          // get the information of the current user and stock them in the local storage
          const response = await  this.$axios.get('/user-information') 
          const user = response?.data ;
          this.$store.dispatch('clearUserInformation');
          this.$store.dispatch("saveUser", user);
        }
        catch(error){
          // Si la section try n'est pas exécutée, cela signifie que le token actuel de l'utilisateur a expiré et qu'il faut se reconnecter.
          this.$store.dispatch('clearCurrentToken');
          this.$store.dispatch('clearUserInformation');
          if(this.$route.path != '/login' && this.$route.path != '/register' ) this.$router.push('/login');
        }
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
