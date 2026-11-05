import { defineConfig, type AstroIntegration } from "astro/config";
import astroSage from "astro-sage";
import sageConfig from "./sage.config";

// 참고: 테마가 자체 마크다운 처리기(satteri)를 쓰므로 markdown.remarkPlugins는 동작하지 않는다.
// Obsidian 이미지 임베드 변환은 patches/astro-sage@0.1.5.patch 에 들어 있다.

const GA_ID = "G-CNMWED1G5P";

/** 모든 페이지에 사이트 전용 CSS와 Google Analytics를 넣는다 (테마에 해당 옵션이 없어서). */
const siteStyles: AstroIntegration = {
  name: "site-styles",
  hooks: {
    "astro:config:setup": ({ injectScript, command }) => {
      injectScript("page-ssr", 'import "/src/styles/ko.css";');
      if (command === "build") {
        injectScript(
          "head-inline",
          `(function(){var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}";document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA_ID}");})();`
        );
      }
    },
  },
};

export default defineConfig({
  site: sageConfig.site.url,
  integrations: [astroSage(sageConfig), siteStyles],
});
