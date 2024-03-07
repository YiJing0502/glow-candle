import axios from 'axios';
import { defineStore } from 'pinia';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;

export default defineStore('uploadImagesStore', {
  actions: {
    // fn, 驗證圖片大小以及檔案類型
    validateImages(multipleFilesArray) {
      // 驗證檔案大小、檔案類型
      for (let index = 0; index < multipleFilesArray.length; index += 1) {
        const element = multipleFilesArray[index];
        const fileSizeInBytes = element.size;
        const limitedFileSize = 3 * 1024 * 1024;
        if (fileSizeInBytes > limitedFileSize) {
          return false;
        }
        if (
          element.type !== 'image/jpeg' &&
          element.type !== 'image/jpg' &&
          element.type !== 'image/png'
        ) {
          return false;
        }
      }
      return true;
    },
    uploadFile(element) {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append('file-to-upload', element);
        axios
          .post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/upload`, formData)
          .then((res) => {
            resolve({ imageUrl: res.data.imageUrl });
          })
          .catch((err) => {
            resolve({ error: err });
          });
      });
    },
    // fn, 上傳多張圖片
    uploadImages(event) {
      const multipleFilesArray = [...event.target.files];
      const uploadPromises = multipleFilesArray.map((element) => this.uploadFile(element));
      return Promise.allSettled(uploadPromises).then((results) => {
        const successfulUploads = results.filter((result) => result.status === 'fulfilled');
        const failedUploads = results.filter((result) => result.status === 'rejected');
        return { successfulUploads, failedUploads };
      });
    },
  },
});
