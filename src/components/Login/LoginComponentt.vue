<template>
  <v-app style="background-color: #8B5E34;" >

    <!-- <v-container style="background-color: #BC8A5F;"  class="mx-9 px-11 py-9" > -->
      <v-row>
        <v-col style="background-color: white ;" cols ='6'>
        <!-- image here  -->
        <img  style="width: 100%; height: 100%;" src="@/assets/login/login.png">
        </v-col>
        <v-col cols ='6'> 
          <v-card class="mx-12 mt-11 rounded-xl" >
               <h3 style="color:#8B5E34">Accéder à mon compte :</h3>
          </v-card>
          <v-card style="margin-top: 50px;"  class="mx-12 rounded-xl" >
            <v-progress-linear v-if="loading"   color="#D4A276" indeterminate rounded height="6" ></v-progress-linear>           
            



            <!-- TODO : il faut que les champs etre obligatoires -->
            <v-form @submit.prevent="handleLogin()" class="mx-9 px-11 py-9">
              <v-row>
                <v-col class="mx-0 my-0 px-0 py-0" cols =12>
                  <v-text-field v-model="userInformation.email" label="Email" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                </v-col>
                <v-col  class="mx-0 my-0 px-0 py-0" cols =12>
                  <v-text-field v-model="userInformation.password" label="Mot de passe" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                </v-col>
              </v-row>
              <v-btn type="submit" color="#D4A276" rounded > Login </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    <!-- </v-container> -->
  </v-app>
</template>

<script>
export default {
    name : "LoginComponentt",
    data(){
      return{
        loading : false ,
        userInformation:{
            email: '' ,
            password : '',
           },
        defaultUserInformation:{
            email: '' ,
            password : '',
           },
      }
    },
    methods:{
      async handleLogin(){
        try{
          this.loading = true ;
          let checkUser = await this.checkUserIfExist();
          if(!checkUser){
            this.loading = false
            return false ;
          } 
          await this.getUserInfo();
          this.loading = false
        }
        catch(error){
          this.loading = false
        }
      },




      async checkUserIfExist (){
        try{
          // login for the first time  and stock the token in the local storage 
          const response = await this.$axios.post('/login_check', this.userInformation )     
          await localStorage.setItem('token' , response?.data?.token)
          return true ;
        }
        catch(error){
          // TODO : il faut afficher les messages aux utilisateures 
          console.log('url : ' + error) ;
          return false ;
        }
      },



      async getUserInfo (){
        try{
           // get the information of the current user and stock them in the local storage
          const response = await this.$axios.get('/user-information')
          
          const user = response?.data ;
          this.$store.dispatch('clearUserInformation');
          this.$store.dispatch("saveUser", user);
          this.userInformation = this.defaultUserInformation ;
          var menu = null ;
          if(user.roles[0] == 'ROLE_ADMIN') menu = '/demandesInscription'
          if(user.roles[0] == 'ROLE_USER') menu = '/formations'

          this.$router.push(menu);
        }
        catch(error){
          // TODO : il faut afficher les messages aux utilisateures 
          console.log('url : ' + error) ;
        }
      },
    },
}
</script>