import { Exo_2 } from 'next/font/google'
import './globals.css'
import Link from 'next/link';

const inter = Exo_2({ subsets: ['latin'] })

export const metadata = {
  title: 'FarmLink',
  description: 'An app connecting farmers and buyers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
