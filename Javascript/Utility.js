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
    },

    _switchDomain: function (url) {
        
        var prefix = url.split(".")[0];
        
        var number = prefix.match(/\d+/g);
        var newprefix = "";
        
            
        if (number !== null) {
            switch (number[0]) {
              
            case"0":
            {
                newprefix = prefix.replace(number[0], "1");
                return url.replace(prefix, newprefix);
            }
            case"1":
            {
                newprefix = prefix.replace(number[0], "2");
                return url.replace(prefix, newprefix);
            }
            case"2":
            {
                newprefix = prefix.replace(number[0], "3");
                return url.replace(prefix, newprefix);
            }
            case"3":
            {
                newprefix = prefix.replace(number[0], "4");
                return url.replace(prefix, newprefix);
            }
            case"4":
            {
                newprefix = prefix.replace(number[0], "5");
                return url.replace(prefix, newprefix);
            }
            case"5":
            {
                newprefix = prefix.replace(number[0], "0");
                return url.replace(prefix, newprefix);
            }
            }
        }
        
        
    }
}