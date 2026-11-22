const aquarium = document.querySelector('#aquarium');
const sceneButton = document.querySelector('#sceneButton');
const musicButton = document.querySelector('#musicButton');
const musicLabel = document.querySelector('#musicLabel');
const sceneStatus = document.querySelector('#sceneStatus');
const audioStatus = document.querySelector('#audioStatus');

const scenes = ['Nắng sớm', 'Rạn san hô', 'Biển sâu', 'Hoàng hôn'];
let activeScene = 0;

sceneButton.addEventListener('click', () => {
  activeScene = (activeScene + 1) % scenes.length;
  aquarium.dataset.scene = String(activeScene);
  sceneStatus.textContent = `Cảnh nền: ${scenes[activeScene]} (${activeScene + 1}/${scenes.length})`;
});

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioContext;
let musicTimer;
let musicPlaying = false;
let musicTransition = false;
let noteIndex = 0;
const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];

function playNextNote() {
  const now = audioContext.currentTime;
  const note = melody[noteIndex % melody.length];
  noteIndex += 1;

  [note, note * 1.5].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    const start = now + index * 0.035;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, start);
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(index ? 0.012 : 0.035, start + 0.12);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + 1.45);
    oscillator.connect(envelope);
    envelope.connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + 1.5);
  });
}

musicButton.addEventListener('click', async () => {
  if (musicTransition) return;
  if (!AudioContextClass) {
    audioStatus.textContent = 'Trình duyệt này không hỗ trợ phát âm thanh.';
    return;
  }

  musicTransition = true;
  try {
    if (!audioContext) audioContext = new AudioContextClass();

    if (musicPlaying) {
      window.clearInterval(musicTimer);
      await audioContext.suspend();
      musicPlaying = false;
      musicButton.setAttribute('aria-pressed', 'false');
      musicLabel.textContent = 'Phát nhạc';
      audioStatus.textContent = 'Đã tắt nhạc.';
    } else {
      await audioContext.resume();
      playNextNote();
      musicTimer = window.setInterval(playNextNote, 900);
      musicPlaying = true;
      musicButton.setAttribute('aria-pressed', 'true');
      musicLabel.textContent = 'Tắt nhạc';
      audioStatus.textContent = 'Đang phát giai điệu nền.';
    }
  } catch (error) {
    console.error('Không thể phát nhạc nền:', error);
    audioStatus.textContent = 'Không thể phát âm thanh trong trình duyệt này.';
  } finally {
    musicTransition = false;
  }
});
