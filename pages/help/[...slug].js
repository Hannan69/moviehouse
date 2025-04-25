import { useRouter } from "next/router";

export default function CatchingRoutes() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null; // Handle initial undefined state

  const page = slug[0];

  const renderContent = () => {
    switch (page) {
      case "faqs":
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">FAQs</h1>
            <p className="text-gray-600 mt-2">Here are answers to frequently asked questions.</p>
          </div>
        );
      case "contact":
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-700">Contact Us</h1>
            <p className="text-gray-600 mt-2">Reach out to us via email or phone.</p>
          </div>
        );
      case "privacy":
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-700">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Learn how we handle and protect your data.</p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="text-gray-500 mt-2">The page you’re looking for doesn’t exist.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full">
        {renderContent()}
      </div>
    </div>
  );
}
