TileMapMachine.DOM = {};

TileMapMachine.DOM.Mouse =
{
    _mousePosition: null,
    _newMousePosition: null,
    _selected: null,
    
    _onMapInit: function ()
    {
        var map = TileMapMachine.Geometry._get();

        var topLeft = { x: (-512 + window.innerWidth) / 2, y: (-512 + window.innerHeight) / 2 };

        map.style.left = topLeft.x + "px";
        map.style.top  = topLeft.y + "px";

        TileMapMachine.Geometry._updatePosition(topLeft.x, topLeft.y, TileMapMachine.zoomLevel);

        var mouseMove = function(e) {
            this._newMousePosition = { x: e.clientX, y: e.clientY };

            if (this._selected !== null) {
                
                var y = (this._newMousePosition.y - this._mousePosition.y);
                var x = (this._newMousePosition.x - this._mousePosition.x);

                map.style.top  = y + "px";
                map.style.left = x + "px";

                TileMapMachine.Geometry._updatePosition(x, y, TileMapMachine.zoomLevel);
                setTimeout(function() { TileMapMachine.quadtree.traverse(); }, 50);
                TileMapMachine.Poi._update();
            }
        };


        var mouseDown = function (e) {
            
            e.preventDefault();
            this._selected = map;
            
            this._mousePosition = { x: e.clientX - this._selected.offsetLeft, y: e.clientY - this._selected.offsetTop };

            return false;
        };

        var mouseUp = function(e) {
            this._selected = null;
        };

        var mouseWheel = function (e) {

            var nextZoomLevel = TileMapMachine.zoomLevel + 1;
            var previousZoomLevel = TileMapMachine.zoomLevel - 1;


            if (e.wheelDelta > 0)
            {
                if (nextZoomLevel < 18) {
                    TileMapMachine.zoom._zoomIn(e);
                }
            }
            else
            {
                if (previousZoomLevel > 0) {
                    TileMapMachine.zoom._zoomOut(e);
                }
            }

            map.innerHTML = '';
            TileMapMachine.quadtree.traverse();
        };

        map.addEventListener("mousemove", mouseMove.bind(this), false);
        map.addEventListener("mouseup", mouseUp.bind(this), false);
        map.addEventListener("mousedown", mouseDown.bind(this), false);
        map.addEventListener("mousewheel", mouseWheel.bind(this), false);
    }
};

