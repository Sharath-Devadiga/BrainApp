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
        { type: 'all' as const, label: 'All', icon: <img src="/brain.png" alt="All" className="w-5 h-5 rounded-full" /> },
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
                className="lg:hidden fixed top-3 left-3 z-50 p-3 bg-white rounded-xl shadow-xl border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all"
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                h-screen bg-white w-64 sm:w-72 fixed left-0 top-0 shadow-2xl border-r border-gray-200 z-40 transition-transform duration-300 ease-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
                    <img src="/brain.png" alt="Brain Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-sm" />
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Brain</span>
                </div>

                <div className="pt-6 px-3 sm:px-4 space-y-1.5">
                    {filterItems.map((item) => (
                        <button
                            key={item.type}
                            onClick={() => handleFilterClick(item.type)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                                selectedFilter === item.type
                                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-102 active:scale-98'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-base font-semibold">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};