<template>
    <div class="container mt-5">
        <div class="signup-form">
            <div class="card-header center">
            <h4>Sign Up</h4>
            </div>
            <div class="form-group">
            <div class="mb-3">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" class="form-control"/>
            </div>
            <div class="mb-3">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email" class="form-control"/>
            </div>
            <div class="mb-3">
                <label for="address">Address</label>
                <input type="text" id="address" v-model="address" class="form-control"/>
            </div>
            <div class="mb-3">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control"/>
            </div>
            <div class="mb-3">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control"/>
            </div>
            <button v-on:click="signUpUser" class="btn btn-primary">Sign Up</button>
            </div>
        </div>
        </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
        data() {
        return {
            name: '',
            password: '',
            email: '',
            address: '',
        }
        },
        methods: {
        async signUpUser() {
            if (this.password !== this.confirmPassword) {
            window.alert('Passwords do not match.');
            return;
            }
    
            const newUser = {
                name: this.name,
                password: this.password,
                email: this.email,
                address: this.address,
            };
            try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', newUser);
            console.log(response.data);
            // Optionally, you can handle the success response and redirect to another page here.
            this.$router.push('/');
            } catch (error) {
                    if(error.status == 400){
                        console.error('Signup failed:', error.message);
                        window.alert('Signup failed. Please try again.');
                    // Handle signup errors here, show an error message, etc.
                    }else{
                        console.error('Signup failed:', error.message);
                        window.alert('Email already exited.');
                    }
                }
        },  
        },
    };
    </script>