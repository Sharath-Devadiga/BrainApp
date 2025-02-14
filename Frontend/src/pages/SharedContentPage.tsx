import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
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

        const response = await axios.get<SharedData>(
          `${BACKEND_URL}/api/v1/user/brain/${hash}`,
          {
            headers: {
              "token": token,
            },
          },
          
        );
        setSharedData(response.data);
      } catch (error) {
        console.error('Error fetching shared content:', error);
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
      console.error("Failed to copy share link:", err);
      alert("Failed to copy share link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {sharedData && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {sharedData.username}'s Shared Brain
              </h1>
              <div className="flex-shrink-0">
                <Button
                  onClick={handleShareAgain}
                  variant="secondary"
                  text="Share"
                  startIcon={<ShareIcon />}
                />
              </div>
            </div>

            <div className="flex pt-4 flex-wrap">
              {sharedData.content.map((content) => (
                <Card
                  key={content._id}
                  type={content.type}
                  link={content.link}
                  title={content.title}
                />
              ))}
            </div>

            {sharedData.content.length === 0 && (
              <div className="flex justify-center items-center mt-8">
                <p className="text-gray-500">No content has been shared yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}