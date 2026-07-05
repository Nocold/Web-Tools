# Web-Tools

小而美的線上工具集合,全部以**純前端**(HTML / CSS / JS,開發時無建置步驟)打造。所有處理都在瀏覽器內完成,資料不外傳。直接開 `index.html`(或起一個靜態伺服器)即可使用,首頁會列出所有工具卡片並支援搜尋。

> 部署時有一個極輕量的 CI 步驟(見下方「部署」),只把 commit hash 寫進頁尾版本標記,不影響本機開發:本機仍是直接開檔即可用。

## 專案結構

- `index.html` — 首頁,列出所有工具卡片
- `assets/js/tools.js` — 工具註冊表(`TOOLS` 陣列),首頁據此自動產生卡片
- `tools/<slug>/index.html` — 各工具頁面

新增工具:在 `assets/js/tools.js` 的 `TOOLS` 陣列加一筆,並建立 `tools/<slug>/index.html`,首頁會自動列出,無須改其他檔案。

## 慣例

- 每個工具頁的 `<script>` 要包 IIFE,避免用 `window` 保留字當全域變數(踩過雷)。
- 影片轉 MP3 用 ffmpeg.wasm(無建置載入),MP3 切割用串流複製(無損)。

## 部署:GitHub Actions + 版本標記

Pages 由 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) 部署(Pages 來源設為 GitHub Actions,非 legacy 分支建置)。push 到 `main` 自動觸發:checkout → 把 `assets/js/version.js` 的 `__COMMIT_HASH__` 換成 short hash → 發佈整站。

- 每頁都載入 `assets/js/version.js`,右下角顯示 `build <hash>`(點擊連到該 commit);本機直接開檔時佔位字未替換,顯示 `dev`。
- 這是頁尾那顆版本標記能反映「當下服務中的內容」的關鍵——因此可用它確認線上是否已更新。
- 部署進度可在 repo 的 **Actions** 分頁查看。要改回 legacy 建置:把 Pages 來源切回分支即可。

## GitHub Action:用 @claude 自動處理任務

repo 已設定 [Claude Code GitHub Action](.github/workflows/claude.yml),在 issue 或 PR 提及 `@claude` 會自動觸發:

- 開 issue,內文寫 `@claude 幫我做 XXX`
- 或在 issue / PR 留言區打 `@claude ...`

Claude 會分析並回覆,需要改 code 時自動開 PR。執行紀錄在 repo 的 **Actions** 分頁。

驗證走 Pro/Max 訂閱的 OAuth token(secret:`CLAUDE_CODE_OAUTH_TOKEN`),每次觸發會消耗訂閱額度。要暫停就在 Actions 分頁停用該 workflow,或刪除 `.github/workflows/claude.yml`。
