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
    
    loadTwitterWidgets();
    
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
    <div className="flex">
      <SideBar selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      <div className='flex-1 px-3 py-16 sm:px-4 sm:py-4 lg:ml-64 xl:ml-72 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'>
        <CreateContent 
          open={modalOpen} 
          onClose={handleContentAdded}
        />
        
        <div className='bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 lg:mb-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-5'>
            <div className="flex-1">
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1'>My Brain</h1>
              <p className='text-sm sm:text-base text-gray-500'>Your personal knowledge base</p>
            </div>
            <div className='flex flex-col xs:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto'>
              <Button 
                onClick={() => setModalOpen(true)} 
                variant='primary' 
                text='Add Content' 
                startIcon={<PlusIcon />} 
                className="w-full xs:w-auto px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl"
              />
              <div className="flex gap-2 sm:gap-2.5">
                <Button 
                  onClick={handleShare}
                  variant='secondary' 
                  text='Share' 
                  startIcon={<ShareIcon />} 
                  className="flex-1 xs:flex-initial px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold"
                />
                <Button 
                  onClick={handleLogout}
                  variant='secondary' 
                  text='Logout' 
                  className="flex-1 xs:flex-initial px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col justify-center items-center mt-20 sm:mt-24">
            <div className="animate-spin rounded-full h-14 w-14 sm:h-16 sm:w-16 border-4 border-indigo-200 border-t-indigo-600 shadow-lg" />
            <p className="mt-5 text-gray-600 font-medium text-sm sm:text-base">Loading your content...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center mt-20 sm:mt-24 px-4">
            <div className="bg-red-50 border-2 border-red-200 p-5 sm:p-6 rounded-2xl shadow-lg max-w-md w-full">
              <p className="text-red-700 text-center font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6'>
            {filteredContents?.map((content) => (
              <div key={content.id} className='aspect-square'>
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
          <div className="flex justify-center items-center mt-20 sm:mt-24 px-4">
            <div className="text-center max-w-md">
              <div className="flex justify-center mb-5">
                <div className="bg-indigo-50 p-5 rounded-full shadow-lg">
                  <img src="/brain.png" alt="Brain" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {contents.length === 0 ? 'Your brain is empty' : `No ${selectedFilter} content found`}
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                {contents.length === 0 
                  ? 'Start adding content to build your knowledge base' 
                  : `Try adding some ${selectedFilter} content or change filters`}
              </p>
              <div className='flex justify-center'>
                 <Button 
                onClick={() => setModalOpen(true)} 
                variant='primary' 
                text='Add Content' 
                startIcon={<PlusIcon />} 
                className="px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl"
              />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}