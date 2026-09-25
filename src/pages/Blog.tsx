import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'english' | 'amharic'>(() =>
    window.location.pathname.endsWith('/amharic') ? 'amharic' : 'english'
  );

  useEffect(() => {
    async function fetchPosts() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .in('category', ['blog', 'blog_amharic'])
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    }
    
    fetchPosts();
  }, []);

  const visiblePosts = posts.filter(post => post.category === (language === 'english' ? 'blog' : 'blog_amharic'));

  const chooseLanguage = (next: 'english' | 'amharic') => {
    setLanguage(next);
    window.history.pushState({}, '', next === 'english' ? '/blog/english' : '/blog/amharic');
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-amber-400">Writings & Blog</h1>
        <div className="flex flex-wrap gap-3 mb-8" aria-label="Blog language">
          {(['english', 'amharic'] as const).map(choice => (
            <button key={choice} type="button" onClick={() => chooseLanguage(choice)}
              aria-pressed={language === choice}
              className={`rounded-lg px-5 py-3 font-semibold border focus:outline-none focus:ring-2 focus:ring-amber-400 ${language === choice ? 'bg-amber-500 text-slate-900 border-amber-500' : 'bg-slate-800 text-white border-slate-600 hover:border-amber-400'}`}>
              {choice === 'english' ? 'English Articles' : 'የአማርኛ ጽሑፎች'}
            </button>
          ))}
        </div>
        
        {loading ? (
          <p className="text-gray-400">Loading posts...</p>
        ) : visiblePosts.length === 0 ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <h2 className="text-2xl font-bold mb-4">{language === 'amharic' ? 'ጽሑፎች ገና አልተጨመሩም' : 'No posts yet'}</h2>
            <p className="text-gray-400">{language === 'amharic' ? 'አዳዲስ ጽሑፎችን ለማንበብ በቅርቡ ይመለሱ።' : 'Check back soon for new writings and updates from Berhanu.'}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {visiblePosts.map(post => (
              <article key={post.id} lang={language === 'amharic' ? 'am' : 'en'} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mb-4">{new Date(post.created_at).toLocaleDateString()}</p>
                <div className="text-gray-300 whitespace-pre-wrap">{post.content}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
