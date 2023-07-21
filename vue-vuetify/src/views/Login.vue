<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">Login</v-card-title>
            <v-card-text>
              <login-form></login-form> <!-- Use the LoginForm component here -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import LoginForm from "../components/SignIn.vue"; // Import the LoginForm component
  
  export default {
    components: {
      LoginForm, // Register the LoginForm component for use within this view
    },
  };
  </script>
