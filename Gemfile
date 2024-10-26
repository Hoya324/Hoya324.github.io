source "https://rubygems.org"

# GitHub Pages 호환성 설정
gem "github-pages", "~> 227", group: :jekyll_plugins

# Jekyll 플러그인
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# Windows와 JRuby 호환성 설정
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Windows에서 디렉토리 감시 성능 개선
gem "wdm", "~> 0.1", platforms: [:mingw, :x64_mingw, :mswin]

# JRuby 빌드에서 `http_parser.rb` 버전 고정
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
