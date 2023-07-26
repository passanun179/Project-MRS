<template>
    <button @click="signOut">Sign Out</button>
</template>

<script>
export default {
methods: {
    signOut() {
    this.$store.commit('clearAuthState');

    
    this.$router.push('/signin'); 
    }
}
};
</script>