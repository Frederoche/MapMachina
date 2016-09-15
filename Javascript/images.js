TileMapMachine.Images = function(url) {

    this.img = {},
    this.url = url,
    this.count = 0,
    
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
            img.style.top = node.center.y +"px";
            img.style.left = node.center.x +"px";

        //img.style.transform = "translate3d(" + node.center.x + "px," + node.center.y + "px, 0px)";

        return img;
        }
        else {
            return node.img;
        }
    },

    this._switchDomain = function(url)
    {
        if (this.count % 5 === 0) {
            url = TileMapMachine.Utility._switchDomain(url);
        }

        this.count++;

        if (this.count > 24)
            this.count = 0;
        return url;
    },


    this._tileImageUrl = function(node) {

        var url = "";

        if (this.url.indexOf("{key}") > -1)
        {
            this.url = this._switchDomain(this.url);
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

    this.appendImage = function (node) {

            var url = this._tileImageUrl(node);
            
            var img = this._createImage(node);
            
            img.id = node.key;

            var load = function() {
                node.img = img;
            };

            img.addEventListener("load", load, false);

            img.src = url;
            document.getElementById("map").appendChild(img);
        
    }
}