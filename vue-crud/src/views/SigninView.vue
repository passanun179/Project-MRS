<template>
  <div class="container mt-5">
    <div class="login-form">
      <div class="card-header center">
      <h4>Login</h4>
    </div>
    <div class="form-group">
        <div class="mb-3">
            <label for="email">name</label>
            <input type="text" id="name" v-model="model.name" class="form-control"/>
        </div>
        <div class="mb-3">
            <label for="email">Password</label>
            <input type="text" id="password" v-model="model.password" class="form-control"/>
        </div>
        <router-link to="/signup">Sign Up</router-link>
        <button v-on:click="loginUser" >Sign In</button>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      model:{
        name: '',
        password: '',
      }
    };
  },
  methods: {
    async loginUser() {
      const User = new FormData();
      User.append("username", this.model.name);
      User.append("password", this.model.password);
      try{
      const response = await axios.post('http://localhost:8080/api/auth/signin', FormData);
      console.log(response);
      this.model.name = response.data.name;
      this.model.password = response.data.password;
      } catch (error) {
      // Handle login errors here, show an error message, etc.
      console.error('Login failed:', error.message);
      }
    },
  }
};
</script>
<style>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  margin-top: 1rem;
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>