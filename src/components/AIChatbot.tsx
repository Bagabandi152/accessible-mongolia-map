
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, MicOff, Bot, User, Play, Pause, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  videoUrl?: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(null);
  const [showPromptMessage, setShowPromptMessage] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample video responses - you'll replace these with your 10-20 prepared videos
  const videoResponses = {
    'accessibility': '/videos/accessibility-response.mp4',
    'report': '/videos/report-response.mp4',
    'location': '/videos/location-response.mp4',
    'help': '/videos/help-response.mp4',
    'default': '/videos/default-response.mp4'
  };

  // Periodic prompt message effect
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setShowPromptMessage(true);
        setTimeout(() => setShowPromptMessage(false), 3000);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const classifyQuestion = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('хүртээмж') || lowerQuestion.includes('саад')) {
      return 'accessibility';
    } else if (lowerQuestion.includes('мэдээлэх') || lowerQuestion.includes('илгээх')) {
      return 'report';
    } else if (lowerQuestion.includes('байршил') || lowerQuestion.includes('хаана')) {
      return 'location';
    } else if (lowerQuestion.includes('тусламж') || lowerQuestion.includes('хэрхэн')) {
      return 'help';
    }
    
    return 'default';
  };

  const generateAIResponse = (question: string): { text: string; video: string } => {
    const category = classifyQuestion(question);
    
    const responses = {
      'accessibility': {
        text: 'Хүртээмжийн талаар асууж байна уу? Би танд энэ талаар дэлгэрэнгүй мэдээлэл өгье.',
        video: videoResponses.accessibility
      },
      'report': {
        text: 'Саадтай орчныг мэдээлэх талаар асууж байна уу? Энд дэлгэрэнгүй заавар байна.',
        video: videoResponses.report
      },
      'location': {
        text: 'Байршлын талаар асууж байна уу? Би танд хэрхэн байршил оруулахыг зааж өгье.',
        video: videoResponses.location
      },
      'help': {
        text: 'Тусламж хэрэгтэй байна уу? Би танд бүх зүйлийг тайлбарлаж өгье.',
        video: videoResponses.help
      },
      'default': {
        text: 'Асуултын хариултыг энд харж болно.',
        video: videoResponses.default
      }
    };

    return responses[category as keyof typeof responses];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.text,
        videoUrl: aiResponse.video,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVideoPlay = (messageId: string, videoUrl: string) => {
    const video = videoRefs.current[messageId];
    if (!video) return;

    if (currentPlayingVideo === messageId) {
      video.pause();
      setCurrentPlayingVideo(null);
    } else {
      // Pause other videos
      Object.values(videoRefs.current).forEach(v => v?.pause());
      setCurrentPlayingVideo(messageId);
      video.play();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
    if (!isRecording) {
      console.log('Recording started...');
    } else {
      console.log('Recording stopped...');
    }
  };

  return (
    <>
      {/* Floating AI Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <div className="relative">
            {/* AI Avatar Icon */}
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full p-0 overflow-hidden bg-blue-600 hover:bg-blue-700 shadow-lg border-2 border-white"
              size="icon"
            >
              <img 
                src="/lovable-uploads/f1414edd-f6e7-4cad-be07-fad171c992aa.png" 
                alt="AI Assistant"
                className="w-full h-full object-cover"
              />
            </Button>
            
            {/* Animated Prompt Message */}
            {showPromptMessage && (
              <div className="absolute bottom-full right-0 mb-3 w-64 animate-scale-in">
                <div className="bg-white rounded-lg shadow-lg border p-3 relative">
                  <p className="text-sm text-gray-700">
                    Сайн байна уу? Танд тусламж хэрэгтэй бол надаас асуугаарай.
                  </p>
                  {/* Speech bubble arrow */}
                  <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Expanded Chatbot */}
        {isOpen && (
          <Card className="w-80 h-96 flex flex-col shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border">
                    <img 
                      src="/lovable-uploads/f1414edd-f6e7-4cad-be07-fad171c992aa.png" 
                      alt="AI Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  AI Туслах
                  <Badge variant="secondary">Бэлэн</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-3">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-3 max-h-60">
                {messages.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border">
                      <img 
                        src="/lovable-uploads/f1414edd-f6e7-4cad-be07-fad171c992aa.png" 
                        alt="AI Assistant"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs">Сайн байна уу! Би танд хүртээмжийн талаар тусалж чадна.</p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      } rounded-lg p-2`}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {message.type === 'user' ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <div className="w-4 h-4 rounded-full overflow-hidden border">
                            <img 
                              src="/lovable-uploads/f1414edd-f6e7-4cad-be07-fad171c992aa.png" 
                              alt="AI Assistant"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString('mn-MN', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <p className="text-xs">{message.content}</p>
                      
                      {/* AI Video Response */}
                      {message.type === 'ai' && message.videoUrl && (
                        <div className="mt-2">
                          <div className="relative bg-black rounded overflow-hidden">
                            <video
                              ref={(el) => {
                                if (el) videoRefs.current[message.id] = el;
                              }}
                              className="w-full h-20 object-cover"
                              onEnded={() => setCurrentPlayingVideo(null)}
                            >
                              <source src={message.videoUrl} type="video/mp4" />
                              Таны хөтөч видео дэмжихгүй байна.
                            </video>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute inset-0 w-full h-full bg-black/20 hover:bg-black/40 text-white"
                              onClick={() => toggleVideoPlay(message.id, message.videoUrl!)}
                            >
                              {currentPlayingVideo === message.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          
                          <p className="text-xs opacity-75 mt-1">
                            Видео хариулт дарж үзнэ үү
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Асуултаа бичнэ үү..."
                  className="flex-1 text-xs h-8"
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleRecording}
                  className={`h-8 w-8 ${isRecording ? 'bg-red-100 border-red-300' : ''}`}
                >
                  {isRecording ? (
                    <MicOff className="h-3 w-3 text-red-600" />
                  ) : (
                    <Mic className="h-3 w-3" />
                  )}
                </Button>
                
                <Button onClick={handleSendMessage} disabled={!inputValue.trim()} size="icon" className="h-8 w-8">
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default AIChatbot;
