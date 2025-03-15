<template>
  <div class="home">

    <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{ user }} -->
     Formations Sections
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'FormationsView',
  components: {
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
