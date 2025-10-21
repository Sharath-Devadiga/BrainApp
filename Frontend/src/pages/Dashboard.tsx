import { Button } from '../components/Button';
import { PlusIcon } from '../Icons/PlusIcon';
import { ShareIcon } from '../Icons/ShareIcon';
import { ContentType, CreateContent } from '../components/CreateContent';
import { useEffect, useState } from 'react';
import { SideBar } from '../components/SideBar';
import api from '../api';
import { Card } from '../components/Card';

interface Content {
  type: ContentType;
  title: string;
  link: string;
  id: string;
  _id?: string;
  content?: string;
  fileUrl?: string;
  fileName?: string;
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<ContentType | 'all'>('all');

  async function getContent() {
    try {
      setLoading(true);
      const response = await api.get("/user/content");
      
      const data = response.data.success ? response.data.data : response.data;
      const transformedContent = data.map((item: any) => ({
        ...item,
        id: item._id || item.id
      }));
      
      setContents(transformedContent);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    const loadTwitterWidgets = () => {
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
    };
    
    // Try immediately
    loadTwitterWidgets();
    
    // Try again after a delay to ensure DOM is ready
    const timer = setTimeout(loadTwitterWidgets, 500);
    
    return () => clearTimeout(timer);
  }, [contents]);

  const handleContentAdded = () => {
    getContent();
    setModalOpen(false);
  };

  const handleDelete = async (contentId: string) => {
    try {
      const response = await api.delete(`/user/content`, {
        data: { contentId }
      });
      
      if (response.status === 200) {
        setContents(prevContents => prevContents.filter(c => c.id !== contentId));
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || 'Failed to delete content';
      alert(errorMsg);
      getContent();
    }
  };

  const filteredContents = selectedFilter === 'all' 
    ? contents 
    : contents.filter(c => c.type === selectedFilter);

  async function handleShare() {
    try {
      const response = await api.post(`/user/brain/share`, { share: true });

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share URL copied to clipboard!");
    } catch (err) {
      alert("Failed to generate share link. Please try again.");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };

  return (
    <div>
      <SideBar selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <div className='p-6 ml-72 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
        <CreateContent 
          open={modalOpen} 
          onClose={handleContentAdded}
        />
        
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>My Brain</h1>
              <p className='text-gray-600 mt-1'>Your personal knowledge base</p>
            </div>
            <div className='flex gap-3'>
              <Button 
                onClick={() => setModalOpen(true)} 
                variant='primary' 
                text='Add Content' 
                startIcon={<PlusIcon />} 
              />
              <Button 
                onClick={handleShare}
                variant='secondary' 
                text='Share Brain' 
                startIcon={<ShareIcon />} 
              />
              <Button 
                onClick={handleLogout}
                variant='secondary' 
                text='Logout' 
              />
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col justify-center items-center mt-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-500" />
            <p className="mt-4 text-gray-600">Loading your content...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center mt-16">
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max'>
            {filteredContents?.map((content) => (
              <div key={content.id} className='h-80'>
                <Card
                  id={content.id}
                  type={content.type} 
                  link={content.link} 
                  title={content.title}
                  content={content.content}
                  fileUrl={content.fileUrl}
                  fileName={content.fileName}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredContents.length === 0 && (
          <div className="flex justify-center items-center mt-16">
            <div className="text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {contents.length === 0 ? 'Your brain is empty' : `No ${selectedFilter} content found`}
              </h3>
              <p className="text-gray-600 mb-6">
                {contents.length === 0 
                  ? 'Start adding content to build your knowledge base' 
                  : `Try adding some ${selectedFilter} content or change filters`}
              </p>
              <Button 
                onClick={() => setModalOpen(true)} 
                variant='primary' 
                text='Add Content' 
                startIcon={<PlusIcon />} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}