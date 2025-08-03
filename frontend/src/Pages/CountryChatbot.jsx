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
        p: { xs: 1, sm: 2 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#0f766e", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
        >
          Chat about {countryName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
        >
          Your AI travel guide. Ask anything below!
        </Typography>
      </Box>

      {/* Messages */}
      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          mb: 2,
          p: { xs: 1, sm: 2 },
          overflowY: "auto",
          maxHeight: { xs: "40vh", sm: "50vh" },
          bgcolor: "#fafafa",
          borderRadius: 2,
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
                px: 1.5,
                py: 1,
                borderRadius: 2,
                maxWidth: "80%",
                whiteSpace: "pre-line",
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
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

      {/* Input Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "stretch",
          gap: 1,
        }}
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
          variant="outlined"
          sx={{
            height: { xs: "auto", sm: 40 },
            borderColor: "#0f766e",
            color: "#0f766e",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#0f766e",
              color: "white",
              borderColor: "#0f766e",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
