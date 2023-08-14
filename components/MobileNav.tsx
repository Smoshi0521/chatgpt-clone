"use client"
import { Bars3Icon } from '@heroicons/react/24/solid'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import React, { SetStateAction } from 'react';
import NewChat from './NewChat';
import { signOut, useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import { useState } from 'react';
import ModeList from './ModeList';
function MobileNav() {
  const { data: session } = useSession();
  const [listChats, setListChats] = useState(false)
  const [chatName, setChatName] = useState('')
  const [timer,setTimer] = useState(false)
  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, 'users', session?.user?.email!, 'chats'),
      orderBy("createdAt", "desc")
    )
  )

  function handleListChats() {
    setListChats(!listChats)
    setTimeout(() => setTimer(true), 300)
  }

  return (
    <div className={`w-full`}>
      <div className='flex justify-between items-end bg-[#343541] border border-transparent border-b-gray-200/30 w-full px-3 py-3 text-white'>
        <Bars3Icon className={`cursor-pointer w-8 ${!listChats ? "z-20" : "z-10"}`} onClick={handleListChats} />
        <div className='truncate w-3/6 text-center'>{chatName}</div>
        <PlusIcon className='w-6' />
      </div>

      <div className={`flex absolute h-screen top-0 w-full transform ease-in duration-300 ${listChats ? "bg-gray-700/60 z-20" : "z-10" }`}>
        <div className={`flex flex-row w-full transform ease-in duration-300 absolute ${!listChats ? "left-[-100%] " : "left-[0]"}`}>
          <div className={`bg-[#202123] w-[80%] sm:w-[60%] p-2 flex flex-col h-screen`}>
            <div className='w-full flex flex-row gap-2 mb-2'>
              <NewChat />
            </div>
            <div>
              <ModeList />
            </div>

            <div className='flex-1 overflow-y-auto'>
              {loading && (
                <div className='animate-pulse py-2 px-auto text-center'>
                  <p className='text-white'>Loading chats...</p>
                </div>
              )}

              {
                chats?.docs.map((chat) => (
                  <ChatRow key={chat.id} id={chat.id} setListChats={setListChats} setChatName={setChatName}/>
                ))
              }
            </div>

            <div className='py-2 w-full border border-transparent border-t-gray-500'>
              {session && (
                <div onClick ={() => signOut()} className='py-3 px-2 flex items-center space-x-3 hover:bg-gray-700/70 rounded-md cursor-pointer'>
                  <img src={session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`} alt="Profile picture" className='w-8 rounded-md' />
                  <p className='text-white truncate'>{session.user?.email!}</p>
                </div>
              )}
            </div>
          </div>
          <div onClick={handleListChats} className='p-2 border-2 border-white h-fit cursor-pointer ml-2 mt-2'>
            <XMarkIcon className='w-6 text-white' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav