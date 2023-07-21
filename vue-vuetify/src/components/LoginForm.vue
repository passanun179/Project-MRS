<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="username" label="Username" required></v-text-field>
    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
    <v-btn type="submit" color="primary">Login</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Username:", this.username);
      console.log("Password:", this.password);
    },
  },
};
</script>