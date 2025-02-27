
data = {
  "card": [
    {
      'rader-chart-area': 'front-end-area',
      'color': '#B82E2E',
      'tbody': [
	      {'name': 'BootStrap', 'category': 'フレームワーク', 'level': 3, 'detail': 'レイアウト、コンテンツ、フォーム、 コンポーネント、ヘルパーのフレームを使ってデザインします。 CSSやHTMLのstyle属性を使ってちょっとしたカスタマイズはできます。'},
	      {'name': 'CSS', 'category': 'マークアップ言語', 'level': 3, 'detail': '変数などの利用はまだまだ乏しいですが、 各要素の調整といったことはできます。'},
	      {'name': 'HTML', 'category': 'マークアップ言語', 'level': 3, 'detail': 'SEO対策として各ブロックに相応しいタグの配置、 見やすいコードを心掛けるなど。'},
	      {'name': 'JavaScript', 'category': 'プログラミング言語', 'level': 2, 'detail': 'レスポンシブに各タグの値を変更する処理、 チャートライブラリやマークダウンライブラリの利用など。'},
	      {'name': 'jQuery', 'category': 'JSライブラリ', 'level': 1, 'detail': '非同期処理で使った程度。'},
      ],
      'goals':'JavaScriptを極めてReactを触ってみたいと思いますが、覚えることがあり過ぎていつになるか。',
    },
    {
      'rader-chart-area': 'back-end-area',
      'color': '#6633CC',
      'tbody': [
	      {'name': 'Django', 'category': 'フレームワーク', 'level': 3, 'detail': 'CRUD（Create、Read、Update、Delete）操作、 メールサーバ－の設定、アプリケーションログの監視、データの暗号化と復号化、 ユーザーのアクセス管理、メディアファイル（画像や表形式等）の管理、 再利用可能なアプリ化、ユニットテスト。'},
	      {'name': 'Linux', 'category': 'OS（環境）', 'level': 3, 'detail': 'sshでホスティングサービスの環境に出入りしたり、 ファイルの転送、bashrcで環境変数の設定、crontabでスケジュール管理など。'},
	      {'name': 'Python', 'category': 'プログラミング言語', 'level': 3, 'detail': 'ユニットテストとロギング。'},
	      {'name': 'MySQL', 'category': 'データベース管理', 'level': 2, 'detail': '極々簡単なクエリの操作程度。'},
	      {'name': 'Firefall', 'category': 'セキュリティ', 'level': 1, 'detail': 'ホスティングサービスの初期設定で一度構築。'},
	      {'name': 'Nginx', 'category': 'Webサーバー', 'level': 1, 'detail': "SSL証明書（Let's Encrypt）の設定程度で、 まだまだ設定ファイルの構造をしっかり理解しているわけではありません。"},
      ],
      'goals':'目標はチームでの開発。 まだまだDjangoには豊富な機能が盛りだくさんなので覚えたい。 NginxやFirefallの設定は動画教材のやり方をそのまま真似しただけで 理解できている訳ではないのでしっかり勉強したい。',
    },
    {
      'rader-chart-area': 'dev-tool-area',
      'color': '#109618',
      'tbody': [
	      {'name': 'Git/GitHub', 'category': 'バージョン管理', 'level': 3, 'detail': 'メインブランチのレポジトリをクローンし、そこからブランチを作成し開発を進め、 ブランチから追加・コミットしたローカルリポジトリをプッシュ、 メインブランチに戻りローカルリポジトリをプルするといった一通りの作業は行えます。 チームでの開発は未経験です。'},
	      {'name': 'Vim', 'category': 'テキストエディター', 'level': 3, 'detail': '使いこなせているかと言われたらまだまだなので頑張ってレベル3です。'},
	      {'name': 'Copilot', 'category': '生成AI', 'level': 2, 'detail': '適切な質問を心掛けていますが、まだまだ質問力の無さを痛感しています。'},
	      {'name': 'GitHub Actions', 'category': 'CI/CD', 'level': 2, 'detail': 'リポジトリのワークフローディレクトリ内にCI/CD用のyml拡張子のファイルを作成して テストとデプロイの自動化をします。'},
	      {'name': 'Docker & Compose', 'category': 'コンテナの構築', 'level': 1, 'detail': '2025年１月から学び始めたので、これからWeb開発する際はどんどん構築していきます。'},
	      {'name': 'Figma', 'category': 'デザインツール', 'level': 1, 'detail': "簡単且つシンプルなUI作成をしています。凝った事はまだまだです。"},
	      {'name': 'Shell Script', 'category': 'スクリプト言語', 'level': 1, 'detail': "例えば、GitHubにレポジトリをプッシュする際に認証するアクセストークンですが、アクセストークンを保存しているファイル内からクリップボードに保存して貼り付けるという一連のコマンドをスクリプトファイルに書いてアクセストークンをクリップボードに登録するまでの作業を自動化するような程度です。"},
      ],
      'goals':'チーム開発にいつでも馴染めるよう、Slackの導入やGitとDockerのレベルを上げる。',
    },
  ]
}

import json

with open('data.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)


