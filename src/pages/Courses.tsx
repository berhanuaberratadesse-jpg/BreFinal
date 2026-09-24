import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  category: string;
  link_url: string;
  created_at: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedUp, setSignedUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  useEffect(() => {
    const storedSignup = window.localStorage.getItem('courses-signup-complete');
    if (storedSignup === 'true') {
      setSignedUp(true);
    }

    async function fetchCourses() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', 'course')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    }
    
    fetchCourses();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-slate-800/95 via-slate-900/90 to-slate-800/95 p-6 shadow-[0_20px_80px_-20px_rgba(245,158,11,0.35)] sm:p-8">
          <div className="mb-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                True Light Courses
              </p>
              <h1 className="text-4xl font-bold text-amber-400 sm:text-5xl">Grow deeper in truth, faith, and purpose.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                These courses are designed to help you reflect on life’s deeper questions, strengthen your spiritual walk, and discover the light of truth through practical teaching and thoughtful guidance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-5 shadow-inner shadow-slate-950">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why join?</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex gap-2"><span className="mt-1 text-amber-400">•</span> Receive early access to new course materials</li>
                <li className="flex gap-2"><span className="mt-1 text-amber-400">•</span> Stay connected with the True Light learning community</li>
                <li className="flex gap-2"><span className="mt-1 text-amber-400">•</span> Get updates whenever new teachings are released</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 shadow-lg shadow-black/20 backdrop-blur-sm sm:p-6">
            <div id="mc_embed_shell" className="w-full">
              <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
              <style>{`#mc_embed_signup{background:transparent;clear:left;font:14px Helvetica,Arial,sans-serif;width:100%;max-width:100%;color:#f8fafc;} #mc_embed_signup input[type="email"], #mc_embed_signup input[type="text"], #mc_embed_signup select {background:rgba(15,23,42,0.7); border:1px solid rgba(148,163,184,0.25); color:#f8fafc; border-radius:8px; padding:10px 12px;} #mc_embed_signup input::placeholder {color:#94a3b8;} #mc_embed_signup .button {background:#f59e0b !important; border-radius:999px; padding:12px 20px;}`}</style>
              <div id="mc_embed_signup">
                <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Reserve your place</h2>
                    <p className="text-sm text-slate-300">Sign up once and unlock the course section whenever you’re ready.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFormExpanded((prev) => !prev)}
                    className="inline-flex items-center justify-center rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
                    aria-expanded={isFormExpanded}
                  >
                    {isFormExpanded ? 'Collapse form' : 'Open form'}
                  </button>
                </div>

                {isFormExpanded && (
                  <form
                    action="https://berhanutadesse.us2.list-manage.com/subscribe/post?u=e81959f6ca56e1ad6a7daee4d&amp;id=19b7c9c80b&amp;f_id=009056e1f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    onSubmit={() => {
                      setIsSubmitting(true);
                      window.localStorage.setItem('courses-signup-complete', 'true');
                      setSignedUp(true);
                    }}
                  >
                    <div id="mc_embed_signup_scroll">
                      <div className="indicates-required text-sm text-slate-400"><span className="asterisk">*</span> indicates required</div>
                      <div className="mc-field-group mt-4">
                        <label htmlFor="mce-EMAIL" className="mb-2 block text-sm font-medium text-slate-300">Email Address <span className="asterisk">*</span></label>
                        <input type="email" name="EMAIL" className="required email w-full" id="mce-EMAIL" required defaultValue="" />
                      </div>
                      <div className="mc-field-group mt-4">
                        <label htmlFor="mce-FNAME" className="mb-2 block text-sm font-medium text-slate-300">First Name</label>
                        <input type="text" name="FNAME" className="w-full" id="mce-FNAME" defaultValue="" />
                      </div>
                      <div className="mc-field-group mt-4">
                        <label htmlFor="mce-LNAME" className="mb-2 block text-sm font-medium text-slate-300">Last Name</label>
                        <input type="text" name="LNAME" className="w-full" id="mce-LNAME" defaultValue="" />
                      </div>
                      <div className="mc-address-group mt-4">
                        <div className="mc-field-group">
                          <label htmlFor="mce-ADDRESS-addr1" className="mb-2 block text-sm font-medium text-slate-300">Address</label>
                          <input type="text" maxLength={70} name="ADDRESS[addr1]" id="mce-ADDRESS-addr1" className="w-full" defaultValue="" />
                        </div>
                        <div className="mc-field-group mt-4">
                          <label htmlFor="mce-ADDRESS-city" className="mb-2 block text-sm font-medium text-slate-300">City</label>
                          <input type="text" maxLength={40} name="ADDRESS[city]" id="mce-ADDRESS-city" className="w-full" defaultValue="" />
                        </div>
                        <div className="mc-field-group mt-4">
                          <label htmlFor="mce-ADDRESS-country" className="mb-2 block text-sm font-medium text-slate-300">Country</label>
                          <select name="ADDRESS[country]" id="mce-ADDRESS-country" className="w-full">
                            <option value="USA" selected>USA</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div id="mce-responses" className="clear mt-4">
                        <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                        <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                      </div>
                      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                        <input type="text" name="b_e81959f6ca56e1ad6a7daee4d_19b7c9c80b" tabIndex={-1} defaultValue="" />
                      </div>
                      <div className="clear mt-5">
                        <button type="submit" name="subscribe" id="mc-embedded-subscribe" className="button cursor-pointer transition-transform duration-200 hover:scale-[1.01]" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Sign Up for Courses'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-slate-800 to-slate-900 shadow-[0_20px_70px_-25px_rgba(245,158,11,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Complete 14-Lesson Course</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">From Self to Christ</h2>
              <p className="mt-2 text-lg font-medium text-amber-200">A 14-Lesson Journey of Transformation</p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Discover your identity in Christ, renew your mind through biblical truth, and grow in a life that reflects Jesus Christ. The complete course includes all 14 lessons, reflection questions, prayer, key takeaways, and practical life-application exercises.
              </p>
            </div>

            <div className="flex flex-col justify-center border-t border-white/10 bg-slate-950/55 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">One-time payment</p>
              <p className="mt-1 text-4xl font-bold text-amber-400">$39.99</p>
              <a
                href="https://berhanutadesse.com?msopen=/member/plans/laxglhiqpa"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Purchase Full Course
              </a>
              <p className="mt-3 text-center text-xs text-slate-400">Secure checkout and course access through MemberSpace</p>
            </div>
          </div>
        </section>

        {signedUp ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-200">
            <h2 className="text-2xl font-bold mb-2">Thank you for signing up!</h2>
            <p>Your information has been submitted. You will receive course access details soon.</p>
          </div>
        ) : null}

        {!signedUp && loading ? (
          <p className="text-gray-400">Loading courses...</p>
        ) : null}

        {signedUp && loading ? (
          <p className="text-gray-400">Loading courses...</p>
        ) : null}

        {signedUp && !loading && courses.length === 0 ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <h2 className="text-2xl font-bold mb-4">No courses available yet</h2>
            <p className="text-gray-400">Check back soon for new educational content.</p>
          </div>
        ) : null}

        {signedUp && !loading && courses.length > 0 ? (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-slate-800/80 p-6 rounded-xl border border-slate-600 hover:border-amber-500/50 transition-colors shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-white">{course.title}</h3>
                <a 
                  href={course.link_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Access Course
                </a>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
