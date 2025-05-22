import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | VSK Technology",
  description:
    "The page you are looking for does not exist. Return to our homepage for appliance repair services.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-lg text-center max-w-md mb-8">
        The page you are looking for doesn`t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
