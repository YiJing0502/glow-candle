![封面GLOW](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709994083234.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LXePjMmbqjo5tPzywIn0NUyf%2Fd8SsFnL4OlfSwoSD2ZJRuZgqfjtq%2FgqzlhfdHXE12kD5w%2Fbqd6mMtjR4TUYRRpshrYwBkD7GsTk0i%2Bjozd8VsdfAvnszeOHm4qFJoKQR4jLwiou%2BVXJK6FWqXLZd2aFDsoSOa4lzr5A%2BwM7oIqK%2FfSZCYkTUi6Ma%2FBq0JKYKTr2XzLQCjheEsp%2FU0eZnPUgz8I73K%2F8dSvxfQXnot39AYq4IqTdpAh%2BC7VaVL%2Fj7VpvjoNFv4PV9LTCgjavavvh65AI0VbKID4m7UhfTD8Jmh4VsfkISbHBu7qU1sHRVsF%2Bx5mZJqQcgS321J543g%3D%3D)
# 光輝時刻｜GLOW CANDLE
> 香氛蠟燭電商網站
## 作品簡介
### 創作動機
在大一的時候，我曾親手製作石頭造型的蠟燭為材料作為作品，並對蠟燭材料感到熟悉，以此作為電商販售的主要產品。
### 創作理念
無論是大還是小的蠟燭，在點亮的時刻都能感受到燃燒所帶來的光和熱。因此，我以蠟燭點亮的時刻象徵光輝，期許我們不論身處何時何地，都能散發出自己獨特的光芒。
### 色系規劃
![色系規劃](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709994311121.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dsNHWlB51TvPvKHZRp13r9cW1%2FDgg6c%2B9qvcu%2BAoATLzQouN5oG97InyuTh6cJ3IkEnNU4bPhE%2B0fZ%2BQLCae45bvS0w1bAVPu8%2FQf79XG9WhycruN9XjuGhBzuaASxOk94J7pC6K4v57yM%2BoqbbJvbS5U158xgi0NoJyLipTF3t%2FBKgnEb2Kpl%2F6W%2Bzw0QBjMCdS%2FbUHH0R0Brd4ppG8lduiP99d15jQ1fEh6Te0FR4Sy1493jQVb8cM7ndI%2BWpwVLA81%2FZvbDF87EsIHizt4kFEkzrQWYEboTwCKek04ayuyO9ypmTMMdcEtBJUazOoI96sS4UBXHQejR2fZd7EGQ%3D%3D)
### 圖片來源
所有圖片使用 [Unsplash](https://unsplash.com/) 由世界各地的創作者所提供的免費圖片

## 專案說明
### 使用技術
1. **技術堆疊：** 
這是一個使用 `Vue.js` 和 `Vite` 技術堆疊的網站，以提供高效的前端開發和更好的性能。
2. **路由管理：** 
專案使用 `Vue Router` 來管理前端應用程式的路由，以確保流暢的頁面切換。
3. **狀態管理：** 
利用 `pinia` 來有效地管理和共享應用程式中的狀態。
4. **API路徑統一管理：** 
通過統一的配置 `.env` 文件，有效地管理整個應用程式中的API路徑，以提高程式碼的可維護性。
5. **程式碼品質：** 
遵循 `ESLint Airbnb` 風格，以確保程式碼的一致性和高品質。
6. **布局和樣式：** 
使用 `Bootstrap 5` 和 `Sass` 實現網站的布局，以及進行樣式的擴展和自定義。前台的 `RWD` ，最小可支援320px的螢幕尺寸。
7. **動畫效果：** 使用 `animate.css` 搭配 `wow.js`以及 `Vue.js` 提供的 `transition` 動畫元件，增加展示頁面的變化以及過渡頁面之間的轉場。
8. **UI元件庫：** 
整合了 `Material Icons`、`Swiper`和`Vue Loading Overlay`，以實現的良好的使用者體驗。
9. **表單驗證和編輯器：** 
使用 `vee-validate` 實現表單驗證，`ckeditor` 供豐富的文字編輯功能，確保用戶輸入的有效性和更好的編輯體驗。
10. **後台管理系統：** 
開發了一個基礎的後台管理系統，提供管理者查看和管理訂單、產品、文章、優惠券等功能。



### 前台
*  **電商展示：** 首頁、產品列表、產品介紹等
*  **品牌簡介：** 關於我們、動態消息、企業採購 / 異業合作
*  **電商購物簡介：** 蠟燭使用方式、購物說明、退換貨政策
*  **電商購物車：** 刪除、修改產品、使用優惠券、結帳、下訂單、查看訂單
*  **搜索：** 產品查詢、訂單查詢

### 後台
* 管理者登入
*  **產品管理：** 新增、刪除、編輯、查閱（多圖上傳）
*  **優惠券管理：** 新增、刪除、編輯、查閱
*  **訂單管理：** 刪除、編輯、查閱
*  **文章管理：** 新增、刪除、編輯、查閱（單圖上傳）

## 前台介紹

### 導覽列往下滑時消失、往上滑時出現
![導覽列往下滑時消失、往上滑時出現](https://i.imgur.com/rIrEIXu.gif)

### 中小型螢幕尺寸使用者，提供固定底部的便捷選單
![截圖 2024-03-09 20.33.34](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709994827639.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nV1RRtiTnB7XMYlmCevjYXquuTETBbKTUFSanE4TPJmV040l3iTNylCQUlIIhMyS3%2FDTeWYgg0AlNHR35W%2BT9ULm%2BJfXK3Gm3XXRlqGAIdYpRIYvzt3hOCg9%2B0%2FgxnXx%2BmKb2ji4s8bYhUTwgmPMMbEhRWDUZjk8blNAGpfxZtAMQ2ld6CzkxyjVELedMjg7msbPC0hyL4%2FkHgKsdvz8XvTZ1yXzgT3yAkMXkgzjjJ0P1eRQaN5AX%2F87bE88d0tP%2Bf%2B5TDW5cb%2BniD7M0sYoJIm4X%2FuEo2kkd5EmhMKlnI3KAF8JFkWiih00wnhuavq87Oaxzo1loSiKou4EfBSqfw%3D%3D)

### 頁面Loading動畫
![頁面Loading動畫](https://i.imgur.com/Xvz3RKS.gif)
### 產品搜尋
![產品搜尋](https://i.imgur.com/76NkcSY.gif)
### 訂單搜尋（按下enter也可以開始搜尋）
1. 下訂單之後，如果想要修改品項，可以聯絡管理者修改訂單，爾後使用者查詢訂單後進行付款

![訂單搜尋](https://i.imgur.com/wvRRiDU.gif)
### 庫存限制
![庫存限制](https://i.imgur.com/PFdMd5Y.gif)
### 保存收件資料，直到關閉頁面 
1. 使用 sessionStorage 保存收件資料，除非關閉頁面否則填寫完資料後還是可以自由切換頁面

![保存收件資料](https://i.imgur.com/7gaFHbW.gif)

## 後台介紹

## 訂單管理
### 觀看狀態
![訂單管理觀看狀態](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031316801.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DzonSBP0YJh0gRuKcWLFpDRcQX143xAFe%2BmSNx5bkb2f2PxVKPd0gkIQejMU2R%2FfGL4g32o0KUjOlt5%2BmuoBD%2FcISc4TlsNoC%2B1fbH%2FxZJCflotcjGAaUQwPZr8HEnXm3Pe3DGgyUN6ywtS88ra80UCI3Iq%2BLkrAAVCt0ZQUnXTsM4Pu1CpIlaTEseauvhQptqETa%2FMyZJb9Ee%2Byko3henuRkBkE7ZshwqE9WzSEwRXe5qY%2FlemuB1HfGzl5j0ju97Aizg1AjZ2hR0MGi%2BTKuYABNC3OQKqtcnWg5oYvZD2cBBhI5uH5x2%2BBVB9MFKAQBTj7Zw9kYc4gitJxdAKTZQ%3D%3D)
### 編輯狀態
1. 管理者可以打勾更新付款狀態，如果打勾已付款，更新後會標註為當天日期
2. 管理者可以修正訂單中的產品數量、訂單資訊
3. 提供基本的表單驗證，使管理者可接收到錯誤訊息

![訂單管理編輯狀態](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031369281.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aBlIjLNe18rbr0hc0tad%2Bs7wFfv3M%2FrlsO1ivcPqr%2FqssO5TbhVjiomujcVImcuK53TxFTSd%2FNH2JpVNNaJqzZRpA%2BHiGmPlsKhMRbSJGJreoIuFjzZY6B1mx6B%2FqGphOedTvJJ1hILRLNby2yxs%2FDzMqzBmx2bcMIoFJuB0GBed%2BMxDjqRukQw4WlCODI4DKMVifjAF8neJOc6kz7DgY3W4VkxCR44UgBHx61bX6dPmkGW0%2F%2F1n1b%2Bk4Nriogg9OI1AoyTW3U3W1t2QvMNV0m2ltUjYCL8xRXek7mNHqORnkA5JQDfBlEa%2BNVGIeQhDhALmzyrc%2FDplVQB%2B95WVYw%3D%3D)



## 產品管理
### 產品列表
1. 管理者可以篩選類別
2. 管理者可以搜尋產品

![產品管理產品列表](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031437507.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QW9bcVTHgfVvtkTbHrq27T1zXtDGYOK8xrD4oqVKwNjmtyYEhOW2PQL2xhs9Pwk%2B9fojvL5xdc0L4Z33LX%2BBt4bojzRYQ2Jv11R18m9SvmWmosWC4YR7a15MHUG6aCPG4H%2BB1tSVHQbwLngXjT1v%2FQjBlIDiUIdI12c9scqkXKMKGxnfSTv9TazzUvJdtOY4ye5JfY25laA7PdYchTkV7GgXJCt8h5X7hpWjVvCzdvR5%2FBLe%2BuNVhqcGxC4GSwmYXpKm%2BAxd9cHMJVxztwBOlyClwN6LGLPrEjrPyV3VFCoArvzUKAx8tX%2BFZqKt5iAavT2Tb%2FcWKS%2BjJHesu0H63A%3D%3D)

### 單一產品內容
![產品管理產品內容](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031475512.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gMNYFOm%2BxKcJwp3bOhUSClV%2BjuFNdpIC1KVjOAqFpuJoqtKuITUWw%2BAmEUmiTaj9wWprP0K7EpW0ZYQdAI7OkV%2Fu0%2BQ1rlj3KNl4HpFoWVVG%2FokQJNP%2FkwVk7wGiYsJEprq0%2FzEdoWj3JAHu0GrFYbDBv1i6NI6%2Bo9lcN8v8xIuAuDwLSYadfK2EAZyeFUtwBlNxYTedYSzMp%2BQuWkJ8YVZiwjupZqxuFwWdQVfxu73i2A2Y%2BkCQ%2FeBLsoEPdEfhUAlZ103FMRPkBiGpXx4Y8QnTKeeB1wZpFiqI%2B7CmhV4KzVCmHnsHpSIgQvirKr1FHsUccStO9COk%2B5dO3b7Y4Q%3D%3D)
### 單一產品圖片
1. 管理者可以多圖上傳
2. 管理者可以手動填網址新增圖片
3. 提供基本的表單驗證，使管理者可接收到錯誤訊息

![產品管理產品圖片](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031516806.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=o2wnjbPekIILAehEI6JStBdF7oz9HKAIQbE7%2FIJVXhzvzvrtvzeB%2BGbo9fnM8gPV1t2ME8%2BMvS5wDKNsvfprUdPlHmfnf7s0p5dz9KLY9X6d9R%2BKOdog2e1v%2FdpTtZ%2FLqyKJSdtWymMfTxMFbb34oPfp5Clu5wbYPhY5qer8tJrn52sh9wkDvKWKpoQqYJ3KynIWfNiLanTPCWOaLPI05SOKT7WfNVEHsGY7Jslh%2FY5vKYkZJKlKdPNE5nEOoNN2xFT3urItCYTTT6LAggpNSzb8e55dkrULKYLMbTdxLj%2F%2FiA0O7PxHC3iV8bvdpQIxvM%2BHbRelPo4Cj59dF1YkcQ%3D%3D)


## 優惠券管理
### 優惠券列表
1. 管理者可以接收優惠券到期提醒

![優惠券管理優惠券列表](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031568356.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VjqlQztzM%2BsHBV2cQJQSs58zRc4K1GfrW2XvNLcQz%2B2gb%2BH782OsBKZgQSuQ%2FLsllEVur9qc%2FVzmeUiKBYB0V%2Fa5rDx6RMJT5IlOQBoeNHq1%2BuJ2DAhdctsga3GTQzgkL7%2BeaVxs4oXnooYgUGp4%2Brra2SoyBXsDAc51hVNnRxqDkVZqSQR18CiICGb8tpCtrauKWBkXKOdkwHrNHxwiZBrvpuXgtTEALxqAZbC9UU42A8m5%2Bk%2BzykfGiq%2F1MMlObTRU2pEMmvRhJFNXdnZ%2BmJqr9zDQW5Wt8Wqj0u7dsGdnQO8aE%2BeD88p9RjP%2FCEwvdyFLjLqW36qdxyD%2FPIiYEQ%3D%3D)


### 單一優惠券編輯狀態
1. 提供基本的表單驗證，使管理者可接收到錯誤訊息
2. 到期日不可選填過去之日期

![優惠券編輯狀態](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031607410.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dftyhwxPe5b8UpeF2wXz10%2BvQq1tRBeVvFzddZkLWSjlbONnjLlKlrxDxyXSjNlo3vJ6lJJYhG%2B35FsU0yz8mK9Zl9XTABz6UCSVI5drpfUC9%2BnKYOGO1e%2B%2Fx%2BgmdX0ZYEMFG8id3ZfNl6gFocIlaAT3rRKcz2a3Qt%2F0fEkAZPJr6G40s%2Fl5FdUGjgC%2BmqtFph3%2BZsxgPlNwpzqVKXh8geNDxIoSxOxeSnBYPtZd2awgIQD3AWWRd0%2B0h1wvxEisfMoUbR9Vf%2FDdkbNUiwb4u8q2kA%2FgWZBKRi1ZYXxxBgeP6BufX8I4kmaRgkXMfE7LHG8zONMINIRP6ABvhjucpQ%3D%3D)

## 文章管理
### 單一文章資料
1. 管理者可以單一圖上傳
2. 提供基本的表單驗證，使管理者可接收到錯誤訊息

![文章管理文章資料](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031655211.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jXHRTUFsk%2Fi3ymdy5wCpsYmuhn9eYFHufLyhwXvBNr7%2FpzYwXcSYaeGfuxkkmfX0U1bgO5OQAcd%2FIcKc4Km2mxOvmGOQMKLiKSdsGte%2FyCoAGabE5%2BycxDSKU5J%2BnUEXDhf4fCNWCtiDZejvv%2FFWGsnC7e6blWUquX%2Fq8QZdTzZT3%2BFln%2BZjLdeicpckTPb%2F0LzTWgqdFMRzFNbaRPMQOt%2F2XFJTs3J%2BxZ0G%2FarycV54M1%2BiQvhz5z3aWtF4lp5P8m0jInKpfJapI7fBKMHYcWwhspibrlSncb5e1eO7BuzTroI94V%2BjaZSjGuFY7qF824YwmWS3IzsEs3dDB8oOCg%3D%3D)

### 單一文章內容
![文章管理文章內容](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1710031683843.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=X29WaysCjig1%2Bp0JyXmYQekXWoxJ6MGkghew9o%2BCRK0Hhe0YMy5HNonJJ2TZyCweysKCx7NTcC8WoL%2F%2FUp3PVpmbvutNHrL5xax9kjTJf0XGllYU%2BvsW%2BdgAfp3%2FBnvbKsPx%2BaccCsQoKjokRCcuW5R1hAyUoTpcyS6fivUNijjmcrPqzmcJXpMoSsdbq%2BcHI6AECtOzQmH9XLEwKnge2WW2el1jeS9U1BGEgjxa8oDVYRtk%2BFhWWr5aqvHMz9HxoOKqekSIRUX0PKrUclpUjOglHDVOvE%2B3BN1S0zJkRkycEm52Megfa20sX2Xe2UcizqsBBJelcMaUWZ69Ce4KVg%3D%3D)
