import { ShareIcon } from "../Icons/ShareIcon"
import { DeleteIcon } from "../Icons/DeleteIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";
import {FileTextIcon} from 'lucide-react'
interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "note";
    content?: string
}
export const Card = ({title,link,type,content}: CardProps) => {

    return <div>
        <div className='p-4  bg-white rounded-md border-gray-200 max-w-72 min-h-58 min-w-72 border m-4'>
            <div className='flex justify-between'>
                <div className='flex items-center text-md '>
                <div className='text-gray-500 pr-2'>
                {type=== "youtube" && <YoutubeIcon></YoutubeIcon>}
                {type=== "twitter"&& <TwitterIcon></TwitterIcon>}
                {type === "note" && <FileTextIcon size={20} />}

                </div>           
                     {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-3 text-gray-500">
                        <a href={link} target="_blank">
                    <ShareIcon></ShareIcon>
                    </a>
                    </div>
                    <div className="text-gray-500">
                    <DeleteIcon></DeleteIcon>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com","twitter.com")}></a> 
                    </blockquote>}

                    {type === "note" && (
                            <div className="mt-2">
                                <div className="bg-gray-50 rounded-md p-4 text-gray-700 whitespace-pre-wrap text-sm">
                                    {content}
                                </div>
                                {link && (
                                    <div className="mt-2 text-sm">
                                        <a 
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 truncate block"
                                        >
                                            Source: {link}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    

            </div>
           
        </div>

    </div>
}