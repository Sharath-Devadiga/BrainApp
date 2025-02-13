import { ReactElement } from "react";


export const SideBarItem = ({text,icon}: {
    text: string;
    icon: ReactElement;
    
}) => {

    return <div className="flex">
        {icon} 
        <div className="px-2">
        {text}
        </div>
    </div>
}