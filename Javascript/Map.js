TileMapMachine = {};
TileMapMachine.zoomLevel = 0;


TileMapMachine.Geometry =
{
    upperLeftMap : { x: (-512 + window.innerWidth) / 2, y: (-512 + window.innerHeight) / 2 },
    lowerRightMap : { x: 0, y: 0 },

    _get: function() {
        return document.getElementById('map');
    },

    _updatePosition : function(x, y, zoom) {
        this.upperLeftMap = { x: x, y: y };

        var newscale = 256 * Math.pow(2, zoom);

        this.lowerRightMap.y = this.upperLeftMap.y + newscale;
        this.lowerRightMap.x = this.upperLeftMap.x + newscale;

        TileMapMachine.Utility._showImageCount();
    }
}

TileMapMachine.Map = function (tileServer)
{
    var init = function() {
        TileMapMachine.quadtree = new TileMapMachine.Quadtree(tileServer);
        TileMapMachine.quadtree.traverse();
        TileMapMachine.DOM.Mouse._onMapInit();
    };

    window.addEventListener("load", init, false);
        
};

