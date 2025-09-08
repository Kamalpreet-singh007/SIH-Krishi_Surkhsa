// import React from "react";
// import { Card, CardBody, Button, Textarea } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { motion } from "framer-motion";
// import AppLayout from "../components/app-layout";

// interface Message {
//   id: string;
//   type: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// const VoiceAssistantPage: React.FC = () => {
//   const [messages, setMessages] = React.useState<Message[]>([
//     {
//       id: "welcome",
//       type: "assistant",
//       content: "नमस्ते! मैं आपका कृषि सहायक हूँ। आप मुझसे फसलों, मौसम, या खेती से जुड़े किसी भी सवाल के बारे में पूछ सकते हैं।",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputText, setInputText] = React.useState("");
//   const [isRecording, setIsRecording] = React.useState(false);
//   const [isProcessing, setIsProcessing] = React.useState(false);
//   const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
  
//   React.useEffect(() => {
//     scrollToBottom();
//   }, [messages]);
  
//   const handleSendMessage = () => {
//     if (!inputText.trim()) return;
    
//     // Add user message
//     const userMessage: Message = {
//       id: `user-${Date.now()}`,
//       type: "user",
//       content: inputText,
//       timestamp: new Date()
//     };
    
//     setMessages([...messages, userMessage]);
//     setInputText("");
//     setIsProcessing(true);
    
//     // Simulate API call delay
//     setTimeout(() => {
//       // Mock responses based on keywords
//       let responseContent = "";
//       const lowerCaseInput = inputText.toLowerCase();
      
//       if (lowerCaseInput.includes("धान") || lowerCaseInput.includes("rice") || lowerCaseInput.includes("चावल")) {
//         responseContent = "धान की खेती के लिए अच्छी मिट्टी और पर्याप्त पानी की आवश्यकता होती है। आपके क्षेत्र में वर्षा अच्छी है, इसलिए धान की खेती के लिए उपयुक्त है। बीज बोने का सबसे अच्छा समय जून के महीने में है।";
//       } else if (lowerCaseInput.includes("fertilizer") || lowerCaseInput.includes("खाद") || lowerCaseInput.includes("उर्वरक")) {
//         responseContent = "फसल के प्रकार के अनुसार उर्वरक का उपयोग करें। धान के लिए, नाइट्रोजन, फास्फोरस और पोटाश का संतुलित मिश्रण उपयोगी होता है। जैविक खाद जैसे गोबर की खाद या कम्पोस्ट का उपयोग मिट्टी की गुणवत्ता में सुधार करता है।";
//       } else if (lowerCaseInput.includes("pest") || lowerCaseInput.includes("कीट") || lowerCaseInput.includes("रोग")) {
//         responseContent = "फसलों को कीटों से बचाने के लिए नियमित निरीक्षण करें। जैविक कीटनाशकों का उपयोग करें जैसे नीम का तेल या लहसुन का अर्क। गंभीर संक्रमण के मामले में ही रासायनिक कीटनाशकों का उपयोग करें।";
//       } else if (lowerCaseInput.includes("weather") || lowerCaseInput.includes("मौसम") || lowerCaseInput.includes("बारिश")) {
//         responseContent = "आने वाले सप्ताह में आपके क्षेत्र में मध्यम वर्षा की संभावना है। तापमान 25-30°C के बीच रहेगा। फसल की सिंचाई की योजना बनाते समय इसे ध्यान में रखें।";
//       } else if (lowerCaseInput.includes("scheme") || lowerCaseInput.includes("योजना") || lowerCaseInput.includes("सरकारी")) {
//         responseContent = "वर्तमान में किसानों के लिए कई सरकारी योजनाएँ उपलब्ध हैं। PM-KISAN के तहत आप प्रति वर्ष ₹6,000 की वित्तीय सहायता प्राप्त कर सकते हैं। फसल बीमा योजना के लिए आप अपने नजदीकी कृषि कार्यालय में आवेदन कर सकते हैं।";
//       } else {
//         responseContent = "इस प्रश्न का उत्तर देने के लिए मुझे अधिक जानकारी की आवश्यकता है। कृपया अपने प्रश्न को विस्तार से बताएं या अपनी फसल, मिट्टी या स्थान के बारे में अधिक जानकारी दें।";
//       }
      
//       // Add assistant response
//       const assistantMessage: Message = {
//         id: `assistant-${Date.now()}`,
//         type: "assistant",
//         content: responseContent,
//         timestamp: new Date()
//       };
      
//       setMessages((prevMessages) => [...prevMessages, assistantMessage]);
//       setIsProcessing(false);
//     }, 1500);
//   };
  
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };
  
