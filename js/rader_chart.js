
// レーダーチャートの関数
function addChart(title, data, color, elementId, width, padding) {

  const container = document.getElementById(elementId);
  if (container) {
    const childDivs = container.querySelectorAll(':scope > div'); // 直下の<div>タグを選択

      childDivs.forEach(div => {
        container.removeChild(div);
      });
  } else {
    console.error(`Element with id '${elementId}' not found.`);
  }
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: 'string', 'id': 'key'});
  dataTable.addColumn({type: 'number', 'id': 'value'});
  dataTable.addColumn({type: 'string', 'id': 'category'});
  dataTable.addRows(data);

  const options = {
    'vega': {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "width": width, // 幅のサイズ !!
      "height": 450, // タイトルからグラフ下部までの高さのサイズ !!
      "padding": padding, // !!
      // "autosize": "none", // 改変前
      "autosize": {
	"type": "none",
	"contains": "padding",
      },
      "title": {
	"text": title,
	"anchor": "middle",
	// "fontSize": 14, // 改変前
	"fontSize": 14, // !!
	"dy": -8,
	"dx": {"signal": "-width/4.5"}, // タイトルの軸？ !!
	"subtitle": "",
      },
      "signals": [
	// {"name": "radius", "update": "90"} // 改変前
	{"name": "radius", "update": "width / 2"} // !!
      ],
      "data": [
	{
	  "name": "table",
	  "source": "datatable",
	},
	{
	  "name": "keys",
	  "source": "table",
	  "transform": [
	    {
	      "type": "aggregate",
	      "groupby": ["key"]
	    }
	  ]
	}
      ],
      "scales": [
	{
	  "name": "angular",
	  "type": "point",
	  "range": {"signal": "[-PI, PI]"},
	  "padding": 0.5,
	  "domain": {"data": "table", "field": "key"}
	},
	{
	  "name": "radial",
	  "type": "linear",
	  "range": {"signal": "[0, radius]"},
	  "zero": true,
	  "nice": false,
	  // "domain": [0,0.5], 改変前
	  "domain": [0,5], // レーダー内側の線の数
	}
      ],
      "encode": {
	"enter": {
	  // "x": {"signal": "width/2"}, // 改変前
	  "x": {"signal": "width/2"}, // width/2でグラフが左右均等になった。 !!
	  "y": {"signal": "height/2 + 20"}
	}
      },
      "marks": [
	{
	  "type": "group",
	  "name": "categories",
	  "zindex": 1,
	  "from": {
	    "facet": {"data": "table", "name": "facet", "groupby": ["category"]}
	  },
	  "marks": [
	    {
	      "type": "line",
	      "name": "category-line",
	      "from": {"data": "facet"},
	      "encode": {
		"enter": {
		  "interpolate": {"value": "linear-closed"},
		  "x": {"signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))"},
		  "y": {"signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))"},
		  "stroke": {"value": color},
		  "strokeWidth": {"value": 2}, // レーダー枠線の太さ
		  "fill": {"value": color},
		  "fillOpacity": {"value": 0.1} // 透明度
		}
	      }
	    },
	    {
	      "type": "text",
	      "name": "value-text",
	      "from": {"data": "category-line"},
	      "encode": {
		"enter": {
		  "x": {"signal": "datum.x + 14 * cos(scale('angular', datum.datum.key))"},
		  "y": {"signal": "datum.y + 14 * sin(scale('angular', datum.datum.key))"},
		  // "text": {"signal": "format(datum.datum.value,'.1%')"}, // 改変前
		  "text": {"signal": "format(datum.datum.value,'1')"}, // メモリの単位
		  "opacity": {"signal": "datum.datum.value > 0.01 ? 1 : 0"},
		  "align": {"value": "center"},
		  "baseline": {"value": "middle"},
		  "fontWeight": {"value": "bold"},
		  "fill": {"value": color},
		  "fontSize": {"value": 14}, // レーダーのメモリサイズ !! 
		}
	      }
	    }
	  ]
	},
	{
	  "type": "rule",
	  "name": "radial-grid",
	  "from": {"data": "keys"},
	  "zindex": 0,
	  "encode": {
	    "enter": {
	      "x": {"value": 0},
	      "y": {"value": 0},
	      "x2": {"signal": "radius * cos(scale('angular', datum.key))"},
	      "y2": {"signal": "radius * sin(scale('angular', datum.key))"},
	      "stroke": {"value": "lightgray"},
	      "strokeWidth": {"value": 1}
	    }
	  }
	},
	{
	  "type": "text",
	  "name": "key-label",
	  "from": {"data": "keys"},
	  "zindex": 1,
	  "encode": {
	    "enter": {
	      "x": {"signal": "(radius + 11) * cos(scale('angular', datum.key))"},
	      "y": [
		{
		  "test": "sin(scale('angular', datum.key)) > 0",
		  "signal": "5 + (radius + 11) * sin(scale('angular', datum.key))"
		},
		{
		  "test": "sin(scale('angular', datum.key)) < 0",
		  "signal": "-5 + (radius + 11) * sin(scale('angular', datum.key))"
		},
		{
		  "signal": "(radius + 11) * sin(scale('angular', datum.key))"
		}
	      ],
	      "text": {"field": "key"},
	      "align":
	      {
		"value": "center"
	      },
	      "baseline": [
		{
		  "test": "scale('angular', datum.key) > 0", "value": "top"
		},
		{
		  "test": "scale('angular', datum.key) == 0", "value": "middle"
		},
		{
		  "value": "bottom"
		}
	      ],
	      "fill": {"value": "black"},
	      "fontSize": {"value": 14} // レーダー外枠のテキストサイズ !!
	    }
	  }
	},
	{
	  "type": "line",
	  "name": "twenty-line",
	  "from": {"data": "keys"},
	  "encode": {
	    "enter": {
	      "interpolate": {"value": "linear-closed"},
	      "x": {"signal": "0.2 * radius * cos(scale('angular', datum.key))"},
	      "y": {"signal": "0.2 * radius * sin(scale('angular', datum.key))"},
	      "stroke": {"value": "lightgray"},
	      "strokeWidth": {"value": 1}
	    }
	  }
	},
	{
	  "type": "line",
	  "name": "fourty-line",
	  "from": {"data": "keys"},
	  "encode": {
	    "enter": {
	      "interpolate": {"value": "linear-closed"},
	      "x": {"signal": "0.4 * radius * cos(scale('angular', datum.key))"},
	      "y": {"signal": "0.4 * radius * sin(scale('angular', datum.key))"},
	      "stroke": {"value": "lightgray"},
	      "strokeWidth": {"value": 1}
	    }
	  }
	},
	{
	  "type": "line",
	  "name": "sixty-line",
	  "from": {"data": "keys"},
	  "encode": {
	    "enter": {
	      "interpolate": {"value": "linear-closed"},
	      "x": {"signal": "0.6 * radius * cos(scale('angular', datum.key))"},
	      "y": {"signal": "0.6 * radius * sin(scale('angular', datum.key))"},
	      "stroke": {"value": "lightgray"},
	      "strokeWidth": {"value": 1}
	    }
	  }
	},
	{
	  "type": "line",
	  "name": "eighty-line",
	  "from": {"data": "keys"},
	  "encode": {
	    "enter": {
	      "interpolate": {"value": "linear-closed"},
	      "x": {"signal": "0.8 * radius * cos(scale('angular', datum.key))"},
	      "y": {"signal": "0.8 * radius * sin(scale('angular', datum.key))"},
	      "stroke": {"value": "lightgray"},
	      "strokeWidth": {"value": 1}
	    }
	  }
	},
	{
	  "type": "line",
	  "name": "outer-line",
	  "from": {"data": "radial-grid"},
	  "encode": {
	    "enter": {
	      "interpolate": {"value": "linear-closed"},
	      "x": {"field": "x2"},
	      "y": {"field": "y2"},
	      "stroke": {"value": "lightgray"},
	      "strokeWidth": {"value": 1}
	    }
	  }
	}
      ]
    }
  };

  const elem = document.createElement("div");
  // elem.setAttribute("style", "display: inline-block; width: 250px; height: 300px; padding: 20px;"); // 改変前
  elem.setAttribute("style", "display: inline-block; width: 100%; height: 350px; font-size: initial;");  // ここのheightを350pxにすることでグラフとテーブルの差が縮まる
  const chart = new google.visualization.VegaChart(elem);
  chart.draw(dataTable, options);

  container.appendChild(elem);
}


