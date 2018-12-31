const omikuji_img = document.querySelector('#omikuji img');

// 加速度変化を監視
window.addEventListener('devicemotion', motion);

// カウント用
var cnt = 0;
const max_cnt = 50;

// 待機用
var flg = 1;

// 加速度変化時
function motion(event) {

  // 加速度取得
  const x = event.acceleration.x;
  const y = event.acceleration.y;
  const z = event.acceleration.z;

  const bound = 7;
  // 上下のみカウント
  if (x > bound) { // 右
    omikuji_img.style.transform = 'rotate(90deg)';
  }
  else if (x < -bound) { // 左
    omikuji_img.style.transform = 'rotate(-90deg)';
  }
  else if (y > bound) { // 上
    omikuji_img.style.transform = 'rotate(0deg)';
    cnt++;
  }
  else if (y < -bound) { // 下
    omikuji_img.style.transform = 'rotate(180deg)';
    cnt++;
  }

  if (cnt == max_cnt) {
    // 結果表示
    result()
  }
  //console.log(cnt)
}

// アニメーション待機用
function comp() {
  flg = 0;
}

// 結果表示用(書き換え)
function result() {
  $('#txt').text("結果は...?")
  $('#omikuji img').animate({ width: 0, height: 0 }, { duration: 1000 }, {complete: comp()});
  while(flg){} //待機
  flg = 1;
  $('#omikuji img').remove()
  
  // ランダム数生成
  var num = Math.floor(Math.random() * 7);
  // 画像配置
  $('#txt').append('<div id="result"><img src="./images/' + String(num) + '.png" width="0%" alt="" class="mx-auto d-block"></div>');


  $('#result img').animate({ width: 0 + '%' }, { duration: 500 }, { complete: comp() });
  while (flg) { } //待機
  flg = 1;
  $('#result img').animate({ width: 70 + '%' }, { duration: 500 }, { complete: comp() });
  while (flg) { } //待機
  flg = 1;
  $('#result img').animate({ width: 50 + '%' }, { duration: 500 }, { complete: comp() });
}