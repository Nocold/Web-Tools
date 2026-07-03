/**
 * Tool registry — the single source of truth for the homepage.
 *
 * To add a new tool:
 *   1. Create a folder under /tools/<slug>/ with an index.html
 *      (copy an existing tool as a template).
 *   2. Add an entry to the array below.
 * That's it — the homepage picks it up automatically.
 */
window.TOOLS = [
  {
    slug: "json-formatter",
    name: "JSON 格式化",
    description: "格式化、壓縮與驗證 JSON",
    icon: "🧾",
    category: "格式轉換",
    keywords: ["json", "format", "beautify", "minify", "格式化"],
  },
  {
    slug: "base64",
    name: "Base64 編解碼",
    description: "文字 ↔ Base64 互轉(支援 UTF-8)",
    icon: "🔡",
    category: "編碼",
    keywords: ["base64", "encode", "decode", "編碼", "解碼"],
  },
  {
    slug: "video-to-mp3",
    name: "影片轉 MP3",
    description: "擷取影片音軌轉為 MP3(瀏覽器內轉檔)",
    icon: "🎵",
    category: "影音",
    keywords: ["video", "mp3", "audio", "ffmpeg", "convert", "影片", "音訊", "轉檔"],
  },
  {
    slug: "countdown-cue",
    name: "倒數提示音",
    description: "在音樂指定時間點疊上英文倒數語音(5…1)",
    icon: "⏱️",
    category: "影音",
    keywords: ["countdown", "cue", "倒數", "提示音", "voice", "語音", "音樂", "intro"],
  },
  {
    slug: "mp3-splitter",
    name: "MP3 切割",
    description: "擷取 MP3 片段(指定起點與長度)",
    icon: "✂️",
    category: "影音",
    keywords: ["mp3", "cut", "split", "trim", "clip", "切割", "剪輯", "片段", "音訊"],
  },
  {
    slug: "timestamp",
    name: "時間戳轉換",
    description: "Unix 時間戳與日期時間互轉",
    icon: "🕒",
    category: "時間",
    keywords: ["timestamp", "unix", "epoch", "date", "時間戳"],
  },
];
