"use client"

import { motion } from "framer-motion"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"

interface Post {
    id: number
    content: string
    timestamp: string
    likes: number
    retweets: number
    replies: number
}

interface PostCardProps {
    post: Post
    index: number
}

export default function PostCard({ post, index }: PostCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col h-full"
        >
            <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                    D
                </div>
                <div>
                    <div className="font-semibold">Diego Rodríguez</div>
                    <div className="text-gray-400 text-sm">@quickfra · {post.timestamp}</div>
                </div>
            </div>

            <p className="text-gray-200 leading-relaxed mb-4 flex-grow">{post.content}</p>

            <div className="flex items-center justify-between text-gray-400 text-sm mt-auto">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                    <Heart size={16} />
                    {post.likes}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                    <MessageCircle size={16} />
                    {post.replies}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                    <Repeat2 size={16} />
                    {post.retweets}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:text-white transition-colors"
                >
                    <Share size={16} />
                </motion.button>
            </div>
        </motion.div>
    )
}

export type { Post }
