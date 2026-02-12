
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CONVERSATIONS } from '../data';
import { Conversation, Message } from '../types';
import { GoogleGenAI } from "@google/genai";

const Messenger: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find(c => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isTyping]);

  const getAiResponse = async (chatId: string, userText: string, chatHistory: Message[], contactName: string) => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct context from history
      const historyContext = chatHistory.slice(-5).map(m => 
        `${m.sender === 'me' ? 'ฉัน' : contactName}: ${m.text}`
      ).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `นี่คือประวัติการแชทล่าสุด:\n${historyContext}\n\nฉันเพิ่งส่งข้อความหาคุณว่า: "${userText}"`,
        config: {
          systemInstruction: `คุณคือ "${contactName}" เพื่อนสนิทในโซเชียลมีเดีย ตอบกลับข้อความในฐานะคนจริงๆ ที่เป็นกันเอง ใช้ภาษาไทยแบบวัยรุ่น (เช่น มีการใช้ 'ครับ/ค่ะ' หรือ 'จ้า/นะ' ตามความเหมาะสม) ตอบให้สั้น กระชับ และดูเป็นธรรมชาติเหมือนพิมพ์คุยใน Messenger ห้ามตอบยาวเกินไป และพยายามทำให้การสนทนาไหลลื่น`,
          temperature: 0.8,
        },
      });

      const aiText = response.text || "ขอโทษทีนะ พอดีมึนๆ นิดหน่อย พิมพ์ใหม่ได้ไหม?";

      const newMessage: Message = {
        id: `m${Date.now()}`,
        text: aiText,
        sender: 'them',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === chatId) {
          return {
            ...conv,
            lastMessage: aiText,
            messages: [...conv.messages, newMessage]
          };
        }
        return conv;
      }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || !activeChatId || !activeChat) return;

    const currentMessageText = inputMessage;
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: currentMessageText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...activeChat.messages, newMessage];

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeChatId) {
        return {
          ...conv,
          lastMessage: currentMessageText,
          messages: updatedMessages
        };
      }
      return conv;
    }));

    setInputMessage('');
    
    // Call AI
    await getAiResponse(activeChatId, currentMessageText, updatedMessages, activeChat.username);
  };

  const filteredConversations = conversations.filter(c => 
    c.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-black overflow-hidden animate-in fade-in duration-500">
      {/* Sidebar List */}
      <div className={`
        ${activeChatId ? 'hidden md:flex' : 'flex'} 
        w-full md:w-[350px] border-r border-[#262626] flex-col h-full bg-black
      `}>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <h2 className="text-xl font-bold">vasuthon_</h2>
              <i className="fa-solid fa-chevron-down text-sm"></i>
            </div>
            <button className="text-xl hover:text-gray-400 transition-colors">
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
          
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
            <input 
              type="text"
              placeholder="ค้นหา"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="px-5 py-2 font-bold flex justify-between items-center">
            <span className="text-sm">ข้อความ</span>
            <span className="text-blue-500 text-xs font-bold cursor-pointer hover:text-white transition-colors">คำขอ</span>
          </div>
          
          <div className="mt-2">
            {filteredConversations.map((conv) => (
              <div 
                key={conv.id}
                onClick={() => setActiveChatId(conv.id)}
                className={`
                  flex items-center p-3 px-5 cursor-pointer transition-all
                  hover:bg-[#121212] active:scale-[0.98]
                  ${activeChatId === conv.id ? 'bg-[#1a1a1a]' : ''}
                `}
              >
                <div className="relative">
                  <img src={conv.avatar} className="w-14 h-14 rounded-full mr-3 object-cover border border-[#262626]" alt={conv.username} />
                  <div className="absolute bottom-1 right-3 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-lg"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-bold text-sm flex justify-between">
                    <span>{conv.username}</span>
                    <span className="text-[10px] text-gray-500 font-normal">ตอนนี้</span>
                  </div>
                  <div className={`text-xs truncate mt-0.5 ${activeChatId !== conv.id ? 'text-gray-400 font-medium' : 'text-gray-300'}`}>
                    {conv.lastMessage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className={`
        ${activeChatId ? 'flex' : 'hidden md:flex'} 
        flex-1 flex-col h-full relative overflow-hidden bg-black
      `}>
        {activeChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-[#262626] flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center">
                <button 
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden mr-4 text-xl hover:text-gray-400 transition-colors"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="relative cursor-pointer group">
                  <img src={activeChat.avatar} className="w-9 h-9 rounded-full mr-3 border border-gray-800 group-hover:opacity-80 transition-opacity" alt={activeChat.username} />
                  <div className="absolute bottom-0 right-3 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <div className="font-bold text-sm cursor-pointer hover:underline">{activeChat.username}</div>
                  <div className="text-[10px] text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    กำลังใช้งาน
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 text-xl pr-2 text-gray-300">
                <button className="hover:text-white transition-colors"><i className="fa-solid fa-phone"></i></button>
                <button className="hover:text-white transition-colors"><i className="fa-solid fa-video"></i></button>
                <button className="hover:text-white transition-colors"><i className="fa-solid fa-circle-info"></i></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black flex flex-col hide-scrollbar relative">
              <div className="flex flex-col items-center py-12 mb-8 border-b border-[#1a1a1a]/50">
                <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 mb-4">
                  <div className="p-1 bg-black rounded-full">
                    <img src={activeChat.avatar} className="w-24 h-24 rounded-full border-2 border-black" alt={activeChat.username} />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{activeChat.username}</h3>
                <p className="text-gray-500 text-sm mt-1">Takl Takl • 453 ผู้ติดตาม • 3 โพสต์</p>
                <button className="mt-5 bg-[#363636] hover:bg-[#474747] px-5 py-1.5 rounded-lg font-bold text-sm transition-all active:scale-95">
                  ดูโปรไฟล์
                </button>
              </div>

              {activeChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.sender === 'them' && (
                      <img src={activeChat.avatar} className="w-6 h-6 rounded-full mb-1 border border-gray-800" alt="avatar" />
                    )}
                    <div className={`
                      p-3 px-4 rounded-2xl text-[14px] leading-tight transition-all shadow-sm
                      ${msg.sender === 'me' ? 'bg-[#3797f0] text-white rounded-br-none' : 'bg-[#262626] text-white rounded-bl-none'}
                    `}>
                      {msg.text}
                    </div>
                  </div>
                  <span className={`text-[9px] text-gray-500 mt-1 px-1 ${msg.sender === 'me' ? '' : 'ml-8'}`}>{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2 animate-pulse ml-1">
                  <img src={activeChat.avatar} className="w-6 h-6 rounded-full border border-gray-800" alt="typing" />
                  <div className="bg-[#262626] p-3 px-4 rounded-2xl rounded-bl-none flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-black border-t border-[#1a1a1a] shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
              <form 
                onSubmit={handleSendMessage}
                className="flex items-center gap-4 border border-[#262626] rounded-full px-4 py-2 hover:border-gray-600 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-700 transition-all bg-[#0a0a0a]"
              >
                <button type="button" className="text-xl text-gray-400 hover:text-white transition-colors"><i className="fa-regular fa-face-smile"></i></button>
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="เขียนข้อความ..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm py-1 placeholder:text-gray-500 text-white"
                />
                {inputMessage.trim() ? (
                  <button type="submit" className="text-blue-500 font-bold hover:text-blue-400 transition-all active:scale-90 px-2">ส่ง</button>
                ) : (
                  <div className="flex space-x-4 text-gray-400">
                    <button type="button" className="text-xl hover:text-white transition-colors"><i className="fa-solid fa-microphone"></i></button>
                    <button type="button" className="text-xl hover:text-white transition-colors"><i className="fa-regular fa-image"></i></button>
                    <button type="button" className="text-xl hover:text-white transition-colors"><i className="fa-regular fa-heart"></i></button>
                  </div>
                )}
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-[#050505]">
            <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <i className="fa-regular fa-paper-plane text-4xl text-white/50"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">ข้อความของคุณ</h2>
            <p className="text-gray-500 max-w-xs text-sm">ส่งรูปภาพและข้อความส่วนตัวหาเพื่อนหรือกลุ่ม เริ่มบทสนทนาที่สนุกสนานด้วยพลังของ AI ได้ทันที</p>
            <button className="mt-8 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              ส่งข้อความ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
