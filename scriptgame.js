/**************************************
 * Canvas & Context
 **************************************/
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

/**************************************
 * Level Data
 * 
 * We'll define 5 levels:
 * 1) Finland
 * 2) Joensuu
 * 3) Karelia University (Floor 1)
 * 4) Karelia University (Floor 2)
 * 5) Karelia University (Floor 3)
 * 
 * Each has:
 *  - name: For display
 *  - info: Shown after you collect all food
 *  - mazeData: 2D array, 1=wall, 0=open
 **************************************/
const levels = [
  {
    name: "Finland",
    info: "After landing, you can take a train (VR), Finnair City Bus, or taxi from Helsinki-Vantaa Airport to the city center. Public transport is efficient and safe!",
    mazeData: [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,0,1,1,0,0,0,1],
      [1,0,1,0,0,0,0,0,1,0,0,1],
      [1,0,1,0,1,1,1,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },
  {
    name: "Finland",
    info: "Your student housing or rental apartment might not provide bed linens, towels, or kitchen essentials—visit IKEA or Tokmanni to buy them.",
    mazeData: [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,0,1],
      [1,0,0,0,1,0,1,0,1,0,1,1],
      [1,1,1,0,1,1,1,0,1,0,0,1],
      [1,0,0,0,0,0,0,0,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,0,0,1],
      [1,0,1,0,0,0,1,0,1,0,1,1],
      [1,0,0,0,1,0,0,0,1,0,0,1],
      [1,1,1,0,1,1,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },
  {
    name: "Finland",
    info: "If staying for more than 1 year, register your residence at DVV (Digital and Population Data Services Agency). This is needed for a personal identity code ('henkilötunnus').",
    mazeData: [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1,0,0,0,1],
      [1,0,1,1,1,1,0,1,0,1,0,1],
      [1,0,1,0,0,1,0,1,0,1,0,1],
      [1,0,1,0,1,1,0,0,0,1,0,1],
      [1,0,0,0,0,0,0,0,1,0,0,1],
      [1,1,1,1,1,0,1,0,1,0,1,1],
      [1,0,1,0,0,0,1,0,1,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },
  {
    name: "Finland",
    info: "Banks like Nordea, OP, and Danske Bank require a residence permit, proof of address, and student certificate to open an account. Mobile banking is common in Finland.",
    mazeData: [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,1,1,0,0,0,0,1],
      [1,0,1,0,1,0,1,0,1,1,0,1],
      [1,0,1,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,1,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,0,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,0,1],
      [1,0,1,1,1,1,1,1,0,0,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },
  {
    name: "Finland",
    info: "Finnish weather changes fast! Winters are cold (-20°C or lower), so wear layers, waterproof shoes, gloves, and a good winter jacket. Summers can be warm, so pack light clothing too."

,
    mazeData: [
      [1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,1],
      [1,1,1,0,1,0,1,1,1,1,0,1],
      [1,0,0,0,1,0,0,0,1,0,0,1],
      [1,0,1,0,1,1,1,0,1,1,0,1],
      [1,0,1,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,0,1,1],
      [1,0,0,0,0,0,1,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ]
  },
];

/**************************************
 * Global Variables
 **************************************/
let currentLevelIndex = 0; // 0-based index into 'levels'
let score = 0;
let gamePaused = false;
let frameCount = 0; // used for BFS updates

// We'll parse the current level's maze into 'obstacles'
let obstacles = [];
let bears = [];
let foodItems = [];

/**************************************
 * Wolf (Player)
 **************************************/
const player = {
  x: 0,
  y: 0,
  size: 24,
  direction: null,
  speed: 2
};

/**************************************
 * Bear & Food Settings
 **************************************/
const bearSize = 24;
const foodSize = 24;
const foodPerLevel = 5;    // Number of food items each level
const BFS_UPDATE_FRAMES = 30; // BFS path recalculation interval

/**************************************
 * Initialize the Game
 **************************************/
function init() {
  loadLevel(0);
  gameLoop();
}

/**************************************
 * Load a Specific Level
 **************************************/
function loadLevel(levelIdx) {
  currentLevelIndex = levelIdx;
  frameCount = 0;
  gamePaused = false;
  score = 0;

  // Set up UI
  document.getElementById("level").innerText =
    `Level: ${levelIdx + 1} - ${levels[levelIdx].name}`;
  document.getElementById("info").innerText =
    "Gather all the food to move on to the next level.";
  document.getElementById("nextLevelBtn").classList.add("hidden");

  // Clear arrays
  obstacles = [];
  bears = [];
  foodItems = [];

  // Parse the new maze
  parseMazeData(levels[levelIdx].mazeData);

  // Place player at (1,1) cell in grid coordinates
  player.x = 1 * 40; // Because each cell is 40×40
  player.y = 1 * 40;

  placeBears();
  placeFood();
}

/**************************************
 * Parse Maze Data -> Obstacles
 **************************************/
function parseMazeData(mazeData) {
  for (let row = 0; row < mazeData.length; row++) {
    for (let col = 0; col < mazeData[row].length; col++) {
      if (mazeData[row][col] === 1) {
        obstacles.push({
          x: col * 40,
          y: row * 40,
          size: 40
        });
      }
    }
  }
}

/**************************************
 * Random Open Cell
 **************************************/
function getRandomOpenCell(mazeData) {
  let row, col;
  do {
    row = Math.floor(Math.random() * mazeData.length);
    col = Math.floor(Math.random() * mazeData[0].length);
  } while (
    mazeData[row][col] === 1 ||
    (row === 1 && col === 1) // avoid player's start
  );
  return { row, col };
}

/**************************************
 * Place Bears
 **************************************/
function placeBears() {
  // 2 bears each level
  for (let i = 0; i < 2; i++) {
    const { row, col } = getRandomOpenCell(levels[currentLevelIndex].mazeData);
    bears.push({
      x: col * 40,
      y: row * 40,
      size: bearSize,
      path: [],
      pathIndex: 0,
      speed: 1.7 // Slower than wolf=2
    });
  }
}

/**************************************
 * Place Food
 **************************************/
function placeFood() {
  for (let i = 0; i < foodPerLevel; i++) {
    const { row, col } = getRandomOpenCell(levels[currentLevelIndex].mazeData);
    foodItems.push({
      x: col * 40,
      y: row * 40,
      size: foodSize
    });
  }
}

/**************************************
 * BFS Pathfinding
 **************************************/
function findPath(mazeData, startRow, startCol, goalRow, goalCol) {
  if (startRow === goalRow && startCol === goalCol) {
    return [{ row: startRow, col: startCol }];
  }

  const rows = mazeData.length;
  const cols = mazeData[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const from = Array.from({ length: rows }, () => Array(cols).fill(null));

  const queue = [];
  queue.push({ row: startRow, col: startCol });
  visited[startRow][startCol] = true;

  const directions = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 }
  ];

  let foundGoal = false;

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.row === goalRow && current.col === goalCol) {
      foundGoal = true;
      break;
    }

    for (let d of directions) {
      const nr = current.row + d.r;
      const nc = current.col + d.c;
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !visited[nr][nc] &&
        mazeData[nr][nc] === 0
      ) {
        visited[nr][nc] = true;
        from[nr][nc] = { row: current.row, col: current.col };
        queue.push({ row: nr, col: nc });
      }
    }
  }

  if (!foundGoal) return null;

  // Reconstruct path
  let path = [];
  let cur = { row: goalRow, col: goalCol };
  while (cur) {
    path.push(cur);
    cur = from[cur.row][cur.col];
  }
  path.reverse();
  return path;
}

/**************************************
 * Bear Movement
 * Recalc BFS every BFS_UPDATE_FRAMES
 **************************************/
function moveBears() {
  const mazeData = levels[currentLevelIndex].mazeData;
  bears.forEach((bear) => {
    // If time to recalc or path is done
    const atEnd = (bear.pathIndex >= bear.path.length);
    if (frameCount % BFS_UPDATE_FRAMES === 0 || atEnd) {
      updateBearPath(bear, mazeData);
    }
    // Follow path
    if (bear.path && bear.pathIndex < bear.path.length) {
      moveBearAlongPath(bear);
    }
  });
}

/**************************************
 * Update a Bear's BFS Path
 **************************************/
function updateBearPath(bear, mazeData) {
  // Convert positions to grid coords
  const bearRow = Math.floor((bear.y + bear.size / 2) / 40);
  const bearCol = Math.floor((bear.x + bear.size / 2) / 40);
  const playerRow = Math.floor((player.y + player.size / 2) / 40);
  const playerCol = Math.floor((player.x + player.size / 2) / 40);

  const path = findPath(mazeData, bearRow, bearCol, playerRow, playerCol);
  if (path && path.length > 1) {
    bear.path = path.slice(1); // skip the current cell
    bear.pathIndex = 0;
  } else {
    bear.path = [];
    bear.pathIndex = 0;
  }
}

/**************************************
 * Move Bear Along Its Path
 **************************************/
function moveBearAlongPath(bear) {
  const nextCell = bear.path[bear.pathIndex];
  const targetX = nextCell.col * 40 + (40 - bear.size) / 2;
  const targetY = nextCell.row * 40 + (40 - bear.size) / 2;

  let dx = targetX - bear.x;
  let dy = targetY - bear.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 0.1) {
    // Reached next cell center
    bear.pathIndex++;
    return;
  }

  dx /= dist;
  dy /= dist;

  const newX = bear.x + dx * bear.speed;
  const newY = bear.y + dy * bear.speed;

  // Check collisions
  if (
    !checkObstacleCollision(newX, newY, bear.size, obstacles) &&
    newX >= 0 &&
    newX + bear.size <= canvas.width &&
    newY >= 0 &&
    newY + bear.size <= canvas.height
  ) {
    bear.x = newX;
    bear.y = newY;
  } else {
    // If blocked, skip
    bear.pathIndex++;
  }
}

