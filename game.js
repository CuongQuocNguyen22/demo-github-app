/**
 * Snake Game (Rắn Săn Mồi) - Cyberpunk Neon Edition
 * HTML5 Canvas & Web Audio API
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playEatSound(type = 'red') {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      if (type === 'gold') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'blue') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playGameOverSound() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 4 + 2;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.gridCount = 20; // 20x20 grid
    this.tileSize = this.canvas.width / this.gridCount;

    this.sound = new SoundEffects();
    
    // UI elements
    this.scoreEl = document.getElementById('score');
    this.highScoreEl = document.getElementById('highScore');
    this.foodCountEl = document.getElementById('foodCount');
    this.overlayEl = document.getElementById('canvasOverlay');
    this.overlayTextEl = document.getElementById('overlayText');
    this.overlaySubtextEl = document.getElementById('overlaySubtext');
    this.btnStart = document.getElementById('btnStart');
    this.btnPause = document.getElementById('btnPause');
    this.btnSound = document.getElementById('btnSound');
    this.difficultySelect = document.getElementById('difficultySelect');
    
    // Game Over Modal
    this.modalBackdrop = document.getElementById('modalBackdrop');
    this.finalScoreEl = document.getElementById('finalScore');
    this.newHighScoreBadge = document.getElementById('newHighScoreBadge');
    this.btnRestart = document.getElementById('btnRestart');

    // Game state
    this.snake = [];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.food = null; // {x, y, type: 'red'|'gold'|'blue', expireTime}
    this.obstacles = [];
    this.particles = [];
    
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('snake_high_score_v2')) || 0;
    this.foodEaten = 0;
    
    this.state = 'STOPPED'; // STOPPED, PLAYING, PAUSED, GAMEOVER
    this.gameInterval = null;
    this.difficulty = 'medium';
    
    this.init();
  }

  init() {
    this.highScoreEl.textContent = this.highScore;
    this.setupEventListeners();
    this.resetGame();
    this.draw();
  }

  setupEventListeners() {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' || e.code === 'Space') {
        this.togglePause();
        return;
      }

      if (this.state !== 'PLAYING') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (this.dir.y === 0) this.nextDir = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (this.dir.y === 0) this.nextDir = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (this.dir.x === 0) this.nextDir = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (this.dir.x === 0) this.nextDir = { x: 1, y: 0 };
          break;
      }
    });

    // Touch D-Pad
    document.querySelectorAll('.dpad-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dir = btn.dataset.dir;
        if (this.state !== 'PLAYING') return;
        if (dir === 'up' && this.dir.y === 0) this.nextDir = { x: 0, y: -1 };
        if (dir === 'down' && this.dir.y === 0) this.nextDir = { x: 0, y: 1 };
        if (dir === 'left' && this.dir.x === 0) this.nextDir = { x: -1, y: 0 };
        if (dir === 'right' && this.dir.x === 0) this.nextDir = { x: 1, y: 0 };
      });
    });

    // Button controls
    this.btnStart.addEventListener('click', () => {
      this.sound.init();
      if (this.state === 'STOPPED' || this.state === 'GAMEOVER') {
        this.startGame();
      } else {
        this.resetGame();
        this.startGame();
      }
    });

    this.btnPause.addEventListener('click', () => {
      this.togglePause();
    });

    this.btnSound.addEventListener('click', () => {
      this.sound.muted = !this.sound.muted;
      this.btnSound.textContent = this.sound.muted ? '🔇' : '🔊';
    });

    this.difficultySelect.addEventListener('change', (e) => {
      this.difficulty = e.target.value;
      if (this.state === 'PLAYING') {
        this.restartSpeed();
      }
    });

    this.btnRestart.addEventListener('click', () => {
      this.modalBackdrop.classList.remove('active');
      this.startGame();
    });
  }

  getSpeed() {
    switch (this.difficulty) {
      case 'easy': return 140;
      case 'hard': return 70;
      case 'medium':
      default: return 100;
    }
  }

  resetGame() {
    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.score = 0;
    this.foodEaten = 0;
    this.scoreEl.textContent = '0';
    this.foodCountEl.textContent = '0';
    this.particles = [];
    
    this.generateObstacles();
    this.spawnFood();
  }

  generateObstacles() {
    this.obstacles = [];
    if (this.difficulty === 'hard') {
      // Create 4-5 obstacle blocks in hard mode
      const obstacleCount = 4;
      for (let i = 0; i < obstacleCount; i++) {
        let obs;
        do {
          obs = {
            x: Math.floor(Math.random() * (this.gridCount - 4)) + 2,
            y: Math.floor(Math.random() * (this.gridCount - 4)) + 2
          };
        } while (
          this.snake.some(s => s.x === obs.x && s.y === obs.y) ||
          this.obstacles.some(o => o.x === obs.x && o.y === obs.y)
        );
        this.obstacles.push(obs);
      }
    }
  }

  spawnFood() {
    let type = 'red';
    const rand = Math.random();
    if (rand > 0.85) {
      type = 'gold';
    } else if (rand > 0.70) {
      type = 'blue';
    }

    let position;
    do {
      position = {
        x: Math.floor(Math.random() * this.gridCount),
        y: Math.floor(Math.random() * this.gridCount)
      };
    } while (
      this.snake.some(s => s.x === position.x && s.y === position.y) ||
      this.obstacles.some(o => o.x === position.x && o.y === position.y)
    );

    this.food = {
      ...position,
      type,
      expireTime: type === 'gold' ? Date.now() + 8000 : null
    };
  }

  startGame() {
    this.resetGame();
    this.state = 'PLAYING';
    this.btnStart.textContent = '🔄 Chơi Lại';
    this.btnPause.textContent = '⏸ Tạm Dừng';
    this.overlayEl.classList.add('hidden');
    this.modalBackdrop.classList.remove('active');
    
    this.restartSpeed();
  }

  restartSpeed() {
    if (this.gameInterval) clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => this.update(), this.getSpeed());
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      clearInterval(this.gameInterval);
      this.overlayTextEl.textContent = 'ĐÃ TẠM DỪNG';
      this.overlaySubtextEl.textContent = 'Bấm Space hoặc nút Tiếp Tục để tiếp tục';
      this.overlayEl.classList.remove('hidden');
      this.btnPause.textContent = '▶ Tiếp Tục';
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.overlayEl.classList.add('hidden');
      this.btnPause.textContent = '⏸ Tạm Dừng';
      this.restartSpeed();
    }
  }

  update() {
    if (this.state !== 'PLAYING') return;

    this.dir = { ...this.nextDir };
    let head = {
      x: this.snake[0].x + this.dir.x,
      y: this.snake[0].y + this.dir.y
    };

    // Easy mode: Wrap around walls
    if (this.difficulty === 'easy') {
      if (head.x < 0) head.x = this.gridCount - 1;
      if (head.x >= this.gridCount) head.x = 0;
      if (head.y < 0) head.y = this.gridCount - 1;
      if (head.y >= this.gridCount) head.y = 0;
    } else {
      // Medium / Hard: Wall collision
      if (head.x < 0 || head.x >= this.gridCount || head.y < 0 || head.y >= this.gridCount) {
        this.gameOver();
        return;
      }
    }

    // Check collision with snake body
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }

    // Check collision with obstacles (Hard mode)
    if (this.obstacles.some(obs => obs.x === head.x && obs.y === head.y)) {
      this.gameOver();
      return;
    }

    // Move snake
    this.snake.unshift(head);

    // Check food expiry (Golden food)
    if (this.food && this.food.expireTime && Date.now() > this.food.expireTime) {
      this.spawnFood();
    }

    // Check eat food
    if (this.food && head.x === this.food.x && head.y === this.food.y) {
      this.eatFood();
    } else {
      this.snake.pop(); // Remove tail
    }

    // Update particles
    this.particles = this.particles.filter(p => p.alpha > 0);
    this.particles.forEach(p => p.update());

    this.draw();
  }

  eatFood() {
    let points = 10;
    let color = '#ff3366';

    if (this.food.type === 'gold') {
      points = 30;
      color = '#ffd700';
    } else if (this.food.type === 'blue') {
      points = 20;
      color = '#00f2fe';
    }

    this.score += points;
    this.foodEaten++;
    this.scoreEl.textContent = this.score;
    this.foodCountEl.textContent = this.foodEaten;

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreEl.textContent = this.highScore;
      localStorage.setItem('snake_high_score_v2', this.highScore);
    }

    this.sound.playEatSound(this.food.type);

    // Spawn explosion particles
    const px = (this.food.x + 0.5) * this.tileSize;
    const py = (this.food.y + 0.5) * this.tileSize;
    for (let i = 0; i < 16; i++) {
      this.particles.push(new Particle(px, py, color));
    }

    this.spawnFood();
  }

  gameOver() {
    this.state = 'GAMEOVER';
    clearInterval(this.gameInterval);
    this.sound.playGameOverSound();

    const isNewHigh = this.score > 0 && this.score >= this.highScore;
    this.finalScoreEl.textContent = this.score;
    this.newHighScoreBadge.style.display = isNewHigh ? 'inline-block' : 'none';

    setTimeout(() => {
      this.modalBackdrop.classList.add('active');
    }, 400);
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#05080e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Grid Lines (Neon vibe)
    this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.04)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= this.gridCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.tileSize, 0);
      this.ctx.lineTo(i * this.tileSize, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.tileSize);
      this.ctx.lineTo(this.canvas.width, i * this.tileSize);
      this.ctx.stroke();
    }

    // Draw Obstacles (Hard mode)
    this.obstacles.forEach(obs => {
      this.ctx.save();
      this.ctx.fillStyle = '#ff0055';
      this.ctx.shadowColor = '#ff0055';
      this.ctx.shadowBlur = 10;
      const x = obs.x * this.tileSize + 2;
      const y = obs.y * this.tileSize + 2;
      const size = this.tileSize - 4;
      this.ctx.fillRect(x, y, size, size);
      
      // X mark inside obstacle
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x + 4, y + 4);
      this.ctx.lineTo(x + size - 4, y + size - 4);
      this.ctx.moveTo(x + size - 4, y + 4);
      this.ctx.lineTo(x + 4, y + size - 4);
      this.ctx.stroke();
      this.ctx.restore();
    });

    // Draw Food
    if (this.food) {
      this.ctx.save();
      let foodColor = '#ff3366';
      if (this.food.type === 'gold') foodColor = '#ffd700';
      if (this.food.type === 'blue') foodColor = '#00f2fe';

      this.ctx.shadowColor = foodColor;
      this.ctx.shadowBlur = 12;
      this.ctx.fillStyle = foodColor;

      const centerX = (this.food.x + 0.5) * this.tileSize;
      const centerY = (this.food.y + 0.5) * this.tileSize;
      const radius = (this.tileSize / 2) - 3;

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Pulsing effect for special food
      if (this.food.type === 'gold' || this.food.type === 'blue') {
        const pulseRadius = radius + Math.sin(Date.now() / 150) * 2;
        this.ctx.strokeStyle = foodColor;
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, pulseRadius + 2, 0, Math.PI * 2);
        this.ctx.stroke();
      }
      this.ctx.restore();
    }

    // Draw Snake
    this.snake.forEach((segment, index) => {
      this.ctx.save();
      const x = segment.x * this.tileSize + 1;
      const y = segment.y * this.tileSize + 1;
      const size = this.tileSize - 2;

      if (index === 0) {
        // Head
        this.ctx.fillStyle = '#00ff88';
        this.ctx.shadowColor = '#00ff88';
        this.ctx.shadowBlur = 14;
        this.ctx.fillRect(x, y, size, size);

        // Eyes
        this.ctx.fillStyle = '#05080e';
        const eyeSize = 3;
        if (this.dir.x === 1) { // Right
          this.ctx.fillRect(x + size - 6, y + 4, eyeSize, eyeSize);
          this.ctx.fillRect(x + size - 6, y + size - 7, eyeSize, eyeSize);
        } else if (this.dir.x === -1) { // Left
          this.ctx.fillRect(x + 4, y + 4, eyeSize, eyeSize);
          this.ctx.fillRect(x + 4, y + size - 7, eyeSize, eyeSize);
        } else if (this.dir.y === -1) { // Up
          this.ctx.fillRect(x + 4, y + 4, eyeSize, eyeSize);
          this.ctx.fillRect(x + size - 7, y + 4, eyeSize, eyeSize);
        } else if (this.dir.y === 1) { // Down
          this.ctx.fillRect(x + 4, y + size - 6, eyeSize, eyeSize);
          this.ctx.fillRect(x + size - 7, y + size - 6, eyeSize, eyeSize);
        }
      } else {
        // Body (Gradient opacity down tail)
        const alpha = Math.max(0.3, 1 - (index / (this.snake.length + 5)));
        this.ctx.fillStyle = `rgba(0, 242, 254, ${alpha})`;
        this.ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
        this.ctx.shadowBlur = 6;
        this.ctx.fillRect(x, y, size, size);
      }
      this.ctx.restore();
    });

    // Draw Particles
    this.particles.forEach(p => p.draw(this.ctx));
  }
}

// Instantiate game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.game = new SnakeGame();
});
