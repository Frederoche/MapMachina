TileMapMachine.Quadtree = function(url) {

    var initalScaling = 256 * Math.pow(2, 1);

    var rootOption =
    {
        key: '',
        center: { x: initalScaling - 128, y: initalScaling - 128 },
        type: 0,
        zoom:0
    };

    this.zoomLevel = 1;
    this.RootNode = new TileMapMachine.Node(rootOption);
    
    this.Images   = new TileMapMachine.Images(url);
    this.Viewport = new TileMapMachine.Viewport();

    TileMapMachine.zoomLevel = 1;
};

TileMapMachine.Quadtree.prototype =
{
    _parseKey: function (key)
    {
        var result = {x:0, y:0};

        for (var i = 0; i < key.length; i++)
        {
            var scaling = 256 * Math.pow(2, key.length - 1) / Math.pow(2, i + 1);
            
            if (key[i] === "0") {
                result.x -= scaling;
                result.y -= scaling;
            }

            if (key[i] === "1") {
                result.x += scaling;
                result.y -= scaling;
            }

            if (key[i] === "2") {
                result.x -= scaling;
                result.y += scaling;
            }

            if (key[i] === "3") {
                result.x += scaling;
                result.y += scaling;
            }
        }

        result.x += 256 * Math.pow(2, key.length - 1) - 128;
        result.y += 256 * Math.pow(2, key.length - 1) - 128;

        return result;
    },

    

    _testChildCenter: function(parent, zoomLevel) 
    {
        if (!this.Viewport._isInside(parent.center, parent.key.length, zoomLevel))
            return false;
        return  true;   
    },


    _addChilds: function (node)
    {
        var zoom = node.zoom + 1;
        
        var nodeOption0 = {
            zoom: zoom,
            key: node.key + "0",
            center: this._parseKey(node.key + "0"),
            type: 0,
            parent: node
        };

        var nodeOption1 = {
            zoom: zoom,
            key: node.key + "1",
            center: this._parseKey(node.key + "1"),
            type: 0,
            parent: node
        };

        var nodeOption2 = {
            zoom: zoom,
            key: node.key + "2",
            center: this._parseKey(node.key + "2"),
            type: 0,
            parent: node
        };

        var nodeOption3 = {
            zoom: zoom,
            key: node.key + "3",
            center: this._parseKey(node.key + "3"),
            type: 0,
            parent: node
        };

        node.child[0] = new TileMapMachine.Node(nodeOption0);
        node.child[1] = new TileMapMachine.Node(nodeOption1);
        node.child[2] = new TileMapMachine.Node(nodeOption2);
        node.child[3] = new TileMapMachine.Node(nodeOption3);

        node.type = 1;
    },

    _removeChilds: function (node) {
       
        node.child = [];
        node.type = 0;
    },

    getNodeByKey: function(nodekey, zoom, node) {
        node = node || this.RootNode;
        zoom = zoom || TileMapMachine.zoomLevel;

        if (node.key === nodekey) {
            return node;
        }
        else
        {
            for (var i = 0; i < node.child.length; i++)
            {
                var res = this.getNodeByKey(nodekey, zoom, node.child[i]);
                if(res!=undefined)
                    return res;
            }
        }
        
    },

    traverse: function (zoom, node) {
        
        node = node || this.RootNode;
        zoom = zoom || TileMapMachine.zoomLevel;

            if (!this._testChildCenter(node, zoom))
                return;

            if (node.key.length === zoom && (this.Viewport._isInside(node.center, node.key, node.key)) && node.img === null)
            {
                //this.Images.appendParentImage(node);
                this.Images.appendImage(node);
            }

            if (node.key.length === zoom && (this.Viewport._isInside(node.center, node.key, node.key)) && node.img !== null) {
                //this.Images.appendParentImage(node);
                document.getElementById("map").appendChild(node.img);
            }

            if (node.key.length === zoom && !this.Viewport._isInside(node.center, node.key, node.key) && node.img !== null) {
                this.Images.removeImage(node);

                node.child = [];
                node.type = 0;
                return;
            }

            if (node.key.length < zoom && node.img !== null) {
                this.Images.removeImage(node);
            }

            if (node.key.length < zoom && this._testChildCenter(node, zoom) && node.child.length === 0) {
                this._addChilds(node);
                node.type = 1;
            }

            if (!this._testChildCenter(node, zoom)) {
                this.Images.removeImage(node);
                node.child = [];
                node.type = 0;
            }

            if (node.key.length < zoom)
            {
                node.child.forEach(function(val) {
                    this.traverse(zoom, val);
                }.bind(this));
            }

        return;
    }
};


