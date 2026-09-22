import { Youtube } from 'lucide-react';

export function YouTubeSection() {
  return (
    <section id="videos" className="py-20 bg-slate-800/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <span className="text-amber-400 text-sm font-semibold flex items-center gap-2">
              <Youtube size={16} />
              Video Content
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Videos: True Light Highlights</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore inspiring video highlights from the True Light journey and ministry teachings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/M2TaAbAIP5Q"
                title="True Light Video"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-xl font-semibold text-white">True Light Video</h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BAmLWPDcj2Y"
                title="Interview with Berhanu Tadesse"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-xl font-semibold text-white">Interview with Berhanu Tadesse</h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/FoOJWN500ao"
                title="Berhanu Tadesse Video"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-xl font-semibold text-white">Berhanu Tadesse Video</h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 aspect-video bg-slate-900">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/rLMhC-jS8UM"
                title="Berhanu Tadesse Video"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-xl font-semibold text-white">Berhanu Tadesse Video</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
