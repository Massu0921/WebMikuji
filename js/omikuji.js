const omikuji_img = document.querySelector('#omikuji img');

// 加速度変化を監視
window.addEventListener('devicemotion', motion);

if (window.DeviceOrientationEvent) {
  //  ユーザーにアクセスの許可を求める関数があったら（iOS13以降の対応）
  if (DeviceOrientationEvent.requestPermission) {
    $("#ac-permission").on("click", function () {
      // 加速度センサーへのアクセス許可を申請する
      DeviceOrientationEvent.requestPermission().then(function (response) {
        // リクエストが許可されたら
        if (response === "granted") {
          // 傾きの変化を検知する「devicemotion」を使い、「acceleration()」を実行
          $(window).on("devicemotion", motion);
        }
      });
    });
    // アクセスの許可を求める関数がなかったら
  } else {
    // 回転や傾きの変化を検知する「devicemotion」を使い、「acceleration()」を実行
    $(window).on("devicemotion", motion);
  }
}

// カウント用
var cnt = 0;
const max_cnt = 50;

// 多重起動防止用
var flg = 1;

// 加速度変化時
function motion(event) {
  // 加速度取得
  var x = event.acceleration.x;
  var y = event.acceleration.y;

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

  if (cnt == max_cnt && flg) {
    flg = 0;
    // 結果表示
    result();
  }
  //console.log(cnt)
}

// 結果表示用(書き換え)
function result() {
  $('#txt').text("結果は...?")
  // バイブ
  if (window.navigator.vibrate) {
    window.navigator.vibrate(500)
  }

  $('#omikuji img').animate({ width: 0 }, 1000);
  setTimeout(function () {
    $('#omikuji img').remove();
    $('#result img').animate({ width: 0 + '%' }, 500).animate({ width: 70 + '%' }, 500).animate({ width: 50 + '%' }, 500);
    setTimeout(function () {
      $('h3').fadeIn(1000);
    }, 2000);
  }, 1000);
}

// 読み込み時に結果決定
$(window).on('load', function () {
  // ランダム数生成
  var num = Math.floor(Math.random() * 6);
  $('#omikuji').after('<div id="result"><img src="./images/' + String(num) + '.png" width="0%" alt="" class="mx-auto d-block"></div>');
  $('#result').after('<a href="/"><h3 class="text-center m-4" style="display: none">ホームに戻る</h3></a>')
});
