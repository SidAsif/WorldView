import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { API_CONFIG } from "../config/api";

export default function CountryChatbot({ countryName }) {
  const storageKey = `country-chat-${countryName}`;

  // Initialize messages from localStorage or default message
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved
        ? JSON.parse(saved)
        : [{ sender: "bot", text: `Ask me anything about ${countryName}!` }];
    } catch {
      return [{ sender: "bot", text: `Ask me anything about ${countryName}!` }];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.chatbot}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ countryName, question: input }),
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with improved typography and teal color */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#0f766e" }}>
          Chat about {countryName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your AI travel guide. Ask anything below!
        </Typography>
      </Box>

      {/* Messages container */}
      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          mb: 1,
          p: 2,
          overflowY: "auto",
          maxHeight: "42vh",
          bgcolor: "#fafafa",
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Typography
              component="span"
              variant="body1"
              sx={{
                p: 1.2,
                borderRadius: 2,
                maxWidth: "80%",
                whiteSpace: "pre-line",
                bgcolor: msg.sender === "user" ? "primary.main" : "#e0e0e0",
                color: msg.sender === "user" ? "white" : "text.primary",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <CircularProgress size={24} sx={{ color: "#0f766e" }} />
          </Box>
        )}
      </Paper>

      {/* Input form: input and button inline with teal styling */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Ask a question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          disabled={loading}
          autoFocus
          inputProps={{
            style: { fontSize: 16 },
          }}
        />
        <Button
          type="submit"
          disabled={loading || !input.trim()}
          sx={{
            whiteSpace: "nowrap",
            height: 40,
            borderColor: "#0f766e",
            color: "#0f766e",
            "&:hover": {
              backgroundColor: "#0f766e",
              color: "white",
              borderColor: "#0f766e",
            },
          }}
          variant="outlined"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
