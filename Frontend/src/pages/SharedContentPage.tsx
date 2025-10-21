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
      <div className="p-6 max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-500" />
            <p className="mt-4 text-gray-600">Loading shared content...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl max-w-md">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          </div>
        )}

        {sharedData && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    🧠 {sharedData.username}'s Brain
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Exploring shared knowledge and insights
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    onClick={handleShareAgain}
                    variant="secondary"
                    text="Share"
                    startIcon={<ShareIcon />}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {sharedData.content.map((content) => (
                <div key={content._id} className='h-80'>
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
              <div className="flex justify-center items-center mt-16">
                <div className="text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-500 text-lg">No content has been shared yet.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}