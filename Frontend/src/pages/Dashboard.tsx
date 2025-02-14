import {Button} from '../components/Button'
import { PlusIcon } from '../Icons/PlusIcon'
import { ShareIcon } from '../Icons/ShareIcon'
import { ContentType, CreateContent } from '../components/CreateContent'
import { useEffect, useState } from 'react'
import { SideBar } from '../components/SideBar'
import axios from "axios"
import { BACKEND_URL } from '../config'
import { Card } from '../components/Card'

interface Content {
  type: ContentType;
  title: string;
  link: string;
  id: string; 
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);  // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getContent() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/user/content`, {
        headers: { 
          "token": token 
        }
      });
      
      setContents(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  const handleContentAdded = () => {
    getContent();
    setModalOpen(false);
  };

  async function handleShare() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to share your brain');
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/brain/share`, 
        { share: true },
        { headers: { "token": token } }
      );

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share URL copied to clipboard!");
    } catch (err) {
      console.error("Failed to share brain:", err);
      alert("Failed to generate share link. Please try again.");
    }
  }

  return (
    <div>
      <SideBar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateContent 
          open={modalOpen} 
          onClose={handleContentAdded}  // Updated to refresh content
        />
        <div className='flex justify-end pt-2 px-4'>
          <Button 
            onClick={() => setModalOpen(true)} 
            variant='primary' 
            text='Add content' 
            startIcon={<PlusIcon />} 
          />
          <div className='px-2'>
            <Button 
              onClick={handleShare}
              variant='secondary' 
              text='Share Brain' 
              startIcon={<ShareIcon />} 
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <p>Loading content...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center mt-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className='flex pt-4 flex-wrap'>
          {contents?.map((content) => (
            <Card
              key={content.id}  // Add unique key prop
              type={content.type} 
              link={content.link} 
              title={content.title} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}