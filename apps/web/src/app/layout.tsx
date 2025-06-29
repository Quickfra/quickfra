import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/app/components/Navbar"
import { Inter } from "next/font/google"
import Footer from "@/app/components/Footer"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Diego Rodríguez - Backend Engineer",
    description: "Software developer building scalable platforms and developer tools",
    keywords: "software developer, developer, portfolio, scalable systems, microservices, backend engineer, backend developer, cloud computing, devops, software architecture, API design, system design, software engineering, programming, coding",
    authors: [{ name: "Diego Rodríguez" }],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black opacity-50 pointer-events-none"></div>
                <Navbar/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
