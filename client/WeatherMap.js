/* WeatherMap */

WeatherMap = function () {
    var map;
    var lat, lon, zoom, position;
    var name = "";

    function init() {
        name = "WeatherMap";
        map = new OpenLayers.Map("map",
            {
                units: 'm',
                projection: new OpenLayers.Projection("EPSG:900913"),
                displayProjection: new OpenLayers.Projection("EPSG:4326")
            }
        );
    }

    function makeMap() {
        document.getElementById("map").style.visibility = "visible";
        lat = this.lat || 51;
        lon = this.lon || 0;
        zoom = 3.5;
        position = new OpenLayers.LonLat(parseFloat(lon), parseFloat(lat));
        var mapnik = new OpenLayers.Layer.OSM();
        var opencyclemap = new OpenLayers.Layer.XYZ(
            "opencyclemap",
            "http://a.tile3.opencyclemap.org/landscape/${z}/${x}/${y}.png",
            {
                numZoomLevels: 18,
                sphericalMercator: true
            }
        );
        var stations = new OpenLayers.Layer.Vector.OWMStations("Stations information", {units: 'metric'});
        stations.setVisibility(false);
        var city = new OpenLayers.Layer.Vector.OWMWeather("Current weather", {units: 'metric'});
        var precipitation = new OpenLayers.Layer.XYZ(
            "Precipitation forecasts",
            "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
            {
                numZoomLevels: 19,
                isBaseLayer: false,
                opacity: 0.6,
                sphericalMercator: true
            }
        );
        var clouds = new OpenLayers.Layer.XYZ(
            "Clouds forecasts",
            "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
            {
                numZoomLevels: 19,
                isBaseLayer: false,
                opacity: 0.7,
                sphericalMercator: true

            }
        );
        clouds.setVisibility(false);
        var pressure_contour = new OpenLayers.Layer.XYZ(
            "Pressure",
            "http://${s}.tile.openweathermap.org/map/pressure_cntr/${z}/${x}/${y}.png",
            {
                numZoomLevels: 19,
                isBaseLayer: false,
                opacity: 0.4,
                sphericalMercator: true

            }
        );
        pressure_contour.setVisibility(false);
        var radar = new OpenLayers.Layer.OWMRadar("Radar (USA and Canada)", {isBaseLayer: false, opacity: 0.6});
        radar.setVisibility(false);

        var ls = new OpenLayers.Control.LayerSwitcher({'ascending': false});
        map.addControl(ls);
        //map.addControl(new OpenLayers.Control.Permalink('permalink'));

        map.addLayers([mapnik, opencyclemap, stations, city ]);
        map.addLayer(precipitation);
        map.addLayer(clouds);
        map.addLayer(pressure_contour);
        map.addLayer(radar);

        position.transform(
            new OpenLayers.Projection("EPSG:4326"),
            new OpenLayers.Projection("EPSG:900913")
        );
        map.setCenter(position, parseFloat(zoom), false);

    }

    return {
        init: function () {
            init();
        },
        makeMap: function () {
            makeMap.call(this);
        }}
}();
