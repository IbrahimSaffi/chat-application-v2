import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import "./chat.css"
export default function Chat() {
    let goTo = useNavigate()
    let state = useSelector(state => state.primarySlice)
    let msgs= Object.values(Object.values(state.rooms)[state.currRoom].messages)
    // console.log(Object.values(Object.values(state.rooms)[state.currRoom].messages))
    useEffect(() => {
        if (state.profile === null) {
            goTo("/")
        }
    })
    return (
        <div>
            <div className="chat-card">
                <div className="title-bar" >
                    <div className="name-dot" >
                        <div className="dot" ></div>
                        <div>{Object.values(Object.values(state.rooms)[state.currRoom].room_name)}</div>
                    </div>
                    <button className="close" >x</button>
                </div>
                <div className="chat-time" >
                    <div className="line" >
                    </div>
                    {/* <div>Today</div> */}
                    <div className="line" >
                    </div>
                </div>
                <div className="chat-container">
             {Object.values(Object.values(state.rooms)[state.currRoom].messages).map(ele=>{
                   return <div className={state.profile.displayName===ele.sender?"chat-1 chat":"chat-2 chat"}>
                        <div className="msg-time">
                            {ele.time}
                        </div>
                        <div className="chat-text" >
                            <div className="chat-arrow" ></div>
                            {ele.msgText}
                        </div>
                        <div>
                            {ele.sender}
                        </div>
                    </div>

             })}
                    <div className="btm-line" ></div>
                </div>
                
            </div>
                <div className="new-msg">
                    <input className="msg" type="text" placeholder="Enter message" />
                    <button className="btn">Send</button>
                </div>
        </div>
    )
}
