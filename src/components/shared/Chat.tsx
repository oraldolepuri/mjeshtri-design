import { useState } from 'react';
import { ArrowLeft, Send, Image as ImageIcon, CheckCircle, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import type { User as UserType, Gig, Message } from '../../App';
import { toast } from 'sonner@2.0.3';

interface ChatProps {
  currentUser: UserType;
  otherUser: { userId: string; userName: string; gigId: string };
  gig: Gig;
  onBack: () => void;
  onMarkComplete: (gigId: string) => void;
}

// Mock messages
const initialMessages: Message[] = [
  {
    id: '1',
    senderId: 'other',
    senderName: 'Other User',
    text: 'Hi! I accepted your offer. When can you start?',
    timestamp: '2025-10-21T10:00:00Z',
  },
  {
    id: '2',
    senderId: 'me',
    senderName: 'Me',
    text: 'Great! I can start tomorrow morning around 9 AM. Does that work for you?',
    timestamp: '2025-10-21T10:05:00Z',
  },
  {
    id: '3',
    senderId: 'other',
    senderName: 'Other User',
    text: 'Perfect! See you tomorrow.',
    timestamp: '2025-10-21T10:10:00Z',
  },
];

export default function Chat({ currentUser, otherUser, gig, onBack, onMarkComplete }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'me',
      senderName: currentUser.name,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleMarkComplete = () => {
    toast.success('Job marked as complete!');
    onMarkComplete(gig.id);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#0077FF] text-white">
                {otherUser.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-gray-900">{otherUser.userName}</p>
              <p className="text-gray-500 text-xs">Active now</p>
            </div>
          </div>
          <button className="text-gray-900">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Gig Info Banner */}
        <div className="mt-4 bg-blue-50 rounded-xl p-3 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[#0077FF] text-xs mb-1">Current Gig</p>
            <p className="text-gray-900 text-sm">{gig.title}</p>
          </div>
          {currentUser.role === 'customer' && gig.status === 'accepted' && (
            <Button
              onClick={handleMarkComplete}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white h-8 rounded-lg text-xs"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Mark Done
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => {
          const isMe = message.senderId === 'me';
          return (
            <div
              key={message.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[75%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isMe && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                      {otherUser.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      isMe
                        ? 'bg-[#0077FF] text-white rounded-tr-sm'
                        : 'bg-white text-gray-900 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      isMe ? 'text-right' : 'text-left'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 sticky bottom-0">
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-gray-700">
            <ImageIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="h-12 rounded-2xl pr-12 border-gray-200"
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              newMessage.trim()
                ? 'bg-[#0077FF] hover:bg-[#0066DD] text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
