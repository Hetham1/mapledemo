"use client";

export default function ChatTime({ timestamp }: { timestamp: string }) {
  const messageDate = timestamp ? new Date(timestamp) : new Date();

  const formattedDate = messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const formattedTime = messageDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate}, ${formattedTime}`;
}
