<template>
  <div class="home">

    <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ user }} -->
     <!-- <managementSidebar /> -->
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     <br>
     Formations Sections
     
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import managementSidebar from '@/components/Sidebars/managementSidebar.vue'

export default {
  name: 'FormationsView',
  components: {
    // managementSidebar
    // HelloWorld
  },
  computed: {
    // Get the current dossier from the Vuex store
    user() {
      // return this.$store.getters.getUser ;
      return localStorage.getItem('user') ;
    },
  }
}
</script>
