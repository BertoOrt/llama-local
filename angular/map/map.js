var map = new Datamap({
  element: document.getElementById('map'),
  projection: 'mercator',
  responsive: true,
  fills: {
    defaultFill: "#A39BA8",
    authorHasTraveledTo: "#B8C5D6",
    highlightFillColor: "#B8C5D6"
  },
  done: datamap => {
    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
        window.location.href = '/search?country=' + geography.properties.name.replace(/ /g, "-").toLowerCase()
    });
  },
  data: {
    USA: { fillKey: "authorHasTraveledTo", llamas: "1"},
    JPN: { fillKey: "authorHasTraveledTo", llamas: "1" },
    ITA: { fillKey: "authorHasTraveledTo", llamas: "1" },
    CRI: { fillKey: "authorHasTraveledTo", llamas: "2" },
    KOR: { fillKey: "authorHasTraveledTo", llamas: "1" },
    DEU: { fillKey: "authorHasTraveledTo", llamas: "1" },
  },
  geographyConfig: {
    highlightBorderColor: '#7d7d7d',
    highlightBorderWidth: 1,
    popupTemplate: (geo, data) => {
        if (!data) {
          data = {llamas: 0}
          var llama = "llamas"
        } else {
          if (data.llamas == 1) {
            var llama = "llama"
          } else {
            var llama = "llamas"
          }
        }
        return ['<div class="hoverinfo"><strong>',
          geo.properties.name, "<br>", data.llamas,
            ' ', llama,
            '</strong></div>'].join('');
    }
  }
});

$(window).on('resize', function() {
   map.resize();
});
