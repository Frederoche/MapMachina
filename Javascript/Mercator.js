TileMapMachine.Mercator =
{
    _getLng: function (pixelPosition)
    {
        var size = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        return -(pixelPosition.x + size)/(size/360) + 180;
    },

    _getLat: function (pixelPosition) {
        
        var size = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        return -360 / Math.PI* Math.atan(Math.exp(Math.PI * (-size - 2.0 * pixelPosition.y) / size)) + 90;
    },

    _toPixelX: function (lng) {
        var size = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        return -lng*size/360 - size/2;
    },

    _toPixelY: function (lat) {
        var size = 256 * Math.pow(2, TileMapMachine.zoomLevel);

        var tmp = Math.tan(Math.PI * (90  / 360 - lat  / 360));

        return -size /(2* Math.PI) * Math.log(tmp) - size/2;
    }
};