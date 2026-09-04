import { motion } from "framer-motion"

const shapes = [
  { icon: "📚", x: "10%", y: "10%", delay: 0 },
  { icon: "🎯", x: "85%", y: "15%", delay: 0.3 },
  { icon: "🧠", x: "15%", y: "60%", delay: 0.6 },
  { icon: "⭐", x: "90%", y: "70%", delay: 0.9 },
  { icon: "💡", x: "50%", y: "5%", delay: 1.2 },
  { icon: "🏆", x: "5%", y: "80%", delay: 1.5 },
  { icon: "🎓", x: "80%", y: "40%", delay: 1.8 },
  { icon: "🚀", x: "45%", y: "85%", delay: 2.1 },
]

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {shapes.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-4xl opacity-20 dark:opacity-10"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}
