function Game() {
    // 行数和列数
    this.row = 20;
    this.col = 20;
    // 初始化节点
    this.init();
    // 实例化Snake类
    this.snake = new Snake();
    // 实例化食物类
    this.food = new Food(this);
    // 执行定时器任务
    this.start();
    // 键盘的事件监听
    this.bindEvent();
};

Game.prototype.init = function () {
    this.dom = document.createElement("table");
    var tr, td;
    // 遍历行和列上树
    for (var i = 0; i < this.row; i++) {
        // 遍历行，创建节点上树
        tr = document.createElement("tr");
        // 追加节点上树
        this.dom.appendChild(tr);
        for (var j = 0; j < this.col; j++) {
            td = document.createElement("td");
            tr.appendChild(td);
        }
    }
    // 表格上树
    document.getElementById("app").appendChild(this.dom);
};

Game.prototype.clear = function () {
    // 遍历表格，擦除画布
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "white";
        }
    }
};

// 设置颜色的方法
Game.prototype.setColor = function (row, col, color) {
    // 给表格的第几行第几列设置什么颜色
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
};

// 渲染食物
Game.prototype.setHTML = function (row, col, html) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;

};

// 设置键盘的事件监听
Game.prototype.bindEvent = function () {
    // 声明self来备份this的原因：document对象的this指向window
    var self = this;
    // 键盘事件
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            // 按左键
            case 37:
                // 先进行判断，如果当前方向是向右移动，此时我们不能按左键
                if (self.snake.direction == "R") return;
                self.snake.changeDirection("L");
                break;
            // 按上键
            case 38:
                if (self.snake.direction == "D") return;
                self.snake.changeDirection("U");
                break;
            // 按右键
            case 39:
                if (self.snake.direction == "L") return;
                self.snake.changeDirection("R");
                break;
            // 按下键
            case 40:
                if (self.snake.direction == "U") return;
                game.snake.changeDirection("D");
                break;
        }
    }
};

Game.prototype.start = function () {
    this.timer = setInterval(function () {
        // 定时器里面的核心就是游戏的渲染本质，清屏-更新-渲染
        // 清除屏幕
        game.clear();
        // 蛇的更新（运动）
        game.snake.update();
        // 蛇的渲染
        game.snake.render();
        // 食物的渲染
        game.food.render();
    }, 500);
}