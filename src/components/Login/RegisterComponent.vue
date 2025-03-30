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
               <h3 style="color:#8B5E34">Demander la création de votre compte</h3>
            </v-card>
            <v-card  style="margin-top: 40px;"  class="mx-12 rounded-xl" >
              <v-progress-linear v-if="loading"   color="#D4A276" indeterminate rounded height="6" ></v-progress-linear>           
             
               <!-- TODO : il faut que les champs etre obligatoires -->  
              <v-form @submit.prevent="handleRegister()" class="mx-9 px-11 py-9">
                <v-row>
                  <v-col class="mx-0 my-0 px-0 py-0" cols =12>
                    <v-text-field v-model="userInformation.nom" label="Nom" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                  </v-col>
                  <v-col  class="mx-0 my-0 px-0 py-0" cols =12>
                    <v-text-field v-model="userInformation.prenom" label="Prenom" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                  </v-col>
                  <v-col  class="mx-0 my-0 px-0 py-0" cols =12>
                    <v-text-field v-model="userInformation.numeroTelephone" label="Numero de telephone" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                  </v-col>
                  <v-col  class="mx-0 my-0 px-0 py-0" cols =12>
                    <v-text-field v-model="userInformation.email" label="Email" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                  </v-col>
                  <v-col  class="mx-0 my-0 px-0 py-0" cols =12>
                    <v-text-field v-model="userInformation.motDePass" label="Mot de passe" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                  </v-col>
                  <v-col  class="mx-0 my-0 px-0 py-0" cols =12>
                    <v-text-field v-model="userInformation.motDePassConfirm" label="Mot de passe pour confirmer" outlined dense shaped color="#D4A276" bg-color="#D4A276" ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn color="#D4A276" type="submit" rounded >confirmer</v-btn>
              </v-form>
            </v-card>
           </v-col>
         </v-row>
       <!-- </v-container> -->
     </v-app>
   </template>
   
<script>
   import axios from 'axios';
   export default {
       name : "RegisterComponent",
       methods:{
        async handleRegister(){
          try{
            this.loading = true
            let url = '/demande/inscription' ;
            const response = await axios.post( url , this.userInformation )
            console.log(response) ;
            this.userInformation = this.defaultUserInformation;
            this.loading = false
            this.$router.push('/login');
          }
          catch(error){
            this.loading = false
            // TODO : il faut afficher les messages aux utilisateures 
            console.log('url : ' + error) ;
          }
         },
       },
       data(){
         return{
          loading : false ,
          userInformation:{
           nom : '',
           prenom: '',
           email: '' ,
           numeroTelephone : '',
           motDePass : '',
           motDePassConfirm : '',
          },
          defaultUserInformation:{
           nom : '',
           prenom: '',
           email: '' ,
           numeroTelephone : '',
           motDePass : '',
           motDePassConfirm : '',
          },
         }
   
       },
   }
</script>