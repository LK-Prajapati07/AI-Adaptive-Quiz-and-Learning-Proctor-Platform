import { motion } from "framer-motion"

const blobs = [
  { size: 300, top: "10%", left: "5%", color: "from-violet-500/20 to-purple-600/10", dur: 8, delay: 0 },
  { size: 250, top: "60%", right: "10%", color: "from-blue-500/20 to-cyan-500/10", dur: 10, delay: 2 },
  { size: 200, top: "30%", right: "30%", color: "from-rose-500/15 to-pink-600/10", dur: 12, delay: 4 },
  { size: 180, bottom: "15%", left: "20%", color: "from-amber-500/15 to-yellow-600/10", dur: 9, delay: 1 },
]

export default function FloatingBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${b.color} blur-3xl`}
          style={{ width: b.size, height: b.size, top: b.top, left: b.left, right: b.right, bottom: b.bottom }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
