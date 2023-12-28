import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: 'Pintrest',
  description: 'Pintrest Clone developed by Aryan Vishwakarma.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header/>
        <main>
          {children}
        </main>
        <Toaster/>
        <NextTopLoader color='#ff0000' crawlSpeed={100} crawl={true} height={2} showSpinner={false} />
      </body>
    </html>
  )
}
