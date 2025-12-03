import React, { useState, useRef, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import { MOCK_CONVERSATIONS } from '../constants';
import { Conversation, ChatMessage } from '../types';
import { Search, Send, CheckCheck, MoreVertical, Paperclip, Phone, Video } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === selectedId);

  const filteredConversations = conversations.filter(c => 
    c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: inputText,
      sender: 'admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === selectedId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: newMessage.text,
          lastMessageTime: newMessage.timestamp
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in flex gap-6">
      {/* Sidebar List */}
      <div className="w-1/3 min-w-[300px] flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Messages</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Discussions en direct avec les étudiants</p>
        </div>

        <GlassCard noPadding className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
             {filteredConversations.map((conv) => (
               <div 
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-slate-200 dark:border-white/5 last:border-0 ${
                    selectedId === conv.id 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10' 
                      : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                  }`}
               >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-200 font-bold text-lg">
                      {conv.userName.charAt(0)}
                    </div>
                    {conv.status === 'active' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`text-sm font-semibold truncate ${selectedId === conv.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                        {conv.userName}
                      </h4>
                      <span className="text-xs text-slate-500">{conv.lastMessageTime}</span>
                    </div>
                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="flex flex-col justify-center">
                      <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    </div>
                  )}
               </div>
             ))}
          </div>
        </GlassCard>
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-full">
         <GlassCard noPadding className="h-full flex flex-col">
            {/* Header */}
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-white font-bold">
                        {activeConversation.userName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{activeConversation.userName}</h3>
                        <div className="flex items-center gap-1.5">
                           <span className={`w-2 h-2 rounded-full ${activeConversation.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                           <span className="text-xs text-slate-500 dark:text-slate-400">{activeConversation.userEmail}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-2 text-slate-400">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"><Phone size={20} /></button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"><Video size={20} /></button>
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"><MoreVertical size={20} /></button>
                   </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/20">
                    <div className="flex justify-center">
                       <span className="text-xs text-slate-400 bg-slate-200 dark:bg-white/5 px-3 py-1 rounded-full">Aujourd'hui</span>
                    </div>
                    {activeConversation.messages.map((msg) => {
                      const isAdmin = msg.sender === 'admin';
                      return (
                        <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[70%] ${isAdmin ? 'order-1' : 'order-2'}`}>
                              <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm ${
                                isAdmin 
                                  ? 'bg-indigo-600 text-white rounded-br-sm' 
                                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm border border-slate-100 dark:border-white/5'
                              }`}>
                                {msg.text}
                              </div>
                              <div className={`flex items-center gap-1 mt-1 text-[10px] text-slate-400 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                <span>{msg.timestamp}</span>
                                {isAdmin && <CheckCheck size={12} className={msg.read ? 'text-indigo-400' : 'text-slate-500'} />}
                              </div>
                           </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5">
                   <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                      <button type="button" className="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-white/5 rounded-lg transition-colors">
                        <Paperclip size={20} />
                      </button>
                      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center p-1 border border-transparent focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                         <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Écrivez votre message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white px-4 py-2 placeholder-slate-500"
                         />
                      </div>
                      <button 
                        type="submit" 
                        disabled={!inputText.trim()}
                        className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Send size={20} />
                      </button>
                   </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} />
                </div>
                <p>Sélectionnez une conversation pour commencer</p>
              </div>
            )}
         </GlassCard>
      </div>
    </div>
  );
};

export default MessagesPage;