TileMapMachine.WMS = {
    //http://clusterb.gisline.no/wms-baerum/?SERVICE=WMS&Version=1.1.1&REQUEST=GetCapabilities
    _create: function (url)
    {
        var getCapabilities = url + '?SERVICE=WMS&Version=1.1.1&REQUEST=GetCapabilities';

        TileMapMachine.Utility._Request(getCapabilities, function(result) {
            console.log(result);
        });

    }
}