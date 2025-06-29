"use client"

import { motion } from "framer-motion"
import {
    Database, Server, Code2, Cpu, Github, Rocket, RefreshCw, Cloud, Layers, Braces, Activity, Network, Monitor
} from "lucide-react"

// Map icons & colors to each tech
const techStack = [
    { name: "PostgreSQL", category: "Database", icon: Database, color: "#336791" },
    { name: "Supabase", category: "Backend", icon: Server, color: "#3ECF8E" },
    { name: "Next.js", category: "Frontend", icon: Rocket, color: "#000" },
    { name: "Node.js", category: "Runtime", icon: Cpu, color: "#43853d" },
    { name: "Docker", category: "DevOps", icon: RefreshCw, color: "#0db7ed" },
    { name: "GitHub", category: "Version Control", icon: Github, color: "#fff" },
    { name: "GitHub Actions", category: "CI/CD", icon: Activity, color: "#2088FF" },
    { name: "Redis", category: "Cache", icon: Database, color: "#D82C20" },
    { name: "AWS", category: "Cloud", icon: Cloud, color: "#FF9900" },
    { name: "Kubernetes", category: "Orchestration", icon: Layers, color: "#326CE5" },
    { name: "TypeScript", category: "Language", icon: Code2, color: "#3178C6" },
    { name: "Python", category: "Language", icon: Braces, color: "#3676A6" },
    { name: "Go", category: "Language", icon: Braces, color: "#00ADD8" },
    { name: "GraphQL", category: "API", icon: Network, color: "#E10098" },
    { name: "Terraform", category: "Infrastructure", icon: Monitor, color: "#623CE4" },
    { name: "Monitoring", category: "Observability", icon: Monitor, color: "#7ED957" },
]

export default function TechStackSection() {
    return (
        <section id="stats" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">TECH STACK</h2>
                    <p className="text-xl text-gray-400">Tools and technologies I work with</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transition-all duration-300 cursor-pointer"
                            style={{
                                // borderColor solo cambia en hover vía JS (usando group-hover en Tailwind NO acepta color dinámico)
                                borderColor: "rgba(255,255,255,0.1)",
                                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = tech.color}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                        >
                            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg"
                                style={{
                                    background: `${tech.color}22`,
                                    border: `2px solid ${tech.color}55`,
                                    transition: 'background 0.2s, border 0.2s'
                                }}
                            >
                                <tech.icon size={28} color={tech.color} className="transition-all duration-200 group-hover:scale-110" />
                            </div>
                            <h3
                                className="font-semibold text-sm mb-1 group-hover:text-white transition-colors"
                                style={{ color: tech.color }}
                            >
                                {tech.name}
                            </h3>
                            <p className="text-xs text-gray-400 group-hover:text-white/80 transition-colors">{tech.category}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats abajo igual que antes */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">8+</div>
                            <div className="text-gray-400">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                            <div className="text-gray-400">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">2.3k+</div>
                            <div className="text-gray-400">GitHub Stars</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">99.9%</div>
                            <div className="text-gray-400">Uptime</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
