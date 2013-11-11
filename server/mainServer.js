/* mainServer.js */

Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.methods({
    getMapInfo: function () {
        this.unblock();
        var urlAdrs = "http://api.openweathermap.org/data/2.5/weather?q=London,uk";
        return Meteor.http.call("GET", urlAdrs);
    },
    searchForCitesBackEnd: function (findQuery, arg2) {
        this.unblock();
        var JPack = {"a":123};
        var appId = "be2b0d29fa4b07ffd9d6565ae20db56e";
        var urlAdrs = "http://api.openweathermap.org/data/2.5/find?q=" + findQuery + "&mode=json&APPID=" + appId;
        var dataStatic = "";
        //dataStatic = {"message":"accurate","cod":"200","count":4,"list":[{"id":2643743,"name":"London","coord":{"lon":-0.12574,"lat":51.50853},"main":{"temp":278.89,"humidity":99,"pressure":1005,"temp_min":278.71,"temp_max":279.26},"dt":1384058167,"wind":{"speed":6.16,"deg":232.5},"sys":{"country":"GB"},"rain":{"3h":0},"clouds":{"all":92},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}]},{"id":6058560,"name":"London","coord":{"lon":-81.23304,"lat":42.983391},"main":{"temp":281.02,"humidity":49,"pressure":977,"temp_min":280.15,"temp_max":282.04},"dt":1384057692,"wind":{"speed":3.08,"gust":3.08,"deg":20},"sys":{"country":"CA"},"rain":{"3h":0},"clouds":{"all":92},"weather":[{"id":520,"main":"Rain","description":"light intensity shower rain","icon":"09n"},{"id":701,"main":"Mist","description":"mist","icon":"50n"}]},{"id":4517009,"name":"London","coord":{"lon":-83.44825,"lat":39.886452},"main":{"temp":282.63,"humidity":21,"pressure":979,"temp_min":281.15,"temp_max":284.15},"dt":1384057918,"wind":{"speed":3.08,"gust":4.63,"deg":259},"sys":{"country":"US"},"rain":{"3h":0},"clouds":{"all":0},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}]},{"id":4298960,"name":"London","coord":{"lon":-84.08326,"lat":37.128979},"main":{"temp":282.11,"humidity":63,"pressure":1023,"temp_min":282.04,"temp_max":282.15},"dt":1384057674,"wind":{"speed":1.03,"gust":2.57,"deg":180},"sys":{"country":"US"},"rain":{"3h":0},"clouds":{"all":0},"weather":[{"id":800,"main":"Clear","description":"Sky is Clear","icon":"01n"}]}]};
        dataStatic = Meteor.http.call("GET", urlAdrs);

        return '{"name":"searchForCitesBackEnd", "findQuery":"' +
            findQuery +'",  ' +
            '"debug":"' +
            urlAdrs + '",  ' +
            '"data":' +
            JSON.stringify(dataStatic) +
            '}';
    }
});