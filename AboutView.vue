<template>
<form @submit.prevent="handle" class="login-container">
    <div class="form-container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" v-model="username" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" v-model="password" required>

      <button type="submit">Submit</button>
    </div>
  
    <div class="links-container">
      <p> You do not have an account? <router-link to="/SignUp">Sign up</router-link></p>
      <p><router-link to="#">Forgot Password?</router-link></p>
    </div>
  </form>

      
    
    
    
    
    
    

 
</template>


<script>
import axios from 'axios'
//import { useStore } from 'vuex'

export default  {
    name:'AboutView',
    data(){
        return{
     
        username:'',
        password:''
    }
},
    methods:{ 
      
     async handle(){

      
        console.log("Submited",this.Ausername,this.username,this.password);
      const result=await axios.post('api/login',{
         "username":this.username,
         "password":this.password
},{headers:{
    'Content-Type':'application/json'
}
      });
      
      if(result.status==200 && result.data.userStatus==1 ){
        console.log("---------",result.data)
        alert("Login Successfully");
        localStorage.setItem('token',result.data.token);
        localStorage.setItem('user-info',(result.data.userinfo.username));
        this.$store.dispatch('setuser',result.data.userinfo.username)
        this.$router.push('/');
      }

      if(result.status==200 && result.data.userStatus==0 ){
        
        alert("User is not Active, Please Communicate with Admin for activation.");
        this.$router.push('/Login');
      }
    },

  

   
 
  

  },

  mounted(){
      let user=localStorage.getItem('token');
      
      if(user){
        this.$router.push('/');
       
      }
    }
};

</script>

<style scoped>
.login-container {
  display: grid;
  justify-content: center;
  align-items: center;
 

}

.form-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 80px;
  text-align: center;
}

.form-container label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}


.form-container input[type="text"],
.form-container input[type="password"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
}

.form-container button[type="submit"] {
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.form-container button[type="submit"]:hover {
  background-color: #3e8e41;
}

.links-container {
  margin-top: 20px;
  text-align: center;
}

.links-container p {
  margin-bottom: 10px;
}

.links-container p:last-child {
  margin-bottom: 0;
}

</style>