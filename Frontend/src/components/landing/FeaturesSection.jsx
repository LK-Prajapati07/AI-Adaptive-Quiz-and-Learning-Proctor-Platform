import { motion } from "framer-motion"
import FadeInView from "@/components/animations/FadeInView"
import SectionHeading from "@/components/landing/SectionHeading"
import { featuresData } from "@/components/landing/HomeData"

export default function FeaturesSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <SectionHeading badge="✨ Powerful Features" title="Everything You Need to Learn Better with AI" subtitle="Our AI-powered platform provides all the tools you need to learn effectively and grow continuously." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map((f, i) => (
          <FadeInView key={i} delay={i * 0.08}>
            <motion.div whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-transparent transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `radial-gradient(600px circle at 50% 50%, ${f.glow}, transparent 80%)` }} />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                <motion.button whileHover={{ x: 4 }} className="mt-4 text-sm font-medium text-violet-600 dark:text-violet-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">Learn more <span className="text-lg leading-none">→</span></motion.button>
              </div>
            </motion.div>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
