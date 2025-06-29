"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const thoughts = [
    {
        id: 1,
        title: "The Architecture of Scalable Systems",
        excerpt:
            "Deep dive into building systems that can handle millions of users without breaking a sweat. From database sharding to microservices orchestration.",
        date: "Dec 15, 2024",
        readTime: "8 min read",
        category: "Architecture",
    },
    {
        id: 2,
        title: "Why Developer Experience Matters More Than Ever",
        excerpt:
            "In a world where shipping fast is everything, the tools we use can make or break our productivity. Here's how to build tools developers actually love.",
        date: "Dec 10, 2024",
        readTime: "6 min read",
        category: "DevEx",
    },
    {
        id: 3,
        title: "From Monolith to Microservices: A Real Journey",
        excerpt:
            "The complete story of migrating a legacy monolith to microservices architecture, including all the mistakes we made and lessons learned.",
        date: "Dec 5, 2024",
        readTime: "12 min read",
        category: "Migration",
    },
]

export default function ThoughtsSection() {
    return (
        <section id="thoughts" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">LATEST THOUGHTS</h2>
                    <p className="text-xl text-gray-400">Deep dives into technology and engineering</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {thoughts.map((thought, index) => (
                        <motion.article
                            key={thought.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:border-white/20 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                                        {thought.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{thought.title}</h3>

                                <p className="text-gray-400 leading-relaxed mb-6">{thought.excerpt}</p>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {thought.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {thought.readTime}
                                        </div>
                                    </div>

                                    <motion.div className="flex items-center gap-1 text-blue-400 group-hover:gap-2 transition-all">
                                        Read more
                                        <ArrowRight size={14} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
