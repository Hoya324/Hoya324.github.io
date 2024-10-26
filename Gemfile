source "https://rubygems.org"

# Jekyll and required plugins
gem "jekyll", "~> 4.3.4"
gem "minimal-mistakes-jekyll", "~> 4.26.2"
gem "jekyll-feed", "~> 0.15.1"
gem "i18n", "~> 1.14.6"
gem "jekyll-sass-converter", "~> 3.0.0"
gem "mercenary", "~> 0.4.0"
gem "rouge", "~> 4.4.0"
gem "terminal-table", "~> 3.0.2"
gem "webrick", "~> 1.8.2"
gem "public_suffix", "~> 6.0.1"
gem "concurrent-ruby", "~> 1.3.4"
gem "sass-embedded", "~> 1.80.4"
gem "rexml", "~> 3.3.9"
gem "unicode-display_width", "~> 2.6.0"
gem "google-protobuf", "~> 4.28.3"
gem "faraday", "~> 2.12.0"
gem "rake", "~> 13.2.1"
gem "faraday-net_http", "~> 3.3.0"
gem "json", "~> 2.7.4"
gem "logger", "~> 1.6.1"
gem "uri", "~> 0.13.1"


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