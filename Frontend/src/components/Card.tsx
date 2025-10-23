import { ShareIcon } from "../Icons/ShareIcon"
import { DeleteIcon } from "../Icons/DeleteIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import {FileTextIcon} from 'lucide-react'
import { useEffect, useState } from "react";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "note";
    content?: string;
    fileUrl?: string;
    fileName?: string;
    id: string;
    onDelete: (id: string) => Promise<void> | void;
    showDelete?: boolean;
}

export const Card = ({title, link, type, content, fileUrl, fileName, id, onDelete, showDelete = true}: CardProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (type === "twitter") {
            const timer = setTimeout(() => {
                if ((window as any).twttr && (window as any).twttr.widgets) {
                    (window as any).twttr.widgets.load();
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [type, link]);

    const getFileIcon = (url: string) => {
        if (url.endsWith('.pdf')) return '📄';
        if (url.endsWith('.doc') || url.endsWith('.docx')) return '📝';
        if (url.match(/\.(jpg|jpeg|png|gif)$/i)) return '🖼️';
        return '📎';
    };

    const isImageFile = (url: string) => {
        return url.match(/\.(jpg|jpeg|png|gif)$/i) || url.includes('cloudinary.com') || url.includes('image/upload');
    };

    const isPdfFile = (url: string) => {
        return url.endsWith('.pdf') || url.includes('pdf');
    };

    const getYoutubeEmbedUrl = (url: string) => {
        if (!url) return '';
        
        let videoId = '';
        
        if (url.includes('watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        }
        else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        }
        else if (url.includes('/embed/')) {
            videoId = url.split('/embed/')[1];
        }
        
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    return (
        <div className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-full'>
            {/* Header */}
            <div className='p-3 sm:p-4 border-b border-gray-100'>
                <div className='flex justify-between items-start gap-2 sm:gap-3'>
                    <div className='flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0'>
                        <div className='flex-shrink-0 text-gray-600'>
                            {type=== "youtube" && <YoutubeIcon />}
                            {type=== "twitter"&& <TwitterIcon />}
                            {type === "note" && <FileTextIcon size={18} className="sm:w-5 sm:h-5" />}
                        </div>           
                        <h3 className='font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight'>{title}</h3>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all" title="Share">
                            <a href={link || "#"} target="_blank" rel="noopener noreferrer">
                                <ShareIcon></ShareIcon>
                            </a>
                        </button>
                        {showDelete && (
                            <button 
                                onClick={() => setShowDeleteModal(true)}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete content"
                            >
                                <DeleteIcon></DeleteIcon>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
                {type === "youtube" && (
                    <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                        <iframe 
                            className="absolute inset-0 w-full h-full" 
                            src={getYoutubeEmbedUrl(link)} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                {type === "twitter" && (
                    <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
                        <div className="w-full flex-1 flex items-center justify-center p-3">
                            <blockquote 
                                className="twitter-tweet" 
                                data-conversation="none" 
                                data-theme="light"
                                data-cards="hidden"
                            >
                                <a href={link.includes('twitter.com') || link.includes('x.com') ? link : `https://twitter.com${link.startsWith('/') ? link : '/' + link}`}>
                                    Tweet
                                </a> 
                            </blockquote>
                        </div>
                        {/* Fallback if embed doesn't load */}
                        <div className="text-center p-3 text-xs text-gray-600 border-t border-gray-200">
                            <a 
                                href={link.includes('twitter.com') || link.includes('x.com') ? link : `https://twitter.com${link.startsWith('/') ? link : '/' + link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-700 truncate"
                            >
                                View on Twitter →
                            </a>
                        </div>
                    </div>
                )}
                {type === "note" && (
                    <div className={`p-3 sm:p-4 space-y-2.5 sm:space-y-3 flex-1 ${fileUrl ? 'overflow-y-auto' : 'overflow-hidden'}`}>
                        {content && (
                            <div className={`bg-gray-50 rounded-lg p-3 text-gray-700 text-sm leading-relaxed border border-gray-200 ${fileUrl ? 'max-h-24 overflow-y-auto' : ''}`}>
                                {content}
                            </div>
                        )}
                        {fileUrl && (
                            <div className="space-y-2">
                                {isImageFile(fileUrl) && (
                                    <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200 h-40 sm:h-48">
                                        <img 
                                            src={fileUrl}
                                            alt={fileName || 'Uploaded image'}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                {isPdfFile(fileUrl) && (
                                    <div className="rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                                        <embed 
                                            src={fileUrl}
                                            type="application/pdf"
                                            className="w-full h-40 sm:h-48"
                                        />
                                    </div>
                                )}
                                <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 hover:border-gray-300 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg flex-shrink-0">{getFileIcon(fileUrl)}</span>
                                        <a 
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-700 truncate text-xs sm:text-sm font-semibold flex-1"
                                            title={fileName}
                                        >
                                            {fileName || 'Download File'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                        {link && (
                            <div className="text-xs border-t border-gray-200 pt-2 mt-auto">
                                <a 
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-700 truncate block break-all font-medium"
                                >
                                    🔗 Reference
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                title={title}
                isDeleting={isDeleting}
                onConfirm={async () => {
                    setIsDeleting(true);
                    try {
                        await onDelete(id);
                        setShowDeleteModal(false);
                    } finally {
                        setIsDeleting(false);
                    }
                }}
                onCancel={() => {
                    if (!isDeleting) {
                        setShowDeleteModal(false);
                    }
                }}
            />
        </div>
    );
}