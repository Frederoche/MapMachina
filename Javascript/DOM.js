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
        map.style.top = topLeft.y + "px";

        TileMapMachine.Geometry._updatePosition(topLeft.x, topLeft.y, TileMapMachine.zoomLevel);

        var timeoutid = 0;

        var mouseMove = function(e) {
            this._newMousePosition = { x: e.clientX, y: e.clientY };

            if (this._selected !== null) {

                var y = (this._newMousePosition.y - this._mousePosition.y);
                var x = (this._newMousePosition.x - this._mousePosition.x);

                map.style.top = y + "px";
                map.style.left = x + "px";

                TileMapMachine.Geometry._updatePosition(x, y, TileMapMachine.zoomLevel);
                TileMapMachine.quadtree.traverse();
                /*if (timeoutid) {
                    clearTimeout(timeoutid);
                    timeoutid = 0;
                }

                timeoutid = setTimeout(function() {
                    TileMapMachine.quadtree.traverse();
                }, 10)};*/
            }
        }
        var mouseDown = function (e) {
            
            e.preventDefault();
            this._selected = map;
            
            this._mousePosition = { x: e.clientX - this._selected.offsetLeft, y: e.clientY - this._selected.offsetTop };

            return false;
        };

        var mouseUp = function(e) {
            this._selected = null;
        }

        var mouseWheel = function (e)
        {
            if (e.wheelDelta > 0) {
                
                TileMapMachine.zoom.zoomIn(e);
            }
            else
            {
                
                TileMapMachine.zoom.zoomOut(e);   
            }

            map.innerHTML = '';
            TileMapMachine.quadtree.traverse();
        }

        map.addEventListener("mousemove", mouseMove.bind(this), false);
        map.addEventListener("mouseup", mouseUp.bind(this), false);
        map.addEventListener("mousedown", mouseDown.bind(this), false);
        map.addEventListener("mousewheel", mouseWheel.bind(this), false);
    }
};

