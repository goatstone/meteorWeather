/* mainClient.js */

Meteor.startup(function () {
    CitySearch.init();
    //CitySearch.search("Beacon")
    WeatherMap.init();
});

Template.searchTemplate.events({
    'click input#search_button': function (st) {
        var findVal = document.getElementById("find_val");
        var findQuery = findVal.value;
        CitySearch.search(findQuery)
    }
});


