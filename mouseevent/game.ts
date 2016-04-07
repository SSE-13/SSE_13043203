module game {


}

var humanContainer = new render.DisplayObjectContainer();
humanContainer.x = 0;
humanContainer.y = 0;
humanContainer.scaleX = 0.5;
humanContainer.scaleY = 0.5;

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
leftleg.x =10;
leftleg.y = 400;
// leftleg.scaleX = 1.5;

var rightleg = new render.Bitmap();
rightleg.x = 220;
rightleg.y = 400;
// rightleg.scaleX = 1.5;

var shenzi = new render.Bitmap();
shenzi .x = 180;
shenzi .y = 270;

head.source = "head.jpg";
lefthand.source = "left hand.jpg";
righthand.source = "right hand.jpg";
leftleg.source = "left leg.jpg";
rightleg.source = "right leg.jpg";
shenzi.source = "shenzi.jpg";

humanContainer.addChild(head)
humanContainer.addChild(lefthand)
humanContainer.addChild(righthand)
humanContainer.addChild(leftleg)
humanContainer.addChild(rightleg)
humanContainer.addChild(shenzi)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.jpg","left hand.jpg","right hand.jpg","left leg.jpg","right leg.jpg","shenzi.jpg"]);

var furotation ;
var a = Math.PI *1/3;
class HumanBody extends Body {



    onTicker(duringTime: number) {
         this.x +=  this.vx*duringTime;
         this.y +=  this.vy*duringTime;
         this.rotation += a*duringTime;
        // furotation += -Math.PI*duringTime;
        
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 1;
body.vy = 1;

ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var clickhead = 0;
var clickleftleg = 0;
var clickrightleg = 0;

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
  //  alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if(localPoint.x > 0 && localPoint.x <= head.x && localPoint.y > 0 && localPoint.y <= head.y ){
        clickhead = 1;

  
    return true;
}
}

var headOnClick = () => {
    if(clickhead == 1 ){
        if(clickleftleg==1 && a==0){
            a=Math.PI/3;
            // if(a<0){
            //     a= -Math.PI/3;
            // }
        }
        a *= -1;
        body.vx *= -1;
        body.vy *= -1;        
      //  alert("clickhead");
      console.log(a);
      
    }
     console.log("clickhead" +clickhead);
}

var leftlegHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
  // alert (`点击位置为${localPoint.x},${localPoint.y}`);
  
    if(localPoint.x > 0 && localPoint.x <= leftleg.x && localPoint.y > 0 && localPoint.y <= leftleg.y ){
        clickleftleg = 1;


    return true;
}
}

var leftlegOnClick = () => {
    if(clickleftleg == 1 ){
        a = 0;
        body.vx = 0;
        body.vy = 0;        
        clickhead = 0;
       //  alert("clickleftleg");
    }
        console.log("clickleftleg"+ clickleftleg);
}

var rightlegHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
  //  alert (`点击位置为${localPoint.x},${localPoint.y}`);
  
    if(localPoint.x > leftleg.x+10 && localPoint.x <= rightleg.x && localPoint.y > leftleg.y+10 && localPoint.y <=rightleg.x ){
        clickrightleg = 1;

    console.log("clickrightleg" +clickrightleg);
    return true;
}
}

var rightlegOnClick = () => {
    if(clickrightleg == 1 ){
        a = 0;
        body.vx = 0;
        body.vy = 0;        
        clickrightleg = 0;
    }
     console.log("clickleftleg"+ clickleftleg);
}


eventCore.register(head,headHitTest,headOnClick);
eventCore.register(leftleg,leftlegHitTest,leftlegOnClick);
eventCore.register(rightleg,rightlegHitTest,rightlegOnClick);









