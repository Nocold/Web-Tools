# Web-Tools 🧰

一個小而美的線上工具集合，全部以**純前端**(HTML / CSS / JS,無建置流程)打造，
所有處理都在瀏覽器內完成、資料不外傳。開啟 `index.html` 即可使用。

## 目前收錄的工具

| 工具 | 說明 |
| --- | --- |
| 🧾 JSON 格式化 | 格式化、壓縮與驗證 JSON |
| 🔡 Base64 編解碼 | 文字 ↔ Base64 互轉(支援 UTF-8) |
| 🎵 影片轉 MP3 | 擷取影片音軌轉為 MP3(瀏覽器內以 FFmpeg WebAssembly 轉檔) |
| ✂️ MP3 切割 | 指定起點與長度,擷取 MP3 片段(串流複製,無損) |
| ⏱️ 倒數提示音 | 在音樂指定時間點疊上英文倒數語音(5…1),結尾對齊該點 |
| 🕒 時間戳轉換 | Unix 時間戳與日期時間互轉 |

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可,或起一個簡易靜態伺服器:

```bash
python3 -m http.server 8000
# 開啟 http://localhost:8000
```

## 專案結構

```
.
├── index.html              # 首頁:工具卡片列表 + 搜尋
├── assets/
│   ├── css/style.css       # 共用樣式(含深色模式)
│   ├── js/
│   │   ├── tools.js        # ★ 工具註冊表(新增工具改這裡)
│   │   └── home.js         # 首頁渲染與搜尋邏輯
│   └── vendor/ffmpeg/      # FFmpeg wrapper(需與 worker 同源,見下方說明)
└── tools/
    └── <slug>/index.html   # 每個工具一個資料夾,獨立頁面
```

### 關於「影片轉 MP3」的 FFmpeg 載入

轉檔採用 [ffmpeg.wasm](https://ffmpegwasm.netlify.app/)(單執行緒核心,**不需** COOP/COEP
標頭,任何靜態主機皆可運作)。載入方式有幾個關鍵點:

- `@ffmpeg/ffmpeg` 的 wrapper(`ffmpeg.js`)與其 worker(`814.ffmpeg.js`)已放進
  `assets/vendor/ffmpeg/`,兩者**必須同源、同目錄**。
- 載入時**不要**傳 `classWorkerURL`:傳了會建立 *module* worker,無法
  `importScripts()` 載入核心;省略後會以 *classic* worker 載入同目錄的 worker。
- 30MB 的核心(`@ffmpeg/core`)則以 CDN 原始網址(非 blob)交給 worker 的
  `importScripts()` 載入 —— classic worker 可直接跨來源載入。

## 新增一個工具

1. 複製任一現有工具資料夾(例如 `tools/base64/`)當範本,
   建立 `tools/<slug>/index.html`,改寫成你的工具。
   - 每個工具頁面自帶頁首與返回連結,並引用共用樣式 `../../assets/css/style.css`。
2. 在 [`assets/js/tools.js`](assets/js/tools.js) 的 `TOOLS` 陣列加入一筆:

   ```js
   {
     slug: "my-tool",          // 對應 tools/my-tool/ 資料夾
     name: "我的工具",
     description: "一句話說明",
     icon: "✨",
     category: "分類名稱",      // 首頁會依分類分組
     keywords: ["搜尋", "關鍵字"],
   }
   ```

首頁會自動列出新工具,無須改動其他檔案。

## 未來規劃

目前為純前端;若日後有工具需要後端(API、檔案處理等),
再視需求引入 serverless 函式或獨立服務。
