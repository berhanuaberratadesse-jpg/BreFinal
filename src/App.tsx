import { Book, Mail, Heart, Star, Facebook, Linkedin, Phone, ShoppingCart, Lock, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ChatBot } from './chatbot/ChatBot';
import { Checkout } from './components/Checkout';
import { ProductSelector } from './components/ProductSelector';
import { YouTubeSection } from './components/YouTubeSection';
import { AwardsSection } from './components/AwardsSection';
import { PaymentPage } from './pages/PaymentPage';
import { cartStore } from './store/cartStore';
import { Audiobook } from './pages/Audiobook';
import { Courses } from './pages/Courses';
import { Blog } from './pages/Blog';
import { AdminBlog } from './pages/AdminBlog';
import { CourseReader } from './pages/CourseReader';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    title: 'Life-Changing Experience',
    rating: 5,
    text: 'True Light gave me a perspective I wasn\'t even aware was missing. I found true facts and experiences in the book, which inspired me to understand God\'s existence and role in my life. Truly a masterpiece. Highly recommended.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'John L.',
    title: 'Inspiring and Transformative',
    rating: 5,
    text: 'This book made me open up my heart and really think about my attitude toward other people. It\'s not only a reading experience but a spiritual one that stays with you.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Emma T.',
    title: 'Profound and Enlightening',
    rating: 5,
    text: 'I couldn\'t put this book down. Berhanu\'s vulnerability and authenticity shine through every page. This is essential reading for anyone seeking spiritual growth and purpose.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Michael R.',
    title: 'A Testament to Faith',
    rating: 5,
    text: 'The honesty in these pages is refreshing. True Light addresses real struggles and offers genuine hope through Christ. I recommend this to everyone seeking answers.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Jessica K.',
    title: 'Deeply Moving',
    rating: 5,
    text: 'Berhanu\'s journey from darkness to light is incredibly inspiring. His story gave me courage to face my own challenges. A must-read for seekers of truth.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'David P.',
    title: 'Powerful Message of Hope',
    rating: 5,
    text: 'In a world full of confusion, True Light provides clarity. This book is a beacon for anyone struggling with purpose and meaning. Exceptional work.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'payment' | 'audiobook' | 'courses' | 'course-reader' | 'blog' | 'admin'>('home');
  const totalItems = cartStore.getTotalItems();

  const handleNavigation = (page: 'home' | 'audiobook' | 'courses' | 'blog', sectionId?: string) => {
    setMobileMenuOpen(false);

    if (page === 'home') {
      window.history.pushState({}, '', '/');
      setCurrentPage('home');

      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', `/${page}`);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/payment') {
      setCurrentPage('payment');
    } else if (path === '/audiobook') {
      setCurrentPage('audiobook');
    } else if (path === '/courses') {
      setCurrentPage('courses');
    } else if (path === '/courses/from-self-to-christ') {
      setCurrentPage('course-reader');
    } else if (path === '/blog' || path === '/blog/english' || path === '/blog/amharic') {
      setCurrentPage('blog');
    } else if (path === '/admin') {       // <--- ADD THIS LINE
      setCurrentPage('admin');            // <--- ADD THIS LINE
    } else {
      setCurrentPage('home');
  }
}, []);

  if (currentPage === 'payment') {
    return <PaymentPage />;
  }

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-white focus:rounded">
        Skip to main content
      </a>
      <ChatBot />
      <ProductSelector
        isOpen={productSelectorOpen}
        onClose={() => setProductSelectorOpen(false)}
        onAddToCart={() => setCartOpen(true)}
      />
      <Checkout isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <div className="min-h-screen">
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md shadow-lg z-50 border-b border-amber-500/30">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Main navigation">
            <div className="flex justify-between items-center gap-3">
              <a href="#home" className="flex items-center" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>
                <img src="/image.png" alt="Berhanu Aberra Tadesse - Home" className="h-12" />
              </a>

              <div className="hidden lg:flex items-center justify-center flex-1 mx-4 lg:mx-8 space-x-1 lg:space-x-2">
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }} className={`px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 ${currentPage === 'home' ? 'text-amber-400 bg-slate-800' : 'text-gray-300 hover:text-white hover:bg-slate-800/50'}`}>Home</a>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'about'); }} className="px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">About</a>
                <a href="#book" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'book'); }} className="px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">Book</a>

                <div className="h-5 w-px bg-slate-700 mx-2"></div>

                <a href="/audiobook" onClick={(e) => { e.preventDefault(); handleNavigation('audiobook'); }} className={`px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 ${currentPage === 'audiobook' ? 'text-amber-400 bg-slate-800' : 'text-gray-300 hover:text-white hover:bg-slate-800/50'}`}>Audiobook</a>
                <a href="/courses" onClick={(e) => { e.preventDefault(); handleNavigation('courses'); }} className={`px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 ${currentPage === 'courses' ? 'text-amber-400 bg-slate-800' : 'text-gray-300 hover:text-white hover:bg-slate-800/50'}`}>Courses</a>
                <a href="/blog" onClick={(e) => { e.preventDefault(); handleNavigation('blog'); }} className={`px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-200 ${currentPage === 'blog' ? 'text-amber-400 bg-slate-800' : 'text-gray-300 hover:text-white hover:bg-slate-800/50'}`}>Blog</a>

                <div className="h-5 w-px bg-slate-700 mx-2"></div>

                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'contact'); }} className="px-3 lg:px-4 py-2 rounded-md text-sm font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">Contact</a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProductSelectorOpen(true)}
                  className="hidden md:inline-flex items-center justify-center px-6 py-2 bg-amber-500 text-white font-bold text-sm rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  aria-label="Open product selector to order the book"
                >
                  <Book className="mr-2" size={18} />
                  Order Now
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative p-2 text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded transition-colors"
                  aria-label={`Shopping cart with ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
                >
                  <ShoppingCart size={24} />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" aria-hidden="false">
                      {totalItems}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-slate-800/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 lg:hidden"
                  aria-label="Toggle navigation menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-md lg:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">Home</a>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'about'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">About</a>
                <a href="#book" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'book'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">Book</a>
                <a href="/audiobook" onClick={(e) => { e.preventDefault(); handleNavigation('audiobook'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">Audiobook</a>
                <a href="/courses" onClick={(e) => { e.preventDefault(); handleNavigation('courses'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">Courses</a>
                <a href="/blog" onClick={(e) => { e.preventDefault(); handleNavigation('blog'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">Blog</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'contact'); }} className="rounded-lg px-3 py-2 text-base font-semibold text-gray-200 transition hover:bg-slate-800/50 hover:text-white">Contact</a>
                <button
                  onClick={() => {
                    setProductSelectorOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-600"
                >
                  <Book className="mr-2" size={18} />
                  Order Now
                </button>
              </div>
            </div>
          )}
        </header>


      <main id="main" className="pt-16">
        {currentPage === 'audiobook' && <Audiobook />}
        {currentPage === 'courses' && <Courses />}
        {currentPage === 'course-reader' && <CourseReader />}
        {currentPage === 'blog' && <Blog />}
        {currentPage === 'admin' && <AdminBlog />}

        {currentPage === 'home' && (
          <>
            <section id="home" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                  <span className="text-amber-400 text-sm font-semibold">New Release</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  True Light
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  A profound journey of spiritual awakening, faith, and the discovery of freedom through Christ.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => setProductSelectorOpen(true)}
                    className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 focus:outline-none transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                  >
                    <Book className="mr-2" size={20} />
                    Order Now
                  </button>
                  <a
                    href="https://www.amazon.com/True-Light-Berhanu-Tadesse/dp/B0DT525949"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#FF9900] text-white font-bold rounded-lg hover:bg-[#FF9900]/90 transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                  >
                    <Book className="mr-2" size={20} />
                    Amazon
                  </a>
                  <a
                    href="https://www.kobo.com/us/en/ebook/true-light-7?sId=dc15a771-1db5-437a-b56d-20b9d4d747c8&ssId=bQW1sk9Bv3L3fDiyEYCB2&cPos=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#BF0000] text-white font-bold rounded-lg hover:bg-[#BF0000]/90 transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                    Kobo
                  </a>
                  <a
                    href="https://www.barnesandnoble.com/w/true-light-berhanu-tadesse/1146870400?ean=9798891223998"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#0d3b2b] text-white font-bold rounded-lg hover:bg-[#0d3b2b]/90 transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                  >
                    <Book className="mr-2" size={20} />
                    B&N
                  </a>
                  
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20 w-full sm:w-auto"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/Book-Mock-Up-01-1.png"
                  alt="True Light Book"
                  className="w-full max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-slate-800/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl font-bold text-white mb-6">About The Author</h2>
                <h3 className="text-2xl font-semibold text-amber-400 mb-4" id="author-name">Berhanu Aberra Tadesse</h3>
                <div className="space-y-4 text-gray-200 leading-relaxed">
                  <p>
                    The author, Berhanu Aberra Tadesse, is not only a writer but also a seeker, a teacher, and an inspiration. Born in Ethiopia, Berhanu's life journey took him from a career in aviation maintenance to a profound spiritual awakening that reshaped his life.
                  </p>
                  <p>
                    In 2005, he embraced his new journey of faith with Christ, overcoming battles with depression, anxiety and inner conflict. He sought answers all his life – his relentless pursuit of truth led him to Christ, and found something far more precious: freedom.
                  </p>
                  <p>
                    Today, he is fulfilling his purpose and continues the work of the revelation, being a Bible study leader and an educator among the Ethiopian Christian community of Lynwood, Washington.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-20 transform scale-110"></div>
                  <img
                    src="/Profile.png"
                    alt="Berhanu Aberra Tadesse"
                    className="relative w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="py-20 bg-slate-800/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">The Book: True Light</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A transformative story of faith, struggle, and the journey to discovering true freedom in Christ.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src="/Group-1171276042-4.png"
                  alt="True Light Book Covers"
                  className="w-full max-w-sm drop-shadow-xl"
                />
              </div>
              <div className="md:col-span-2 space-y-6">
                <div className="bg-slate-700/60 p-8 rounded-xl shadow-lg border border-amber-500/20 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <Heart className="text-amber-400 mr-3" size={28} />
                    A Journey of Transformation
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    "True Light" is more than just a book—it's a testament to the power of faith and the transformative journey from darkness to light. Through personal experience and biblical wisdom, Berhanu shares how encountering Christ brought freedom from depression, anxiety, and spiritual bondage.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-600/40 p-4 rounded-lg border border-slate-500/30">
                      <h4 className="font-semibold text-white mb-2">Authentic Story</h4>
                      <p className="text-sm text-gray-300">A genuine account of spiritual awakening and personal transformation</p>
                    </div>
                    <div className="bg-slate-600/40 p-4 rounded-lg border border-slate-500/30">
                      <h4 className="font-semibold text-white mb-2">Biblical Foundation</h4>
                      <p className="text-sm text-gray-300">Rooted in scripture and revealed truth</p>
                    </div>
                    <div className="bg-slate-600/40 p-4 rounded-lg border border-slate-500/30">
                      <h4 className="font-semibold text-white mb-2">Practical Wisdom</h4>
                      <p className="text-sm text-gray-300">Insights for overcoming life's challenges through faith</p>
                    </div>
                    <div className="bg-slate-600/40 p-4 rounded-lg border border-slate-500/30">
                      <h4 className="font-semibold text-white mb-2">Hope & Freedom</h4>
                      <p className="text-sm text-gray-300">A message of liberation and new beginnings</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button
                      onClick={() => setProductSelectorOpen(true)}
                      className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 focus:outline-none transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                    >
                      <Book className="mr-2" size={20} />
                      Order Now
                    </button>
                    <a
                      href="https://www.amazon.com/True-Light-Berhanu-Tadesse/dp/B0DT525949"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#FF9900] text-white font-bold rounded-lg hover:bg-[#FF9900]/90 transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                    >
                      <Book className="mr-2" size={20} />
                      Amazon
                    </a>
                    <a
                      href="https://www.kobo.com/us/en/ebook/true-light-7?sId=dc15a771-1db5-437a-b56d-20b9d4d747c8&ssId=bQW1sk9Bv3L3fDiyEYCB2&cPos=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#BF0000] text-white font-bold rounded-lg hover:bg-[#BF0000]/90 transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                      Kobo
                    </a>
                    <a
                      href="https://www.barnesandnoble.com/w/true-light-berhanu-tadesse/1146870400?ean=9798891223998"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#0d3b2b] text-white font-bold rounded-lg hover:bg-[#0d3b2b]/90 transition-all transform hover:scale-105 shadow-md flex-1 min-w-[140px]"
                    >
                      <Book className="mr-2" size={20} />
                      B&N
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <YouTubeSection />

        <AwardsSection />

        <section id="testimonials" className="py-20 bg-slate-800/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Testimonials: What Our Readers Say</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover how True Light has transformed lives and inspired spiritual growth.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-slate-700/60 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-amber-500/20 backdrop-blur-sm"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name} - ${testimonial.title}`}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-amber-400 font-medium">{testimonial.title}</p>
                      </div>
                    </div>
                    <div aria-label={`${testimonial.rating} out of 5 stars`}>
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="text-gray-200 leading-relaxed mt-4">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

              <section id="contact" className="py-20 bg-slate-900/90 text-white backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Contact: Get In Touch</h2>
              <p className="text-xl text-gray-300">
                Have questions or want to connect? Reach out to learn more about "True Light" and Berhanu's ministry work.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 max-w-2xl mx-auto">
              <form action="https://formsubmit.co/truelight@berhanutadesse.com" method="POST" className="space-y-6">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={window.location.href} />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-8 py-4 bg-amber-500 text-white font-bold text-lg rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Mail className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
        )}
      </main>

      <footer className="bg-slate-900/95 backdrop-blur-sm text-gray-300 py-16 border-t border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-8">
                <img src="/image.png" alt="Berhanu Aberra Tadesse Logo" className="h-16 mb-4" />
                <p className="text-sm text-gray-300 leading-relaxed">
                  Berhanu Aberra Tadesse is a voice of transformation, encouraging people to seek the truth and light through faith. As an author, a teacher, and a Bible study leader, he is devoted to revealing the path of spiritual growth and helping others find their calling.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-amber-400 font-bold text-lg mb-6">Useful Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors text-sm">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors text-sm">About Me</a></li>
                <li><a href="#book" className="text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors text-sm">About Book</a></li>
                <li><a href="#videos" className="text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors text-sm">Videos</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors text-sm">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors text-sm">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 font-bold text-lg mb-6">Connect With Us</h4>
              <p className="text-sm text-gray-300 mb-4">Feel Free To Contact Us</p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/Berhanutedesseofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-amber-500 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-110"
                  aria-label="Visit our Facebook page"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/berhanu-tedesse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-amber-500 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-110"
                  aria-label="Visit our LinkedIn page"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.pinterest.com/berhanutedesse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-amber-500 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all transform hover:scale-110"
                  aria-label="Visit our Pinterest page"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 12s1.5-2 4-2c2.6 0 3 2 3 4s-.4 3-2 4c-1.5 1-3.5 0-3.5 0"></path><path d="M12 16v2"></path></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-amber-400 font-bold text-lg mb-6">Contact Info</h4>
              <p className="text-sm text-gray-300 mb-4">Speak With Our Consultant Now</p>
              <div className="space-y-4">
                <a
                  href="mailto:truelight@berhanutadesse.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors group"
                >
                  <div className="bg-slate-700 group-hover:bg-amber-500 p-2 rounded-full transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400 text-xs">Email</p>
                    <p>truelight@berhanutadesse.com</p>
                  </div>
                </a>
                <a
                  href="tel:+14258794630"
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 transition-colors group"
                >
                  <div className="bg-slate-700 group-hover:bg-amber-500 p-2 rounded-full transition-colors">
                    <Phone size={18} />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p>425-879-4630</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="text-center group relative inline-block mx-auto">
              <p className="text-gray-400 text-sm mb-2">&copy; 2024 Berhanu Aberra Tadesse. All rights reserved.</p>
              <p className="text-gray-500 text-xs">Bible study leader and educator in the Ethiopian Christian community of Lynwood, Washington</p>
              <button 
                onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/admin'); setCurrentPage('admin'); window.scrollTo(0, 0); }}
                className="absolute inset-y-0 -right-8 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-700 hover:text-amber-500 focus:outline-none flex items-center justify-center cursor-pointer"
                aria-label="Admin Access"
                title="Admin Login"
              >
                <Lock size={14} />
              </button>
            </div>
          </div>
        </div>
      </footer>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
