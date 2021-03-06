// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.random() * 170 + 50;
    this.speed = Math.ceil(Math.random() * 300 +100);;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x <= 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -50;
        this.y = Math.random() * 170 + 50;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 此为游戏必须的函数，用来检测玩家与敌人的碰撞
Enemy.prototype.checkCollision = function (player) {
    if (Math.abs(this.x - player.x) < 65 && Math.abs(this.y - player.y) < 45) {
        player.setOff();
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
const Player = function() {
    this.sprite = 'images/char-boy.png';
    };

// 此为游戏必须的函数，用来初始化玩家位置
Player.prototype.setOff = function() {
    this.x = 202;
    this.y = 375;
};

// 此为游戏必须的函数，用来在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//// 此为游戏必须的函数，用来判定及处理玩家胜利这一情形
Player.prototype.success = function() {
    if (this.y < 0) {
        //游戏引擎暂停运作，游戏暂停
        Engine.gamePause = true;
        //屏幕上出现胜利提示
        ctx.font = "70px Georgia, serif";
        ctx.fillText('Success',140,303)
        //延时后游戏重置
        setTimeout(function() {
            Engine.reset();
        },1500)
    }
};

// 此为游戏必须的函数，用来处理键盘上的输入，更新玩家位置数据，实现移动
Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x >= 30) {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x <= 375) {
                this.x += 100;
            }
            break;
        case 'up':
            if (this.y >= 30) {
                this.y -= 80;
            }
            break;
        case 'down':
            if (this.y <= 350) {
                this.y += 80;
            }
    }
    player.success();
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let player = new Player();
let allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
