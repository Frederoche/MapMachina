TileMapMachine.Node = function(option) {
    this.key = option.key;
    this.center = option.center;
    this.type = option.type;
    this.parent = option.parent;
    this.child = [];
    this.zoom = option.zoom;
    this.img = null;
};

