import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SunIcon } from '@heroicons/react/24/solid'
import { BoltIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { PlusIcon } from '@heroicons/react/24/solid'
import SideBar from '@/components/SideBar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { useState } from 'react'
export default async function HomePage() {
  return (
    <main className={`flex flex-col md:justify-center h-screen text-white px-2 w-full overflow-y-auto pt-5 pb-20`}>
      <h1 className='text-4xl font-bold mb-10 text-center'>ChatGPT</h1>
      <div className='flex flex-col w-full gap-5 md:flex-row md:justify-center'>
        <div className='space-y-2 flex flex-col items-center'>
          <div className='flex justify-center mb-5 space-x-2'>
            <SunIcon className='w-6' />
            <p>Examples</p>
          </div>
          <p className='infoText'>{`"Explain Something to me"`}</p>
          <p className='infoText'>{`"What is the difference between a dog and a cat?"`}</p>
          <p className='infoText'>{`"What is the difference between a dog and a cat?"`}</p>
        </div>

        <div className='space-y-2 flex flex-col items-center'>
          <div className='flex justify-center mb-5 space-x-2'>
            <BoltIcon className='w-6' />
            <p>Examples</p>
          </div>
          <p className='infoText'>{`"Change the ChatGPT Model to use"`}</p>
          <p className='infoText'>{`"Messages are stored in Firebase Firestore"`}</p>
          <p className='infoText'>{`"Hot Toast notifications when ChatGPT is thinking"`}</p>
        </div>

        <div className='space-y-2 flex flex-col items-center'>
          <div className='flex justify-center mb-5 space-x-2'>
            <ExclamationTriangleIcon className='w-6' />
            <p>Examples</p>
          </div>
          <p className='infoText'>{`"May occasionally generate incorrect information"`}</p>
          <p className='infoText'>{`"May occasionally produce harmful instructions or biased content"`}</p>
          <p className='infoText'>{`"Limitation knowledge of world and events after 2021"`}</p>
        </div>
      </div>
    </main>
  )
}

