import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Quickfra - Multi-Cloud Infrastructure Deployment",
    description: "Deploy your infrastructure across multiple cloud providers with one click. Support for Oracle Cloud, Hetzner, AWS, and more.",
    keywords: "cloud deployment, infrastructure as code, terraform, oracle cloud, hetzner cloud, aws, multi-cloud, devops, server deployment, coolify, mail server, web hosting, cloud automation",
    authors: [{ name: "Quickfra Team" }],
    openGraph: {
        title: "Quickfra - Multi-Cloud Infrastructure Deployment",
        description: "Deploy your infrastructure across multiple cloud providers with one click",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Quickfra - Multi-Cloud Infrastructure Deployment",
        description: "Deploy your infrastructure across multiple cloud providers with one click",
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={inter.className}>
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 opacity-90 pointer-events-none"></div>
                {children}
            </body>
        </html>
    )
}
