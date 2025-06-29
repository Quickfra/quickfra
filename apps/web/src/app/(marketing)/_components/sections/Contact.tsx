"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">LET&apos;S BUILD</h2>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                        Ready to scale your next project? Let&apos;s discuss how we can build something exceptional together.
                    </p>

                    <motion.a
                        href="mailto:diego@example.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors mb-12"
                    >
                        <Mail size={24} />
                        Contact Diego
                    </motion.a>

                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Mail className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                            <div className="font-semibold mb-1">Email</div>
                            <div className="text-gray-400 text-sm">diego@example.com</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Linkedin className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                            <div className="font-semibold mb-1">LinkedIn</div>
                            <div className="text-gray-400 text-sm">/in/diego-rodriguez-dev</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Github className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                            <div className="font-semibold mb-1">GitHub</div>
                            <div className="text-gray-400 text-sm">@quickfra</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                            <div className="font-semibold mb-1">Location</div>
                            <div className="text-gray-400 text-sm">Remote / San Francisco</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
