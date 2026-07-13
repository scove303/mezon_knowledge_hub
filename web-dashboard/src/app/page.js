'use client';

import React from 'react';
import { useKnowledgeHub } from '../hooks/useKnowledgeHub';
import Sidebar from '../components/Sidebar';
import FileViewer from '../components/FileViewer';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const {
    folders,
    selectedFolder,
    selectedFile,
    searchQuery,
    setSearchQuery,
    loading,
    selectFile,
    selectFolder,
    createFolder,
    createFile,
    updateFileContent,
    deleteFolder,
    deleteFile
  } = useKnowledgeHub();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-sm font-semibold tracking-wide text-indigo-400">Đang khởi tạo không gian làm việc...</p>
        </div>
      </div>
    );
  }

  const handleSaveContent = (newContent) => {
    if (selectedFolder && selectedFile) {
      updateFileContent(selectedFolder.id, selectedFile.id, newContent);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans antialiased text-slate-100">
      {/* LEFT SIDEBAR - Folder Tree Nav */}
      <Sidebar
        folders={folders}
        selectedFolder={selectedFolder}
        selectedFile={selectedFile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectFile={selectFile}
        selectFolder={selectFolder}
        createFolder={createFolder}
        createFile={createFile}
        deleteFolder={deleteFolder}
        deleteFile={deleteFile}
      />

      {/* RIGHT MAIN WORKSPACE - Markdown Render & Media Player */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-950">
        <FileViewer 
          file={selectedFile}
          folderName={selectedFolder?.name}
          onSaveContent={handleSaveContent}
        />
      </main>
    </div>
  );
}
