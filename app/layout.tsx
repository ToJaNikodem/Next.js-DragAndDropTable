import type { Metadata } from 'next'
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'Drag and drop table',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="h-full">
          <ClerkLoading>
            <div>Loading...</div>
          </ClerkLoading>
          <ClerkLoaded>
            <NavBar />
            <main>{children}</main>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  )
}
