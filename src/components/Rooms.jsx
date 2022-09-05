import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import PrimarySlice, { setChat } from './PrimarySlice'

export default function Rooms(props) {
    let roomName = useRef(null)
    let goTo = useNavigate()
    let dispatch = useDispatch(PrimarySlice)
    let state = useSelector(state => state.primarySlice)
    console.log(state)
    useEffect(()=>{
       if(state.profile===null){
           goTo("/")
       }
       else{
        if(state.rooms.length===0){
            props.getRooms()
        }
       }
    })
  return (
    <div className='rooms' >
        <div className="rooms-container">
        {Object.values(state.rooms).map((ele,i)=>{
           return <div onClick={()=>{
            dispatch(setChat(i))
            goTo("/chat")
           }} className="room">
                <h1>{ele.room_name}</h1>
                <p>Admin:{ele.admin}</p>
            </div>
        })}  
        </div>
        <input ref = {roomName} type="text" />
        <button className='btn' onClick={()=>{props.addRoom(roomName.current.value)
           roomName.current.value=""
        }} >Create New Room</button>
    </div>
  )
}
