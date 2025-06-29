
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { MotionWrapper } from "@/components/motion"

export default function Footer() {
    const socialLinks = [
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Mail, href: "mailto:diego@example.com", label: "Email" },
    ]

    return (
        <footer className="border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <MotionWrapper
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 md:mb-0"
                    >
                        <div className="text-2xl font-bold mb-2">Diego Rodríguez</div>
                        <div className="text-gray-400">Backend Engineer & System Architect</div>
                    </MotionWrapper>

                    <MotionWrapper
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-6"
                    >
                        {socialLinks.map((link) => (
                            <MotionWrapper
                                type="a"
                                key={link.label}
                                href={link.href}
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label={link.label}
                            >
                                <link.icon size={24} />
                            </MotionWrapper>
                        ))}
                    </MotionWrapper>
                </div>

                <MotionWrapper
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm"
                >
                    © {new Date().getFullYear()} Diego Rodríguez. Crafted with precision and passion.
                </MotionWrapper>
            </div>
        </footer>
    )
}
