<template>
 <h3>{{ $store.getters.getusername }}</h3>

         <button type="button" v-on:click="logout" class="button-logout-link">Logout</button>
        
</template>

<script>
//import { useStore } from 'vuex'
import axios from 'axios'
//import { computed } from 'vue'
//import Nav from '@/components/Nav.vue'
//import { mapActions } from 'vuex'
export default {
  name: 'HomeView',
  data() {
    return {
      username: null
    }
  },

 

  async created() {
    const response = await axios.get('api/user', {
      headers: {
        Accept: 'application/json'
      }
    })
    //let user = localStorage.getItem('user-info')
    
    //this.username = JSON.parse(user).userinfo.name
    console.log(response.data)
  },

  mounted() {
    let user = localStorage.getItem('token')

    if (!user) {
      this.$router.push('/Login')
    }
  },
  methods: {
    
    logout() {
      localStorage.clear()
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f2f2f2;
}

h3 {
  text-align: right;
  font-size: 0.875em
}
button {
  position: fixed;
  right: 5px;
  border: 2px solid green;
  color:green;
  padding: 10px;
  width:80px;
}

</style>
