import React, { useState, useRef, useEffect } from "react";
import { Sparkles, MessageSquare, X, Send, Bot, User, RefreshCw, ChevronDown } from "lucide-react";
import { api } from "../lib/api";

const SUGGESTIONS = [
  "What services does OHI offer?",
  "Tell me about OHI's track record",
  "Who is the founder of OHI?",
  "How can I contact OHI?",
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am your OHI AI Assistant. How can I help you explore Olympian House International's services, track record, or projects today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input.trim();
    if (!text || loading) return;

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessages = [...messages, { role: "user", text, time: userTime }];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await api.askAiChat(text);
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.reply || "Thank you for reaching out to OHI! How else can I assist you?",
          time: botTime,
        },
      ]);
    } catch (err) {
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I am having trouble connecting to the network right now. You can reach out to our team at contact@olympianhouseintl.com.",
          time: botTime,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#05c1ff] to-[#0284c7] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[#05c1ff]/50 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <div className="absolute -inset-1 animate-pulse rounded-full bg-[#05c1ff]/30 blur-md group-hover:bg-[#05c1ff]/50"></div>
          <Sparkles className="relative h-7 w-7 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f9a11b] opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#f9a11b]"></span>
          </span>
        </button>
      )}

      {/* Chat Drawer / Modal */}
      {isOpen && (
        <div className="flex h-[540px] w-[360px] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 text-white shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3.5">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#05c1ff]/20 text-[#05c1ff]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">OHI AI Assistant</h3>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-slate-400">Online & Ready</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex space-x-2.5 ${
                  msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    msg.role === "user"
                      ? "bg-[#f9a11b] text-slate-950"
                      : "bg-[#05c1ff]/20 text-[#05c1ff]"
                  }`}
                >
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#05c1ff] text-slate-950 font-medium rounded-tr-none"
                      : "bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/50"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block mt-1 text-[10px] ${
                      msg.role === "user" ? "text-slate-900/70" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs pl-2">
                <Bot className="h-4 w-4 animate-bounce text-[#05c1ff]" />
                <span>OHI AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Chips */}
          {messages.length < 3 && (
            <div className="border-t border-slate-800/60 bg-slate-950/40 px-3 py-2">
              <p className="text-[11px] text-slate-400 mb-1.5 font-medium">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sug)}
                    className="rounded-full border border-slate-700/70 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300 hover:border-[#05c1ff] hover:bg-[#05c1ff]/10 hover:text-white transition-all text-left"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-slate-800 bg-slate-950 p-3 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask OHI AI anything..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-[#05c1ff] focus:outline-none focus:ring-1 focus:ring-[#05c1ff]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#05c1ff] text-slate-950 hover:bg-[#05c1ff]/90 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