//   const toggleRecording = () => {
//     if (isRecording) {
//       // Stop recording
//       setIsRecording(false);
//       // In a real app, this would process the audio and convert to text
//       setInputText("मेरे क्षेत्र में धान की खेती के लिए कौन सा मौसम सबसे अच्छा है?");
//     } else {
//       // Start recording
//       setIsRecording(true);
//       setInputText("");
      
//       // Simulate speech recognition after 3 seconds
//       setTimeout(() => {
//         toggleRecording();
//       }, 3000);
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="max-w-4xl mx-auto p-4 sm:p-6">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold mb-2">Voice Assistant</h1>
//           <p className="text-default-500">
//             Ask questions in Hindi or English about farming, crops, weather, or government schemes
//           </p>
//         </div>
        
//         <Card className="h-[70vh] flex flex-col">
//           <CardBody className="p-0 flex flex-col h-full">
//             <div className="flex-grow overflow-y-auto p-4 space-y-4">
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[80%] p-3 rounded-lg ${
//                       message.type === "user"
//                         ? "bg-primary text-white rounded-tr-none"
//                         : "bg-default-100 rounded-tl-none"
//                     }`}
//                   >
//                     <p className="text-sm">{message.content}</p>
//                     <p className="text-xs mt-1 opacity-70">
//                       {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
              
//               {isProcessing && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-default-100 p-3 rounded-lg rounded-tl-none">
//                     <div className="flex gap-1">
//                       <span className="w-2 h-2 bg-default-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
//                       <span className="w-2 h-2 bg-default-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
//                       <span className="w-2 h-2 bg-default-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </div>
            
//             <div className="p-4 border-t border-divider">
//               <div className="flex gap-2">
//                 <Textarea
//                   placeholder="Type your question in Hindi or English..."
//                   value={inputText}
//                   onValueChange={setInputText}
//                   onKeyDown={handleKeyPress}
//                   className="flex-grow"
//                   minRows={1}
//                   maxRows={4}
//                 />
                
//                 <div className="flex flex-col gap-2">
//                   <Button
//                     isIconOnly
//                     color={isRecording ? "danger" : "primary"}
//                     onPress={toggleRecording}
//                     className={`${isRecording ? "animate-pulse" : ""}`}
//                   >
//                     <Icon icon={isRecording ? "lucide:mic-off" : "lucide:mic"} />
//                   </Button>
                  
//                   <Button
//                     isIconOnly
//                     color="primary"
//                     onPress={handleSendMessage}
//                     isDisabled={!inputText.trim()}
//                   >
//                     <Icon icon="lucide:send" />
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="mt-2 flex justify-between items-center text-xs text-default-400">
//                 <p>Supports Hindi and English</p>
//                 <p>Powered by AI</p>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
        
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold mb-3">Sample Questions</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             <Button
//               variant="flat"
//               size="sm"
//               className="justify-start"
//               onPress={() => setInputText("मेरे क्षेत्र में धान की खेती के लिए कौन सा मौसम सबसे अच्छा है?")}
//             >
//               मेरे क्षेत्र में धान की खेती के लिए कौन सा मौसम सबसे अच्छा है?
//             </Button>
//             <Button
//               variant="flat"
//               size="sm"
//               className="justify-start"
//               onPress={() => setInputText("फसलों के लिए कौन से उर्वरक सबसे अच्छे हैं?")}
//             >
//               फसलों के लिए कौन से उर्वरक सबसे अच्छे हैं?
//             </Button>
//             <Button
//               variant="flat"
//               size="sm"
//               className="justify-start"
//               onPress={() => setInputText("कीटों से फसल की सुरक्षा कैसे करें?")}
//             >
//               कीटों से फसल की सुरक्षा कैसे करें?
//             </Button>
//             <Button
//               variant="flat"
//               size="sm"
//               className="justify-start"
//               onPress={() => setInputText("किसानों के लिए कौन सी सरकारी योजनाएँ हैं?")}
//             >
//               किसानों के लिए कौन सी सरकारी योजनाएँ हैं?
//             </Button>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// };

// export default VoiceAssistantPage;









import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Button, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import AppLayout from "../components/app-layout";
import { Mic, Send } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const VoiceAssistance: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🎤 Start/Stop recording and capture user speech
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

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_query: userMessage.content,
          latitude: 23.824959578839294,
          longitude: 86.42394473059683,
          prompt_type: "AGRI_CHATBOT",
        }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // 🔊 Text-to-Speech (TTS) for assistant responses
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
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
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
                      <span className="w-2 h-2 bg-default-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-default-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-default-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
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
