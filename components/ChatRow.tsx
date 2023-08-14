import React, {  useEffect } from 'react'
import Link from 'next/link'
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
type Props = {
  id: string
  setListChats: React.Dispatch<React.SetStateAction<boolean>>;
  setChatName: React.Dispatch<React.SetStateAction<string>>
}

function ChatRow({ id, setListChats, setChatName }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false)

  const [messages] = useCollection(collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'))

  useEffect(() =>{
    if(!pathName) return;

    setActive(pathName.includes(id));
  },[pathName])

  const removeChat = async() =>{
    await deleteDoc(doc(db,'users', session?.user?.email!, 'chats', id));
    router.replace("/");
  }
  
  return (
    <Link href={`/chat/${id}`} onClick={() => {setListChats(false), setChatName(messages?.docs[1]?.data().text || "New chat")}} className={`newChat flex flex-row items-center justify-center ${active && 'bg-gray-700/50'}`}>
      <ChatBubbleLeftIcon className='w-5' />
      <p className='flex-1 hidden: md:inline-flex truncate'>
        {messages?.docs[1]?.data().text || "New chat"}
      </p>
      <TrashIcon onClick={removeChat} className='w-5 text-gray-700 hover:text-red-700' />
    </Link>
  )
}

export default ChatRow