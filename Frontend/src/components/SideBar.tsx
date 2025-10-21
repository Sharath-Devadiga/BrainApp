import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { NotesIcon } from "../Icons/NotesIcon";
import { ContentType } from "./CreateContent";

interface SideBarProps {
  selectedFilter: ContentType | 'all';
  onFilterChange: (filter: ContentType | 'all') => void;
}

export const SideBar = ({ selectedFilter, onFilterChange }: SideBarProps) => {
    const filterItems = [
        { type: 'all' as const, label: 'All', icon: <span className="text-2xl">🧠</span> },
        { type: ContentType.Youtube, label: 'Youtube', icon: <YoutubeIcon /> },
        { type: ContentType.Twitter, label: 'Twitter', icon: <TwitterIcon /> },
        { type: ContentType.Note, label: 'Notes', icon: <NotesIcon /> },
    ];

    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0 shadow-lg border-r border-gray-200">
          
            <div className="flex items-center px-6 py-6 border-b border-gray-200">
                <span className="text-3xl font-bold text-indigo-500">🧠 Brain</span>
            </div>

           
            <div className="pt-6 px-4 space-y-2">
                {filterItems.map((item) => (
                    <button
                        key={item.type}
                        onClick={() => onFilterChange(item.type)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            selectedFilter === item.type
                                ? 'bg-indigo-100 text-indigo-600 border-l-4 border-indigo-600'
                                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};