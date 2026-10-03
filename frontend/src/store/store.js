import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
export const useChatStore = create(
  devtools(
    persist(
      (set) => ({
        selectedDocumentId: null,
        selectedDocumentName: null,
        messages: {},
        setSelectedDocument: (documentId, documentName) =>
          set({
            selectedDocumentId: documentId,
            selectedDocumentName: documentName,
          }),
        addMessage: (documentId, message) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [documentId]: [...(state.messages[documentId] || []), message],
            },
          })),
        clearMessages: (documentId) =>
          set((state) => ({
            messages: { ...state.messages, [documentId]: [] },
          })),
        reset: () =>
          set({
            selectedDocumentId: null,
            selectedDocumentName: null,
            messages: {},
          }),
      }),
      { name: "doculens-chat" },
    ),
    { name: "DoculensChatStore" },
  ),
);
