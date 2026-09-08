const canvas = document.getElementById('navCanvas');
const ctx = canvas.getContext('2d');
const start = { x: 60, y: 60 };
const goal = { x: 740, y: 400 };
const obstacles = [
  { x: 180, y: 0, w: 60, h: 260 },
  { x: 340, y: 200, w: 60, h: 260 },
  { x: 520, y: 80, w: 60, h: 260 }
];

let tree = [start];
let path = [];

function planRRT() {
  tree = [start];
  path = [];
  for (let i = 0; i < 300; i++) {
    const rnd = Math.random() < 0.15 ? goal : { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
    let nearest = tree[0];
    let minDist = 99999;
    tree.forEach(n => {
      const d = Math.hypot(n.x - rnd.x, n.y - rnd.y);
      if (d < minDist) { minDist = d; nearest = n; }
    });

    const angle = Math.atan2(rnd.y - nearest.y, rnd.x - nearest.x);
    const newNode = { x: nearest.x + Math.cos(angle) * 35, y: nearest.y + Math.sin(angle) * 35, parent: nearest };

    // Collision check
    let hit = false;
    obstacles.forEach(o => {
      if (newNode.x > o.x && newNode.x < o.x + o.w && newNode.y > o.y && newNode.y < o.y + o.h) hit = true;
    });

    if (!hit) {
      tree.push(newNode);
      if (Math.hypot(newNode.x - goal.x, newNode.y - goal.y) < 40) {
        // Trace back path
        let curr = newNode;
        while (curr) { path.push(curr); curr = curr.parent; }
        break;
      }
    }
  }
  render();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Obstacles
  ctx.fillStyle = '#1e3a8a';
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));

  // Tree branches
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
  ctx.lineWidth = 1;
  tree.forEach(n => {
    if (n.parent) {
      ctx.beginPath(); ctx.moveTo(n.parent.x, n.parent.y); ctx.lineTo(n.x, n.y); ctx.stroke();
    }
  });

  // Smooth Optimal Path
  if (path.length > 0) {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    path.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  // Start & Goal Markers
  ctx.fillStyle = '#10b981';
  ctx.beginPath(); ctx.arc(start.x, start.y, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(goal.x, goal.y, 10, 0, Math.PI * 2); ctx.fill();
}

document.getElementById('replanBtn').addEventListener('click', planRRT);
planRRT();
