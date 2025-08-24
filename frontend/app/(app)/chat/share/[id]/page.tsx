"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/utils";

export default function ShareChatPage() {
  const params = useParams();
  const executionId = params.id as string;
  const [execution, setExecution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedExecution = async () => {
      try {
        // For now, we'll just show the execution ID since we need to implement proper sharing logic
        setExecution({ id: executionId, title: "Shared Chat", type: "CONVERSATION" });
        setLoading(false);
      } catch (err) {
        setError("Failed to load shared chat");
        setLoading(false);
      }
    };

    if (executionId) {
      fetchSharedExecution();
    }
  }, [executionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading shared chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shared Chat</h1>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{execution?.title || "Untitled Chat"}</h2>
          <p className="text-muted-foreground mb-4">Chat ID: {executionId}</p>
          <div className="bg-muted/50 rounded p-4">
            <p className="text-sm text-muted-foreground">
              This is a placeholder for the shared chat view. 
              In a full implementation, this would display the conversation messages and allow read-only viewing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}