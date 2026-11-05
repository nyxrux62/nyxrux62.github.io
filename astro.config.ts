import { defineConfig, type AstroIntegration } from "astro/config";
import astroSage from "astro-sage";
import sageConfig from "./sage.config";

// 참고: 테마가 자체 마크다운 처리기(satteri)를 쓰므로 markdown.remarkPlugins는 동작하지 않는다.
// Obsidian 이미지 임베드 변환은 patches/astro-sage@0.1.5.patch 에 들어 있다.

/** 모든 페이지에 사이트 전용 CSS를 넣는다 (테마에 커스텀 CSS 옵션이 없어서). */
const siteStyles: AstroIntegration = {
  name: "site-styles",
  hooks: {
    "astro:config:setup": ({ injectScript }) => {
      injectScript("page-ssr", 'import "/src/styles/ko.css";');
    },
  },
};

export default defineConfig({
  site: sageConfig.site.url,
  integrations: [astroSage(sageConfig), siteStyles],
});
