import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const dirMap = {
  up: { y: 60 }, down: { y: -60 }, left: { x: -60 }, right: { x: 60 },
}

export default function FadeInView({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...(dirMap[direction] || dirMap.up) }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
