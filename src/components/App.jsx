import React, { useEffect } from 'react'
import Header from './Header'
import Login from './Login'
import Rooms from './Rooms'
import { useDispatch, useSelector } from 'react-redux'
import PrimarySlice, { login, logout, setRooms } from './PrimarySlice'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,database } from '../firebase-config'
import { useNavigate,Route,Routes } from "react-router-dom"
import { ref, onValue,set,push} from "firebase/database";
import Chat from './Chat'
export default function App() {
    let goTo = useNavigate()
    let state = useSelector(state => state.primarySlice)
    let dispatch = useDispatch(PrimarySlice)
    useEffect(() => {
        if (state.profile !== null) {
            goTo("/rooms")
        }
    }, [])
    async function signIn() {
        let profileDetails;
        const provider = new GoogleAuthProvider();
        try {
            let result = await signInWithPopup(auth, provider)
            profileDetails = result.user;
            dispatch(login(profileDetails))
            goTo("/rooms")
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode)
        }
    }
    async function signOut(){
        try{
            await signOut(auth)
            goTo("/")
            dispatch(logout())
        }
        catch(error)  {
            console.log(error.code)
          };
    }
    async function getRooms() {
        const roomsRef = ref(database, 'rooms/');
        try{
            onValue(roomsRef, async (snapshot) => {
              const data = await snapshot.val();
              dispatch(setRooms(data))
            });
        }
        catch(error){
           console.log(error)
        }     
    }
    async function addRoom(roomName) {
        // Create a new post reference with an auto-generated id
        try{
            const roomRef = ref(database, 'rooms');
            const newRoom = push(roomRef);
           await set(newRoom, {
                admin:state.profile.displayName,
                messages:{},
                room_name:roomName
            });
        }
        catch(err){
            console.log(err)
        }
    }
    async function addChat(roomId,msgText,sender,time) {
      const message ={
        msgText,sender,time
      }
      let msgRef = ref(database, 'rooms/'+Object.keys(state.rooms)[roomId]+"/messages")
      let newMsg = push(msgRef)
      console.log(Object.keys(state.rooms)[roomId],msgText,sender,time)
      try{
          set(newMsg,message)
      }
      catch(err){
         console.log(err)
      }
    }
    // .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    // ...
    // }).catch((error) => {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    // });
    return (
        <div>
            <Header signIn = {signIn} signOut={signOut}/>
            <Routes>
                <Route path='/' element={<Login signIn = {signIn} />} />
                <Route path='/rooms' element={<Rooms addRoom={addRoom} getRooms={getRooms}/>} />
                <Route path='/chat' element={<Chat addChat={addChat} />} />
            </Routes>
        </div>
    )
}