/**************************************
 * Obstacle Collision
 **************************************/
function checkObstacleCollision(x, y, size, obstacleArray) {
  for (let obs of obstacleArray) {
    if (
      x < obs.x + obs.size &&
      x + size > obs.x &&
      y < obs.y + obs.size &&
      y + size > obs.y
    ) {
      return true; // Colliding with obstacle
    }
  }
  return false;
}

/**************************************
 * Place & Move the Wolf
 **************************************/
function updatePlayerPosition() {
  const oldX = player.x;
  const oldY = player.y;

  if (player.direction === "up")    player.y -= player.speed;
  if (player.direction === "down")  player.y += player.speed;
  if (player.direction === "left")  player.x -= player.speed;
  if (player.direction === "right") player.x += player.speed;

  // Boundaries
  if (player.x < 0) player.x = 0;
  if (player.x + player.size > canvas.width) {
    player.x = canvas.width - player.size;
  }
  if (player.y < 0) player.y = 0;
  if (player.y + player.size > canvas.height) {
    player.y = canvas.height - player.size;
  }

  // Check wall collisions
  if (checkObstacleCollision(player.x, player.y, player.size, obstacles)) {
    player.x = oldX;
    player.y = oldY;
  }
}

/**************************************
 * Collision Checks (Food & Bears)
 **************************************/
