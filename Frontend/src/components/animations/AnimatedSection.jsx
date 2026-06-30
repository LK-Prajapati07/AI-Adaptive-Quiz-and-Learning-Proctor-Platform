import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

const variants = { fadeInUp, fadeInLeft, fadeInRight, scaleIn }

export default function AnimatedSection({
  children,
  variant = "fadeInUp",
  delay = 0,
  className = "",
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
