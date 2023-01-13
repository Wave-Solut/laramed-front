import axios from 'axios'
import router from '../router'

export default {
    namespaced: true,
    state:{
        authenticated:false,
        user:{}
    },
    getters:{
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        },
    
        
    },
    actions:{
       
        async  login({commit}){
             
            return  await axios.get('user').then(({data})=>{
                commit('SET_USER',data)
                commit('SET_AUTHENTICATED',true)
                router.push({name:'Welcome'})
            }).catch(({response:{data}})=>{
                console.log(data)
                localStorage.removeItem('token',null)
                commit('SET_USER',{})
                commit('SET_AUTHENTICATED',false)
                router.push({name:'signin cover'})
            })
        },
        afterLogin({commit}){
            axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            var userData = JSON.parse(localStorage.getItem('user'));
            commit('SET_USER',userData)
            commit('SET_AUTHENTICATED',true)
            router.push({name:'Welcome'})
        },
        logout({commit}){
            delete axios.defaults.headers.common['Authorization'];
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
            localStorage.removeItem('user');
            localStorage.removeItem('token')
        },

    }
}