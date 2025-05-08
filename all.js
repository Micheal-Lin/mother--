const video = document.getElementById('myVideo');
const playBtn = document.getElementById('playBtn');
const volumeControl = document.getElementById('volumeControl');
const seekBar = document.getElementById('seekBar');

// 播放/暫停按鈕
playBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playBtn.textContent = '▶';
  } else {
    video.pause();
    playBtn.textContent = '||';
  }
});

// 音量控制
volumeControl.addEventListener('input', () => {
  video.volume = volumeControl.value;  // 0.0 ~ 1.0
});

// 播放進度控制：拖動滑桿調整影片時間
seekBar.addEventListener('input', () => {
  const time = video.duration * (seekBar.value / 100);
  video.currentTime = time;
});

// 更新播放進度滑桿（隨影片播放）
video.addEventListener('timeupdate', () => {
  const value = (video.currentTime / video.duration) * 100;
  seekBar.value = value;
});

// 監聽鍵盤事件，按 Enter 控制播放/暫停
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (video.paused) {
      video.play();
      playBtn.textContent = '>';
    } else {
      video.pause();
      playBtn.textContent = '||';
    }
  }
});

const myAudio = document.getElementById('myAudio');
myAudio.volume = 0.2;  // 將音量調到 20%

function tryPlayAudio() {
  myAudio.play().catch(() => {
    // 自動播放失敗，等待用戶互動
  });
  // 解除事件綁定，避免重複觸發
  document.removeEventListener('click', tryPlayAudio);
  document.removeEventListener('keydown', tryPlayAudio);
}

// 嘗試自動播放
tryPlayAudio();

// 如果失敗，等用戶點擊或按鍵時播放
document.addEventListener('click', tryPlayAudio);
document.addEventListener('keydown', tryPlayAudio);