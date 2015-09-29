app.controller('home', ['$scope', function ($scope) {
  $scope.message = 'world'
}])
  .directive('myMap', function () {
    function link(scope, element, attrs) {
      new Datamap({
        element: element[0],
        projection: 'mercator',
        fills: {
          defaultFill: "#A39BA8",
          authorHasTraveledTo: "#B8C5D6",
          highlightFillColor: "#B8C5D6"
        },
        done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              alert(geography.properties.name);
          });
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

    }

    return {
      link: link
    };
  })

app.controller('user', ['$scope', function ($scope) {
  $scope.message = 'apple';
}])
