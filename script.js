const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const scale = 20;
    const rows = 20;
    const columns = 20;

    canvas.width = scale * columns;
    canvas.height = scale * rows;

    let snake = [
      { x: 9 * scale, y: 10 * scale },
      { x: 8 * scale, y: 10 * scale },
      { x: 7 * scale, y: 10 * scale }
    ];

    let food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale
    };

    let dx = scale;
    let dy = 0;

    function clearCanvas() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnakePart(snakePart) {
      ctx.fillStyle = 'lightgreen';
      ctx.strokeStyle = 'darkgreen';
      ctx.fillRect(snakePart.x, snakePart.y, scale, scale);
      ctx.strokeRect(snakePart.x, snakePart.y, scale, scale);
    }

    function drawSnake() {
      snake.forEach(drawSnakePart);
    }

    function advanceSnake() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        food = {
          x: Math.floor(Math.random() * columns) * scale,
          y: Math.floor(Math.random() * rows) * scale
        };
      } else {
        snake.pop();
      }
    }

    function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

      const keyPressed = event.keyCode;
      const goingUp = dy === -scale;
      const goingDown = dy === scale;
      const goingRight = dx === scale;
      const goingLeft = dx === -scale;

      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -scale;
        dy = 0;
      }

      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -scale;
      }

      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = scale;
        dy = 0;
      }

      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = scale;
      }
    }

    function drawFood() {
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'darkred';
      ctx.fillRect(food.x, food.y, scale, scale);
      ctx.strokeRect(food.x, food.y, scale, scale);
    }

    function main() {
      setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();

        main();
      }, 100);
    }

    window.addEventListener('keydown', changeDirection);
    main();
