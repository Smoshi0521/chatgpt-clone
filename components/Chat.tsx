"use client"
import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import CloseSideBar from './CloseSideBar'
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid'
type Props = {
  chatId: string
}

function Chat({ chatId }: Props) {
  const { data: session } = useSession()

  const [messages] = useCollection(
    session &&
    query(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      orderBy("createdAt", "asc")
    )
  )
  // messages?.docs.map((messages, index) => (
  //   console.log(new Date(messages?.data().createdAt?.toDate()), index)
  // ))
  return (
    <div className='h-5/6 overflow-y-auto transition duration-300'>
      {
        messages?.empty && (
          <div className='w-full flex flex-col space-y-5 items-center justify-center mt-10 '>
            <p className='text-2xl md:text-[30px] text-center'>Start your chat with GPT</p>
            <ArrowDownCircleIcon className='w-8 md:w-12 animate-bounce'/>
          </div>
        )
      }
      {
        messages?.docs.map((messages) => (
          <Message key={messages.id} message={messages.data()} />
        ))
      }
    </div>
  )
}

export default Chat