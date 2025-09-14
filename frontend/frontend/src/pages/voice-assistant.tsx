import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Button, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import AppLayout from "../components/app-layout";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const VoiceAssistance: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "नमस्ते! मैं आपका कृषि सहायक हूँ। आप मुझसे फसलों, मौसम, या खेती से जुड़े किसी भी सवाल के बारे में पूछ सकते हैं।",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🔽 Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🎤 Start/Stop speech recognition
  const toggleRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  // 📡 Send query to Django chatbot API
  const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage: Message = {
    id: `user-${Date.now()}`,
    type: "user",
    content: inputText,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputText("");
  setIsProcessing(true);

  const storedLat = localStorage.getItem("latitude");
  const storedLng = localStorage.getItem("longitude");

  try {
    const res = await fetch("http://127.0.0.1:8000/api/rooms/chatbot/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_query: userMessage.content,
        latitude: storedLat ? parseFloat(storedLat) : null,
        longitude: storedLng ? parseFloat(storedLng) : null,
        prompt_type: "AGRI_CHATBOT",
      }),
    });

    if (!res.ok || !res.body) throw new Error(`API Error: ${res.status}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let assistantText = "";

    // Start streaming assistant message
    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-stream-${Date.now()}`,
        type: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      assistantText += decoder.decode(value, { stream: true });

      // Update the last streaming assistant message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id.startsWith("assistant-stream") ? { ...msg, content: assistantText } : msg
        )
      );
    }
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-error-${Date.now()}`,
        type: "assistant",
        content: "❌ सर्वर से कनेक्ट करने में समस्या आ रही है।",
        timestamp: new Date(),
      },
    ]);
  } finally {
    setIsProcessing(false);
  }
};


  // 🔊 Text-to-Speech (TTS) for assistant replies
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.type === "assistant") {
        const utterance = new SpeechSynthesisUtterance(lastMsg.content);
        utterance.lang = "hi-IN";
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [messages]);

  // ⌨️ Send on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Voice Assistant</h1>
          <p className="text-default-500">
            Ask questions in Hindi or English about farming, crops, weather, or government schemes
          </p>
        </div>

        <Card className="h-[70vh] flex flex-col">
          <CardBody className="p-0 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.type === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-default-100 rounded-tl-none"
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-default-100 p-3 rounded-lg rounded-tl-none">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-default-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-default-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-default-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-divider">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your question in Hindi or English..."
                  value={inputText}
                  onValueChange={setInputText}
                  onKeyDown={handleKeyPress}
                  className="flex-grow"
                  minRows={1}
                  maxRows={4}
                />

                <div className="flex flex-col gap-2">
                  <Button
                    isIconOnly
                    color={isRecording ? "danger" : "primary"}
                    onPress={toggleRecording}
                    className={`${isRecording ? "animate-pulse" : ""}`}
                  >
                    <Icon icon={isRecording ? "lucide:mic-off" : "lucide:mic"} />
                  </Button>

                  <Button
                    isIconOnly
                    color="primary"
                    onPress={handleSendMessage}
                    isDisabled={!inputText.trim()}
                  >
                    <Icon icon="lucide:send" />
                  </Button>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center text-xs text-default-400">
                <p>Supports Hindi and English</p>
                <p>Powered by AI</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
};

export default VoiceAssistance;
