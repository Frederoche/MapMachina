﻿TileMapMachine.Images = function(url) {

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

    this._createImage = function(node, callback) 
    {
        

        if (node.img === null || node.img === undefined) {
            var img = new Image();

            img.id = node.key;
            img.style.transform = "translate3d(" + node.center.x + "px," + node.center.y + "px, 0px)";
            
            callback(img);
        }
        else
        {
            callback(node.img);
        }
    },

    this._switchDomain = function(url)
    {
        this.count++;

        if (this.count % 5 === 0) {
            url = TileMapMachine.Utility._switchDomain(url);
            this.count = 0;
        }
    
        return url;
    },


    this._tileImageUrl = function(node, callback) {

        var url;

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
        
        callback(url);
    },

    this.appendParentImage = function (node) {
        
        if (node.key[node.key.length - 1] === "0" && node.parent.img!==null) {
            node.parent.img.className = "topLeft";
        }

        if (node.key[node.key.length - 1] === "1" && node.parent.img !== null) {
            node.parent.img.className = "topRight";
        }

        if (node.key[node.key.length - 1] === "2" && node.parent.img !== null) {
            node.parent.img.className = "bottomLeft";
        }

        if (node.key[node.key.length - 1] === "3" && node.parent.img !== null) {
            node.parent.img.className = "bottomRight";
        }

        if (node.parent.img !== null) {
             node.img = node.parent.img;
             node.img.style.transform = "translate3d(" + node.center.x + "px," + node.center.y + "px, 0px)";
             document.getElementById("map").appendChild(node.img);
        }
    }

    this.appendImage = function (node) {

        this._tileImageUrl(node, function (url)
        {
            this._createImage(node, function (img)
            {
                img.id = node.key;

                var xhr = new XMLHttpRequest();

                xhr.open('GET', url, true);
                xhr.responseType = "blob";
                
                var load = function() 
                {
                    var urlCreator = window.URL || window.webkitURL;
                    var blobUrl = urlCreator.createObjectURL(this.response);
                    img.src = blobUrl;
                    node.img = img;
                    document.getElementById("map").appendChild(img);
                    
                };

                xhr.addEventListener("load", load, false);
                xhr.send();

            }.bind(this));
            
        }.bind(this));
    }
}