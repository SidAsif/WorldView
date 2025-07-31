import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import CountryChatbot from "./CountryChatbot";
import { toast } from "react-hot-toast";
export default function CountryChatbotLauncher({ countryName }) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleClick = () => {
    if (!user) {
      toast.error("Please login to use the chat.");
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#131724",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: 56,
            height: 56,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {/* SVG chat icon */}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              d="M7 8h10M7 12h6m-8 8v0c-1.104 0-2-.896-2-2V6c0-1.104.896-2 2-2h14c1.104 0 2 .896 2 2v8c0 1.104-.896 2-2 2h-8l-4 4z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {/* The actual popup with the chat */}
      {open && (
        <>
          {/* Click-away area to close */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.13)",
              zIndex: 999,
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: 88,
              right: 24,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
              padding: 0,
              minWidth: 350,
              maxWidth: 400,
              zIndex: 1000,
              transition: "all 0.25s cubic-bezier(.76,0,.24,1)",
              overflow: "hidden",
            }}
          >
            {/* Close button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "8px 8px 0 0",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>×</span>
              </button>
            </div>

            {/* Chatbot goes here */}
            <CountryChatbot countryName={countryName} />
          </div>
        </>
      )}
    </>
  );
}
