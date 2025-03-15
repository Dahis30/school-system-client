<template>
    <!-- <div> -->
        <v-app  >
        
            <v-card>
                
                <v-layout>
                  <v-navigation-drawer  rail >
                    <v-list>
                      <v-list-item
                        subtitle="sandra_a88@gmailcom"
                        title="Sandra Adams"
                      >dddd</v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list density="compact" nav>
                      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
                      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
                      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
                    </v-list>
                  </v-navigation-drawer>

                    <v-main >
                    
                         <v-card color="#def2f1">
                             <router-view/>
                         </v-card>
                    </v-main>
                </v-layout>
            </v-card> 
        </v-app>
    <!-- </div> -->
</template>
<script></script>