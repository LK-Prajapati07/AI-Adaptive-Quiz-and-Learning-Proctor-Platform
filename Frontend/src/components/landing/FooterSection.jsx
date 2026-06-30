export default function FooterSection() {
  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Quiz Genius</div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">AI-powered adaptive learning platform transforming how people learn and assess knowledge.</p>
            <div className="flex gap-3 mt-4">{["𝕏", "in", "f"].map((s, i) => (
              <div key={i} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer transition-all">{s}</div>
            ))}</div>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Analytics", "Integrations"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Blog"] },
            { title: "Resources", links: ["Documentation", "Help Center", "API", "Community"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">{col.links.map((link, j) => (
                <li key={j}><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">{link}</a></li>
              ))}</ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">&copy; {new Date().getFullYear()} Quiz Genius. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>⭐ 4.9/5 Rating</span>
            <span>15,000+ Learners</span>
            <span>98% Satisfaction</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
