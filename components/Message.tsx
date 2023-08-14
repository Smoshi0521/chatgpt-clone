import React from 'react'
import { DocumentData } from 'firebase/firestore'
type Props = {
  message:DocumentData
}

function Message({message}:Props) {

  const isChatGpt = message.user.name === "ChatGPT"

  return (
    <div className={`py-5 ${isChatGpt && "bg-[#434654]"} flex justify-center`}>
      <div className='flex space-x-5 justify-start w-5/6 md:w-4/6 lg:w-3/6'>
        <img src={message.user.avatar} alt='profile' className='w-8 h-8'/>
        <p className=''>{message.text}</p>
      </div>
    </div>
  )
}

export default Message