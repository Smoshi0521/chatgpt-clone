"use client"
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, Timestamp,FieldValue } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { db } from '@/firebase'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import admin from "firebase-admin";
import useSWR from 'swr'

type Props = {
  chatId: string
}
function ChatInput({ chatId }: Props) {

  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();

  //useSWR to get model
  const { data: model} = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo'
  })


  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: prompt,
      createdAt: Timestamp.now(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      }
    }

    await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message)

    //TOAST NOTIF

    const notifications = toast.loading('ChatGPT is thinking...')


    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        chatId,
        model,
        session
      })
    }).then(() => {
      //TOAST notification say sucessful
      toast.success('Chat has responded', {
        id: notifications
      })
    })

  }
  return (
    <div className='bg-transparent flex justify-center pt-3 px-4 pb-10 mb-10 md:mb-0'>
      <form onSubmit={sendMessage} className='bg-gray-500/20 py-3 px-3 space-x-5 flex shadow-custom w-full lg:w-[45rem] rounded-xl'>
        <input type='text'
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Send a message'
          className=' focus:outline-none flex-1 bg-transparent disabled:cursor-not-allowed disabled:text-gray-700/50'
          value={prompt}
        />

        <button
          disabled={!prompt || !session}
          type='submit'
          className={`bg-emerald-600 p-2 rounded-md disabled:bg-gray-700/20 disabled:cursor-not-allowed disabled:text-gray-500 transition duration-300`}
        >
          <PaperAirplaneIcon className='w-5 ' />
        </button>
      </form>
    </div>
  )
}

export default ChatInput