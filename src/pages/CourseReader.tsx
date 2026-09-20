import { ArrowLeft, Maximize2 } from 'lucide-react';

const COURSE_FILE = '/from-self-to-christ-course.pdf';

export function CourseReader() {
  const enterFullscreen = async () => {
    const reader = document.getElementById('course-reader');
    if (reader?.requestFullscreen) {
      await reader.requestFullscreen();
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-slate-950 px-3 py-5 text-white sm:px-5">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        <div className="flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="/courses" className="mb-2 inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300">
              <ArrowLeft size={16} /> Back to Courses
            </a>
            <h1 className="text-xl font-bold sm:text-2xl">From Self to Christ</h1>
            <p className="text-sm text-slate-300">A 12-Lesson Journey of Transformation</p>
          </div>
          <button
            type="button"
            onClick={enterFullscreen}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            <Maximize2 size={18} /> Full Screen
          </button>
        </div>
        <div id="course-reader" className="h-[calc(100vh-12rem)] min-h-[650px] overflow-hidden rounded-xl bg-white shadow-2xl">
          <object
            data={`${COURSE_FILE}#view=FitH&toolbar=1&navpanes=0`}
            type="application/pdf"
            className="h-full w-full"
            aria-label="From Self to Christ course PDF"
          >
            <div className="flex h-full items-center justify-center p-8 text-center text-slate-900">
              <p>Your browser cannot display this course document. Please use a current version of Chrome, Edge, or Safari.</p>
            </div>
          </object>
        </div>
      </div>
    </section>
  );
}
