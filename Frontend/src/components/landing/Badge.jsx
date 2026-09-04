import { motion } from "framer-motion"

export default function Badge({ label, color = "violet" }) {
  const colors = { violet: "from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border-violet-200/50 dark:border-violet-700/30 text-violet-600 dark:text-violet-400", amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200/50 dark:border-amber-700/30 text-amber-600 dark:text-amber-400", emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-700/30 text-emerald-600 dark:text-emerald-400", blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200/50 dark:border-blue-700/30 text-blue-600 dark:text-blue-400" }
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors[color] || colors.violet} border mb-4`}>
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  )
}
