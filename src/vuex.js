import { createStore } from "vuex";
const store=createStore({
    state: {
        
          username: localStorage.getItem('user-info') ||0
       
        
      },

    mutations:{
        //update variable value
        updateuser(state,payload){
               state.username=payload
        }
    },
    actions:{
        //acton to beperformed
        setuser(context,payload){
            
            
            context.commit('updateuser',payload);
         
    }

      
},
    getters:{
             //get state variable value
            getusername:function(state){
                return state.username
            }

    }
})

export default store;