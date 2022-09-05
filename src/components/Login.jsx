import React from 'react'

export default function Login(props) {
  return (
    <div className='login' >
        <h1 className='logo' >
        ChatterBox
        </h1>
        <button onClick={()=>props.signIn()}  className='btn' >Login</button>
    </div>
  )
}
