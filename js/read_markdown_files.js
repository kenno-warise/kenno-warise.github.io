// 複数の「.md」を読み込んで表示する関数
async function loadMarkdownFiles(filePaths, elementIds) {
  const markdownContents = await Promise.all(filePaths.map(async (filePath) => {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}`);
    }
    return response.text();
  }));

  markdownContents.forEach((content, index) => {
    document.getElementById(elementIds[index]).innerHTML = marked.parse(content);
  });
}

// ページが読み込まれたら関数を呼び出す
window.onload = () => {
  const markdownFiles = ['README.md', 'skills.md', 'projects.md'];
  const elementIds = ['profile', 'skills', 'projects'];
  loadMarkdownFiles(markdownFiles, elementIds)
    .catch(error => console.error('Error loading markdown files:', error));
};
