import { motion } from "framer-motion"
import FadeInView from "@/components/animations/FadeInView"
import CountUp from "@/components/animations/CountUp"

const stats = [
  { label: "Active Students", end: 15000, suffix: "+", icon: "🎓" },
  { label: "AI Quizzes", end: 2500, suffix: "+", icon: "🤖" },
  { label: "Success Rate", end: 98, suffix: "%", icon: "⭐" },
  { label: "Countries", end: 50, suffix: "+", icon: "🌍" },
]

export default function StatsSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <FadeInView>
        <div className="relative rounded-3xl bg-gradient-to-br from-violet-50/80 via-blue-50/80 to-cyan-50/80 dark:from-violet-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 backdrop-blur-xl border border-violet-100/50 dark:border-violet-800/30 p-8 lg:p-12 overflow-hidden">
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInView>
    </section>
  )
}
