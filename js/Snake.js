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

// 蛇的运动（头增尾删）
Snake.prototype.update = function () {
    // 让当前的direction接收一下willDirection
    // 在update前direction还是原来的值，接收willDirection的值才进行改变
    // eg.direction的值是R，在重新赋值之前都是R，因此点击下键后点击左键，左键无效，下键有效，willDirection得到的值是D，赋值给direction
    this.direction = this.willDirection;
    // 蛇的不同方向运动
    switch (this.direction) {
        // 向左移动
        case "L":
            // 头部增加
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
    };
    // 死亡的判断1：超出表格边缘
    if (this.body[0].row < 0 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].col > game.col - 1) {
        alert("游戏结束！您当的得分为" + game.score + "分");
        // 删除原因：游戏结束已经结束，当前头增不合法
        this.body.shift();
        clearInterval(game.timer);
    }
    // 死亡的判断2：自己撞到自己（头部与身体某一部分的row和col完全重合）
    for (var i = 1; i < this.body.length; i++) {
        if (this.body[0].row == this.body[i].row && this.body[0].col == this.body[i].col) {
            alert("游戏结束！您当的得分为" + game.score + "分");
            this.body.shift();
            clearInterval(game.timer);
        }
    }
    // 蛇吃食物
    // 蛇吃到食物的时候不进行尾部删除，蛇没吃到食物进行尾部删除
    if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
        // 此时只有头部增加，尾部没有删除
        // 创建新的食物
        game.food = new Food(game);
        // 加分
        game.score++;
        // 帧编号归0，防止蛇蹿一下
        game.f = 0;
    } else {
        // 尾部删除
        this.body.pop();
    }
};


// 蛇的方向改变
// 防止在下一次渲染之前出现调头的情况
Snake.prototype.changeDirection = function (d) {
    this.willDirection = d;
}

Snake.prototype.render = function () {
    // 蛇头的渲染
    game.setColor(this.body[0].row, this.body[0].col, "-webkit-radial-gradient(center center, pink, purple)");
    // 蛇身的渲染
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, "-webkit-radial-gradient(center center, skyblue, blue)");
    }
};

