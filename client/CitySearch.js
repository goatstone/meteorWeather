/* CitySearch.js */

CitySearch = function () {
    var name = "";

    function init() {
        name = "CitySearch";
    }

    function search(findQuery) {
        Meteor.call("searchForCitesBackEnd", findQuery, 2, function (error, results) {
            var content = JSON.parse(results);
            var cityList = content.data.data.list;
            var printStr = "";
            var sRes = document.getElementById("searchResultsDiv");
            sRes.innerHTML = "";
            for (var i = 0; i < cityList.length; i++) {
                printStr =
                    cityList[i].name + " : " +
                        cityList[i].weather[0].description;
                var cityId = cityList[i].id;
                var node1 = document.createElement("div");
                node1.id = cityList[i].id;
                node1.lon = cityList[i].coord.lon;
                node1.lat = cityList[i].coord.lat;
                node1.addEventListener("click", function (cityId) {
                    WeatherMap.makeMap.call(this);

                })
                var textNode1 = document.createTextNode(printStr)
                node1.appendChild(textNode1);
                sRes.appendChild(node1);
            }
        });
    }

    return {
        init: function () {
            init();
        },
        search: function (query) {
            search(query);
        }
    }
}();