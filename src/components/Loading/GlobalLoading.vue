<template>
        <v-dialog v-model="isLoading" persistent max-height="50" max-width="50" heig elevation="12"  >
            <v-card color="BackgroundTextColor" class="no-scroll-dialog">
              <v-card-text class="d-flex justify-center align-center ma-0 pa-0" >
                <span class="loader"></span>
              </v-card-text>
            </v-card>
        </v-dialog>
</template>
  
<script>
  export default {
    name: 'GlobalLoading',
    data(){
      return {
        isLoading : false ,
      }
    },
    watch:{
      'isReady'(val){
        this.isLoading = val ;
        console.log('changment the state of the globalLoading is detected in the component : ' + val )
      },
      'isLoading'(val){
        //Ici, on va s'assurer de désactiver le loading automatiquement après 60 secondes si le component ou la vue qui l'a activé ne l'a pas désactivé entre-temps.
        if(val == true){
          setTimeout(() => { this.isLoading = false  }, ( 60 * 1000 ));
        }

      }
    },
    computed: {
      isReady() { return this.$store.getters.getGlobalLoading }
    },
  }
</script>

<style scoped >

.no-scroll-dialog {
  overflow: hidden !important;
}
.v-dialog__content {
  overflow: hidden !important;
}

.loader {
  border: 2px solid var(--v-BackgroundTextColor-base);
  width: 48px;
  height: 48px;
  background:var(--v-primary-base);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}


.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  border: 24px solid;
  border-color: transparent var(--v-BackgroundTextColor-base);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>
  