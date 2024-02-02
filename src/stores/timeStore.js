import { defineStore } from 'pinia';
export default defineStore('timeStore', {
  getters: {
    currentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  actions: {
    dayToTimestamp10Code(dateString){
      const dateObject = new Date(dateString);
      const timestampInSeconds = Math.floor(dateObject.getTime() / 1000);
      return timestampInSeconds;
    },
    timestamp10CodeToDay(code10){
      const dateObject = new Date(code10 * 1000);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // 月份從0開始需要加1
      const day = String(dateObject.getDate()).padStart(2, '0');
      const formattedDateString = `${year}-${month}-${day}`;
      return formattedDateString
    },
  },
});