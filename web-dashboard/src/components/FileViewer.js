import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  FileText, 
  Calendar, 
  Edit3, 
  Eye, 
  Download, 
  Share2, 
  Save, 
  Youtube, 
  Clock, 
  Play
} from 'lucide-react';

export default function FileViewer({ 
  file, 
  onSaveContent,
  folderName
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [seekTime, setSeekTime] = useState(0);
  const [playerKey, setPlayerKey] = useState(0); // to force iframe reload on seek
  const iframeRef = useRef(null);

  // Sync state with file change
  useEffect(() => {
    if (file) {
      setEditedContent(file.content);
      setIsEditing(false);
      setSeekTime(0);
    }
  }, [file]);

  if (!file) {
    return (
      <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-slate-500 p-8 select-none">
        <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
          <FileText className="w-8 h-8 text-slate-600" />
        </div>
        <p className="text-base font-semibold text-slate-400">Không có tài liệu nào đang mở</p>
        <p className="text-xs text-slate-600 mt-1 max-w-xs text-center">Hãy chọn một file từ cây thư mục ở Sidebar hoặc gửi lệnh tạo tri thức trên Mezon Bot.</p>
      </div>
    );
  }

  const handleSave = () => {
    onSaveContent(editedContent);
    setIsEditing(false);
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSeek = (seconds) => {
    setSeekTime(seconds);
    setPlayerKey(prev => prev + 1); // Trigger iframe reload at the start time
  };

  const ytId = file.videoUrl ? getYoutubeId(file.videoUrl) : null;

  // Custom markdown renderer components for style and timestamp interception
  const MarkdownComponents = {
    // Intercept a tag to seek video if it is a timestamp link
    a: ({ href, children, ...props }) => {
      if (href && href.startsWith('timestamp://')) {
        const secs = parseInt(href.replace('timestamp://', ''), 10);
        return (
          <button
            onClick={() => handleSeek(secs)}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-850 hover:bg-indigo-600 hover:text-white text-indigo-400 text-xs font-mono font-semibold transition-colors duration-150 inline-flex items-center space-x-1 cursor-pointer align-middle"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>{children}</span>
          </button>
        );
      }
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Stylize titles
    h1: ({ children }) => <h1 className="text-2xl font-extrabold text-slate-100 mt-6 mb-4 pb-2 border-b border-slate-800">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold text-slate-200 mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold text-slate-350 mt-4 mb-2">{children}</h3>,
    // List styling
    ul: ({ children }) => <ul className="list-disc pl-6 my-3 space-y-1.5 text-slate-300">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-3 space-y-1.5 text-slate-300">{children}</ol>,
    li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
    // Blockquote (for custom callouts/roasting)
    blockquote: ({ children }) => (
      <div className="border-l-4 border-indigo-500 bg-slate-900/60 rounded-r-lg px-4 py-3 my-4 italic text-slate-350 text-sm">
        {children}
      </div>
    ),
    // Table styling
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-slate-800">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-slate-900 text-xs font-semibold text-slate-400 border-b border-slate-800">{children}</thead>,
    tbody: ({ children }) => <tbody className="divide-y divide-slate-850 text-sm">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-slate-900/30 transition-colors">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 text-slate-300">{children}</td>,
    // Code block code highlighting styling
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <pre className="bg-slate-950 border border-slate-850 rounded-lg p-4 my-4 overflow-x-auto text-xs font-mono text-slate-300 shadow-inner">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="px-1.5 py-0.5 rounded bg-slate-900 text-indigo-400 text-xs font-mono font-medium border border-slate-850" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="flex-1 bg-slate-950 flex flex-col h-full overflow-hidden text-slate-200">
      
      {/* File Action Navbar Header */}
      <header className="h-16 border-b border-slate-850 bg-slate-950/80 px-6 flex items-center justify-between flex-shrink-0 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <FileText className="w-4.5 h-4.5 text-indigo-400" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-100 truncate">{file.name}</h2>
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-medium">
              <span className="truncate max-w-xs">{folderName || 'Thư mục gốc'}</span>
              <span>•</span>
              <Calendar className="w-3 h-3" />
              <span>Cập nhật {file.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-bold text-slate-300 hover:text-slate-100 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chỉnh sửa</span>
            </button>
          )}

          <button 
            onClick={() => alert('Đang tải file PDF...')}
            className="p-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title="Xuất PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Đã copy đường dẫn chia sẻ vào clipboard!');
            }}
            className="p-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title="Chia sẻ link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Body - Splitting screen if there is a Youtube Video */}
      <div className="flex-1 flex overflow-hidden">
        {/* Document Panel */}
        <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-slate-850 scrollbar-track-transparent">
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-full bg-slate-950 font-mono text-sm border-0 focus:ring-0 outline-none text-slate-350 resize-none leading-relaxed"
              placeholder="Nhập nội dung Markdown..."
            />
          ) : (
            <article className="prose prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={MarkdownComponents}
              >
                {file.content}
              </ReactMarkdown>
            </article>
          )}
        </div>

        {/* Youtube Video Panel - Sticky sidebar */}
        {ytId && (
          <div className="w-96 border-l border-slate-850 bg-slate-900/30 flex flex-col h-full overflow-y-auto p-4 flex-shrink-0 animate-slide-in">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Youtube className="w-4 h-4" />
              <span>Video Trình Chiếu</span>
            </div>
            
            {/* Embedded Player */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800 mb-4 shadow-lg shadow-black/30">
              <iframe
                key={playerKey}
                ref={iframeRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${ytId}?start=${seekTime}&autoplay=${seekTime > 0 ? 1 : 0}&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Timestamps list */}
            {file.timestamps && (
              <div className="flex-1 flex flex-col min-h-0 bg-slate-950/60 border border-slate-850/65 rounded-lg p-3">
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold mb-2 pb-2 border-b border-slate-850">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Danh sách mốc thời gian</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-850 scrollbar-track-transparent">
                  {file.timestamps.map((t, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleSeek(t.seconds)}
                      className={`flex items-start space-x-2.5 p-2 rounded-md cursor-pointer transition-all ${
                        seekTime === t.seconds 
                          ? 'bg-indigo-600/10 border border-indigo-500/30 text-indigo-300' 
                          : 'hover:bg-slate-900/50 border border-transparent text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold bg-slate-900 text-indigo-400 px-1.5 py-0.5 rounded shrink-0">
                        {t.time}
                      </span>
                      <span className="text-xs leading-relaxed font-medium">{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
