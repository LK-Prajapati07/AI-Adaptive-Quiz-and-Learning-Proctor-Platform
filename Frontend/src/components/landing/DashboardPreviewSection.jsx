import { motion } from "framer-motion"
import FadeInView from "@/components/animations/FadeInView"
import SectionHeading from "@/components/landing/SectionHeading"

const dashboards = [
  { title: "Analytics Dashboard", desc: "Track performance with detailed metrics and visual reports", emoji: "📊", color: "from-violet-500 to-purple-600" },
  { title: "Quiz Creation", desc: "Create and manage quizzes with AI-powered question generation", emoji: "📝", color: "from-blue-500 to-cyan-500" },
  { title: "Leaderboard", desc: "Gamified rankings to boost engagement and friendly competition", emoji: "🏆", color: "from-amber-500 to-orange-600" },
  { title: "Student Progress", desc: "Detailed progress tracking with AI-generated improvement tips", emoji: "📈", color: "from-emerald-500 to-green-600" },
]

export default function DashboardPreviewSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <SectionHeading badge="📊 Live Preview" title="Powerful Dashboards at Your Fingertips" />
      <div className="grid md:grid-cols-2 gap-6">
        {dashboards.map((item, i) => (
          <FadeInView key={i} delay={i * 0.08}>
            <motion.div whileHover={{ y: -4, scale: 1.01 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl hover:shadow-violet-600/5 transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/5 to-blue-500/5 rounded-bl-full group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg`}>{item.emoji}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex gap-2">
                  {[40, 70, 55, 85, 60].map((h, j) => (
                    <motion.div key={j} initial={{ height: 0 }} whileInView={{ height: h }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.05, duration: 0.5 }}
                      className={`flex-1 rounded-t-lg bg-gradient-to-t ${item.color} opacity-60`} style={{ height: h, maxHeight: 60 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
