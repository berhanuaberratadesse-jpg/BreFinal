import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export function AwardsSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const awards = [
    { id: 2, image: '/awards/A97757E5-5B21-4FFE-AEEC-C88812FE8A3A.jpg', title: 'Award Recognition', description: 'Featured honor from the current collection' },
    { id: 3, image: '/awards/D395EDA2-F7AD-4A7A-8710-8691BA288362.jpg', title: 'Award Recognition', description: 'Featured honor from the current collection' },
    { id: 4, image: '/awards/E02462F7-8948-42A4-A02B-5B136580ADCA.jpg', title: 'International Impact Book Award', description: 'Recognized for outstanding literary achievement' },
    { id: 5, image: '/awards/E82DA4C3-620C-4E80-91FA-A2CCC7DB42A3.jpg', title: 'Award Recognition', description: 'Featured honor from the current collection' },
    { id: 6, image: '/awards/Screenshot_20260512_102034_Gallery.JPG', title: 'Award Recognition', description: 'Professional achievement celebration' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + awards.length) % awards.length);
  };

  const getVisibleAwards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(awards[(currentSlide + i) % awards.length]);
    }
    return visible;
  };

  return (
    <section id="awards" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-amber-400 font-semibold text-lg">Recognition & Honors</span>
          </div>
          <h2 className="text-5xl font-bold mb-4 text-amber-400">
            Awards & Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            "True Light: A Journey from Darkness to Light" has been honored with prestigious international awards recognizing its impact and excellence
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {awards.map((award, index) => (
            <div
              key={award.id}
              onClick={() => setSelectedImage(index)}
              className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-72 overflow-hidden rounded-xl bg-slate-900 border-2 border-amber-400/30 hover:border-amber-400 transition-all">
                <img
                  src={award.image}
                  alt={award.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full p-4">
                    <h3 className="text-lg font-bold text-amber-300">{award.title}</h3>
                    <p className="text-sm text-gray-200">{award.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel View */}
        <div className="lg:hidden mb-8">
          <div className="relative">
            {/* Carousel Items */}
            <div className="flex gap-4 overflow-hidden">
              {getVisibleAwards().map((award, index) => (
                <div
                  key={award.id}
                  className="flex-shrink-0 w-full sm:w-1/2 cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setSelectedImage(awards.indexOf(award))}
                >
                  <div className="relative h-64 rounded-xl overflow-hidden bg-slate-900 border-2 border-amber-400/30 hover:border-amber-400 transition-all group">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="w-full p-3">
                        <h3 className="text-base font-bold text-amber-300">{award.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-all transform hover:scale-110 shadow-lg"
              aria-label="Previous award"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-all transform hover:scale-110 shadow-lg"
              aria-label="Next award"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-amber-400 w-8' : 'bg-amber-400/40 w-2'
                }`}
                aria-label={`Go to award ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-amber-400/20">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">2</div>
              <p className="text-gray-400">International Awards</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">Global</div>
            <p className="text-gray-400">Recognition</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">Faith</div>
            <p className="text-gray-400">& Excellence</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400 mb-2">2026</div>
            <p className="text-gray-400">Celebrating Today</p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors p-2"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Image Container */}
            <div className="relative bg-slate-900 rounded-xl overflow-hidden border-2 border-amber-400/50">
              <img
                src={awards[selectedImage].image}
                alt={awards[selectedImage].title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-amber-300 mb-2">
                {awards[selectedImage].title}
              </h3>
              <p className="text-gray-300">{awards[selectedImage].description}</p>
            </div>

            {/* Navigation in Lightbox */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={() => setSelectedImage((prev) => (prev - 1 + awards.length) % awards.length)}
                className="text-white hover:text-amber-400 transition-colors p-2"
                aria-label="Previous"
              >
                <ChevronLeft size={32} />
              </button>
              <div className="text-gray-400 flex items-center">
                {selectedImage + 1} / {awards.length}
              </div>
              <button
                onClick={() => setSelectedImage((prev) => (prev + 1) % awards.length)}
                className="text-white hover:text-amber-400 transition-colors p-2"
                aria-label="Next"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
