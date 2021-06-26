function Food(gameSnake) {
    // 声明self来备份this的原因：IIEF中的this指向window
    var self = this;

    // 食物的坐标（不可在蛇身上）
    // do-while语句作用：先创建一个row和col再判断是否在蛇身上
    do {
        this.row = parseInt(Math.random() * gameSnake.row);
        this.col = parseInt(Math.random() * gameSnake.col);
    } while ((function () {
        // 这是一个IIFE函数：在声明表达式形式函数（小括号可将关键字形式函数变为表达式形式函数）的同时立刻马上执行一次
        // 遍历蛇的row和col和食物的坐标比对（食物的坐标在蛇身上任意位置返回true，重新生成坐标）
        for (var i = 0; i < gameSnake.snake.body.length; i++) {
            if (self.row == gameSnake.snake.body[i].row && self.col == gameSnake.snake.body[i].col) {
                return true;
            }
        }
        return false;
    })());
}

Food.prototype.render = function () {
    game.setHTML(this.row, this.col, "❤");

}