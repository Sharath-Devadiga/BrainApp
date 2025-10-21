import { useEffect, useState } from "react";
import api from "../api";

interface Content {
  id: string;
  type: string;
  title: string;
  link: string;
  content?: string;
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/user/content");
      setContents(response.data.success ? response.data.data : response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch content");
      setContents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { contents, loading, error, refetch: fetchContent };
}