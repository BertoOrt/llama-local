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


particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
