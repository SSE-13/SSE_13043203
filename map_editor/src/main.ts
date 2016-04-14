
import * as fs from 'fs';



function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function writeFiled() {
    var map_path = __dirname + "/map.json"
    var obj = JSON.stringify({map:mapData});
    var save = fs.writeFileSync(map_path, obj,"utf-8");
}

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);



            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;

}

var buttoncontainer = new render.DisplayObjectContainer();
var button = new render.Rect();
buttoncontainer.addChild(button);
button.x=50;
button.y=220;
button.width =80;
button.height =30;
button.color ='#FF00F0';
console.log("ddd");

var text = new render.TextField();
buttoncontainer.addChild(text);
text.text ='save';
text.x=70;
text.y=220;

function onTileClick(tile: editor.Tile) {
  //  console.log(tile);
    var walkable = mapData[tile.ownedRow][tile.ownedCol];
    if(walkable == 1){
        walkable = 0;
    }
    else {
        walkable = 1;
    }
    mapData[tile.ownedRow][tile.ownedCol]=walkable;
    tile.setWalkable(walkable);
}

function  onButtonClick(button:render.Rect) {   
     writeFiled();
}
var mapData = readFile();


var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
eventCore.register(button,events.displayObjectRectHitTest,onButtonClick);

var editor = createMapEditor();
buttoncontainer.addChild(editor);
renderCore.start(buttoncontainer);
