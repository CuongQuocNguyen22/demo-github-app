/**
 * TRÍ TUỆ BỎNG CHÂN - Game Trắc Nghiệm Rớt Sàn A B C D
 * Engineered with HTML5 Canvas 2D, Web Audio API & Modern JS Engine
 */

// --- BANANAS / QUESTION BANK ---
const QUESTION_BANK = {
  general: [
    {
      question: "Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?",
      options: ["Sao Hỏa", "Sao Thủy", "Sao Kim", "Sao Mộc"],
      answerIndex: 1, // B
      fact: "Sao Thủy (Mercury) là hành tinh nằm gần Mặt Trời nhất."
    },
    {
      question: "Việt Nam có bao nhiêu tỉnh thành phố trực thuộc Trung ương?",
      options: ["5", "6", "63", "64"],
      answerIndex: 0, // A (Hà Nội, TP.HCM, Hải Phòng, Đà Nẵng, Cần Thơ)
      fact: "Việt Nam có 5 thành phố trực thuộc Trung ương."
    },
    {
      question: "Loại quả nào chứa nhiều Vitamin C nhất?",
      options: ["Táo", "Cam", "Ổi", "Chuối"],
      answerIndex: 2, // C
      fact: "Ổi chứa lượng Vitamin C cao gấp 4 lần so với Cam."
    },
    {
      question: "Tác phẩm 'Truyện Kiều' do ai sáng tác?",
      options: ["Nguyễn Trãi", "Nguyễn Du", "Hồ Xuân Hương", "Nam Cao"],
      answerIndex: 1, // B
      fact: "Đại thi hào Nguyễn Du sáng tác tác phẩm kinh điển Truyện Kiều."
    },
    {
      question: "Chất nào chiếm tỉ lệ cao nhất trong không khí trái đất?",
      options: ["Oxy (O2)", "Nitơ (N2)", "Cacbonic (CO2)", "Hydro (H2)"],
      answerIndex: 1, // B
      fact: "Khí Nitơ chiếm khoảng 78% thể tích không khí Trái Đất."
    },
    {
      question: "Đơn vị tiền tệ chính thức của Nhật Bản là gì?",
      options: ["Won", "Dollar", "Yên", "Baht"],
      answerIndex: 2, // C
      fact: "Đồng Yên (JPY) là đơn vị tiền tệ của Nhật Bản."
    },
    {
      question: "Đỉnh núi nào cao nhất thế giới?",
      options: ["Phan Xăng Păng", "K2", "Kilimanjaro", "Everest"],
      answerIndex: 3, // D
      fact: "Đỉnh Everest trên dãy Himalaya cao 8.848m so với mực nước biển."
    },
    {
      question: "Con vật nào được xem là biểu tượng của nước Úc (Australia)?",
      options: ["Gấu Panda", "Kangaroo", "Chim Cánh Cụt", "Hổ"],
      answerIndex: 1, // B
      fact: "Kangaroo (Chuột túi) là linh vật biểu tượng quốc gia nước Úc."
    },
    {
      question: "Tháp Eiffel nằm ở thành phố nào?",
      options: ["London", "Paris", "Berlin", "Rome"],
      answerIndex: 1, // B
      fact: "Tháp Eiffel là công trình kiến trúc nổi tiếng ở Paris, Pháp."
    },
    {
      question: "Số tiếp theo trong dãy số 2, 4, 8, 16, ... là bao nhiêu?",
      options: ["24", "30", "32", "64"],
      answerIndex: 2, // C
      fact: "Mỗi số sau bằng số trước nhân 2: 16 x 2 = 32."
    }
  ],
  science: [
    {
      question: "Công thức hóa học của Nước là gì?",
      options: ["CO2", "H2O", "NaCl", "O2"],
      answerIndex: 1, // B
      fact: "Nước gồm 2 nguyên tử Hydro và 1 nguyên tử Oxy (H2O)."
    },
    {
      question: "Vận tốc ánh sáng trong chân không xấp xỉ bao nhiêu?",
      options: ["300.000 km/s", "1.000 km/s", "340 m/s", "3.000 km/s"],
      answerIndex: 0, // A
      fact: "Ánh sáng truyền đi với tốc độ khoảng 300.000 km mỗi giây."
    },
    {
      question: "Bộ phận nào trong tế bào đóng vai trò là 'nhà máy năng lượng'?",
      options: ["Nhân tế bào", "Ty thể (Mitochondria)", "Màng tế bào", "Lưới nội chất"],
      answerIndex: 1, // B
      fact: "Ty thể là nơi tổng hợp năng lượng ATP chính cho tế bào."
    },
    {
      question: "Hành tinh nào còn được gọi là 'Hành tinh Đỏ'?",
      options: ["Sao Kim", "Sao Thủy", "Sao Hỏa", "Sao Thổ"],
      answerIndex: 2, // C
      fact: "Sao Hỏa (Mars) có bề mặt chứa sắt oxit tạo nên màu đỏ đặc trưng."
    },
    {
      question: "Động vật sống nào lớn nhất Trái Đất hiện nay?",
      options: ["Voi Châu Phi", "Cá Voi Xanh", "Khủng Long", "Hà Mã"],
      answerIndex: 1, // B
      fact: "Cá Voi Xanh dài đến 30m và nặng tới 180 tấn."
    }
  ],
  riddles: [
    {
      question: "Cái gì càng rửa càng bẩn?",
      options: ["Cái bát", "Bàn tay", "Nước", "Tấm khăn"],
      answerIndex: 2, // C
      fact: "Rửa cái gì vào nước thì chính nguồn nước đó sẽ bị bẩn đi!"
    },
    {
      question: "Lịch nào dài nhất trong các loại lịch?",
      options: ["Lịch Âm", "Lịch Dương", "Lịch Sử", "Lịch Trụ"],
      answerIndex: 2, // C
      fact: "Lịch sử trải dài hàng ngàn triệu năm từ quá khứ tới tương lai!"
    },
    {
      question: "Cái gì có cổ nhưng không có đầu?",
      options: ["Con hươu", "Cái áo", "Con vịt", "Cái cây"],
      answerIndex: 1, // B
      fact: "Cái áo có cổ áo nhưng không hề có đầu."
    },
    {
      question: "Bệnh gì bác sĩ bó tay?",
      options: ["Bệnh cảm", "Bệnh gãy tay", "Bệnh nan y", "Bệnh đau đầu"],
      answerIndex: 1, // B
      fact: "Gãy tay thì bác sĩ phải 'bó tay' (bó bột tay) lại!"
    },
    {
      question: "Con đường nào dài nhất?",
      options: ["Đường cao tốc", "Đường Đời", "Đường Xạ Hát", "Đường Xã Cát"],
      answerIndex: 1, // B
      fact: "Đường đời kéo dài suốt cả một đời người."
    }
  ],
  geography: [
    {
      question: "Sông nào dài nhất thế giới?",
      options: ["Sông Mê Kông", "Sông Nile", "Sông Amazon", "Sông Hồng"],
      answerIndex: 1, // B
      fact: "Sông Nile ở Châu Phi là con sông dài nhất thế giới (~6.650 km)."
    },
    {
      question: "Thành phố nào là thủ đô của Úc (Australia)?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answerIndex: 2, // C
      fact: "Thủ đô chính thức của Úc là Canberra, chứ không phải Sydney."
    },
    {
      question: "Châu lục nào lạnh nhất và khô nhất Trái Đất?",
      options: ["Châu Bắc Cực", "Châu Nam Cực", "Châu Âu", "Châu Phi"],
      answerIndex: 1, // B
      fact: "Châu Nam Cực vừa là hoang mạc lạnh nhất vừa khô nhất hành tinh."
    },
    {
      question: "Quốc gia nào có diện tích lớn nhất thế giới?",
      options: ["Trung Quốc", "Mỹ", "Canada", "Nga"],
      answerIndex: 3, // D
      fact: "Nga có diện tích hơn 17 triệu km2, lớn nhất thế giới."
    },
    {
      question: "Vịnh Hạ Long thuộc tỉnh thành nào của Việt Nam?",
      options: ["Hải Phòng", "Quảng Ninh", "Nam Định", "Thanh Hóa"],
      answerIndex: 1, // B
      fact: "Vịnh Hạ Long nằm ở tỉnh Quảng Ninh."
    }
  ],
  math: [
    {
      question: "Căn bậc hai của 144 là bao nhiêu?",
      options: ["10", "12", "14", "16"],
      answerIndex: 1, // B
      fact: "12 x 12 = 144."
    },
    {
      question: "Tam giác có 3 cạnh bằng nhau gọi là tam giác gì?",
      options: ["Tam giác vuông", "Tam giác cân", "Tam giác đều", "Tam giác tù"],
      answerIndex: 2, // C
      fact: "Tam giác có 3 cạnh và 3 góc bằng nhau (60 độ) là tam giác đều."
    },
    {
      question: "Số nguyên tố nhỏ nhất là số mấy?",
      options: ["0", "1", "2", "3"],
      answerIndex: 2, // C
      fact: "Số 2 là số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất."
    },
    {
      question: "Nếu 3 con mèo bắt 3 con chuột trong 3 phút, thì 100 con mèo bắt 100 con chuột trong mấy phút?",
      options: ["100 phút", "33 phút", "3 phút", "1 phút"],
      answerIndex: 2, // C
      fact: "Mỗi con mèo mất 3 phút để bắt 1 con chuột, nên 100 con cũng mất 3 phút!"
    },
    {
      question: "Tổng các góc trong một hình tam giác bằng bao nhiêu độ?",
      options: ["90 độ", "180 độ", "360 độ", "270 độ"],
      answerIndex: 1, // B
      fact: "Tổng 3 góc trong bất kỳ tam giác nào luôn bằng 180 độ."
    }
  ]
};

