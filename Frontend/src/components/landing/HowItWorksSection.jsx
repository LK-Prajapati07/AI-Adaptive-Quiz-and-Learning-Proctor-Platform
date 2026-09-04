import { motion, AnimatePresence } from "framer-motion"
import FadeInView from "@/components/animations/FadeInView"
import SectionHeading from "@/components/landing/SectionHeading"
import { stepsData } from "@/components/landing/HomeData"

export default function HowItWorksSection({ activeStep, setActiveStep }) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <SectionHeading badge="🚀 Simple Process" title="How It Works in 4 Easy Steps" />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-4">
          {stepsData.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              onClick={() => setActiveStep(i)}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeStep === i ? "bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/30 dark:to-blue-900/30 border border-violet-200 dark:border-violet-700/50 shadow-lg shadow-violet-600/10" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-700/30"}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${activeStep === i ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"}`}>{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1"><span className={`text-xs font-bold tracking-wider ${activeStep === i ? "text-violet-600 dark:text-violet-400" : "text-gray-400"}`}>{step.num}</span></div>
                  <h3 className={`font-semibold text-lg ${activeStep === i ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{step.title}</h3>
                  <p className={`text-sm mt-1 ${activeStep === i ? "text-gray-600 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>{step.desc}</p>
                </div>
                {activeStep === i && <motion.div layoutId="active-indicator" className="w-2 h-2 rounded-full bg-violet-500 mt-2" />}
              </div>
            </motion.div>
          ))}
        </div>
        <FadeInView direction="right" className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.4 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-bl-full" />
              <div className="relative">
                <div className="text-6xl mb-6">{stepsData[activeStep].icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{stepsData[activeStep].title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{stepsData[activeStep].desc}</p>
                <div className="space-y-3">
                  {["AI-powered question generation", "Real-time adaptive difficulty", "Instant feedback and analytics", "Secure proctored environment"].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs shrink-0">✓</div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeInView>
      </div>
    </section>
  )
}
