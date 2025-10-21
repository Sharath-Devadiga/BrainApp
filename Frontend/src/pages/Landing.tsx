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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src="/brain.png" alt="Brain Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-2xl sm:text-3xl font-bold text-indigo-500">Brain</span>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <a
                href="/signin"
                className="px-3 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base border-2 border-indigo-500 text-indigo-500 rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition-all"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-3 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
            Your Second Brain for<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Everything That Matters
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Save, organize, and share valuable content from YouTube, Twitter, and your notes. Build your personal knowledge base and share it with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="/signup"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-indigo-500 text-white rounded-lg text-base sm:text-lg font-medium hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-indigo-500 text-indigo-500 rounded-lg text-base sm:text-lg font-medium hover:bg-indigo-500 hover:text-white transition-all text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            Why Brain App?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📌</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Save Anything</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Bookmark content from YouTube, Twitter, and create personal notes. Keep all your valuable information in one secure place.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🗂️</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Stay Organized</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Organize your content with tags and collections. Find what you need instantly with powerful search and filters.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔗</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Share Your Brain</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Share your curated collections with others. Let people explore your knowledge and insights effortlessly.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔒</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Secure & Private</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Your data is encrypted and secure. Control what you share and keep your private thoughts private.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Optimized for speed and performance. Access your content instantly, anywhere, anytime.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-xl transition-all">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📱</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Works Everywhere</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Fully responsive design works seamlessly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Build Your Second Brain?
          </h2>
          <p className="text-lg sm:text-xl text-indigo-100 mb-8 sm:mb-10 px-4">
            Join thousands of users who are already organizing their digital lives.
          </p>
          <a
            href="/signup"
            className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg text-base sm:text-lg font-bold hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Start For Free Today
          </a>
        </div>
      </section>

      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <img src="/brain.png" alt="Brain Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-2xl sm:text-3xl font-bold text-white">Brain</span>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
            Your second brain for everything that matters
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Brain App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}