TileMapMachine.Poi =
    {
     _poiList : [],

    add: function (poiOption)
    {
        this._poiList.push(poiOption);
    },

    _update: function ()
    {
        document.getElementById("dots").innerHTML = '';

        for (var i = 0; i < this._poiList.length; i++) {
            
            var x = -TileMapMachine.Mercator._toPixelX(this._poiList[i].lng);
            var y = -TileMapMachine.Mercator._toPixelY(this._poiList[i].lat);

            var posx = TileMapMachine.Geometry.upperLeftMap.x + x;
            var posy = TileMapMachine.Geometry.upperLeftMap.y + y;

            TileMapMachine.Utility._appendDiv({ x: posx, y: posy },null, this._poiList[i].src,"Poi");
        }
    }
};