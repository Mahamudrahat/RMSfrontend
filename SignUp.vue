
<template>
 <form @submit.prevent="handle" class="login-container">
    <div class="form-container">

      <label for="uname"><b>UserName</b></label>
      <input type="text" placeholder="Enter UserName" v-model="Ausername" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" v-model="password" required>

      <label for="psw"><b>Confirm Password</b></label>
      <input type="password" placeholder="Enter Confirm Password" v-model="confirm_password" required>
      <label for="uname"><b>Division</b></label>
      <select v-model="selectedDivision"  @change="getDistricts">
        <option value="">--Select Division--</option>
        <option
          v-for="(division, index) in divisions"
          :value="division"
          :key="index"
        >
        {{division}}
        </option>

      </select>
      <label for="uname"><b>District</b></label>
      <select v-model="selectedDistrict"  @change="getUpazilla">
        <option value="">--Select District--</option>
        <option
          v-for="(district, index) in districts"
          :value="district"
          :key="index"
        >
        {{district}}
        </option>
      </select>

  

      <label for="uname"><b>Upazilla</b></label>
      <select v-model="selectedUpazilla">
        <option value="">--Select Upazilla--</option>
        <option
          v-for="(upazilla, index) in upazillas"
          :value="upazilla"
          :key="index"
        >
        {{upazilla}}
        </option>
      </select>

      <label for="uname"><b>Office Type</b></label>
      <input type="text" placeholder="Enter Office Type" v-model="aOfficeType" required>

      <label for="uname"><b>Office Name</b></label>
      <input type="text" placeholder="Enter Office Name" v-model="aOfficeName" required>

      <button type="submit">Submit</button>
    </div>
  
    <div class="links-container">
      <p> Please Login <router-link to="/Login">LogIn</router-link></p>
      <p><router-link to="#">Forgot Password?</router-link></p>
    </div>
  </form>
  

  

  </template>


<script>

import axios from 'axios'


export default  {
    name:'SignUp',
    
    data(){
        return{
        Ausername:'',
        password:'',
        confirm_password:'',
        aDivision:'',
        aDistrict:'',
        aUpazilla:'',
        aOfficeType:'',
        aOfficeName:'',
        selectedDivision: '',
        
        selectedDistrict:'',
        selectedUpazilla:'',
        divisions: [],
        districts:[],
        upazillas:[]


    }
},
    methods:{ 
     async handle(){
      
       
        console.log("Submited",this.Ausername,this.password,this.confirm_password,
        this.aDivision,this.aDistrict,this.aUpazilla,this.aOfficeType,this.aOfficeName);
       const result= await axios.post('api/register',{
         "username":this.Ausername,
         "password":this.password,
         "password_confirmation": this.confirm_password,
         "division":this.selectedDivision,
         "district": this.selectedDistrict,
         "upazilla": this.aUpazilla,
         "officeType": this.aOfficeType,
         "officeName": this.aOfficeName

},{headers:{
    'Content-Type':'application/json;charset=utf-8'
}
      });
      if(result.status==200){
        alert("Signup Successfully");
 this.$router.push('/Login')
      }
      
        //console.log("submitted");
      },
      async getDivisions() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getDivisionList');
      this.divisions = response.data.divisionList;
      
    
    } catch (error) {
      console.log(error);
    }
  },
  async getDistricts() {
    try {
      
      console.log("dDivision",this.selectedDivision);
      const response1 = await axios.get(`http://127.0.0.1:8000/api/getDistrictList?division=${this.selectedDivision}`)
      this.districts = response1.data.districtLists;
      console.log("dDistrict list",this.districts);
    } catch (error) {
      console.log(error);
    }
  },

  async getUpazilla() {
    try {
      
      console.log("Udistrict",this.selectedDistrict);
      const response2 = await axios.get(`http://127.0.0.1:8000/api/getUpazillaList?district=${this.selectedDistrict}`)
      this.upazillas = response2.data.upazillaList;
      console.log("uupazilla list",this.upazillas);
    } catch (error) {
      console.log(error);
    }
  },
      
    },
    mounted(){
      let user=localStorage.getItem('token');
      console.log("___++++++++",user);
      if(user){
        this.$router.push('/');
      }
      
      this.getDivisions();
      this.getUpazilla();
    
    
    
    }
  }
</script>


<style>
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


.form-container input[type="text"],.form-container select,
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



