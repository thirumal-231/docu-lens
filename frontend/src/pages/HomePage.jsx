import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import UploadDocument from "./UploadDocument";
import { useSyncUser } from "@/hooks/useUsers";
import { Chat } from "./Chat";
import { useChatStore } from "@/store/store";

const HomePage = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useSyncUser(user.id);

  const selectedDocumentId = useChatStore((state) => state.selectedDocumentId);

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
          {/* <header>
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header> */}

          <div>
            {selectedDocumentId ? (
              <Chat />
            ) : (
              <div className="flex w-full items-center justify-center">
                <UploadDocument />
              </div>
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default HomePage;
