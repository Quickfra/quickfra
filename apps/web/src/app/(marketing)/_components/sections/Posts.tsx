"use client"

import { motion } from "framer-motion"
import PostCard, { type Post } from "../PostCard"

const posts: Post[] = [
    {
        id: 1,
        content:
            "Just shipped a new microservice that handles 10k requests/second with sub-10ms latency. The secret? Proper connection pooling and smart caching strategies. 🚀",
        timestamp: "2h",
        likes: 234,
        retweets: 45,
        replies: 12,
    },
    {
        id: 2,
        content:
            "Hot take: Your database is probably not the bottleneck. It's usually the N+1 queries you're not seeing. Profile first, optimize second. 📊",
        timestamp: "1d",
        likes: 567,
        retweets: 89,
        replies: 34,
    },
    {
        id: 3,
        content:
            "Building developer tools is like designing for yourself, but 10x more critical. Every millisecond of friction compounds across thousands of daily interactions. ⚡",
        timestamp: "3d",
        likes: 892,
        retweets: 156,
        replies: 67,
    },
]

export default function PostsSection() {
    return (
        <section id="now" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">LATEST UPDATES</h2>
                    <p className="text-xl text-gray-400">Real-time thoughts from @quickfra</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <PostCard key={post.id} post={post} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
