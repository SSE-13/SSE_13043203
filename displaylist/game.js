var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
humanContainer.x = 0;
humanContainer.y = 0;
humanContainer.scaleX = 0.25;
humanContainer.scaleY = 0.25;
var head = new render.Bitmap();
head.x = 150;
head.y = 150;
var lefthand = new render.Bitmap();
lefthand.x = 50;
lefthand.y = 270;
var righthand = new render.Bitmap();
righthand.x = 250;
righthand.y = 270;
var leftleg = new render.Bitmap();
leftleg.x = 50;
leftleg.y = 400;
var rightleg = new render.Bitmap();
rightleg.x = 220;
rightleg.y = 400;
var shenzi = new render.Bitmap();
shenzi.x = 180;
shenzi.y = 270;
head.source = "head.jpg";
lefthand.source = "left hand.jpg";
righthand.source = "right hand.jpg";
leftleg.source = "left leg.jpg";
rightleg.source = "right leg.jpg";
shenzi.source = "shenzi.jpg";
humanContainer.addChild(head);
humanContainer.addChild(lefthand);
humanContainer.addChild(righthand);
humanContainer.addChild(leftleg);
humanContainer.addChild(rightleg);
humanContainer.addChild(shenzi);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.jpg", "left hand.jpg", "right hand.jpg", "left leg.jpg", "right leg.jpg", "shenzi.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx * duringTime;
        this.y += this.vy * duringTime;
        this.rotation += Math.PI * duringTime;
        this.vx = 5;
        this.vy = 5;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map