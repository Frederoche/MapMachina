TileMapMachine.zoom =
{
    topleftX: 0,
    topleftY: 0,
    newX: 0,
    newY:0,

    zoomIn: function (e) {
        TileMapMachine.zoomLevel++;

        var newscale = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        var lowerRightMap = { x: TileMapMachine.Geometry.lowerRightMap.x, y: TileMapMachine.Geometry.lowerRightMap.y };

        var mapTopLeftBefore = { x: lowerRightMap.x - newscale, y: lowerRightMap.y - newscale };
        var mapBottomRightBefore = { x: lowerRightMap.x + newscale, y: lowerRightMap.y + newscale };

        var mapTopLeftAfter = { x: lowerRightMap.x - 2 * newscale, y: lowerRightMap.y - 2 * newscale };
        var mapBottomRightAfter = { x: lowerRightMap.x + 2 * newscale, y: lowerRightMap.y + 2 * newscale };

        var x1 = this._scale(mapTopLeftBefore.x, mapBottomRightBefore.x, mapTopLeftAfter.x, mapBottomRightAfter.x, e.clientX);
        var y1 = this._scale(mapTopLeftBefore.y, mapBottomRightBefore.y, mapTopLeftAfter.y, mapBottomRightAfter.y, e.clientY);
        
        this.newY = -y1 + window.innerHeight / 2;
        this.newX = -x1 + window.innerWidth / 2;

        this.topleftX =  mapTopLeftBefore.x + this.newX;
        this.topleftY = mapTopLeftBefore.y + this.newY;

        TileMapMachine.Geometry._get().style.transition = 'none';
        TileMapMachine.Geometry._get().style.top = this.topleftY + "px";
        TileMapMachine.Geometry._get().style.left = this.topleftX + "px";
        

        TileMapMachine.Geometry._updatePosition(this.topleftX, this.topleftY, TileMapMachine.zoomLevel);
    },

    _scale: function (min, max, a, b, x)
    {
        return (b - a) * (x - min)/(max - min) + a;
    },

    zoomOut: function (e) {
        TileMapMachine.zoomLevel--;

        var newscale = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        var lowerRightMap = { x: TileMapMachine.Geometry.lowerRightMap.x, y: TileMapMachine.Geometry.lowerRightMap.y };

        var mapTopLeftBefore = { x: lowerRightMap.x - newscale, y: lowerRightMap.y - newscale };
        var mapBottomRightBefore = { x: lowerRightMap.x + newscale, y: lowerRightMap.y + newscale };

        var mapTopLeftAfter = { x: lowerRightMap.x - newscale / 2, y: lowerRightMap.y - newscale / 2 };
        var mapBottomRightAfter = { x: lowerRightMap.x + newscale / 2, y: lowerRightMap.y + newscale / 2 };

        var x1 = this._scale(mapTopLeftBefore.x, mapBottomRightBefore.x, mapTopLeftAfter.x, mapBottomRightAfter.x, e.clientX);
        var y1 = this._scale(mapTopLeftBefore.y, mapBottomRightBefore.y, mapTopLeftAfter.y, mapBottomRightAfter.y, e.clientY);

        this.newY = -y1 + window.innerHeight / 2;
        this.newX = -x1 + window.innerWidth / 2;

        this.topleftX = mapTopLeftBefore.x + this.newX;
        this.topleftY = mapTopLeftBefore.y + this.newY;

        TileMapMachine.Geometry._get().style.transition = 'none';
        TileMapMachine.Geometry._get().style.top = this.topleftY + "px";
        TileMapMachine.Geometry._get().style.left = this.topleftX + "px";
        

        TileMapMachine.Geometry._updatePosition(this.topleftX, this.topleftY, TileMapMachine.zoomLevel);
    }
}