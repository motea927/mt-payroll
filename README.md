
# :art: mtPayroll 小型薪資系統



適用於微型企業之薪資系統，可簡化產生薪資條流程

![image](https://raw.githubusercontent.com/motea927/mt-payroll/master/demo/img/demo.gif)

## :page_facing_up: 技術&框架

- **electron-vue**：將vue結合於electron之框架，簡化vue使用者開發electron流程
- **vue-router**：vue之路由系統
- **Sass(Scss)**：CSS預處理器
- **ES6**：ECMAScript 6 語法
- **vue-swal**：美化及取代原生alert功能，且具有高度自定義空間
- **vue-easytable** ：易於操作及編輯的表格框架
- **electron-store**：本地儲存之套件

## :pencil2: 功能

1. 依年月進行新增，可自由切換不同月份薪資資料
2. 可依每月自由新增刪減員工人數
3. 可自行新增額外欄位以便應付臨時需求，如：三節獎金．．．等
4. 可將薪資條另存成PDF檔案，可便於列印及資料保存

## :coffee: 本地開發步驟

``` bash
# 安裝模組
$ npm install
# 開發
$ npm run dev
# build
$ npm run build:win32
```