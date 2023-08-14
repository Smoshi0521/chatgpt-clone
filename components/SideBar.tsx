"use client"
import React from 'react';
import NewChat from './NewChat';
import CloseSideBar from './CloseSideBar';
import { signOut, useSession } from 'next-auth/react';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import { useState } from 'react';
import ModeList from './ModeList';
const SideBar = () => {
  const { data: session } = useSession();
  const [listChats, setListChats] = useState(false)
  const [chatName, setChatName] = useState('')
  const [chats, loading, error] = useCollection(
    session && query(
      collection(db, 'users', session?.user?.email!, 'chats'),
      orderBy("createdAt", "desc")
    )
  )
  const [closeSideBar, setCloseSideBar] = useState(false)

  function closeSide() {
    setCloseSideBar(!closeSideBar)
  }

  return (
    <div className={"bg-[#343541] transition duration-300"}>
      <div className={`ml-2 mt-2 absolute top-0 z-20 ${!closeSideBar && "hidden"}`}>
        <CloseSideBar close={closeSide} />
      </div>
      <div className={`bg-[#202123] min-w-[200px] max-w-[270px] p-2 flex flex-col h-screen transform ease-in-out duration-300 ${closeSideBar ? "-translate-x-[300px] absolute z-30" : "translate-x-0 relative"}`}>
        <div className='w-full flex flex-row gap-2 mb-2'>
          <NewChat />
          <CloseSideBar close={closeSide} />
        </div>
        {/* <div>
          <ModeList />
        </div> */}

        <div className='flex-1 overflow-y-auto'>
          {loading && (
            <div className='animate-pulse py-2 px-auto text-center'>
              <p className='text-white'>Loading chats...</p>
            </div>
          )}

          {
            chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} setListChats={setListChats} setChatName={setChatName} />
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

    </div>
  );
}

export default SideBar;