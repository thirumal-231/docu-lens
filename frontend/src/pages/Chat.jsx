import React, { useState } from "react";
import { FileText, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/store/store";

export const Chat = () => {
  const [message, setMessage] = useState("");

  const selectedDocumentId = useChatStore((state) => state.selectedDocumentId);
  const selectedDocumentName = useChatStore(
    (state) => state.selectedDocumentName,
  );
  const messages = useChatStore((state) => state.messages[selectedDocumentId]);
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    addMessage(selectedDocumentId, {
      id: Date.now(),
      role: "user",
      content: message,
    });
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh)] w-full flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted">
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <h1 className="text-sm font-semibold">
              {selectedDocumentName || "hey"}
            </h1>

            <p className="text-xs text-muted-foreground">
              Ask questions about this document
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8">
          {messages?.map((msg) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-background">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-6 ${
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : "border bg-muted/40"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-background px-6 py-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-3xl items-end gap-2"
        >
          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question about this document..."
              className="min-h-[52px] resize-none pr-12"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            <Button
              type="submit"
              size="icon"
              disabled={!message.trim()}
              className="absolute bottom-2 right-2 h-8 w-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
          DocuLens answers questions using the content of your document.
        </p>
      </div>
    </div>
  );
};
