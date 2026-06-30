export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quiz Genius
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              AI-powered adaptive learning platform that personalizes your educational journey with intelligent assessments and proctoring.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>support@quizgenius.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Quiz Genius. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
