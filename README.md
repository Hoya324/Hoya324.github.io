---

# 개인의 사진 갤러리

![Hoya324's Gallery](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFQY5T%2FbtsKluoABrz%2F3fuIrzirwkcEmUKpZKm0f0%2Fimg.png)

## 📸 소개

**HoyaGallery**는 **GitHub Pages**와 **Jekyll**로 구축된 개인 사진 갤러리입니다. 
개발자이자 사진을 취미로 하는 사람으로서 다양한 사진을 공유하고 전시하는 공간입니다. 이 프로젝트는 가볍고 빠른 배포를 통해 사진을 쉽게 전시할 수 있도록 설계되었습니다.

### 🔨 기술 스택

- **Jekyll**: Ruby 기반 정적 사이트 생성기로, 마크다운과 함께 간편하게 글을 작성하고 HTML로 변환합니다.
- **GitHub Pages**: 정적 웹사이트 호스팅 플랫폼으로, GitHub에서 쉽게 사이트를 배포할 수 있습니다.
- **GitHub Actions**: 사이트에 변경 사항이 있을 때마다 자동 배포되도록 설정된 CI/CD 파이프라인을 사용합니다.

### ✨ 주요 기능

- **사진 갤러리**: 사진을 정리하여 직관적이고 간단한 UI로 갤러리 형태로 보여줍니다.
- **Jekyll 테마 커스터마이징**: 기본 테마와 CSS 커스터마이징으로 갤러리 레이아웃을 최적화했습니다.
- **자동 배포**: GitHub Actions를 통해 푸시 시마다 자동으로 배포됩니다.

### 📂 디렉토리 구조

```
├── _config.yml                  # 사이트 설정 파일
├── _data/photos.json            # 갤러리 사진 데이터 파일
├── _layouts                     # 레이아웃 템플릿 폴더
├── _site                        # 빌드된 사이트 파일
├── .github/workflows/jekyll.yml # GitHub Actions 워크플로 설정
├── assets/css/styles.css        # 갤러리 스타일 파일
├── assets/images/gallery        # 갤러리 사진 파일
├── index.html                   # 메인 페이지
└── README.md                    # 이 파일입니다
```

### 🚀 설치 및 실행 방법

1. **저장소 클론**:
   ```bash
   git clone https://github.com/Hoya324/Hoya324.github.io.git
   ```
2. **Jekyll 설치**:
   ```bash
   gem install jekyll bundler
   ```
3. **로컬 서버 실행**:
   ```bash
   bundle exec jekyll serve
   ```
   브라우저에서 `http://localhost:4000`으로 접속하여 로컬에서 사이트를 확인할 수 있습니다.

### 🌐 사이트 보기

👉 [Hoya324의 사진 갤러리](https://hoya324.github.io)에서 확인해주세요

### 🗞️ 관련 블로그 보기

[심플한 사진 갤러리 정적 웹사이트: GitHub Pages & Jekyll](https://hoya324.tistory.com/entry/%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%A7%8C%EB%93%9C%EB%8A%94-%EC%8B%AC%ED%94%8C%ED%95%9C-%EC%82%AC%EC%A7%84-%EA%B0%A4%EB%9F%AC%EB%A6%AC-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8-GitHub-Pages-Jekyll)

