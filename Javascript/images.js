TileMapMachine.Images = function(url){

    this.img = {},
    this.url = url,

    this.removeImage = function (node)
    {
        if (node.img !== undefined) {
            
            var img = document.getElementById(node.key);
            
            if(img!==null)
                document.getElementById('map').removeChild(img);
        }
    },

    this._createImage = function(node) 
    {
        if (node.img === null || node.img === undefined) {
            var img = new Image();

        img.id = node.key;
        img.style.transform = "translate3d(" + node.center.x + "px," + node.center.y + "px, 0px)";

        return img;
        }
        else {
            return node.img;
        }
    },

    this._tileImageUrl = function(node) {

        var url = "";

        if (this.url.indexOf("{key}") > -1) {
            url = this.url.replace("{key}", node.key);
        }
        
        else
        {
            var xyz = TileMapMachine.Utility._quadKeyToTile(node.key);
            url = this.url.replace("{x}", xyz.x);
            url = url.replace("{y}", xyz.y);
            url = url.replace("{z}", xyz.z);
        }
        
        return url;
    },

    this.appendImage = function(node) {
            var url = this._tileImageUrl(node);

            if (node.img !== null && document.getElementById(node.key) !== null) {
                node.img.src = url;
                document.getElementById("map").appendChild(node.img);
                return;
            }
            
            var  img = this._createImage(node);
            
            img.id = node.key;

            var load = function() {
                node.img = img;
            };

            img.addEventListener("load", load, false);

            img.src = url;
            document.getElementById("map").appendChild(img);
        
    }
}