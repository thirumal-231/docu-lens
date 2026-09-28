import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import axios from "axios";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

const HomePage = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  //   console.log(user);

  // file upload
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
    }
    const formData = new FormData();
    formData.append("doc", file);

    try {
      const token = await getToken();
      setStatus("uploading");
      setProgress(0);
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setProgress(percentCompleted);
          },
        },
      );
      setStatus("success");
      console.log("Server Response: ", response.data);
    } catch (error) {
      setStatus("error");
      console.error("Upload failed: ", error);
    }
  };

  const syncUser = async () => {
    const token = await getToken();

    const response = await fetch("http://localhost:8000/users/sync", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }
    syncUser();
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />

        <SidebarInset>
          <header>
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>

          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-2xl">
              <div className="flex flex-col items-center rounded-xl border bg-card px-6 py-16 text-center shadow-sm">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>

                <h1 className="text-2xl font-semibold tracking-tight">
                  Start with a document
                </h1>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Upload a PDF and start asking questions. DocuLens will analyze
                  your document and provide answers grounded in its content.
                </p>
                <form onSubmit={handleUpload}>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="pdf-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <label
                    htmlFor="pdf-upload"
                    className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                  >
                    <Upload className="h-4 w-4" />
                    {file ? file.name : "Upload PDF"}
                  </label>

                  <p className="mt-4 text-xs text-muted-foreground">
                    PDF files up to 20MB
                  </p>

                  {file && (
                    <Button type="submit" className="mt-4">
                      Start Upload
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default HomePage;
