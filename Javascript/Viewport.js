TileMapMachine.Viewport = function()
{
    this._isInside = function (center, zoom, zoomLevel)
    {
        if (center === undefined)
            return true;

        var centerX = center.x + TileMapMachine.Geometry.upperLeftMap.x / Math.pow(2, zoomLevel) * Math.pow(2, zoom) + 128;
        var centerY = center.y + TileMapMachine.Geometry.upperLeftMap.y / Math.pow(2, zoomLevel) * Math.pow(2, zoom) + 128;

        var yMaxNode = centerY + 256;
        var xMaxNode = centerX + 256;

        var yMinNode = centerY - 256;
        var xMinNode = centerX - 256;

        var xViewportMin = 0;
        var yViewportMin = 0;

        var xViewportMax = window.innerWidth;
        var yViewportMax = window.innerHeight;

        var result = !(xMaxNode < xViewportMin || xViewportMax < xMinNode || yMaxNode < yViewportMin || yViewportMax < yMinNode);

        return result;
    }
}