<template>
  <div class="container mt-5">
    <div class="login-form">
      <div class="card-header center">
      <h4>Login</h4>
    </div>
    <div class="form-group">
        <div class="mb-3">
            <label for="email">email</label>
            <input type="text" id="email" v-model="model.email" class="form-control"/>
        </div>
        <div class="mb-3">
            <label for="password">Password</label>
            <input :type="passwordInputType" id="password" v-model="model.password" class="form-control"/>
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
          email: '',
        password: '',
        },
        showPassword: false,
    }
  },
  computed: {
    passwordInputType() {
      return this.showPassword ? 'text' : 'password';
    },
  },
  methods: {
    async loginUser() {
      const User = {
        email: this.model.email ,
        password: this.model.password
      }
      try{
      const response = await axios.post('http://localhost:8080/api/auth/signin', User);
      console.log(response);
        this.model.email =response.data.email,
        this.model.password= response.data.password  
        this.$router.push('/patients');
      } catch (error) {
      // Handle login errors here, show an error message, etc.
      console.error('Login failed:', error.message);
      window.alert('Login failed. Please check your email and password and try again.');
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