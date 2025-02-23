// 画面切り替えによるレスポンシブ対応
// こちらはアクセスされた際の処理
if(window.matchMedia("(max-width:767px)").matches){
  // スマホ処理
  // sectionのpタグの行間を無くすためline-height属性を削除する
  var sampleElement = document.getElementsByClassName('res-hei');
  // HTMLCollectionを配列に変換するためにスプレッド演算子を使用
  // Array.from(sampleElement).forEach(function(element) {
  //   element.classList.remove('lead', 'line-height');
  // });
  // sampleElement.classList.remove('line-height');
  //sampleElement.classList.remove('lead');
}else if (window.matchMedia('(min-width:768px)').matches) {
  // PC処理
  // sectionのpタグの行間を空けるためline-height属性を追加する
  var sampleElement = document.getElementsByClassName('res-hei');
  // HTMLCollectionを配列に変換するためにスプレッド演算子を使用
  // Array.from(sampleElement).forEach(function(element) {
  //   element.classList.add('lead', 'line-height');
  // });
  // sampleElement.classList.add('line-height');
  // sampleElement.classList.add('lead');
};

// 画面切り替えによるレスポンシブ対応
// こちらはリアルタイム処理
$(function(){
  var timer = false;
  $(window).resize(function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      if(window.matchMedia("(max-width:767px)").matches){
	//スマホ処理
	// sectionのpタグの行間を無くすためline-height属性を削除する
	var sampleElement = document.getElementsByClassName('res-hei');
	// HTMLCollectionを配列に変換するためにスプレッド演算子を使用
	// Array.from(sampleElement).forEach(function(element) {
	//   element.classList.remove('lead', 'line-height');
	// });
	// sampleElement.classList.remove('line-height');
	// sampleElement.classList.remove('lead');
	// sampleElement.classList.add('container-fluid');

      }else if (window.matchMedia('(min-width:768px)').matches) {
	// PC処理
	// sectionのpタグの行間を空けるためline-height属性を追加する
	var sampleElement = document.getElementsByClassName('res-hei');
	// HTMLCollectionを配列に変換するためにスプレッド演算子を使用
	// Array.from(sampleElement).forEach(function(element) {
	//   element.classList.add('lead', 'line-height');
	// });
	// samApleElement.classList.add('line-height');
	// sam pleElement.classList.add('lead');
      }
    }, 200);
  });
});
