import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to the Help Center
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Find answers to common questions or contact us for more help.
        </p>
      </div>

      <div className="mt-12 max-w-md mx-auto space-y-4">
        <Link href="/help/faqs">
          <li className="list-none bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 px-6 py-4 rounded-xl shadow-md transition-all cursor-pointer text-center text-blue-600 dark:text-blue-400 font-medium">
            FAQs
          </li>
        </Link>

        <Link href="/help/contact">
          <li className="list-none bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 px-6 py-4 rounded-xl shadow-md transition-all cursor-pointer text-center text-blue-600 dark:text-blue-400 font-medium">
            Contact Us
          </li>
        </Link>

        <Link href="/help/privacy">
          <li className="list-none bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 px-6 py-4 rounded-xl shadow-md transition-all cursor-pointer text-center text-blue-600 dark:text-blue-400 font-medium">
            Privacy Policy
          </li>
        </Link>
      </div>
    </div>
  );
}
