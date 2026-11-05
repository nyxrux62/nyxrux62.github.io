import { defineSageConfig, DEFAULT_MONO_FALLBACKS } from "astro-sage";

// 메뉴·태그·목차는 고정폭 폰트(JetBrains Mono)라 한글이 굴림체 등으로 대체된다.
// 일반 고정폭 대체 폰트 앞에 OS 한글 폰트를 끼워 넣는다 (웹폰트 아님).
const KO_SYSTEM_FONTS = ["Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR"];
const monoFallbacks = [
  ...DEFAULT_MONO_FALLBACKS.slice(0, -1),
  ...KO_SYSTEM_FONTS,
  "monospace",
];

export default defineSageConfig({
  typography: { fallbacks: { mono: monoFallbacks } },
  site: {
    url: "https://nyxrux62.github.io/",
    title: "nyxrux62",
    description: "게임 개발, AI 도구, 그리고 기술을 파악하는 기록",
    author: "nyxrux62",
    profile: "https://github.com/nyxrux62",
    ogImage: "default-og.jpg",
    lang: "ko",
    timezone: "Asia/Seoul",
    dir: "ltr",
  },
  home: {
    title: "nyxrux62",
    intro:
      "대학에서 학생들을 가르치고, 인디게임을 만들고, 취미로 웹앱과 모바일 앱을 개발합니다. 새로운 기술을 파악하며 남기는 기록입니다.",
  },
  posts: { perPage: 8, perIndex: 6, scheduledPostMargin: 15 * 60 * 1000 },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: false,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/nyxrux62" },
    { name: "x", url: "https://x.com/nyxrux62" },
  ],
});
