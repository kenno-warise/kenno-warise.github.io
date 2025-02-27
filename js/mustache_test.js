// mustache test
// var data = {
//   "card": [
//     {
//       'rader-chart_area': 'front-end-area',
//       'color': '#B82E2E',
//       'tbody': [
// 	{'name': 'BootStrap', 'category': 'フレームワーク', 'level': 3, 'detail': 'テスト'},
// 	{'name': 'CSS', 'category': 'マークアップ言語', 'level': 3, 'detail': 'テスト'},
// 	{'name': 'HTML', 'category': 'マークアップ言語', 'level': 3, 'detail': 'テスト'},
// 	{'name': 'JavaScript', 'category': 'プログラミング言語', 'level': 2, 'detail': 'テスト'},
// 	{'name': 'jQuery', 'category': 'JSライブラリ', 'level': 1, 'detail': 'テスト'},
//       ],
//       'goals':'JavaScriptを極めてReactを触ってみたいと思いますが、覚えることがあり過ぎていつになるか。',
//     },
//     {
//       'color': '#6633CC',
//       'tbody': [
// 	{'name': 'Django'},
// 	{'name': 'Python'}
//       ]
//     },
//     {
//       'color': '#109618',
//       'tbody': [
// 	{'name': 'Docker'},
// 	{'name': 'Git'}
//       ]
//     },
//   ]
// };

document.addEventListener('DOMContentLoaded', function(){

  // JSONファイルを読み込む
  fetch('data.json')
    .then(response => response.json())
    .then(data => {

      // データを変数に格納
      console.log('json data:', data);
      // Compile and render template
      var template = document.getElementById('template').innerHTML;
      var rendered = Mustache.render(template, data);
      document.getElementById('target').innerHTML = rendered;


      // 画面切り替えによるレスポンシブ対応
      // こちらはアクセスされた際の処理
      if(window.matchMedia("(max-width:575px)").matches){
	// スマホ処理


	// グラフ下のテーブルの設定
	// フォントサイズの設定
	var tables = document.getElementsByTagName('table');

	for (var i = 0; i < tables.length; i++) {
	  tables[i].style.fontSize = '10px';
	  // tables[i].style.marginTop = '10%';
	  // tables[i].style.marginBottom = '5%';
	}

	// smallタグのフォントサイズ設定
	// すべてのcardクラスを持つ要素を取得
	var cards = document.querySelectorAll('.card');

	// 各カード要素をループ処理
	cards.forEach(card => {
	  // カード内のsmallタグを取得
	  const smallTag = card.querySelector('small');

	  // スタイルを変更
	  if (smallTag) {
	    smallTag.style.fontSize = '10px';
	  }
	});

      }else if (window.matchMedia('(min-width:576px) and (max-width: 999px)').matches) {
	// PC処理


	// グラフ下のテーブルの設定
	// フォントサイズの設定
	var tables = document.getElementsByTagName('table');

	for (var i = 0; i < tables.length; i++) {
	  tables[i].style.fontSize = '12px';
	  // tables[i].style.marginTop = '0%';
	  // tables[i].style.marginBottom = '5%';
	}

	// smallタグのフォントサイズ設定
	// すべてのcardクラスを持つ要素を取得
	var cards = document.querySelectorAll('.card');

	// 各カード要素をループ処理
	cards.forEach(card => {
	  // カード内のsmallタグを取得
	  const smallTag = card.querySelector('small');

	  // スタイルを変更
	  if (smallTag) {
	    smallTag.style.fontSize = '12px';
	  }
	});

      } else {

	// 大画面

	// グラフ下のテーブルの設定
	// フォントサイズの設定
	var tables = document.getElementsByTagName('table');

	for (var i = 0; i < tables.length; i++) {
	  tables[i].style.fontSize = '12px';
	  // tables[i].style.marginTop = '0%';
	  // tables[i].style.marginBottom = '5%';
	}

	// smallタグのフォントサイズ設定
	// すべてのcardクラスを持つ要素を取得
	var cards = document.querySelectorAll('.card');

	// 各カード要素をループ処理
	cards.forEach(card => {
	  // カード内のsmallタグを取得
	  const smallTag = card.querySelector('small');

	  // スタイルを変更
	  if (smallTag) {
	    smallTag.style.fontSize = '12px';
	  }
	});

	// カードグループの要素にcontainerを追加する
	var card_group = document.querySelectorAll('.card-group');

	card_group.forEach(group => {
	  group.classList.add('container');
	});
      };
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
