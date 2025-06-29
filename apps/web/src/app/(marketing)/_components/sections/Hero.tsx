"use client"

import InteractiveTerminal from "@/app/(marketing)/_components/Terminal"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        DIEGO RODRÍGUEZ
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-center lg:text-left"
                    >
                        {/* BADGE "Available to hire" */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-green-800/70 text-green-300 text-xs font-semibold uppercase tracking-wider shadow-lg"
                        >
                            <span className="w-2 h-2 mr-2 rounded-full bg-green-400 animate-pulse" />
                            Available to hire
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            Software Developer
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8"
                        >
                            Building solutions under scalable platforms & developer tools.
                        </motion.p>

                        {/* CTA BUTTONS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="#contact">
                                <button className="px-7 py-3 rounded-full bg-white text-black font-bold text-lg shadow-lg transition hover:bg-gray-200 hover:scale-105">
                                    Let&apos;s Work
                                </button>
                            </Link>
                            <Link href="#projects">
                                <button className="px-7 py-3 rounded-full border-2 border-white text-white font-bold text-lg shadow-lg transition hover:bg-white/10 hover:border-green-400 hover:text-green-300">
                                    View Projects
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-full"
                    >
                        <InteractiveTerminal />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
