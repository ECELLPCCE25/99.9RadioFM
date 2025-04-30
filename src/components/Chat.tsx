"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { X, Send, MessageSquare, Trash2, Loader2 } from "lucide-react"

interface Message {
  sender: "user" | "bot"
  text: string
  isPartial?: boolean
}

interface GenerateRequestBody {
  model: string
  prompt: string
  stream: boolean
}

interface ParsedChunk {
  response?: string
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !(chatContainerRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value)
  }

  const clearChat = () => {
    setMessages([])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: string = inputMessage.trim()
    setMessages((prev: Message[]) => [...prev, { sender: "user", text: userMessage }])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Send message to Llama API
      const response: Response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "Finbudy",
          prompt: `${userMessage}`,
          stream: true,
        } as GenerateRequestBody),
      })

      // Process the streaming response
      if (response.body) {
        const reader: ReadableStreamDefaultReader = response.body.getReader()
        const decoder: TextDecoder = new TextDecoder()
        let botResponse = ""

        let done = false
        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading

          if (value) {
            const chunk: string = decoder.decode(value, { stream: !done })
            try {
              // Each chunk might contain multiple JSON objects
              const lines: string[] = chunk.split("\n").filter((line) => line)
              for (const line of lines) {
                const parsedChunk: ParsedChunk = JSON.parse(line)
                if (parsedChunk.response) {
                  botResponse += parsedChunk.response
                  // Update messages in real-time as chunks come in
                  setMessages((prev: Message[]) => {
                    const newMessages: Message[] = [...prev]
                    const lastMessage = newMessages.find((msg) => msg.sender === "bot" && msg.isPartial)

                    if (lastMessage) {
                      lastMessage.text = botResponse
                    } else {
                      newMessages.push({ sender: "bot", text: botResponse, isPartial: true })
                    }
                    return newMessages
                  })
                }
              }
            } catch (error) {
              console.error("Error parsing chunk:", error)
            }
          }
        }

        // Finalize the message when stream is complete
        setMessages((prev: Message[]) => {
          const newMessages: Message[] = [...prev]
          const lastMessage = newMessages.find((msg) => msg.sender === "bot" && msg.isPartial)
          if (lastMessage) {
            delete lastMessage.isPartial
          }
          return newMessages
        })
      }
    } catch (error) {
      console.error("Error communicating with AI model:", error)
      setMessages((prev: Message[]) => [
        ...prev,
        { sender: "bot", text: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div
          ref={chatContainerRef}
          className="bg-white rounded-lg shadow-xl w-80 sm:w-[30rem] h-[700px] flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out"
          style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          {/* Chat header */}
          <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-medium">Chat Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
                title="Clear chat"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
                title="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-3">
                <MessageSquare className="h-12 w-12 text-gray-400" />
                <p>Send a message to start chatting</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[85%] break-words ${
                      msg.sender === "user"
                        ? "bg-black text-white shadow-sm"
                        : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                    }`}
                  >
                    {msg.text}
                    {msg.isPartial && <span className="inline-block ml-1 animate-pulse">▋</span>}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-white flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-lg border border-gray-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70 transition-all duration-200 h-[42px] flex items-center justify-center"
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-black hover:opacity-90 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
