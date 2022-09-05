import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
export default function Header(props) {
    let state = useSelector(state=>state.primarySlice)
  return (
    <div className='header' >
        <h1 className='logo head-logo' >
            ChatterBox
        </h1>
        <button onClick={()=>{state.profile===null?props.signIn():props.signOut()}} className='btn' >{state.profile===null?"Login":"Logout"}</button>
    </div>
  )
}
