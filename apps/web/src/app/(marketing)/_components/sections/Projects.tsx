"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github, Users, Zap, TrendingUp } from "lucide-react"
import Image from "next/image"

const projects = [
    {
        title: "ScaleForge",
        description: "Enterprise microservices platform powering 50,000+ daily active users with 99.9% uptime",
        image: "/placeholder.svg?height=600&width=800",
        stats: [
            { icon: Users, label: "50k+ Users", value: "50,000+" },
            { icon: Zap, label: "Uptime", value: "99.9%" },
            { icon: TrendingUp, label: "Performance", value: "2ms avg" },
        ],
        tech: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
        liveUrl: "#",
        codeUrl: "#",
    },
    {
        title: "DevTools Suite",
        description: "Comprehensive developer productivity platform reducing deployment time by 70%",
        image: "/placeholder.svg?height=600&width=800",
        stats: [
            { icon: Users, label: "Teams", value: "200+" },
            { icon: Zap, label: "Time Saved", value: "70%" },
            { icon: TrendingUp, label: "Deployments", value: "10k+" },
        ],
        tech: ["Go", "React", "MongoDB", "Kubernetes", "GitHub Actions"],
        liveUrl: "#",
        codeUrl: "#",
    },
    {
        title: "CloudSync",
        description: "Real-time data synchronization engine handling 1M+ events per second",
        image: "/placeholder.svg?height=600&width=800",
        stats: [
            { icon: Users, label: "Events/sec", value: "1M+" },
            { icon: Zap, label: "Latency", value: "<10ms" },
            { icon: TrendingUp, label: "Reliability", value: "99.99%" },
        ],
        tech: ["Python", "Apache Kafka", "Redis", "PostgreSQL", "Docker"],
        liveUrl: "#",
        codeUrl: "#",
    },
]

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <section id="projects" ref={containerRef} className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">FEATURED WORK</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Production-ready solutions that scale</p>
            </motion.div>

            {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
            ))}
        </section>
    )
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity }}
            className="min-h-screen flex items-center justify-center px-6 mb-0"
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className={`grid lg:grid-cols-2 gap-20 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                    {/* IMAGE SIDE */}
                    <motion.div style={{ y }} className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                        <motion.div
                            whileHover={{ scale: 1.03, boxShadow: "0 8px 48px 0 rgba(30,255,133,0.07)" }}
                            className="relative overflow-hidden rounded-3xl border border-white/30 shadow-2xl"
                        >
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                width={960}
                                height={720}
                                className="w-full h-auto aspect-video object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                        </motion.div>
                    </motion.div>

                    {/* CONTENT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                    >
                        <h3 className="text-5xl md:text-7xl font-extrabold mb-7 tracking-tighter leading-tight text-white drop-shadow-lg">
                            {project.title}
                        </h3>

                        <p className="text-2xl text-gray-200 mb-12 leading-relaxed max-w-xl">{project.description}</p>

                        <div className="flex gap-8 mb-10">
                            {project.stats.map((stat, statIndex) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: statIndex * 0.13 }}
                                    className="flex flex-col items-center bg-black/40 rounded-2xl px-6 py-4 border border-white/10 shadow-lg backdrop-blur-sm"
                                >
                                    <stat.icon className="w-8 h-8 mb-2 text-lime-400" />
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wide text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mb-10">
                            {project.tech.map((tech, techIndex) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: techIndex * 0.04 }}
                                    className="px-4 py-1 bg-black border border-white/10 rounded-full text-base font-medium shadow-sm hover:bg-white/10 transition"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>

                        <div className="flex gap-5">
                            <motion.a
                                href={project.liveUrl}
                                whileHover={{ scale: 1.07, boxShadow: "0 4px 32px 0 rgba(30,255,133,0.11)" }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-200 transition-all"
                            >
                                <ExternalLink size={22} />
                                Live Demo
                            </motion.a>
                            <motion.a
                                href={project.codeUrl}
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg text-white hover:bg-white/10 hover:border-lime-400 transition-all"
                            >
                                <Github size={22} />
                                View Code
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