// 画面切り替えによるレスポンシブ対応
// こちらはアクセスされた際の処理
if(window.matchMedia("(max-width:767px)").matches){
  // スマホ処理
  
  // グラフの設定
  width = 300; //スマホ用の幅
  padding = 80;
  
  // グラフ下のテーブルの設定
  // フォントサイズの設定
  var tables = document.getElementsByTagName('table');

  for (var i = 0; i < tables.length; i++) {
    tables[i].style.fontSize = '10px';
    tables[i].style.marginTop = '5%';
    tables[i].style.marginBottom = '0%';
  }

}else if (window.matchMedia('(min-width:768px)').matches) {
  // PC処理
  
  // グラフの設定
  width = 400; // PC用の幅
  padding = 60;

  // グラフ下のテーブルの設定
  // フォントサイズの設定
  var tables = document.getElementsByTagName('table');

  for (var i = 0; i < tables.length; i++) {
    tables[i].style.fontSize = '';
    tables[i].style.marginTop = '20%';
    tables[i].style.marginBottom = '15%';
  }
};

const front_end = "フロントエンド"
const front = [
  ["HTML",2,front_end],
  ["CSS",2,front_end],
  ["JavaScript",1,front_end],
  ["jQuery",1,front_end],
  ["Bootstrap",2,front_end],
  ["Figma",1,front_end],
];

