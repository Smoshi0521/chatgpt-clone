'use client'

import { Session } from "next-auth"
export { SessionProvider } from "next-auth/react";
import {SessionProvider} from "next-auth/react"

type Props = {
  children: React.ReactNode; 
  session: Session | null;
}

export const NextAuthProvider = ({ children,session }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};