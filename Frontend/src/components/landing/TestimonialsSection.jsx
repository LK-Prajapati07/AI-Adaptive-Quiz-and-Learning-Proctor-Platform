import { motion } from "framer-motion"
import FadeInView from "@/components/animations/FadeInView"
import Badge from "@/components/landing/Badge"
import { testimonialsData } from "@/components/landing/HomeData"

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <FadeInView className="text-center max-w-3xl mx-auto mb-16">
        <Badge label="❤️ Loved by Thousands" color="amber" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          What Our{" "}
          <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Users Say</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1">{Array(5).fill(0).map((_, s) => <span key={s} className="text-yellow-400 text-lg">★</span>)}</div>
          <span className="text-sm text-gray-500 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">4.9</strong>/5 · 15,000+ Happy Learners</span>
        </div>
      </FadeInView>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsData.map((t, i) => (
          <FadeInView key={i} delay={i * 0.08}>
            <motion.div whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl hover:shadow-violet-600/5 hover:border-violet-200 dark:hover:border-violet-700/30 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">{Array.from({ length: t.rating }).map((_, si) => <span key={si} className="text-yellow-400 text-sm">★</span>)}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-semibold text-sm`}>{t.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
