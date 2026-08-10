import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import axios from "axios";

import "./chatbot.css";

const ChatBot = () => {

    const [open,setOpen]=useState(false);

    const [message,setMessage]=useState("");

    const [loading,setLoading]=useState(false);

    const [chat,setChat]=useState([
        {
            sender:"bot",
            text:"👋 Hi! How can I help you?"
        }
    ]);

    const sendMessage=async()=>{

        if(!message.trim()) return;

        const userMessage={
            sender:"user",
            text:message
        };

        setChat(prev=>[...prev,userMessage]);

        const currentMessage=message;

        setMessage("");

        setLoading(true);

        const question = message.trim().toLowerCase();


        try{

            const res=await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/ai/chat`,
                {
                    message:currentMessage
                }
            );

            setChat(prev=>[
                ...prev,
                {
                    sender:"bot",
                    text:res.data.reply
                }
            ]);

        }

        catch{

            setChat(prev=>[
                ...prev,
                {
                    sender:"bot",
                    text:"Something went wrong."
                }
            ]);

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <>

        <button

        className="chat-toggle"

        onClick={()=>setOpen(!open)}

        >

        {
            open
            ?
            <IoClose/>
            :
            <FaRobot/>
        }

        </button>

        {
            open &&

            <div className="chat-window">

                <div className="chat-header">

                   <FaRobot/> AI Assistant

                </div>

                <div className="chat-body">

                    {
                        chat.map((item,index)=>(

                            <div

                            key={index}

                            className={`msg ${item.sender}`}

                            >

                            {item.text}

                            </div>

                        ))
                    }

                    {
                        loading &&

                        <div className="msg bot">

                            AI is typing...

                        </div>
                    }

                </div>

                <div className="chat-footer">

                    <input

                    value={message}

                    onChange={(e)=>setMessage(e.target.value)}

                    onKeyDown={(e)=>{

                        if(e.key==="Enter")

                        sendMessage();

                    }}

                    placeholder="Ask anything..."

                    />

                    <button

                    onClick={sendMessage}

                    >

                    <IoSend/>

                    </button>

                </div>

            </div>

        }

        </>

    )

}

export default ChatBot;