// --- WEB AUDIO API SYNTHESIZER ---
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playStep() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e){}
  }

  playTick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch(e){}
  }

  playFall() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch(e){}
  }

  playCorrect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch(e){}
  }
}

const audio = new SoundSynth();

// --- GAME CONTROLLER & RENDERER ---
class QuizFallGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // UI Elements
    this.topicSelect = document.getElementById('topicSelect');
    this.btnSound = document.getElementById('btnSound');
    this.questionProgress = document.getElementById('questionProgress');
    this.timerVal = document.getElementById('timerVal');
    this.scoreVal = document.getElementById('scoreVal');
    
    this.questionText = document.getElementById('questionText');
    this.optElements = [
      document.getElementById('optA'),
      document.getElementById('optB'),
      document.getElementById('optC'),
      document.getElementById('optD')
    ];
    this.optTexts = [
      document.getElementById('textOptA'),
      document.getElementById('textOptB'),
      document.getElementById('textOptC'),
      document.getElementById('textOptD')
    ];
    
    this.bannerOverlay = document.getElementById('bannerOverlay');
    this.bannerCard = document.getElementById('bannerCard');
    this.bannerTitle = document.getElementById('bannerTitle');
    this.bannerDesc = document.getElementById('bannerDesc');
    
    this.modalBackdrop = document.getElementById('modalBackdrop');
    this.finalScoreVal = document.getElementById('finalScoreVal');
    this.finalAccuracy = document.getElementById('finalAccuracy');
    this.rankBadge = document.getElementById('rankBadge');
    this.btnRestart = document.getElementById('btnRestart');

    // Controls state
    this.keys = { up: false, down: false, left: false, right: false };

    // Game state
    this.currentQuestions = [];
    this.currentQIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    
    this.timer = 10;
    this.timerInterval = null;
    
    // Game Phases: 'MOVING', 'EVALUATING', 'REVEAL_WAIT'
    this.phase = 'MOVING';

    // Arena Tile Quadrants
    // Canvas dimensions: 640 x 480
    this.tiles = [
      { id: 'A', name: 'Đáp án A', label: 'A', x: 40,  y: 40,  w: 270, h: 190, color: '#3b82f6', darkColor: '#1d4ed8', yOffset: 0, fallSpeed: 0, opacity: 1, isFalling: false, shake: 0 },
      { id: 'B', name: 'Đáp án B', label: 'B', x: 330, y: 40,  w: 270, h: 190, color: '#eab308', darkColor: '#ca8a04', yOffset: 0, fallSpeed: 0, opacity: 1, isFalling: false, shake: 0 },
      { id: 'C', name: 'Đáp án C', label: 'C', x: 40,  y: 250, w: 270, h: 190, color: '#22c55e', darkColor: '#15803d', yOffset: 0, fallSpeed: 0, opacity: 1, isFalling: false, shake: 0 },
      { id: 'D', name: 'Đáp án D', label: 'D', x: 330, y: 250, w: 270, h: 190, color: '#ec4899', darkColor: '#be185d', yOffset: 0, fallSpeed: 0, opacity: 1, isFalling: false, shake: 0 }
    ];

    // Player state
    this.player = {
      x: 320,
      y: 240,
      radius: 18,
      speed: 4.5,
      scale: 1,
      rotation: 0,
      yOffset: 0,
      fallSpeed: 0,
      isFalling: false,
      bounce: 0,
      color: '#06b6d4',
      eyes: 'normal'
    };

    // Confetti particles
    this.particles = [];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startNewGame();
    
    // Start Render Loop
    requestAnimationFrame((timestamp) => this.renderLoop(timestamp));
  }

  setupEventListeners() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      audio.init();
      if (this.phase !== 'MOVING') return;
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.keys.down = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = true;
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.keys.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.keys.down = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = false;
    });

    // Mobile D-Pad
    document.querySelectorAll('.dpad-btn').forEach(btn => {
      const dir = btn.dataset.dir;
      const startDir = (e) => {
        e.preventDefault();
        audio.init();
        if (this.phase !== 'MOVING') return;
        this.keys[dir] = true;
      };
      const endDir = (e) => {
        e.preventDefault();
        this.keys[dir] = false;
      };
      btn.addEventListener('mousedown', startDir);
      btn.addEventListener('mouseup', endDir);
      btn.addEventListener('touchstart', startDir);
      btn.addEventListener('touchend', endDir);
    });

    // Options UI
    this.topicSelect.addEventListener('change', () => {
      this.startNewGame();
    });

    this.btnSound.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      this.btnSound.textContent = audio.enabled ? '🔊' : '🔇';
    });

    this.btnRestart.addEventListener('click', () => {
      this.modalBackdrop.classList.remove('show');
      this.startNewGame();
    });
  }

  startNewGame() {
    const category = this.topicSelect.value;
    const rawQuestions = QUESTION_BANK[category] || QUESTION_BANK.general;
    // Shuffle questions
    this.currentQuestions = [...rawQuestions].sort(() => Math.random() - 0.5);
    
    this.currentQIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.scoreVal.textContent = '0';
    
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.currentQIndex >= this.currentQuestions.length) {
      this.finishGame();
      return;
    }

    const q = this.currentQuestions[this.currentQIndex];
    
    // Update UI Text
    this.questionProgress.textContent = `Câu ${this.currentQIndex + 1} / ${this.currentQuestions.length}`;
    this.questionText.textContent = q.question;
    
    for (let i = 0; i < 4; i++) {
      this.optTexts[i].textContent = q.options[i];
      this.optElements[i].classList.remove('highlight-correct', 'highlight-wrong');
    }

    // Hide Overlay Banner
    this.bannerOverlay.classList.remove('show');

    // Reset Tiles & Player
    this.resetTilesAndPlayer();

    // Start 10s Timer
    this.timer = 10;
    this.timerVal.textContent = `${this.timer}s`;
    this.timerVal.classList.remove('urgent');

    if (this.timerInterval) clearInterval(this.timerInterval);
    
    this.phase = 'MOVING';
    
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.timerVal.textContent = `${this.timer}s`;
      audio.playTick();

      if (this.timer <= 3) {
        this.timerVal.classList.add('urgent');
      }

      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.evaluateRound();
      }
    }, 1000);
  }

  resetTilesAndPlayer() {
    // Reset Tiles
    this.tiles.forEach(t => {
      t.yOffset = 0;
      t.fallSpeed = 0;
      t.opacity = 1;
      t.isFalling = false;
      t.shake = 0;
    });

    // Reset Player to center
    this.player.x = 320;
    this.player.y = 240;
    this.player.scale = 1;
    this.player.rotation = 0;
    this.player.yOffset = 0;
    this.player.fallSpeed = 0;
    this.player.isFalling = false;
    this.player.eyes = 'normal';

    // Clear controls
    this.keys = { up: false, down: false, left: false, right: false };
  }

  evaluateRound() {
    this.phase = 'EVALUATING';
    const q = this.currentQuestions[this.currentQIndex];
    const correctIdx = q.answerIndex;

    // Check which tile player is currently standing on
    let standingTileId = null;
    this.tiles.forEach(tile => {
      if (
        this.player.x >= tile.x && 
        this.player.x <= tile.x + tile.w &&
        this.player.y >= tile.y && 
        this.player.y <= tile.y + tile.h
      ) {
        standingTileId = tile.id;
      }
    });

    const correctTileId = this.tiles[correctIdx].id;
    const isCorrect = (standingTileId === correctTileId);

    // Make wrong tiles fall!
    this.tiles.forEach((tile, idx) => {
      if (idx !== correctIdx) {
        tile.isFalling = true;
        tile.shake = 10;
      }
    });

    // Highlight options in UI
    this.optElements.forEach((el, idx) => {
      if (idx === correctIdx) el.classList.add('highlight-correct');
      else el.classList.add('highlight-wrong');
    });

    if (isCorrect) {
      // Player is safe on the correct tile!
      this.score += 10;
      this.correctCount++;
      this.scoreVal.textContent = this.score;
      this.player.bounce = 15;
      this.player.eyes = 'happy';
      
      audio.playCorrect();
      this.spawnConfetti();

      // Show Correct Banner
      this.bannerCard.className = 'banner-card correct';
      this.bannerTitle.textContent = 'CHÍNH XÁC! 🌟';
      this.bannerDesc.textContent = `Bạn đã đứng đúng ô ${correctTileId} (+10 điểm)`;
      this.bannerOverlay.classList.add('show');
    } else {
      // Player picked wrong tile OR was standing in middle gap -> Player falls down!
      this.player.isFalling = true;
      this.player.eyes = 'surprised';
      audio.playFall();

      // Show Wrong/Fell Banner with Correct Answer
      this.bannerCard.className = 'banner-card wrong';
      this.bannerTitle.textContent = 'RỚT SÀN RỒI! 💥';
      this.bannerDesc.textContent = `Không có điểm. Đáp án đúng là: ${correctTileId}. ${q.options[correctIdx]}`;
      this.bannerOverlay.classList.add('show');
    }

    // Wait 2.8 seconds to display answer, then automatically progress to next question!
    setTimeout(() => {
      this.phase = 'REVEAL_WAIT';
      this.currentQIndex++;
      this.loadQuestion();
    }, 2800);
  }

  updatePlayerPhysics() {
    if (this.phase === 'MOVING') {
      let dx = 0;
      let dy = 0;
      if (this.keys.up) dy -= this.player.speed;
      if (this.keys.down) dy += this.player.speed;
      if (this.keys.left) dx -= this.player.speed;
      if (this.keys.right) dx += this.player.speed;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      if (dx !== 0 || dy !== 0) {
        audio.playStep();
      }

      this.player.x += dx;
      this.player.y += dy;

      // Keep within arena bounds
      this.player.x = Math.max(55, Math.min(585, this.player.x));
      this.player.y = Math.max(55, Math.min(425, this.player.y));
    }

    // Handle falling animation
    if (this.player.isFalling) {
      this.player.fallSpeed += 0.6;
      this.player.yOffset += this.player.fallSpeed;
      this.player.rotation += 0.12;
      this.player.scale = Math.max(0, this.player.scale - 0.018);
    } else if (this.player.bounce > 0) {
      this.player.bounce -= 1;
    }
  }

  updateTilesPhysics() {
    this.tiles.forEach(tile => {
      if (tile.isFalling) {
        if (tile.shake > 0) {
          tile.shake -= 1;
        } else {
          tile.fallSpeed += 0.7;
          tile.yOffset += tile.fallSpeed;
          tile.opacity = Math.max(0, tile.opacity - 0.025);
        }
      }
    });
  }

  spawnConfetti() {
    this.particles = [];
    const colors = ['#fbbf24', '#38bdf8', '#4ade80', '#f472b6', '#a78bfa'];
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: this.player.x,
        y: this.player.y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.8) * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
        life: 1
      });
    }
  }

  updateParticles() {
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.life -= 0.02;
      if (p.life <= 0) this.particles.splice(idx, 1);
    });
  }

  renderLoop(timestamp) {
    this.updatePlayerPhysics();
    this.updateTilesPhysics();
    this.updateParticles();

    this.drawArena();

    requestAnimationFrame((t) => this.renderLoop(t));
  }

  drawArena() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Dark Abyss Background under tiles
    this.ctx.fillStyle = '#06070c';
    this.ctx.fillRect(0, 0, 640, 480);

    // Grid Floor Pattern underneath
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < 640; x += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, 480);
      this.ctx.stroke();
    }
    for (let y = 0; y < 480; y += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(640, y);
      this.ctx.stroke();
    }

    // Draw 4 Quadrant Floor Tiles
    this.tiles.forEach(tile => {
      if (tile.opacity <= 0) return;

      this.ctx.save();
      this.ctx.globalAlpha = tile.opacity;

      let renderX = tile.x;
      let renderY = tile.y + tile.yOffset;

      if (tile.shake > 0) {
        renderX += (Math.random() - 0.5) * 6;
      }

      // Draw 3D Tile Shadow / Base
      this.ctx.fillStyle = tile.darkColor;
      this.drawRoundedRect(renderX, renderY + 12, tile.w, tile.h, 16);
      this.ctx.fill();

      // Draw Tile Top Face
      this.ctx.fillStyle = tile.color;
      this.drawRoundedRect(renderX, renderY, tile.w, tile.h, 16);
      this.ctx.fill();

      // Inner Tile Border Glow
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      // Large Tile Label (A, B, C, D)
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      this.ctx.font = '900 54px Outfit, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(tile.label, renderX + tile.w / 2, renderY + tile.h / 2);

      this.ctx.restore();
    });

    // Draw Particles
    this.particles.forEach(p => {
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw Player Character Avatar
    if (this.player.scale > 0) {
      this.ctx.save();

      let drawX = this.player.x;
      let drawY = this.player.y + this.player.yOffset - Math.sin(this.player.bounce * 0.3) * 12;

      this.ctx.translate(drawX, drawY);
      this.ctx.rotate(this.player.rotation);
      this.ctx.scale(this.player.scale, this.player.scale);

      // Player Drop Shadow
      if (!this.player.isFalling) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Avatar Body (Cute Cyan Jelly/Bean)
      this.ctx.fillStyle = this.player.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 20, 0, Math.PI * 2);
      this.ctx.fill();

      // Body Outline & Highlight
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      // Cute Eyes
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(-7, -4, 5, 0, Math.PI * 2);
      this.ctx.arc(7, -4, 5, 0, Math.PI * 2);
      this.ctx.fill();

      // Pupils
      this.ctx.fillStyle = '#0f172a';
      if (this.player.eyes === 'surprised') {
        this.ctx.beginPath();
        this.ctx.arc(-7, -4, 2, 0, Math.PI * 2);
        this.ctx.arc(7, -4, 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (this.player.eyes === 'happy') {
        this.ctx.font = 'bold 10px sans-serif';
        this.ctx.fillText('^', -9, -1);
        this.ctx.fillText('^', 5, -1);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(-6, -4, 2.5, 0, Math.PI * 2);
        this.ctx.arc(8, -4, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Smile
      this.ctx.strokeStyle = '#0f172a';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      if (this.player.eyes === 'surprised') {
        this.ctx.arc(0, 6, 4, 0, Math.PI * 2); // Open O mouth
      } else {
        this.ctx.arc(0, 3, 6, 0.1 * Math.PI, 0.9 * Math.PI); // Smile
      }
      this.ctx.stroke();

      this.ctx.restore();
    }
  }

  drawRoundedRect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }

  finishGame() {
    const total = this.currentQuestions.length;
    const accuracy = Math.round((this.correctCount / total) * 100);

    this.finalScoreVal.textContent = this.score;
    this.finalAccuracy.textContent = `Đúng: ${this.correctCount} / ${total} câu (${accuracy}%)`;

    let rank = 'Tập Sự 🐣';
    if (accuracy >= 90) rank = 'Thiên Tài Học Bá 👑';
    else if (accuracy >= 70) rank = 'Học Bá Thông Thái 🌟';
    else if (accuracy >= 50) rank = 'Nhà Thông Thái 🎓';
    else if (accuracy >= 30) rank = 'Cần Cố Gắng Nối Tiếp 💪';

    this.rankBadge.textContent = rank;

    this.modalBackdrop.classList.add('show');
  }
}

// Start Game on Page Load
window.addEventListener('DOMContentLoaded', () => {
  new QuizFallGame();
});
