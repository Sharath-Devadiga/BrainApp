import { BACKEND_URL } from "../config";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

 export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export const CreateContent = ({ open, onClose }: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);

  async function content() {
    const token = localStorage.getItem("token"); 
        if (!token) {
        // Handle the error appropriately, maybe show a message to the user
        console.error("No token found! Please login.");
        return;
    }

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
        // Handle empty fields
        console.error("Title and link are required");
        return;
    }

    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/v1/user/content`,
            { link, title, type },
            {
                headers: {
                    'token': token
                }
            }
        );
        console.log("Content created successfully:", response.data);
        onClose(); // Close the modal after successful creation
    } catch (error) {
        console.error("Error creating content:", error);
        
    }
}
  return (
    <>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-opacity-30 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Create Content
            </h2>

            {/* Input Fields */}
            <div className="space-y-6">
              <Input placeholder="Title" ref={titleRef} />
              <Input placeholder="Link" ref={linkRef} />
            </div>
            <div>
              <h1>Type</h1>
              <div className="flex gap-1 p-4">
                <Button
                  text="Youtube"
                  variant={type === ContentType.Youtube ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  text="Twitter"
                  variant={type === ContentType.Twitter ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Twitter)}
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button onClick={content} variant="primary" text="Submit" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
