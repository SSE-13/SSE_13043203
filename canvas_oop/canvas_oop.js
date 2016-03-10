var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 300;
        this.height = 100;
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc() {
        _super.apply(this, arguments);
    }
    Arc.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    };
    return Arc;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.color = '#E10000';
    }
    TextField.prototype.render = function (context) {
        context.font = this.textsize;
        context.fillStyle = this.color;
        context.fillText(this.filltext, this.x, this.y);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.x = 5;
rect.y = 100;
rect.width = 80;
rect.height = 30;
rect.color = '#A66829';
rect.rotation = -Math.PI / 20;
var arc1 = new Arc();
arc1.x = 40;
arc1.y = 100;
arc1.r = 50;
arc1.color = '#006200';
var arc2 = new Arc();
arc2.x = 105;
arc2.y = 100;
arc2.r = 65;
arc2.color = '#0000C3';
var arc3 = new Arc();
arc3.x = 170;
arc3.y = 125;
arc3.r = 40;
arc3.color = '#B90000';
var text = new TextField();
text.filltext = '水果';
text.x = 30;
text.y = 40;
text.textsize = "70px Arial";
var text0 = new TextField();
text0.filltext = '忍者';
text0.x = 110;
text0.y = 40;
text0.textsize = "50px Arial";
text0.color = '#E8E8E8';
var text2 = new TextField();
text2.filltext = '切水果开始';
text2.x = 5;
text2.y = 60;
text2.textsize = "10px Arial";
text2.rotation = -Math.PI / 20;
text2.color = '#FF8A4A';
var text3 = new TextField();
text3.filltext = '道场';
text3.x = 30;
text3.y = 100;
text3.textsize = "20px Arial";
text3.color = '#00FF55';
var text4 = new TextField();
text4.filltext = '新的游戏';
text4.x = 85;
text4.y = 100;
text4.textsize = "20px Arial";
text4.color = '#7BA6B4';
var text5 = new TextField();
text5.filltext = '退出游戏';
text5.x = 150;
text5.y = 130;
text5.textsize = "20px Arial";
text5.color = '#F57A7A';
var bitmap = new Bitmap();
bitmap.source = 'bg.jpg';
//渲染队列
var renderQueue = [bitmap, rect, arc1, arc2, arc3, text, text0, text2, text3, text4, text5];
//资源加载列表
var imageList = ['bg.jpg'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
