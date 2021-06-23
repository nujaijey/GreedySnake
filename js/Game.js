function Game() {
    // 行数和列数
    this.row = 20;
    this.col = 20;
    // 初始化节点
    this.init();
    // 实例化Snake类
    this.snake = new Snake();
}

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
}

Game.prototype.clear = function () {
    // 遍历表格，擦除画布
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "white";
        }
    }
}

// 设置颜色的方法
Game.prototype.setColor = function (row, col, color) {
    // 给表格的第几行第几列设置什么颜色
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
}

var timer = setInterval(function () {
    // 定时器里面的核心就是游戏的渲染本质，清屏-更新-渲染
    // 清除屏幕
    game.clear();
    // 蛇的更新（运动）
    game.snake.update();
    // 蛇的渲染
    game.snake.render();
}, 1000)