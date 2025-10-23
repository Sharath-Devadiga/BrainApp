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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform">
              <img src="/brain.png" alt="Brain Logo" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md" />
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Brain</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="/signin"
                className="px-3 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base border-2 border-indigo-500 text-indigo-600 rounded-xl font-bold hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-md"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-3 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-indigo-600 hover:shadow-xl hover:scale-105 transition-all active:scale-95 shadow-lg"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Your Second Brain for<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Everything That Matters</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed font-medium">
            Save, organize, and share valuable content from YouTube, Twitter, and your notes. Build your personal knowledge base and share it with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="/signup"
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl text-base sm:text-lg font-bold hover:from-indigo-700 hover:to-indigo-600 hover:shadow-2xl hover:scale-105 transition-all active:scale-95 shadow-xl text-center"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-indigo-500 text-indigo-600 rounded-xl text-base sm:text-lg font-bold hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-lg text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Why Brain App?
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-base sm:text-lg max-w-2xl mx-auto">
            The smartest way to manage your digital knowledge
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border-2 border-indigo-100 hover:border-indigo-400 hover:scale-105 hover:shadow-2xl transition-all">
              <div className="text-4xl sm:text-5xl mb-4">📌</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Save Anything</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Bookmark content from YouTube, Twitter, and create personal notes. Keep all your valuable information in one secure place.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border-2 border-purple-100 hover:border-purple-400 hover:scale-105 hover:shadow-2xl transition-all">
              <div className="text-4xl sm:text-5xl mb-4">🗂️</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Stay Organized</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Organize your content with tags and collections. Find what you need instantly with powerful search and filters.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100 hover:border-blue-400 hover:scale-105 hover:shadow-2xl transition-all">
              <div className="text-4xl sm:text-5xl mb-4">🔗</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Share Your Brain</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Share your curated collections with others. Let people explore your knowledge and insights effortlessly.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border-2 border-green-100 hover:border-green-400 hover:scale-105 hover:shadow-2xl transition-all">
              <div className="text-4xl sm:text-5xl mb-4">🔒</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Secure & Private</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Your data is encrypted and secure. Control what you share and keep your private thoughts private.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border-2 border-yellow-100 hover:border-yellow-400 hover:scale-105 hover:shadow-2xl transition-all">
              <div className="text-4xl sm:text-5xl mb-4">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Optimized for speed and performance. Access your content instantly, anywhere, anytime.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-pink-50 to-white rounded-2xl border-2 border-pink-100 hover:border-pink-400 hover:scale-105 hover:shadow-2xl transition-all">
              <div className="text-4xl sm:text-5xl mb-4">📱</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Works Everywhere</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Fully responsive design works seamlessly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Ready to Build Your Second Brain?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-8 sm:mb-10 px-4 font-medium">
            Join thousands of users who are already organizing their digital lives.
          </p>
          <a
            href="/signup"
            className="inline-block px-10 sm:px-14 py-4 sm:py-5 bg-white text-indigo-600 rounded-xl text-base sm:text-lg font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all active:scale-95 shadow-xl"
          >
            Start For Free Today
          </a>
        </div>
      </section>

      <footer className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <img src="/brain.png" alt="Brain Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg" />
            <span className="text-2xl sm:text-3xl font-bold text-white">Brain</span>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 font-medium">
            Your second brain for everything that matters
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-10 text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
            <a href="#" className="hover:text-white font-semibold transition-colors hover:scale-105">Privacy</a>
            <a href="#" className="hover:text-white font-semibold transition-colors hover:scale-105">Terms</a>
            <a href="#" className="hover:text-white font-semibold transition-colors hover:scale-105">Contact</a>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            © 2025 Brain App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}