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
          element.type !== 'image/jpeg'
          && element.type !== 'image/jpg'
          && element.type !== 'image/png'
        ) {
          return false;
        }
      }
      return true;
    },
    // fn, 上傳多張圖片
    uploadImages(event) {
      return new Promise((resolve, reject) => {
        const multipleFilesArray = [...event.target.files];
        if (this.validateImages(multipleFilesArray)) {
          // 上傳檔案
          multipleFilesArray.forEach((item) => {
            // 產生一個新的上傳表單格式
            const formData = new FormData();
            // 夾帶欄位與要上傳的檔案
            formData.append('file-to-upload', item);
            // 上傳檔案
            axios
              .post(`${VITE_BASE_URL}/api/${VITE_API_PATH}/admin/upload`, formData)
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          });
        }
      });
    },
  },
});
