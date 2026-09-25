import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  category: string;
}

export function AdminBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('blog');
  const [blogLanguage, setBlogLanguage] = useState<'english' | 'amharic'>('english');
  const [linkUrl, setLinkUrl] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const fetchPosts = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, category')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPosts(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    // Check password from database
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', 'admin_password')
      .single();

    // If first time and no DB setting yet, fall back to "admin" loosely, else strict
    const truePassword = data?.value || 'admin';

    if (password === truePassword) {
      setIsAuthenticated(true);
      setMessage('');
      fetchPosts();
    } else {
      setMessage('Invalid password');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    
    if (!supabase) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 'admin_password', value: newPassword });

      if (error) throw error;

      setMessage('Password updated successfully!');
      setNewPassword('');
      setIsChangingPassword(false);
    } catch (err: any) {
      setMessage(`Error changing password: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    if (!supabase) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    
    if (error) {
      setMessage(`Error deleting item: ${error.message}`);
    } else {
      setMessage('Item deleted successfully!');
      fetchPosts(); // refresh list
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage('Title is required');
      return;
    }
    
    if (category === 'blog' && !content.trim()) {
      setMessage('Content is required for blog posts');
      return;
    }
    
    if ((category === 'audiobook' || category === 'course') && !linkUrl.trim()) {
      setMessage('Link URL is required for audiobooks and courses');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { error } = await supabase.from('posts').insert([
        { 
          title, 
          content: category === 'blog' ? content : '',
          category: category === 'blog' && blogLanguage === 'amharic' ? 'blog_amharic' : category,
          link_url: linkUrl || null
        }
      ]);

      if (error) throw error;

      setMessage('Item published successfully!');
      setTitle('');
      setContent('');
      setLinkUrl('');
      fetchPosts(); // refresh list
    } catch (error: any) {
      setMessage(`Error creating post: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-24 min-h-screen bg-slate-900 text-white p-4 flex justify-center">
        <div className="max-w-md w-full bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            {message && <p className="text-red-400 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button 
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm text-gray-300 transition-colors"
        >
          {isChangingPassword ? 'Close Settings' : 'Change Password'}
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Left Column (Publish or Settings) */}
        {isChangingPassword ? (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-amber-400">Update Password</h2>
            {message && (
              <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-green-900/50 border border-green-700 text-green-300' : 'bg-red-900/50 border border-red-700 text-red-300'}`}>
                {message}
              </div>

            )}
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 text-slate-900 font-bold rounded-lg transition bg-amber-500 hover:bg-amber-400 shadow-lg"
              >
                {isLoading ? 'Updating...' : 'Save New Password'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-fit">
            <h2 className="text-3xl font-bold mb-6 text-amber-400">Publish Content</h2>
            
            {message && (
              <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-green-900/50 border border-green-700 text-green-300' : 'bg-red-900/50 border border-red-700 text-red-300'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleCreatePost} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content Type</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="blog">📝 Blog Post</option>
                  <option value="audiobook">🎙️ Audiobook Link</option>
                  <option value="course">🎓 Course Link</option>
                </select>
              </div>

              {category === 'blog' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="blog-language">Blog Language</label>
                  <select id="blog-language" value={blogLanguage} onChange={(e) => setBlogLanguage(e.target.value as 'english' | 'amharic')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                    <option value="english">English</option>
                    <option value="amharic">አማርኛ (Amharic)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder={category === 'blog' ? "Post title" : category === 'audiobook' ? "Audiobook Chapter Name / Description" : "Course Title"}
                  required
                />
              </div>

              {category === 'blog' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono text-sm"
                  placeholder="Write your post content here... (Supports multiple lines)"
                  required={category === 'blog'}
                ></textarea>
              </div>
              )}

              {(category === 'audiobook' || category === 'course') && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">External Link URL</label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="https://..."
                    required={category === 'audiobook' || category === 'course'}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 text-slate-900 font-bold rounded-lg transition ${isLoading ? 'bg-slate-600 cursor-not-allowed text-white' : 'bg-amber-500 hover:bg-amber-400 shadow-lg'}`}
              >
                {isLoading ? 'Publishing...' : 'Publish Item'}
              </button>
            </form>
          </div>
        )}

        {/* Manage Column */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-fit">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">Manage Postings</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {posts.length === 0 ? (
              <p className="text-gray-400">No content published yet.</p>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-slate-900 p-4 rounded-lg flex items-center justify-between border border-slate-700 hover:border-amber-500/30 transition-colors">
                  <div className="truncate mr-4 flex-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider mb-1 px-2 py-1 rounded inline-block ${post.category === 'blog' ? 'bg-blue-900/30 text-blue-400' : post.category === 'audiobook' ? 'bg-amber-900/30 text-amber-500' : 'bg-green-900/30 text-green-400'}`}>
                      {post.category === 'blog_amharic' ? 'Blog · አማርኛ' : post.category === 'blog' ? 'Blog · English' : post.category}
                    </span>
                    <span className="text-gray-200 truncate block font-medium">{post.title}</span>
                  </div>
                  <button 
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-400 hover:text-white bg-red-900/20 hover:bg-red-600 p-2 rounded transition-colors shrink-0"
                    title="Delete Post"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
