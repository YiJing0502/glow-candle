![封面GLOW](https://storage.googleapis.com/vue-course-api.appspot.com/orli-hexschool/1709994083234.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LXePjMmbqjo5tPzywIn0NUyf%2Fd8SsFnL4OlfSwoSD2ZJRuZgqfjtq%2FgqzlhfdHXE12kD5w%2Fbqd6mMtjR4TUYRRpshrYwBkD7GsTk0i%2Bjozd8VsdfAvnszeOHm4qFJoKQR4jLwiou%2BVXJK6FWqXLZd2aFDsoSOa4lzr5A%2BwM7oIqK%2FfSZCYkTUi6Ma%2FBq0JKYKTr2XzLQCjheEsp%2FU0eZnPUgz8I73K%2F8dSvxfQXnot39AYq4IqTdpAh%2BC7VaVL%2Fj7VpvjoNFv4PV9LTCgjavavvh65AI0VbKID4m7UhfTD8Jmh4VsfkISbHBu7qU1sHRVsF%2Bx5mZJqQcgS321J543g%3D%3D)
# 光輝時刻｜GLOW CANDLE
> 香氛蠟燭電商網站
## 作品簡介
### 創作動機
在大一的時候，我曾親手製作石頭造型的蠟燭為材料作為作品，並對蠟燭材料感到的熟悉，以此作為電商販售的主要商品。
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
4. **UI庫和組件：** 
整合了 `Material Icons`、`Swiper`和`Vue Loading Overlay`，以實現漂亮的UI和提升使用者體驗。
5. **表單驗證和編輯器：** 
使用 `vee-validate` 實現表單驗證，`ckeditor` 供豐富的文字編輯功能，確保用戶輸入的有效性和更好的編輯體驗。
6. **後台管理系統：** 
開發了一個基礎的後台管理系統，用於查看和管理訂單、產品、文章、優惠券等功能。
7. **代碼品質：** 
遵循 `ESLint Airbnb` 風格，以確保程式碼的一致性和高品質。
8. **API路徑統一管理：** 
通過統一的配置 `.env` 文件，有效地管理整個應用程式中的API路徑，以提高程式碼的可維護性。
9. **布局和樣式：** 
使用 `Bootstrap 5` 和 `Sass` 實現網站的布局，以及進行樣式的擴展和自定義。前台有 `RWD` ，最小可支援320px。
10. **動畫效果：** 使用 `animate.css` 搭配 `wow.js`
### 前台
*  **電商展示：** 首頁、商品列表、商品介紹等
*  **品牌簡介：** 關於我們、動態消息、企業採購 / 異業合作
*  **電商購物簡介：** 蠟燭使用方式、購物說明、退換貨政策
*  **電商購物車：** 刪除、修改商品、使用優惠券、結帳、下訂單、查看訂單
*  **搜索：** 產品查詢、訂單查詢

### 後台
* 管理者登入
*  **商品管理：** 新增、刪除、編輯、查閱（多圖上傳）
*  **優惠券管理：** 新增、刪除、編輯、查閱
*  **訂單管理：** 刪除、編輯、查閱
*  **文章管理：** 新增、刪除、編輯、查閱（單圖上傳）

## 前台介紹

### 導覽列往下滑時消失、往上滑時出現
![導覽列往下滑時消失、往上滑時出現](https://imgur.com/rIrEIXu)

### 中小型螢幕尺寸使用者提供固定底部的便捷選單
![截圖 2024-03-09 20.33.34](https://hackmd.io/_uploads/ByoQv0tT6.png)

### 頁面Loading動畫
![頁面Loading動畫](https://hackmd.io/_uploads/SJefcRFpp.gif)
### 產品搜尋
![產品搜尋](https://hackmd.io/_uploads/HJP-hAFpp.gif)
### 訂單搜尋（按下enter也可以開始搜尋）
![訂單搜尋](https://hackmd.io/_uploads/rJYXJ19aa.gif)
### 庫存限制
![庫存限制](https://hackmd.io/_uploads/SJVR1k9aa.gif)

## 後台介紹

## 訂單管理
### 觀看狀態
![訂單管理2](https://hackmd.io/_uploads/HyCTS15Ta.png)
### 編輯狀態
![截圖 2024-03-09 21.43.00](https://hackmd.io/_uploads/r1M9vyc6a.png)

1. 後台可以打勾更新付款狀態，如果打勾已付款會標註為當天日期
2. 後台可以修正訂單中的商品數量、訂單資訊，並提供基本的驗證

## 產品管理
### 產品列表
1. 使用者可以篩選類別
2. 使用者可以搜尋產品

![產品管理產品列表](https://hackmd.io/_uploads/B1mStycTT.png)
### 單一產品內容
![產品管理產品內容](https://hackmd.io/_uploads/ry2BY19a6.png)
### 單一產品圖片
1. 使用者可以多圖上傳
2. 使用者可以手動填網址新增圖片

![產品管理產品圖片](https://hackmd.io/_uploads/HJTqtk5TT.jpg)

## 優惠券管理
### 優惠券列表
1. 使用者可以接收優惠券到期提醒

![優惠券管理優惠券列表](https://hackmd.io/_uploads/ByktoJcap.png)
### 單一優惠券編輯狀態
1. 使用者可以接收驗證提醒
2. 到期日不可選填過去之日期

![優惠券編輯狀態](https://hackmd.io/_uploads/rky7nJ96p.png)

## 文章管理
### 單一文章資料
1. 使用者可以單一圖上傳

![文章管理文章資料](https://hackmd.io/_uploads/ByQOpJqTp.png)
### 單一文章內容
![文章管理文章內容](https://hackmd.io/_uploads/rysOaJcp6.png)
