app.controller('home', ['$scope', function ($scope) {
  $scope.message = 'world'
}])
  .directive('myMap', function () {
    function link(scope, element, attrs) {
      var basic_choropleth = new Datamap({
        element: element[0],
        projection: 'mercator',
        fills: {
          defaultFill: "#ABDDA4",
          authorHasTraveledTo: "#fa0fa0"
        },
        data: {
          USA: { fillKey: "authorHasTraveledTo" },
          JPN: { fillKey: "authorHasTraveledTo" },
          ITA: { fillKey: "authorHasTraveledTo" },
          CRI: { fillKey: "authorHasTraveledTo" },
          KOR: { fillKey: "authorHasTraveledTo" },
          DEU: { fillKey: "authorHasTraveledTo" },
        }
      });
      var colors = d3.scale.category10();
      window.setInterval(function() {
        basic_choropleth.updateChoropleth({
          USA: colors(Math.random() * 10),
          RUS: colors(Math.random() * 100),
          AUS: { fillKey: 'authorHasTraveledTo' },
          BRA: colors(Math.random() * 50),
          CAN: colors(Math.random() * 50),
          ZAF: colors(Math.random() * 50),
          IND: colors(Math.random() * 50),
        });
      }, 2000);

    }

    return {
      link: link
    };
  })

app.controller('user', ['$scope', function ($scope) {
  $scope.message = 'apple';
}])
