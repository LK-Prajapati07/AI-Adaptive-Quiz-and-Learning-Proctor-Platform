import FadeInView from "@/components/animations/FadeInView"
import Badge from "@/components/landing/Badge"

export default function SectionHeading({ badge, title, subtitle }) {
  return (
    <FadeInView className="text-center max-w-3xl mx-auto mb-16">
      <Badge label={badge} />
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </FadeInView>
  )
}
