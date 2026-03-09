// htmlに書いたIDが"canvas"を見つけて、canvas変数に入れる。
const canvas = document.getElementById("canvas");
// 2Dの平面を用意して模様を書く準備
const ctx = canvas.getContext("2d");

// 画面サイズ用
let width, height;
// 模様のデータを入れておくためのリスト
let dots = [];
// マウスの座標を格納しておくやつ。(デフォルトを画面外にしておく)
const mouse = { x: -1000, y: -1000 };

// ---設定---
// 間隔　　デフォ15
const kankaku = 15;
// 最小半径　デフォ10
const min_r = 10;
// 最大半径　デフォ0
const max_r = 0;
// マウスの範囲　デフォ100
const check_mause_r = 100;
// 模様の色　デフォ#f0f0f0
const dot_color = "#f0f0f0";

// 画面サイズに沿って模様の配置場所を計算する関数
function init() {
  // サイズをブラウザの画面サイズに合わせる
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  // 画面更新時に模様のリストをリセット
  dots = [];
  // 画面左端から右端までループする
  for (let x = 0; x <= width; x += kankaku) {
    // 画面上端から下端までループ
    for (let y = 0; y <= height; y += kankaku) {
      // dotsリストにxとyを追加
      dots.push({ x, y });
    }
  }
}

// マウスが動いたときにカッコ内を実行
window.addEventListener("mousemove", (e) => {
  // マウスの座標を上書き
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
// 画面サイズ変更時にカッコ内(初期化)を実行
window.addEventListener("resize", init);
// マウスが画面外にでたときにカッコ内を実行
window.addEventListener("mouseout", () => {
  // xとyの座標をそれぞれ-1000にする
  mouse.x = -1000;
  mouse.y = -1000;
});

// アニメーションさせる関数
function animation() {
  // 0, 0からwidth, heightまでの画面を一度クリア
  ctx.clearRect(0, 0, width, height);
  // これから表示する模様の色をdot_colorにする
  ctx.fillStyle = dot_color;

  // dotsのリストに入ってるデータの処理をする
  for (let dot of dots) {
    // マウスと模様の距離を計算
    const dx = mouse.x - dot.x;
    const dy = mouse.y - dot.y;
    // ピタゴラスの定理を使って距離を計算
    const dist = Math.sqrt(dx * dx + dy * dy);
    // 一旦半径をmin_rにしておく
    let radius = min_r;
    // マウスの範囲に近いほど大きくする処理
    if (dist < check_mause_r) {
      radius = min_r + (max_r - min_r) * (1 - dist / check_mause_r);
    }
    // 描画する宣言をする
    ctx.beginPath();
    // 模様の場所をdot.x, dot.yにして半径をradiusで円を書く
    ctx.arc(dot.x, dot.y, radius, 1, Math.PI * 2);
    // 中を満たす
    ctx.fill();
  }
  // もう一度描画をリクエスト
  requestAnimationFrame(animation);
}

// 初期化
init();
// 描画を開始
animation();
