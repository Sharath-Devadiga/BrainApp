import { useState } from "react";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { NotesIcon } from "../Icons/NotesIcon";
import { ContentType } from "./CreateContent";


interface SideBarProps {
  selectedFilter: ContentType | 'all';
  onFilterChange: (filter: ContentType | 'all') => void;
}

export const SideBar = ({ selectedFilter, onFilterChange }: SideBarProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const filterItems = [
        { type: 'all' as const, label: 'All' },
        { type: ContentType.Youtube, label: 'Youtube', icon: <YoutubeIcon /> },
        { type: ContentType.Twitter, label: 'Twitter', icon: <TwitterIcon /> },
        { type: ContentType.Note, label: 'Notes', icon: <NotesIcon /> },
    ];

    const handleFilterClick = (type: ContentType | 'all') => {
        onFilterChange(type);
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
            >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                h-screen bg-white w-72 fixed left-0 top-0 shadow-lg border-r border-gray-200 z-40 transition-transform duration-300
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200">
                    <img src="/brain.png" alt="Brain Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    <span className="text-2xl sm:text-3xl font-bold text-indigo-500">Brain</span>
                </div>

                <div className="pt-6 px-4 space-y-2">
                    {filterItems.map((item) => (
                        <button
                            key={item.type}
                            onClick={() => handleFilterClick(item.type)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                selectedFilter === item.type
                                    ? 'bg-indigo-100 text-indigo-600 border-l-4 border-indigo-600'
                                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-base sm:text-base">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};