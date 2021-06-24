function Snake() {
    // 初始化蛇的身体
    this.body = [
        { "row": 3, "col": 5 },
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 }
    ];
    // 信号量：蛇的运动方向
    this.direction = "R";
    // 即将改变的方向，目的是防止原地掉头的情况
    this.willDirection = "R";
};

// 蛇的运动
Snake.prototype.update = function () {
    // 让当前的direction接受一下willDirection
    this.direction = this.willDirection;
    // 蛇的不同方向运动
    switch (this.direction) {
        // 向左移动
        case "L":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
            break;
        // 向上移动
        case "U":
            this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
            break;
        // 向右移动
        case "R":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
            break;
        // 向下移动
        case "D":
            this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
            break;
    }
    this.body.pop();
};

// 蛇的方向改变，防止在一次渲染之前出现调头的情况
Snake.prototype.changeDirection = function (d) {
    this.willDirection = d;
}

Snake.prototype.render = function () {
    // 蛇头的渲染
    game.setColor(this.body[0].row, this.body[0].col, "pink");
    // 蛇身的渲染
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, "cyan");
    }
};

