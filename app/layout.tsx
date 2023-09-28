import '@/style/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from '@fortawesome/fontawesome-svg-core'
import ThemeProvider from '@/components/providers/ThemeProvider'
import MainLayout from '@/components/organism/MainLayout'
import TanstackProvider from '@/components/providers/TanstackProvider'

config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard | Dwi Fitriana',
  description: "Dashboard for Dwi Fitriana's Portfolio"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <TanstackProvider>
          <ThemeProvider>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
