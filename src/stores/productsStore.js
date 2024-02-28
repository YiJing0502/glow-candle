/* eslint-disable camelcase */
import axios from 'axios';
import { defineStore } from 'pinia';

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env;
export default defineStore('productsStore', {
  state: () => ({
    // 所有產品資料(store共用)
    productsData: [],
    // 產品資料（展示）
    showProductsData: [],
    // 是否正在載入
    isLoading: false,
    // 有分頁的產品資料(顯示使用)
    productPagesData: {},
    // 產品類別
    productsCategory: [],
    // 產品頁狀態(目前產品頁要顯示的內容)
    productsPageStatus: '全部產品',
    // 香氛蠟燭
    uniqueSeriesArray: [],
    uniqueTonesArray: [],
    uniqueCapacitiesArray: [],
    // candle data
    candlesData: [],
    // 首頁需要的產品資料
    calmSeriesProducts: ['-NoLTSCPuUQGarWezIAl', '-NoLWB8MDGIYr9flJ0Pb', '-NoLWTOY-q1QXZOnQmEN', '-NoLWnut3G93WzfuedRW'],
    bestsellers: ['-NoLXYH97x33NA7DUGnQ', '-NoLY64ZdZ5tKG0MYgXk', '-NoL_80KGaePj1gdr6Gp', '-NoLRz5ol1emgz6xq7j0'],
    calmSeriesBundle: {},
    bestsellersData: [],
    calmSeriesData: [],
    // 產品推薦
    recommendationsData: [],
  }),
  getters: {},
  actions: {
    // ajax, 取得所有產品
    getProductsAll(init = false, page = 1) {
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products/all`;
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => {
            if (init) {
              this.productsData = res.data.products;
              this.getCandlesData();
              this.getCandleFilterArray();
              this.getCategory();
              this.calmSeriesProducts.map((product) => this.calmSeriesData
                .push(this.getParticularProduct(product)));
              this.calmSeriesBundle = this.getParticularProduct('-NoLX8ZL10JiBTlwGN6T');
              this.bestsellers.map((bestseller) => this.bestsellersData
                .push(this.getParticularProduct(bestseller)));
            } else {
              this.productsPageStatus = '全部產品';
              this.showProductsData = res.data.products;
              this.pagination(page);
            }
            resolve(res);
            this.isLoading = false;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // ajax, 取得產品類別的產品
    getProducts(category, page = 1) {
      this.isLoading = true;
      const url = `${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products`;
      return new Promise((resolve, reject) => {
        axios
          .get(url, { params: { category, page } })
          .then((res) => {
            this.productPagesData = res.data;
            this.productsPageStatus = category;
            this.isLoading = false;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // fn,分頁
    pagination(nowPage) {
      const data = this.showProductsData;
      // 取得全部資料長度
      const dataLength = Object.keys(data).length;
      // 設定每頁資料量
      const perPage = 10;
      // 取得總頁數，使用無條件進位
      const total_pages = Math.ceil(dataLength / perPage);
      // 設定當前頁數，變數
      let current_page = nowPage;
      // 防呆：避免當前頁數比總頁數大
      if (current_page > total_pages) {
        current_page = total_pages;
      }
      // 計算當前分頁顯示的資料範圍的最小值
      const minPerPageData = current_page * perPage - perPage + 1;
      // 計算當前分頁顯示的資料範圍的最大值
      const maxPerPageData = current_page * perPage;
      // 建立新陣列，存放我們每頁的資料
      const newData = [];
      Object.keys(data).forEach((item, index) => {
        // 因為所有的索引都會被加一，所以其實不影響運作，只是方便我們計算，所以用num，帶替原本的 index
        const num = index + 1;
        if (num >= minPerPageData && num <= maxPerPageData) {
          newData.push(data[item]);
        }
      });
      // 用物件方式來傳遞資料
      const page = {
        total_pages,
        current_page,
        // 是否有上一頁
        has_pre: current_page > 1,
        // 是否有下一頁
        has_next: current_page < total_pages,
      };
      this.productPagesData = {
        products: newData,
        pagination: page,
      };
    },
    // fn,取得最新 category
    getCategory() {
      // 使用 Set 來確保類別的唯一性
      const uniqueCategories = new Set();
      Object.keys(this.productsData).forEach((element) => {
        const { category } = this.productsData[element];
        uniqueCategories.add(category);
      });
      // 轉換 Set 為陣列，然後將它設置到 data 中的 productsCategory
      this.productsCategory = Array.from(uniqueCategories);
    },
    // fn,篩選價錢
    sortPrice(query) {
      let data;
      if (query.key && query.content) {
        data = this.showProductsData;
      } else if (query.category === '全部產品') {
        data = this.productsData;
      } else {
        data = this.productsData.filter((item) => item.category === query.category);
      }
      if (query.price === 'asc') {
        data.sort((a, b) => a.price - b.price);
      } else if (query.price === 'desc') {
        data.sort((a, b) => b.price - a.price);
      }
      this.showProductsData = data;
      this.pagination(query.page);
    },
    // fn,取得蠟燭資料
    getCandlesData() {
      this.candlesData = this.productsData.filter((product) => product.category === '香氛蠟燭');
    },
    // fn,篩選各種蠟燭類別
    getCandleFilterArray() {
      const data = this.candlesData;
      const uniqueSeries = new Set();
      const uniqueTones = new Set();
      const uniqueCapacities = new Set();
      data.forEach((element) => {
        const term = element.title.split('｜');
        if (term[2] !== undefined && term[1] !== undefined && term[3] !== undefined) {
          uniqueSeries.add(term[2]);
          uniqueTones.add(term[1]);
          uniqueCapacities.add(term[3]);
        }
      });
      this.uniqueSeriesArray = Array.from(uniqueSeries);
      this.uniqueTonesArray = Array.from(uniqueTones);
      this.uniqueCapacitiesArray = Array.from(uniqueCapacities).sort(
        (a, b) => parseInt(a.replace(/[^0-9]/g, ''), 10) - parseInt(b.replace(/[^0-9]/g, ''), 10),
      );
    },
    // fn,篩選各類別的蠟燭（帶有頁面）
    filterCandles(key, content, page = 1) {
      this.showProductsData = [];
      this.productsPageStatus = '香氛蠟燭';
      const data = this.candlesData;
      data.forEach((element) => {
        const term = element.title.split('｜');
        if (term[key] === content) {
          this.showProductsData.push(element);
        }
      });
      this.pagination(page);
    },
    // fn,初始化頁面
    initializePage(query) {
      if (query.category === '全部產品') {
        this.getProductsAll(false, query.page);
      } else if (query.key && query.content) {
        // this.goToGetProducts('香氛蠟燭');
        this.filterCandles(query.key, query.content, query.page);
      } else {
        const categoryIndex = this.productsCategory.findIndex(
          (category) => category === query.category,
        );
        if (categoryIndex !== -1) {
          this.getProducts(query.category, query.page);
        }
      }
    },
    // fn,使用 id 取得特定產品
    getParticularProduct(id) {
      const data = this.productsData.find((product) => product.id === id);
      return data;
    },
    recommendations(id) {
      this.recommendationsData = [];
      const data = this.getParticularProduct(id);
      const { title } = data;
      const serious = title.split('｜')[2];
      const { category } = data;
      const categoryData = this.productsData.filter((product) => product.category === category);
      if (category === '香氛蠟燭') {
        const seriousData = categoryData.filter((product) => product.title.split('｜')[2] === serious);
        const filteredData = seriousData.filter((product) => product.id !== id);
        if (filteredData.length < 4) {
          filteredData.push(this.getParticularProduct('-NoLX8ZL10JiBTlwGN6T'));
        }
        if (filteredData.length === 4) {
          this.recommendationsData = filteredData;
        }
      }
      if (category === '送禮搭配') {
        while (this.recommendationsData.length < 4) {
          const randomProduct = this.getRandomProduct(categoryData);
          const result = this.recommendationsData
            .findIndex((product) => product.id === randomProduct.id);
          if (result === -1 && randomProduct.id !== id) {
            this.recommendationsData.push(randomProduct);
          }
        }
      }
      if (category === '蠟燭配件') {
        while (this.recommendationsData.length < 4) {
          let randomProduct = this.getRandomProduct(categoryData);
          if (this.recommendationsData.length >= categoryData.length - 1) {
            randomProduct = this.getRandomProduct(this.candlesData);
          }
          const result = this.recommendationsData
            .findIndex((product) => product.id === randomProduct.id);
          if (result === -1 && randomProduct.id !== id) {
            this.recommendationsData.push(randomProduct);
          }
        }
      }
    },
    getRandomProduct(categoryData) {
      const randomIndex = Math.floor(Math.random() * categoryData.length);
      const randomProduct = categoryData[randomIndex];
      return randomProduct;
    },
  },
});
