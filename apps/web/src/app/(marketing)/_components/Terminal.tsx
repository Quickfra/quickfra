"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Command {
    command: string
    output: string[]
}

export default function InteractiveTerminal() {
    const [input, setInput] = useState("")
    const [history, setHistory] = useState<Command[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    const commands = {
        "!skills": [
            "Backend Development: Node.js, Python, Go",
            "Databases: PostgreSQL, Redis, MongoDB",
            "Cloud: AWS, Docker, Kubernetes",
            "Tools: Git, GitHub Actions, Terraform",
            "APIs: REST, GraphQL, gRPC",
        ],
        "!projects": [
            "ScaleForge - Microservices platform (50k+ users)",
            "DevTools Suite - Developer productivity tools",
            "CloudSync - Real-time data synchronization",
            "APIGateway - High-performance API management",
        ],
        "!stats": [
            "Years of Experience: 8+",
            "Projects Delivered: 50+",
            "GitHub Stars: 2.3k+",
            "Uptime Achievement: 99.9%",
            "Team Size Led: 12 developers",
        ],
        "!contact": [
            "Email: diego@example.com",
            "LinkedIn: /in/diego-rodriguez-dev",
            "GitHub: @quickfra",
            "Location: Remote / San Francisco",
        ],
        "!help": [
            "Available commands:",
            "!skills - View technical skills",
            "!projects - See featured projects",
            "!stats - Performance metrics",
            "!contact - Get in touch",
            "!clear - Clear terminal",
        ],
        "!clear": [
        ],
    }

    const availableCommands = Object.keys(commands)

    useEffect(() => {
        if (input) {
            const filtered = availableCommands.filter((cmd) => cmd.toLowerCase().includes(input.toLowerCase()))
            setSuggestions(filtered)
        } else {
            setSuggestions([])
        }
    }, [input, availableCommands])

    const typeText = async (text: string[]) => {
        setIsTyping(true)
        const newCommand: Command = { command: input, output: [] }

        for (let i = 0; i < text.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            newCommand.output.push(text[i])
            setHistory((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { ...newCommand }
                return updated
            })
        }
        setIsTyping(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        if (input.toLowerCase() === "!clear") {
            setHistory([])
            setInput("")
            return
        }

        const command = input.toLowerCase()
        const output = commands[command as keyof typeof commands] || [
            'Command not found. Type "!help" for available commands.',
        ]

        setHistory((prev) => [...prev, { command: input, output: [] }])
        setInput("")

        await typeText(output)

        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion)
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            if (suggestions.length > 0) {
                setInput(suggestions[0])
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 font-mono text-sm h-96 flex flex-col"
        >
            <div className="flex items-center mb-4 pb-2 border-b border-white/10">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-gray-400">diego@portfolio:~$</span>
            </div>

            <div ref={terminalRef} className="flex-1 overflow-y-auto mb-4 space-y-2">
                <div className="text-green-400 mb-4">
                    Welcome to Diego&apos;s interactive terminal. Type &quot;!help&quot; to see available commands.
                </div>

                <AnimatePresence>
                    {history.map((cmd, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-1"
                        >
                            <div className="text-blue-400">$ {cmd.command}</div>
                            {cmd.output.map((line, lineIndex) => (
                                <motion.div
                                    key={lineIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: lineIndex * 0.1 }}
                                    className="text-gray-300 pl-2"
                                >
                                    {line}
                                </motion.div>
                            ))}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                        className="text-gray-400"
                    >
                        Typing...
                    </motion.div>
                )}
            </div>

            {suggestions.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                        <motion.button
                            key={suggestion}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-gray-300 transition-colors"
                        >
                            {suggestion}
                        </motion.button>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-blue-400 mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white"
                    placeholder="Type a command..."
                    autoFocus
                />
                <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    className="w-2 h-4 bg-white ml-1"
                />
            </form>
        </motion.div>
    )
}
