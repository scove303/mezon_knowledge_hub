import axiosInstance from './axios.instance';

export const aiService = {
  async generateRoadmap(topic, folderName) {
    const { data } = await axiosInstance.post('/ai/roadmap', {
      topic,
      folder_name: folderName,
    });
    return data;
  },

  async digestDocument(file, folderId) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder_id', folderId);
    const { data } = await axiosInstance.post('/ai/digest', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async summarizeYoutube(url, folderId) {
    const { data } = await axiosInstance.post('/ai/youtube', {
      url,
      folder_id: folderId,
    });
    return data;
  },
};
