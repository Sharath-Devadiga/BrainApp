import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';
import { Card } from '../components/Card';
import { ContentType } from '../components/CreateContent';
import { Button } from '../components/Button';
import { ShareIcon } from '../Icons/ShareIcon';

interface Content {
  type: ContentType;
  title: string;
  link: string;
  username: string;
  _id?: string;
  id?: string;
  content?: string;
  fileUrl?: string;
  fileName?: string;
}

interface SharedData {
  username: string;
  content: Content[];
}

export function SharedContentPage() {
  const { hash } = useParams<{ hash: string }>();
  const [sharedData, setSharedData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedContent() {
      if (!hash) {
        setError('Invalid link. Hash is missing.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required. Please log in.');
          setLoading(false);
          return;
        }

        const response = await api.get<SharedData>(`/user/brain/${hash}`);
        setSharedData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || 'An error occurred while accessing the shared content.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSharedContent();
  }, [hash]);

  const handleShareAgain = async () => {
    try {
      const shareUrl = window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share URL copied to clipboard!");
    } catch (err) {
      alert("Failed to copy share link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-4 border-indigo-200 border-t-indigo-500" />
            <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading shared content...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-screen px-4">
            <div className="bg-red-50 border border-red-200 p-4 sm:p-6 rounded-xl max-w-md w-full">
              <p className="text-red-700 text-center text-sm sm:text-base">{error}</p>
            </div>
          </div>
        )}

        {sharedData && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img src="/brain.png" alt="Brain Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {sharedData.username}'s Brain
                    </h1>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base ml-10 sm:ml-13">
                    Exploring shared knowledge and insights
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button
                    onClick={handleShareAgain}
                    variant="secondary"
                    text="Share"
                    startIcon={<ShareIcon />}
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-max">
              {sharedData.content.map((content) => (
                <div key={content._id} className='h-72 sm:h-80'>
                  <Card
                    id={content._id || ''}
                    type={content.type}
                    link={content.link}
                    title={content.title}
                    content={content.content}
                    fileUrl={content.fileUrl}
                    fileName={content.fileName}
                    onDelete={() => {}}
                    showDelete={false}
                  />
                </div>
              ))}
            </div>

            {sharedData.content.length === 0 && (
              <div className="flex justify-center items-center mt-12 sm:mt-16">
                <div className="text-center px-4">
                  <div className="text-5xl sm:text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-base sm:text-lg">No content has been shared yet.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}