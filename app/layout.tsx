import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'

import RegistrationModal from './components/modals/RegistrationModal';
import ToasterProvider from './providers/ToasterProvider';
import SigninModal from './components/modals/SigninModal';
import getSigninUser from './actions/getSignedinUser';
import RentModal from './components/modals/RentModal';

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'R-Motel',
  description: 'Motel booking',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const signedinUser = await getSigninUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegistrationModal />
        <SigninModal />
        <RentModal />
        <Navbar signedinUser={signedinUser}/>
        {children}
        </body>
    </html>
  )
}
