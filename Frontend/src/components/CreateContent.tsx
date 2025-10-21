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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close modal"
            >
              <CrossIcon />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Create Content
            </h2>

            <div className="space-y-4">
              <Input placeholder="Title" ref={titleRef} />
            </div>

            <div className="mt-6">
              <h3 className="text-gray-700 mb-3 font-medium">Type</h3>
              <div className="flex gap-3 flex-wrap">
                <Button
                  text="Youtube"
                  variant={type === ContentType.Youtube ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Youtube)}
                  className="px-4 py-2 text-sm"
                />
                <Button
                  text="Twitter"
                  variant={type === ContentType.Twitter ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Twitter)}
                  className="px-4 py-2 text-sm"
                />
                <Button
                  text="Note"
                  variant={type === ContentType.Note ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Note)}
                  className="px-4 py-2 text-sm"
                />
              </div>
            </div>

            {type !== ContentType.Note && (
              <div className="mt-4">
                <Input placeholder="Link" ref={linkRef} />
              </div>
            )}

            {type === ContentType.Note && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Note Content
                  </label>
                  <textarea
                    ref={contentRef}
                    placeholder="Write your note here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Upload File (Optional - PDF, Image, Doc)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                    >
                      Choose File
                    </button>
                    {fileName && (
                      <span className="text-sm text-gray-600">
                        ✓ {fileName}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-medium text-sm mb-2 block">
                    Link (Optional - source or reference)
                  </label>
                  <Input placeholder="Link" ref={linkRef} />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button onClick={content} variant="primary" text="Submit" className="px-6 py-2" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
