module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    const NUM_ROWS = 12;

    const NUM_COLS = 12;

    export class WorldMap extends DisplayObject {


        public grid: astar.Grid;
        constructor() {
            super();
            var grid = new astar.Grid(NUM_COLS, NUM_ROWS);
            this.grid = grid;
            grid.setWalkable(5, 0, false);
            grid.setWalkable(5, 1, false);
            grid.setWalkable(5, 2, false);
            grid.setWalkable(5, 3, false);
            grid.setWalkable(5, 4, false);
            grid.setWalkable(5, 5, false);
         
          
        }

        render(context: CanvasRenderingContext2D) {
         //   context.fillStyle = '#0000FF';
            context.strokeStyle = '#FF0000';
            context.beginPath();
           
            for (var i = 0; i < NUM_COLS; i++) {
                for (var j = 0; j < NUM_ROWS; j++) {
                    if(this.grid.getNode(i,j).walkable){                         
                        context.fillStyle = '#0000FF'                   
                    }
                   else{                       
                       context.fillStyle = '#000000'             
                     }
                    context.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT); 
                    context.fillRect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);              
                    context.stroke();
                }
            }
            context.closePath();

        }

    }

    export class BoyShape extends DisplayObject {
        render(context: CanvasRenderingContext2D) {
            context.beginPath()
            context.fillStyle = '#00FFFF';
            context.arc(GRID_PIXEL_WIDTH / 2, GRID_PIXEL_HEIGHT / 2, Math.min(GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT) / 2 - 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
        }
    }

    export class BoyBody extends Body {
       public dx = new Array();//x方向每次移动距离
       public dy  = new Array();//y方向每次移动距离
    //    public dx :number;
    //    public dy : number;
       public X = new Array();//x的坐标
       public Y = new Array();//y的坐标
       public h = 1;
       public movex =new Array();
       public movey = new Array();
       
       
        public run(grid) {
            
            grid.setStartNode(0, 0);
            grid.setEndNode(10, 8);
            var findpath = new astar.AStar();
            findpath.setHeurisitic(findpath.diagonal);
            var result = findpath.findPath(grid);
            var path = findpath._path;
            console.log(path);
            console.log(grid.toString());
            for (var i=0; i < path.length ; i++){
                this.X[i] =path[i].x;
                this.Y[i] = path[i].y;          
            }
            
            for(var j =1;j < this.X.length;j++){
                        this.dx[j]= this.X[j]-this.X[j-1];
                        this.dy[j]= this.Y[j]-this.Y[j-1];  
              }
                console.log(this.dy);
                console.log(this.X);
                console.log(this.Y);
             
        }

        public onTicker(duringTime) {
            // this.vx = 2;
            // this.vx = 2;
            if(this.x <NUM_ROWS * GRID_PIXEL_WIDTH &&this.y < NUM_COLS * GRID_PIXEL_HEIGHT){
                if(this.h < this.dx.length-1){
                    this.x += this.dx[this.h] *GRID_PIXEL_WIDTH;
                    this.y += this.dy[this.h ]* GRID_PIXEL_HEIGHT;
                    this.h++;
                }
            }
            
            
            
            
            
            
            // this.x +=duringTime*this.vx*NUM_ROWS;
            // this.y +=duringTime*this.vy*NUM_COLS;
            //     }
            //     }
              
               
             // console.log(this.vx);
              
            
               
        //     
               
            //    if (this.x < NUM_ROWS*GRID_PIXEL_WIDTH && this.y < NUM_COLS*GRID_PIXEL_HEIGHT){
            //        for (var m =1; m<this.dx.length;m++){
            //            this.x += this.dx[m]       ;
            //            this.y += this.dy[m];
            //        }
            //    }
         
    
        //         for(var m=1;m < this.dx.length;m++){
        //      // this.dx[m]= duringTime*this.vx;
        //       this.x[m] += this.dx[m]*GRID_PIXEL_WIDTH;
        //       for (var n =1; n <this.dy.length;n++){
        //         //  this.dy[n]=this.vy*duringTime;
        //           this.y[n]+= this.dy[n]*GRID_PIXEL_HEIGHT;
        //       }
        //   }
            
          
        //     var displayObject = this.displayObject;
        // displayObject.x = this.x;
        // displayObject.y = this.y;
    }
}
}




var boyShape = new game.BoyShape();
var world = new game.WorldMap();
var body = new game.BoyBody(boyShape);
body.run(world.grid);
body.vx = 1;
body.vy = 1;


var renderCore = new RenderCore();
renderCore.start([world, boyShape]);

var ticker = new Ticker();
ticker.start([body]);