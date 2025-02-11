// 環境に応じてベースパスを設定
let basePath;

if (window.location.pathname === '/C:/Users/warik/Documents/PYTHON/kw.github.io/index.html') {
  basePath = '/Users/warik/Documents/PYTHON/kw.github.io/';
} else if (window.location.pathname === '/') {
  basePath = '/';
} else if (window.location.pathname === '/index.html') {
  basePath = '/';
} else {
  basePath = '/kenno-warise.github.io/';
}

const headerImagePath = basePath + 'img/ai_nature.png';
// document.documentElement.style.setProperty('--base-url', basePath + 'img/ai_nature.png');

document.addEventListener('DOMContentLoaded', () => {
  // 背景画像を直接設定
  const header = document.querySelector('header');
  if (header) {
    header.style.backgroundImage = `url(${headerImagePath})`;
  }
  // document.header.style.backgroundImage = 'url(${fullPath})';
});

console.log('ベースパス:', window.location.pathname);
// デバッグ用
console.log('Current background-image URL:', headerImagePath);
