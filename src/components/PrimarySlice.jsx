import { createSlice } from "@reduxjs/toolkit"; 
let primarySlice = createSlice({
    name:"primary-slice",
    initialState: {
        profile:JSON.parse(localStorage.getItem("profile")),
        rooms:[],
        currRoom:null,
        chat:null
    },
    reducers: {
        login:(state,action)=>{
            state.profile =action.payload
            localStorage.setItem("profile",JSON.stringify(state.profile))
        },
        setRooms:(state,action)=>{
            state.rooms = action.payload
        },
        currRoom:(state,action)=>{
            state.currRoom = action.payload
        },
        setChat:(state,action)=>{
            state.currRoom=action.payload
            console.log(Object.values(state.rooms)[action.payload])
            state.chat = Object.values(state.rooms)[action.payload].messages
        },
        logout:(state,action)=>{
            state.profile=null
            state.currRoom=null
            state.rooms=[]
            localStorage.setItem("profile",null)
        }
    }
})
export const {login,setRooms,currRoom,setChat,logout} = primarySlice.actions
export default primarySlice.reducer