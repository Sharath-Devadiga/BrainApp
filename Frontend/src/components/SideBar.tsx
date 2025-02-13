import { BrainIcon } from "lucide-react";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export const SideBar = () => {
    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0 shadow-lg border-r border-gray-200">
          
            <div className="flex items-center px-6 py-6 border-b border-gray-200">
                <span className="text-3xl font-bold text-gray-800">Brainly</span>
                <div className="px-3 flex items-center justify-center cursor-pointer">
                    <BrainIcon size={70} />
                </div>
            </div>

           
            <div className="pt-6 px-4">
                <div className="text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 cursor-pointer transition-colors duration-200">
                    <SideBarItem text="Twitter" icon={<TwitterIcon />} />
                </div>
                <div className="mt-3 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 cursor-pointer transition-colors duration-200">
                    <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
                </div>
            </div>
        </div>
    );
};
