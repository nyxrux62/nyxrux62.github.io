# nyxrux62.github.io

Astro + [AstroSage](https://github.com/chintak/astro-sage) 블로그. 글은 Obsidian vault의 `Blog/` 폴더에서 쓰고
[Enveloppe](https://github.com/Enveloppe/obsidian-enveloppe) 플러그인으로 이 repo에 올린다.
`master`에 push되면 GitHub Actions가 빌드해서 GitHub Pages로 배포한다.

```
Obsidian vault / Blog/*.md (share: true)
   │  Enveloppe: "Upload all shared notes"
   ▼  GitHub API (clone 불필요)
src/content/posts/*.md, src/content/posts/images/*
   ▼  push → .github/workflows/deploy.yml
https://nyxrux62.github.io
```

## 글 frontmatter

```yaml
---
title: "글 제목"
pubDatetime: 2026-11-05T14:30:00+09:00   # 필수. 초까지 + 타임존
description: "목록·검색·SNS 미리보기에 쓰이는 한 줄 요약"   # 필수 (빈 문자열 가능)
tags: [AI, 게임개발]
share: true          # Enveloppe 업로드 대상
# draft: true        # 올리되 사이트에는 안 보이게
# modDatetime: 2026-11-06T10:00:00+09:00
# series: "시리즈 이름"
# slug: english-url  # URL을 영문으로 바꾸고 싶을 때 (기본은 파일명)
---
```

Obsidian 템플릿(코어 Templates 플러그인)용:

```yaml
---
title: "{{title}}"
pubDatetime: {{date:YYYY-MM-DD}}T{{time:HH:mm:ss}}+09:00
description: ""
tags: []
share: false
---
```

다 쓰면 `share: true`로 바꾸고 업로드한다. `pubDatetime`이 미래면 그 시각 이후 빌드부터 보인다(예약 발행).

## 지원하는 Obsidian 문법 (사이트 빌드에서 처리)

| 문법 | 처리 |
|---|---|
| `[[다른 글]]`, `[[다른 글\|표시 텍스트]]`, `[[글#제목]]` | 글 링크. 파일명·slug·title로 찾음. 없거나 비공개면 회색 텍스트 + 빌드 경고 |
| `![[이미지.png]]`, `![[이미지.png\|설명]]`, `![[이미지.png\|300]]` | `src/content/posts/images/`의 이미지로 변환 (webp 최적화) |
| `> [!note]`, `> [!tip] 제목` | 콜아웃 |
| `$수식$`, `$$수식$$` | KaTeX |
| ` ```mermaid ` | 빌드 시 SVG로 렌더링 |

주의: 임베드한 이미지가 repo에 없으면 빌드가 실패한다 (Enveloppe가 첨부파일을 같이 올리므로 보통 문제 없음).

## Enveloppe 설정

| 위치 | 항목 | 값 |
|---|---|---|
| GitHub | Repo name | `nyxrux62.github.io` |
| | GitHub username | `nyxrux62` |
| | Branch name | `master` |
| | GitHub token | 아래 토큰 |
| Upload | Folder reception | **Fixed folder** |
| | Default folder | `src/content/posts` |
| | Auto clean-up | 처음엔 끄기 (기존 글을 vault로 옮긴 뒤 켜도 됨) |
| Content's conversion | Wikilinks to Markdown link | **끄기** (사이트가 위키링크를 직접 처리) |
| | Internal links | **끄기** |
| | Hard break line | 켜기 (Obsidian처럼 한 줄 개행을 줄바꿈으로) |
| | Dataview | 사용 안 하면 끄기 |
| Attachment & embeds | 첨부파일 전송 | 켜기 |
| | 첨부파일 폴더 | `src/content/posts/images` |
| | Embedded notes | 끄기 (노트 임베드는 미지원) |
| Plugin | Share key | `share` |

### 토큰

GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token

- Repository access: Only select repositories → `nyxrux62.github.io`
- Permissions: **Contents: Read and write**, **Pull requests: Read and write** (Enveloppe가 브랜치→PR→자동 병합으로 올림)

## 로컬에서 미리보기 (선택)

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # dist/
```

## 커스터마이즈 위치

- `sage.config.ts` — 사이트 제목, 소개, 소셜 링크, 기능 on/off
- `src/styles/ko.css` — 한글 보정 (단어 단위 줄바꿈, 한글 가짜 이탤릭 끄기)
- `patches/astro-sage@0.1.5.patch` — 테마 패치: 한국어 UI 문구, `![[이미지]]` 변환.
  테마 버전을 올릴 때는 이 패치를 새 버전에 맞게 다시 만들어야 한다.
- `public/2025/...html` — 예전 Jekyll 주소 → 새 주소 리다이렉트