function checkCollisions() {
  // 1) Bears
  bears.forEach((bear) => {
    if (
      player.x < bear.x + bear.size &&
      player.x + player.size > bear.x &&
      player.y < bear.y + bear.size &&
      player.y + player.size > bear.y
    ) {
      document.getElementById("info").innerText =
        "You've been caught by a bear!";
      loadLevel(currentLevelIndex); // restart this level
    }
  });

  // 2) Food
  for (let i = 0; i < foodItems.length; i++) {
    let food = foodItems[i];
    if (
      player.x < food.x + food.size &&
      player.x + player.size > food.x &&
      player.y < food.y + food.size &&
      player.y + player.size > food.y
    ) {
      foodItems.splice(i, 1);
      score++;
      i--;
    }
  }

  // 3) All food collected => show level info & next button
  if (foodItems.length === 0) {
    const levelData = levels[currentLevelIndex];
    document.getElementById("info").innerText =
      `Level complete! ${levelData.info} Click "Next Level" to continue.`;
    document.getElementById("nextLevelBtn").classList.remove("hidden");
    gamePaused = true;
  }
}

/**************************************
 * Drawing
 **************************************/
function drawEmoji(emoji, x, y, size) {
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = `${size}px Arial`;
  ctx.fillText(emoji, x, y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw obstacles (ice blocks)
  obstacles.forEach((obs) => {
    drawEmoji("🧊", obs.x, obs.y, obs.size);
  });

  // Wolf (player)
  drawEmoji("🐺", player.x, player.y, player.size);

  // Bears
  bears.forEach((bear) => {
    drawEmoji("🐻", bear.x, bear.y, bear.size);
  });

  // Food
  foodItems.forEach((food) => {
    drawEmoji("🍗", food.x, food.y, food.size);
  });

  // Update UI
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("level").innerText =
    `Level: ${currentLevelIndex + 1} - ${levels[currentLevelIndex].name}`;
}

/**************************************
 * Keyboard & Next Level
 **************************************/
document.addEventListener("keydown", (event) => {
  if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "ArrowUp")    player.direction = "up";
  if (event.key === "ArrowDown")  player.direction = "down";
  if (event.key === "ArrowLeft")  player.direction = "left";
  if (event.key === "ArrowRight") player.direction = "right";
});

document.getElementById("nextLevelBtn").addEventListener("click", () => {
  // Move to the next level
  if (currentLevelIndex < levels.length - 1) {
    loadLevel(currentLevelIndex + 1);
  } else {
    // All levels done
    document.getElementById("info").innerText =
      "Congratulations! You have finished all levels.";
  }
});

/**************************************
 * Main Game Loop
 **************************************/
function gameLoop() {
  if (!gamePaused) {
    frameCount++;
    updatePlayerPosition();
    moveBears();
    checkCollisions();
  }
  draw();
  requestAnimationFrame(gameLoop);
}

// Start
init();
