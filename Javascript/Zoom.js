TileMapMachine.zoom =
{
    _topleftX: 0,
    _topleftY: 0,
    _newX: 0,
    _newY: 0,

    _panTo : function(latlng) {
        var x = - TileMapMachine.Mercator._toPixelX(latlng.lng);
        var y = - TileMapMachine.Mercator._toPixelY(latlng.lat);

        this._newY = -y + window.innerHeight / 2;
        this._newX = -x + window.innerWidth / 2;

        this._topleftX = this._newX;
        this._topleftY = this._newY;

        TileMapMachine.Geometry._get().style.top  = this._topleftY + "px";
        TileMapMachine.Geometry._get().style.left = this._topleftX + "px";

        TileMapMachine.Geometry._updatePosition(this._topleftX, this._topleftY, TileMapMachine.zoomLevel);

        TileMapMachine.quadtree.traverse();
        TileMapMachine.Poi._update();
    },

    


    _zoomIn: function (e) {
        TileMapMachine.zoomLevel++;

        var newscale = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        var lowerRightMap = { x: TileMapMachine.Geometry.lowerRightMap.x, y: TileMapMachine.Geometry.lowerRightMap.y };

        var mapTopLeftBefore = { x: lowerRightMap.x - newscale, y: lowerRightMap.y - newscale };
        var mapBottomRightBefore = { x: lowerRightMap.x + newscale, y: lowerRightMap.y + newscale };

        var mapTopLeftAfter = { x: lowerRightMap.x - 2 * newscale, y: lowerRightMap.y - 2 * newscale };
        var mapBottomRightAfter = { x: lowerRightMap.x + 2 * newscale, y: lowerRightMap.y + 2 * newscale };

        var x1 = this._scale(mapTopLeftBefore.x, mapBottomRightBefore.x, mapTopLeftAfter.x, mapBottomRightAfter.x, e.clientX);
        var y1 = this._scale(mapTopLeftBefore.y, mapBottomRightBefore.y, mapTopLeftAfter.y, mapBottomRightAfter.y, e.clientY);
        
        this._newY = -y1 + window.innerHeight / 2;
        this._newX = -x1 + window.innerWidth  / 2;

        this._topleftX =  mapTopLeftBefore.x + this._newX;
        this._topleftY =  mapTopLeftBefore.y + this._newY;

        TileMapMachine.Geometry._get().style.transition = 'none';
        TileMapMachine.Geometry._get().style.top = this._topleftY + "px";
        TileMapMachine.Geometry._get().style.left = this._topleftX + "px";
        
        TileMapMachine.Geometry._updatePosition(this._topleftX, this._topleftY, TileMapMachine.zoomLevel);
        TileMapMachine.Poi._update();
    },

    _scale: function (min, max, a, b, x)
    {
        return (b - a) * (x - min)/(max - min) + a;
    },

    _zoomOut: function (e) {
        

        TileMapMachine.zoomLevel--;

        var newscale = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        var lowerRightMap = { x: TileMapMachine.Geometry.lowerRightMap.x, y: TileMapMachine.Geometry.lowerRightMap.y };

        var mapTopLeftBefore = { x: lowerRightMap.x - newscale, y: lowerRightMap.y - newscale };
        var mapBottomRightBefore = { x: lowerRightMap.x + newscale, y: lowerRightMap.y + newscale };

        var mapTopLeftAfter = { x: lowerRightMap.x - newscale / 2, y: lowerRightMap.y - newscale / 2 };
        var mapBottomRightAfter = { x: lowerRightMap.x + newscale / 2, y: lowerRightMap.y + newscale / 2 };

        var x1 = this._scale(mapTopLeftBefore.x, mapBottomRightBefore.x, mapTopLeftAfter.x, mapBottomRightAfter.x, e.clientX);
        var y1 = this._scale(mapTopLeftBefore.y, mapBottomRightBefore.y, mapTopLeftAfter.y, mapBottomRightAfter.y, e.clientY);

        this._newY = -y1 + window.innerHeight / 2;
        this._newX = -x1 + window.innerWidth / 2;

        this._topleftX = mapTopLeftBefore.x + this._newX;
        this._topleftY = mapTopLeftBefore.y + this._newY;

        TileMapMachine.Geometry._get().style.transition = 'none';
        TileMapMachine.Geometry._get().style.top = this._topleftY + "px";
        TileMapMachine.Geometry._get().style.left = this._topleftX + "px";
        

        TileMapMachine.Geometry._updatePosition(this._topleftX, this._topleftY, TileMapMachine.zoomLevel);
        TileMapMachine.Poi._update();
    }
}