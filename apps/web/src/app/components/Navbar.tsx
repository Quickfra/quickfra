"use client"

import { useState, useEffect } from "react"
import { MotionWrapper } from "@/components/motion"
import {  Home, FolderOpen, Clock, BookOpen, BarChart3, Mail } from "lucide-react"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { icon: Home, label: "Home", href: "#hero" },
        { icon: FolderOpen, label: "Projects", href: "#projects" },
        { icon: Clock, label: "Now", href: "#now" },
        { icon: BookOpen, label: "Blogs", href: "#thoughts" },
        { icon: BarChart3, label: "Stats", href: "#stats" },
        { icon: Mail, label: "Contact", href: "#contact" },
    ]

    return (
        <MotionWrapper
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md border-white/10" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <MotionWrapper whileHover={{ scale: 1.05 }} className="text-xl font-bold tracking-tight">
                        quickfra
                    </MotionWrapper>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <MotionWrapper
                                key={item.label}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                <a href={item.href} className="flex items-center space-x-2">
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </a>
                            </MotionWrapper>
                        ))}
                    </div>
                </div>
            </div>
        </MotionWrapper>
    )
}
