import { useState, useEffect } from 'react';

const INITIAL_FOLDERS = [
  {
    id: 'folder-1',
    name: '🐍 Lộ trình Python cho người mới',
    createdAt: '2026-07-10',
    type: 'roadmap',
    files: [
      {
        id: 'file-1-1',
        name: 'Tong_quan.md',
        createdAt: '2026-07-10',
        content: `# Lộ Trình Học Python Căn Bản Cho Người Mới Bắt Đầu

Chào mừng bạn đến với tài liệu học tập được tổng hợp tự động bởi **Mezon Knowledge Hub Bot**! Dưới đây là lộ trình học tập được cá nhân hóa dựa trên dữ liệu Internet uy tín.

## 📌 Nội Dung Cốt Lõi
Học Python yêu cầu nắm vững các khái niệm cơ bản trước khi đi vào giải quyết bài toán thực tế. Dưới đây là 3 giai đoạn chính:

### Giai đoạn 1: Cú pháp cơ bản & Kiểu dữ liệu
* **Biến (Variables):** Cách gán dữ liệu.
* **Kiểu dữ liệu:**
  - \`int\`, \`float\` (Số nguyên và số thực)
  - \`str\` (Chuỗi văn bản)
  - \`bool\` (Giá trị Đúng/Sai: \`True\`/\`False\`)
* **Cấu trúc điều kiện:** \`if - elif - else\`

\`\`\`python
# Ví dụ cơ bản về cấu trúc điều kiện
tuoi = 20
if tuoi >= 18:
    print("Bạn đã trưởng thành")
else:
    print("Bạn là trẻ vị thành niên")
\`\`\`

### Giai đoạn 2: Cấu trúc lặp & Cấu trúc dữ liệu nâng cao
* **Vòng lặp:** \`for\`, \`while\` để xử lý lặp đi lặp lại công việc.
* **Danh sách (Lists) & Từ điển (Dictionaries):**
  - Danh sách lưu trữ tập hợp có thứ tự.
  - Từ điển lưu trữ cặp \`Khóa (Key): Giá trị (Value)\`.

| Kiểu Dữ Liệu | Cú Pháp Khởi Tạo | Đặc Điểm |
| :--- | :--- | :--- |
| **List** | \`[1, 2, 3]\` | Có thứ tự, cho phép trùng lặp, có thể thay đổi |
| **Dict** | \`{"name": "Python"}\` | Cặp Key-Value, tìm kiếm cực nhanh |
| **Tuple** | \`(1, 2, 3)\` | Có thứ tự, không thể thay đổi sau khi tạo |

### Giai đoạn 3: Hàm (Functions) & Module
* Cách khai báo hàm bằng từ khóa \`def\`.
* Tái sử dụng mã nguồn và quản lý các file dự án sạch sẽ.

---
> 💡 **Lời khuyên từ AI:** Hãy thực hành viết code tối thiểu 30 phút mỗi ngày. Việc gõ code trực tiếp giúp bạn ghi nhớ cú pháp nhanh gấp 3 lần việc chỉ đọc lý thuyết!
`
      },
      {
        id: 'file-1-2',
        name: 'Bai_tap_thuc_hanh.md',
        createdAt: '2026-07-10',
        content: `# Bài Tập Thực Hành Python

Dưới đây là một số bài tập thực hành nhỏ kèm lời giải gợi ý từ AI để bạn tự đánh giá năng lực của mình.

## ✍️ Bài tập 1: Tính giai thừa
Viết chương trình Python nhận đầu vào là một số nguyên dương và tính giai thừa của số đó.

### Lời giải gợi ý:
\`\`\`python
def tinh_giai_thuhat(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * tinh_giai_thuhat(n - 1)

so_can_tinh = 5
print(f"Giai thừa của {so_can_tinh} là: {tinh_giai_thuhat(so_can_tinh)}")
# Output: 120
\`\`\`

## ✍️ Bài tập 2: Quản lý danh sách học viên
Tạo một cấu trúc dữ liệu lưu trữ thông tin tên học viên và điểm số tương ứng. Viết hàm tìm ra học viên có điểm cao nhất.

### Lời giải gợi ý:
\`\`\`python
danh_sach = {
    "Nam": 8.5,
    "An": 9.2,
    "Bình": 7.8,
    "Chi": 9.5
}

def tim_thu_khoa(ds_hoc_vien):
    thu_khoa = max(ds_hoc_vien, key=ds_hoc_vien.get)
    return thu_khoa, ds_hoc_vien[thu_khoa]

ten, diem = tim_thu_khoa(danh_sach)
print(f"Học viên xuất sắc nhất là {ten} với {diem} điểm!")
\`\`\`
`
      }
    ]
  },
  {
    id: 'folder-2',
    name: '🚗 Báo cáo xe điện toàn cầu 2026',
    createdAt: '2026-07-12',
    type: 'document',
    files: [
      {
        id: 'file-2-1',
        name: 'Executive_Summary.md',
        createdAt: '2026-07-12',
        content: `# Tóm Tắt Báo Cáo Thị Trường Xe Điện (EV) 2026

Tài liệu được bóc tách và tóm tắt tự động từ file \`Global_EV_Report_2026.pdf\` bằng thư viện **PDFPlumber** và xử lý qua **Gemini 1.5 Flash**.

## 📈 Các Chỉ Số Tài Chính Cốt Lõi (Key Figures)
Thị trường xe điện năm 2026 chứng kiến sự tăng trưởng vượt bậc tại khu vực Đông Nam Á và sự bão hòa tương đối tại thị trường châu Âu.

| Chỉ số thị trường | Năm 2025 | Năm 2026 (Dự báo) | Tăng trưởng |
| :--- | :---: | :---: | :---: |
| **Tổng lượng xe bán ra** | 13.8M chiếc | 17.2M chiếc | **+24.6%** |
| **Thị phần xe thuần điện (BEV)** | 62% | 68% | **+6.0%** |
| **Doanh thu toàn cầu** | $390B | $475B | **+21.8%** |

## 🔑 Phát hiện quan trọng (Key Takeaways)
1. **Sự trỗi dậy của pin Natri-ion:** Các hãng xe giá rẻ đang dịch chuyển dần từ pin Lithium-ion sang Natri-ion giúp giảm giá thành sản xuất xe điện xuống mức dưới $15,000 tại một số thị trường mới nổi.
2. **Hạ tầng sạc siêu nhanh:** Công nghệ sạc siêu nhanh (hẹn giờ 10 phút đầy 80% pin) bắt đầu được thương mại hóa trên diện rộng, giảm tải nỗi lo về hành trình dài của người tiêu dùng.
3. **Cạnh tranh khốc liệt tại Trung Quốc:** BYD và Tesla tiếp tục duy trì thế song mã, tuy nhiên các startup mới nổi đang chia nhỏ miếng bánh thị trường trung cấp.

> [!IMPORTANT]
> **Điểm cần lưu ý cho doanh nghiệp:** Cần tập trung đầu tư vào chuỗi cung ứng pin và hợp tác xây dựng trạm sạc tiêu chuẩn thay vì chỉ phát triển thiết kế xe mới.
`
      },
      {
        id: 'file-2-2',
        name: 'Action_Items.md',
        createdAt: '2026-07-12',
        content: `# Kế Hoạch Hành Động Chiến Lược

Đề xuất các bước hành động cụ thể cho đội ngũ phát triển sản phẩm dựa trên báo cáo xu hướng xe điện 2026.

## 🎯 Nhiệm vụ ngắn hạn (Q3/2026)
- [x] Đánh giá hiệu suất của dòng pin thế hệ mới (Natri-ion).
- [ ] Nghiên cứu giấy phép nhập khẩu linh kiện trạm sạc tiêu chuẩn châu Âu.
- [ ] Lập kế hoạch liên minh với các chuỗi trung tâm thương mại để lắp đặt trạm sạc.

## 🚀 Chiến lược dài hạn (2027 - 2028)
* **Tự chủ công nghệ lõi:** Chuyển đổi dần tỷ lệ gia công phần mềm điều khiển pin từ bên thứ ba sang tự phát triển nội bộ để tối ưu hệ năng.
* **Xây dựng thương hiệu xanh:** Triển khai các chiến dịch truyền thông hướng đến giảm thiểu dấu chân carbon của chuỗi cung ứng linh kiện xe.
`
      }
    ]
  },
  {
    id: 'folder-3',
    name: '🎥 Tư duy thiết kế hệ thống (System Design)',
    createdAt: '2026-07-13',
    type: 'video',
    files: [
      {
        id: 'file-3-1',
        name: 'Video_Summary_SystemDesign.md',
        createdAt: '2026-07-13',
        content: `# Tóm Tắt Video: Kiến Trúc Hệ Thống Cực Kỳ Chi Tiết

Tài liệu được bóc tách tự động từ video Youtube thuyết giảng về **System Design & High Availability Architecture**.

* **Đường dẫn gốc:** https://www.youtube.com/watch?v=xpDnVSmNFX0
* **Thời lượng:** 25 phút 40 giây
* **Mô hình học:** Phân tích cấu trúc hệ thống chịu tải cao (High Scale).

## ⏱️ Dòng Thời Gian Chi Tiết (Click để tua video)
Dưới đây là các ý chính tương ứng với mốc thời gian trong video:

* **[00:00](timestamp://0)** - Giới thiệu tổng quan và mục tiêu của việc thiết kế hệ thống mở rộng lớn.
* **[03:15](timestamp://195)** - Sự khác biệt cốt lõi giữa Kiến trúc đơn khối (Monolith) và Kiến trúc vi dịch vụ (Microservices). Ưu và nhược điểm của từng phương án.
* **[08:45](timestamp://525)** - Tầm quan trọng của Cân bằng tải (Load Balancer). Tìm hiểu thuật toán Round Robin và Least Connections.
* **[14:20](timestamp://860)** - Cơ chế bộ nhớ đệm (Caching). Cách hoạt động của Redis/Memcached và chiến lược Write-Through vs Cache-Aside.
* **[21:10](timestamp://1270)** - Kỹ thuật phân mảnh cơ sở dữ liệu (Database Sharding & Replication) để giải quyết nghẽn cổ chai ghi/đọc dữ liệu.

---

## ⚡ Các Bài Học Rút Ra Cực Kỳ Quan Trọng
1. **Đừng vội vàng Microservices:** Đối với các startup giai đoạn đầu, kiến trúc Monolith tinh gọn luôn mang lại tốc độ phát triển (Time-to-market) nhanh hơn. Chỉ chuyển đổi khi team scale đủ lớn.
2. **Chú ý Single Point of Failure (SPOF):** Luôn cấu hình dự phòng (Redundancy) cho các node chính như Load Balancer và Database Master.
`,
        videoUrl: 'https://www.youtube.com/watch?v=xpDnVSmNFX0',
        timestamps: [
          { time: '00:00', seconds: 0, text: 'Giới thiệu tổng quan thiết kế hệ thống' },
          { time: '03:15', seconds: 195, text: 'Monolith vs Microservices' },
          { time: '08:45', seconds: 525, text: 'Thiết lập Load Balancer' },
          { time: '14:20', seconds: 860, text: 'Cơ chế Caching với Redis' },
          { time: '21:10', seconds: 1270, text: 'Phân mảnh dữ liệu Database Sharding' }
        ]
      }
    ]
  }
];

