# 我的餐廳清單
## 專案功能
* 使用者可以在首頁看到餐廳簡易訊息
* 使用者可以點及餐廳圖片查看餐廳詳細訊息
* 使用者可以再詳細訊息頁面連結到googlemap
* 使用者可以在首頁用餐廳類別搜尋餐廳
* 使用者可以在首頁用餐廳名稱搜尋餐廳
### 2022/08/07 version 新增功能
* 將資料從本地儲存換到MongoDB
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳
### 2022/08/14
* 修正空白表單問題 
* 修改route 命名方式 
* 將route從app.js中分離 

## 專案畫面
#### 首頁
![homepage](https://github.com/Berutorion/alphacamp-practicce/blob/master/image/indexpage.PNG)
#### 詳細訊息頁面
![showpage](https://github.com/Berutorion/alphacamp-practicce/blob/master/image/showpage.PNG)
## 開始使用
1.確認已安裝Node.js  
2.將本專案clone進本地端
```js
git clone https://github.com/Berutorion/alphacamp-practicce.git
```
3.安裝套件
```js
npm i express@4.18.1 express-handlebars@6.0.6
```
4.建立.env檔，設定環境變數
```bash
MONGODB_URL = <yourMongoDB>
```
4.執行程式
```js
npm run start
```
5.當cmd出現以下這行表示啟動成功
```js
Server is working
```
6.接著在瀏覽器輸入
```js
http://localhost:3000/
```
## 開發環境
 * [express](https://www.npmjs.com/package/express): 4.18.1
 * [express-handlebars](https://www.npmjs.com/package/express-handlebars): 6.0.6  
 * [Node.js](https://nodejs.org/zh-tw/download/) : 16.15.0