const back_end = "バックエンド"
const back = [
  ["Django",3,back_end],
  ["Git",3,back_end],
  ["Python",3,back_end],
  ["CI/CD",2,back_end],
  ["MySQL",2,back_end],
  ["Nginx",1,back_end],
];

const infrastructure = "インフラストラクチャー"
const infra = [
  ["Linux",2,infrastructure],
  ["Docker & Compose",2,infrastructure],
  ["監視と管理",1,infrastructure],
  ["シェルスクリプト",1,infrastructure],
  ["ファイアフォール",0,infrastructure],
];

// 画面サイズに応じてaddChart関数を呼び出す
function loadCharts() {
  addChart(front[0][2], front, "#B82E2E", "front-end-area", width, padding);
  addChart(back[0][2], back, "#6633CC", "back-end-area", width, padding);
  addChart(infra[0][2], infra, "#109618", "infra-area", width, padding);
}

google.charts.load('upcoming', {'packages': ['vegachart']}).then(loadCharts);

// リアルタイム処理
$(function(){
  var timer = false;
  $(window).resize(function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      let width;
      if(window.matchMedia("(max-width:767px)").matches){
	//スマホ処理
  
        // グラフの設定
	width = 300; // スマホ用の幅
	padding = 80;

	// グラフ下のテーブルの設定
	// フォントサイズの設定
	var tables = document.getElementsByTagName('table');

	for (var i = 0; i < tables.length; i++) {
	  tables[i].style.fontSize = '10px';
          tables[i].style.marginTop = '5%';
          tables[i].style.marginBottom = '0%';
	}
      } else if (window.matchMedia('(min-width:768px)').matches) {
	// PC処理
  
        // グラフの設定
	width = 400; // PC用の幅
	padding = 60;

	// グラフ下のテーブルの設定
	// フォントサイズの設定
	var tables = document.getElementsByTagName('table');

	for (var i = 0; i < tables.length; i++) {
	  tables[i].style.fontSize = '';
          tables[i].style.marginTop = '20%';
          tables[i].style.marginBottom = '15%';
	}
      }

      // 画面サイズに応じてaddChart関数を呼び出す
      function loadCharts() {
	addChart(front[0][2], front, "#B82E2E", "front-end-area", width, padding);
	addChart(back[0][2], back, "#6633CC", "back-end-area", width, padding);
	addChart(infra[0][2], infra, "#109618", "infra-area", width, padding);
      }

      google.charts.load('upcoming', {'packages': ['vegachart']}).then(loadCharts);
    
    }, 200);
  });
});

