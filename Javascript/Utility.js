TileMapMachine.Utility =
{
    _appendDiv: function(position, text) {
        var div = document.createElement('div');
        div.className = "dot";
        div.style.top =  position.y + "px";
        div.style.left = position.x + "px";
        div.innerText = text || "";
        document.getElementById("dots").appendChild(div);
    },

    _showImageCount: function () {
        var count = document.getElementsByTagName('img').length;
        console.log("count:" + count);
    },

    _quadKeyToTile: function(key) {
        var x = 0;
        var y = 0;

        var zoom = key.length;

        for (var i = zoom; i > 0; i--) {
            var mask = 1 << (i - 1);
            var cell = parseInt(key.substr(zoom - i, 1));

            if ((cell & 1) !== 0) {
                x = x + mask;
            }

            if ((cell & 2) !== 0) {
                y = y + mask;
            }
        }

        return { x: x, y: y, z: zoom };
    }
}