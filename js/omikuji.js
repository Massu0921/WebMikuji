const omikuji_img = document.querySelector('#omikuji img');

// 加速度変化を監視
window.addEventListener('devicemotion', motion);

// カウント用
var cnt = 0;
const max_cnt = 100;

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

  if (cnt >= max_cnt) {
    // 結果表示
    result()
  }
  //console.log(cnt)
}

// 結果表示用(書き換え)
function result() {
  $('#txt').text("結果は...?")
  // Stageオブジェクトを作成
  stage = new createjs.Stage("myCanvas");

  // パーティクルシステム作成
  particleSystem = new particlejs.ParticleSystem();

  // パーティクルシステムの描画コンテナーを表示リストに登録
  stage.addChild(particleSystem.container);
  // Particle Developから保存したパラメーターを反映
  particleSystem.importFromJson(
    // JSONテキストのコピー＆ペースト ここから--
    {
      "bgColor": "#00000",
      "width": 1047,
      "height": 569,
      "emitFrequency": "38",
      "startX": 524,
      "startXVariance": 192,
      "startY": 285,
      "startYVariance": 94,
      "initialDirection": "0",
      "initialDirectionVariance": "0",
      "initialSpeed": "0",
      "initialSpeedVariance": "0",
      "friction": "0",
      "accelerationSpeed": "0",
      "accelerationDirection": "0",
      "startScale": "0.98",
      "startScaleVariance": "1",
      "finishScale": 0.41,
      "finishScaleVariance": "0.23",
      "lifeSpan": "27",
      "lifeSpanVariance": "93",
      "startAlpha": "1",
      "startAlphaVariance": "0",
      "finishAlpha": "0.34",
      "finishAlphaVariance": 0.5,
      "shapeIdList": [
        "blur_circle",
        "kirakira2",
        "kirakira",
        "star"
      ],
      "startColor": {
        "hue": "88",
        "hueVariance": "99",
        "saturation": "76",
        "saturationVariance": "0",
        "luminance": "77",
        "luminanceVariance": "46"
      },
      "blendMode": true,
      "alphaCurveType": "1",
      "VERSION": "1.0.0"
    }
    // JSONテキストのコピー＆ペースト ここまで--
  );
  // フレームレートの設定
  createjs.Ticker.framerate = 60;
  // 定期的に呼ばれる関数を登録
  createjs.Ticker.on("tick", handleTick);
  function handleTick() {
    // パーティクルの発生・更新
    particleSystem.update();

    // 描画を更新する
    stage.update();
  }



  $('#omikuji img').animate({ width: 0, height: 0 }, 500);
}