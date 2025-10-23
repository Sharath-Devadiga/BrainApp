import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import api from "../api";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Note = "note",
}

export const CreateContent = ({ open, onClose }: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  async function content() {
    const token = localStorage.getItem("token"); 
    if (!token) {
      alert('You must be signed in to add content.');
      return;
    }

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const noteContent = contentRef.current?.value;

    if (!title) {
      alert("Title is required");
      return;
    }

    if (type === ContentType.Note) {
      if (!noteContent && !selectedFile) {
        alert("Please add some content or upload a file for your note");
        return;
      }
    } else {
      if (!link) {
        alert("Link is required");
        return;
      }
    }

    try {
      let fileUrl = "";
      let uploadedFileName = "";
      
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
          
          console.log('Uploading file:', selectedFile.name, selectedFile.type);
          const uploadResponse = await api.post(`/user/upload`, formData);
          console.log('Upload response:', uploadResponse.data);
          fileUrl = uploadResponse.data.fileUrl;
          uploadedFileName = uploadResponse.data.fileName;
          console.log('File URL from upload:', fileUrl);
        } catch (uploadError: any) {
          const uploadErrorMsg = uploadError?.response?.data?.message || uploadError?.message;
          alert("File upload failed: " + uploadErrorMsg);
          return;
        }
      }

      await api.post(`/user/content`, { 
        link: link || "", 
        title, 
        type,
        content: noteContent || "",
        fileUrl: fileUrl || "",
        fileName: uploadedFileName || ""
      });
      
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSelectedFile(null);
      setFileName("");
      onClose();
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || "Unknown error";
      alert("Error creating content: " + errorMsg);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-auto p-4 sm:p-6 relative my-4">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none p-1.5 rounded-lg transition-all active:scale-95"
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center pr-8">
              Create Content
            </h2>

            <div className="space-y-3">
              <Input placeholder="Title" ref={titleRef} />
            </div>

            <div className="mt-4">
              <h3 className="text-gray-700 mb-2 font-semibold text-sm sm:text-base">Content Type</h3>
              <div className="flex gap-2">
                <Button
                  text="Youtube"
                  variant={type === ContentType.Youtube ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Youtube)}
                  className="flex-1 px-3 py-2 text-sm font-semibold"
                />
                <Button
                  text="Twitter"
                  variant={type === ContentType.Twitter ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Twitter)}
                  className="flex-1 px-3 py-2 text-sm font-semibold"
                />
                <Button
                  text="Note"
                  variant={type === ContentType.Note ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Note)}
                  className="flex-1 px-3 py-2 text-sm font-semibold"
                />
              </div>
            </div>

            {type !== ContentType.Note && (
              <div className="mt-3">
                <Input placeholder="Link" ref={linkRef} />
              </div>
            )}

            {type === ContentType.Note && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1.5 block">
                    Note Content
                  </label>
                  <textarea
                    ref={contentRef}
                    placeholder="Write your note here..."
                    className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1.5 block">
                    Upload File <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold transition-all"
                    >
                      Choose File
                    </button>
                    {fileName && (
                      <span className="text-xs sm:text-sm text-gray-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200 truncate font-medium">
                        ✓ {fileName}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1.5 block">
                    Link <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                  </label>
                  <Input placeholder="Link" ref={linkRef} />
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-center">
              <Button 
                onClick={content} 
                variant="primary" 
                text="Submit" 
                className="w-full sm:w-auto px-8 py-2.5 text-base font-bold shadow-lg" 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
