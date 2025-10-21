import React from 'react';

export default function Landing() {
  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-3xl font-bold text-indigo-500">🧠 Brain</div>
            <div className="flex gap-4">
              <a
                href="/signin"
                className="px-6 py-2.5 border-2 border-indigo-500 text-indigo-500 rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition-all"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-6 py-2.5 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Your Second Brain for<br />Everything That Matters
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Save, organize, and share valuable content from YouTube, Twitter, and your notes. Build your personal knowledge base and share it with the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/signup"
              className="px-10 py-4 bg-indigo-500 text-white rounded-lg text-lg font-medium hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="px-10 py-4 border-2 border-indigo-500 text-indigo-500 rounded-lg text-lg font-medium hover:bg-indigo-500 hover:text-white transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Brain App?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">📌</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Save Anything</h3>
              <p className="text-gray-600 leading-relaxed">
                Bookmark content from YouTube, Twitter, and create personal notes. Keep all your valuable information in one secure place.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🗂️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Organized</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize your content with tags and collections. Find what you need instantly with powerful search and filters.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share Your Brain</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your curated collections with others. Let people explore your knowledge and insights effortlessly.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is encrypted and secure. Control what you share and keep your private thoughts private.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your content instantly from any device. No lag, no waiting, just pure productivity.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Focus on What Matters</h3>
              <p className="text-gray-600 leading-relaxed">
                Stop losing valuable content. Build your personal library of insights and never forget important information again.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Brain?</h2>
          <p className="text-xl mb-10 opacity-95">
            Join thousands of users who are organizing their digital life with Brain App
          </p>
          <a
            href="/signup"
            className="inline-block px-10 py-4 bg-white text-indigo-500 rounded-lg text-lg font-medium hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            Start Your Free Account
          </a>
        </div>
      </section>

      <footer className="py-8 px-6 bg-gray-900 text-white text-center">
        <p>&copy; 2025 Brain App. All rights reserved.</p>
      </footer>
    </div>
  );
}