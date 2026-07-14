'use client';
import { Spinner } from '@/components/ui/Spinner';
import Sidebar from '@/components/features/sidebar/Sidebar';
import FileViewer from '@/components/features/file-viewer/FileViewer';
import { useKnowledgeHub } from '@/hooks/useKnowledgeHub';

export default function DashboardPage() {
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
    deleteFile,
  } = useKnowledgeHub();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[rgb(var(--color-bg))]">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm font-medium tracking-wide text-[rgb(var(--color-text-muted))]">
            Đang tải không gian làm việc...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[rgb(var(--color-bg))] overflow-hidden antialiased">
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
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <FileViewer
          file={selectedFile}
          folderName={selectedFolder?.name}
          onSaveContent={(content) => {
            if (selectedFolder && selectedFile) {
              updateFileContent(selectedFolder.id, selectedFile.id, content);
            }
          }}
        />
      </main>
    </div>
  );
}
