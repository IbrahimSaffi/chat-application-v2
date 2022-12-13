import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import "./chat.css"
import { useRef } from 'react'
export default function Chat({ addChat }) {
    let goTo = useNavigate()
    let msgRef = useRef(null)
    let state = useSelector(state => state.primarySlice)
    let msgs = Object.values(state.rooms)[state.currRoom].messages
    // console.log(Object.values(Object.values(state.rooms)[state.currRoom].messages))
    useEffect(() => {
        if (state.profile === null) {
            goTo("/")
        }
    })
    return (
        <div className="chat-page">
            <div className='chat-card'>
                <div className="title-bar">
                    <div className="name-container">
                        <div className="dot"></div>
                        <div className="name">{state.profile.displayName}</div>
                    </div>
                 <button>x</button>
                </div>
                <div className="chat-container">
                    <div className="date-container">
                        <div className="line"></div>
                        <div className="day">Today</div>
                        <div className="line"></div>
                    </div>
                    <div className="chats">
                        {msgs && Object.values(msgs).map(ele => {
                            return <div className={state.profile.displayName === ele.sender ? "chat-1 chat" : "chat-2 chat"}>
                                <div className="time">
                                    {ele.time}
                                </div>
                                <div className="chat-text-container">
                                    <div className="chat-arrow"></div>
                                    <div className="chat-text">
                                        {ele.msgText}
                                    </div>
                                </div>
                                    <div className="author">
                                        {ele.sender}
                                    </div>
                            </div>

                        })}
                    </div>
                    <div className="btm-line"></div>
                    <div className="new-msg">
                        <input ref={msgRef} type="text" placeholder='Enter Message' />
                        <button className='btn' onClick={() => {
                            addChat(
                                state.currRoom, msgRef.current.value, state.profile.displayName, new Date().toLocaleTimeString())
                            msgRef.current.value = ""
                        }} >Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