export function useKnowledgeHub() {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    // Check local storage first
    const savedData = localStorage.getItem('mezon_khb_folders');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFolders(parsed);
        if (parsed.length > 0) {
          setSelectedFolderId(parsed[0].id);
          if (parsed[0].files.length > 0) {
            setSelectedFileId(parsed[0].files[0].id);
          }
        }
      } catch (e) {
        setFolders(INITIAL_FOLDERS);
        setSelectedFolderId(INITIAL_FOLDERS[0].id);
        setSelectedFileId(INITIAL_FOLDERS[0].files[0].id);
      }
    } else {
      setFolders(INITIAL_FOLDERS);
      setSelectedFolderId(INITIAL_FOLDERS[0].id);
      setSelectedFileId(INITIAL_FOLDERS[0].files[0].id);
      localStorage.setItem('mezon_khb_folders', JSON.stringify(INITIAL_FOLDERS));
    }
    setLoading(false);
  }, []);

  const saveToStorage = (updatedFolders) => {
    setFolders(updatedFolders);
    localStorage.setItem('mezon_khb_folders', JSON.stringify(updatedFolders));
  };

  const getSelectedFolder = () => {
    return folders.find(f => f.id === selectedFolderId) || null;
  };

  const getSelectedFile = () => {
    const folder = getSelectedFolder();
    if (!folder) return null;
    return folder.files.find(f => f.id === selectedFileId) || null;
  };

  // Actions
  const selectFile = (folderId, fileId) => {
    setSelectedFolderId(folderId);
    setSelectedFileId(fileId);
  };

  const selectFolder = (folderId) => {
    setSelectedFolderId(folderId);
    const folder = folders.find(f => f.id === folderId);
    if (folder && folder.files.length > 0) {
      setSelectedFileId(folder.files[0].id);
    } else {
      setSelectedFileId(null);
    }
  };

  const createFolder = (name, type = 'roadmap') => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      createdAt: new Date().toISOString().split('T')[0],
      type,
      files: []
    };
    const updated = [...folders, newFolder];
    saveToStorage(updated);
    setSelectedFolderId(newFolder.id);
    setSelectedFileId(null);
  };

  const createFile = (folderId, name, content = '') => {
    const newFile = {
      id: `file-${Date.now()}`,
      name,
      createdAt: new Date().toISOString().split('T')[0],
      content
    };
    const updated = folders.map(f => {
      if (f.id === folderId) {
        return { ...f, files: [...f.files, newFile] };
      }
      return f;
    });
    saveToStorage(updated);
    setSelectedFolderId(folderId);
    setSelectedFileId(newFile.id);
  };

  const updateFileContent = (folderId, fileId, newContent) => {
    const updated = folders.map(f => {
      if (f.id === folderId) {
        const updatedFiles = f.files.map(file => {
          if (file.id === fileId) {
            return { ...file, content: newContent };
          }
          return file;
        });
        return { ...f, files: updatedFiles };
      }
      return f;
    });
    saveToStorage(updated);
  };

  const deleteFolder = (folderId) => {
    const updated = folders.filter(f => f.id !== folderId);
    saveToStorage(updated);
    if (selectedFolderId === folderId) {
      if (updated.length > 0) {
        setSelectedFolderId(updated[0].id);
        setSelectedFileId(updated[0].files[0]?.id || null);
      } else {
        setSelectedFolderId(null);
        setSelectedFileId(null);
      }
    }
  };

  const deleteFile = (folderId, fileId) => {
    const updated = folders.map(f => {
      if (f.id === folderId) {
        return { ...f, files: f.files.filter(file => file.id !== fileId) };
      }
      return f;
    });
    saveToStorage(updated);
    if (selectedFileId === fileId) {
      const folder = updated.find(f => f.id === folderId);
      setSelectedFileId(folder?.files[0]?.id || null);
    }
  };

  // Filter folders and files based on search
  const getFilteredFolders = () => {
    if (!searchQuery) return folders;
    
    return folders.map(folder => {
      const matchedFiles = folder.files.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        file.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const folderMatches = folder.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (folderMatches || matchedFiles.length > 0) {
        return {
          ...folder,
          // If the folder matched but files didn't, show all files, otherwise show matched files
          files: matchedFiles.length > 0 ? matchedFiles : folder.files
        };
      }
      return null;
    }).filter(Boolean);
  };

  return {
    folders: getFilteredFolders(),
    rawFolders: folders,
    selectedFolder: getSelectedFolder(),
    selectedFile: getSelectedFile(),
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
  };
}
