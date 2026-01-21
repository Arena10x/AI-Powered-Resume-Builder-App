import React, { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-all duration-500">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-50 shadow-lg">
          <h1 className="text-xl font-bold tracking-wide">AI Resume Builder</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 rounded-lg text-sm hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
            >
              {dark ? "Light" : "Dark"}
            </button>

            <UserButton />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center mt-20 px-6 animate-fade-in relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl -z-10"></div>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Build Professional Resume With AI 🚀
          </h2>

          <p className="max-w-2xl mx-auto text-lg opacity-80 mb-10">
            Create modern resumes, download instantly, and share with recruiters using AI powered automation.
          </p>

          <div className="flex justify-center gap-6">
            <Button
              className="px-8 py-6 text-lg backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 shadow-lg"
              onClick={() => navigate("/dashboard")}
            >
              Go To Dashboard
            </Button>

            <Button
              variant="outline"
              className="px-8 py-6 text-lg backdrop-blur-sm bg-transparent border border-white/30 dark:border-gray-600/30 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 shadow-lg"
              onClick={() => navigate("/dashboard")}
            >
              Create Resume
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 px-10 mt-24 text-center">
          {[
            "AI Resume Generator",
            "One Click Download",
            "Share Resume Link",
          ].map((item, i) => (
            <div
              key={i}
              className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 p-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition hover:bg-white/20 dark:hover:bg-gray-800/20"
            >
              <h3 className="text-xl font-bold mb-2">{item}</h3>
              <p className="opacity-80">
                Smart resume building experience with AI intelligence.
              </p>
            </div>
          ))}
        </section>

        {/* Pricing */}
        <section className="mt-32 px-10 text-center">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pricing Plans</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Free", price: "₹0", desc: "Basic resume creation" },
              { title: "Pro", price: "₹299", desc: "AI + PDF Export" },
              { title: "Premium", price: "₹599", desc: "Unlimited resumes" },
            ].map((plan, i) => (
              <div
                key={i}
                className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 p-8 rounded-xl hover:shadow-xl transition hover:bg-white/20 dark:hover:bg-gray-800/20"
              >
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-3xl mb-4">{plan.price}</p>
                <p className="opacity-70 mb-6">{plan.desc}</p>
                <Button className="w-full backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300">Choose Plan</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-32 px-10 text-center">
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">User Testimonials</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Best resume builder ever!",
              "Got interview calls quickly.",
              "Very professional resume output.",
            ].map((text, i) => (
              <div
                key={i}
                className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:bg-white/20 dark:hover:bg-gray-800/20"
              >
                <p className="italic mb-4">"{text}"</p>
                <h4 className="font-bold">User {i + 1}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 border-t border-white/20 dark:border-gray-700/20 p-6 text-center opacity-70">
          © 2026 AI Resume Builder. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

export default Home;
