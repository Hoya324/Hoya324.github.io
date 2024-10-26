source "https://rubygems.org"

gem "jekyll", "~> 4.3.4"
gem "minimal-mistakes-jekyll"

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

