
let whoScrolled = 'Han';

// jQuery
$(document).ready(function() {
  let fixedMapHan = $('#map-han').offset().top;
  let fixedMapTsai = $('#map-tsai').offset().top;
  let routeTsai = $('#routes-tsai').offset().top;

  $(window).scroll(function() {
    // let windowHeight = $(this).height();
    let scrolledY = $(this).scrollTop();
    // let scrolledBottom = scrolledY + windowHeight;

    // scrolledY >= fixedMapHan ? $('#map-han').addClass('sticky') : $('#map-han').removeClass('sticky');
    scrolledY >= fixedMapTsai ? $('#map-tsai').addClass('sticky') : $('#map-tsai').removeClass('sticky');

    scrolledY >= routeTsai ? whoScrolled = 'Tsai' : whoScrolled = 'Han';
  })
})


// Mapbox Settings
mapboxgl.accessToken = 'pk.eyJ1IjoibHVmZnljaGVuIiwiYSI6ImNrNGMzcjRqNjBrNTEzc28yYjVpa2ZhNXUifQ.Yy8CvIdVqlHkg6IsjQhOJg';

// center: [longitude, latitude]
// zoom: The initial zoom level of the map.
// bearing: The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north.
// pitch: The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-60).

// Han's routes map
let mapHan = new mapboxgl.Map({
  container: 'map-han',
  style: 'mapbox://styles/luffychen/ck4l21n2g0oc11cp4zzwrdvnc',
  center: [121.881, 23.643],
  zoom: 6,
  bearing: 20,
  pitch: 30,
  minZoom: 6
});

let chaptersHan = {
  'han-route-1': {
    center: [121.264041, 24.96574],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-2': {
    center: [121.465785, 25.068627],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-3': {
    center: [120.194002, 22.986756],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-4': {
    center: [120.492881, 23.85312],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-5': {
    center: [120.637968, 24.159315],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-6': {
    center: [121.297362, 24.961477],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-7': {
    center: [121.464692, 24.986201],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'han-route-8': {
    center: [121.514567, 25.001814],
    zoom: 17,
    bearing: 20,
    pitch: 30
  }
  
};

// Tsai's routes map
let mapTsai = new mapboxgl.Map({
  container: 'map-tsai',
  style: 'mapbox://styles/luffychen/ck4l21n2g0oc11cp4zzwrdvnc',
  center: [121.881, 23.643],
  zoom: 6,
  bearing: 20,
  pitch: 30,
  minZoom: 6
});

let chaptersTsai = {
  'tsai-route-1': {
    center: [121.264041, 24.96574],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-2': {
    center: [121.465785, 25.068627],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-3': {
    center: [120.194002, 22.986756],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-4': {
    center: [120.492881, 23.85312],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-5': {
    center: [120.637968, 24.159315],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-6': {
    center: [121.297362, 24.961477],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-7': {
    center: [121.464692, 24.986201],
    zoom: 17,
    bearing: 20,
    pitch: 30
  },
  'tsai-route-8': {
    center: [121.514567, 25.001814],
    zoom: 17,
    bearing: 20,
    pitch: 30
  }
};


// On every scroll event, check which element is on screen
window.onscroll = function () {
  let chapterNamesHan = Object.keys(chaptersHan);
  let chapterNamesTsai = Object.keys(chaptersTsai);

  for (let i = 0; i < chapterNamesHan.length; i++) {
    let chapterName = chapterNamesHan[i];
    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      break;
    }
  }

  for (let i = 0; i < chapterNamesTsai.length; i++) {
    let chapterName = chapterNamesTsai[i];
    if (isElementOnScreen(chapterName)) {
      setActiveChapter(chapterName);
      break;
    }
  }
};

let activeChapterName = 'han-route-1';

function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;

  switch (whoScrolled) {
    case 'Han':
      mapHan.flyTo(chaptersHan[chapterName]);
      break;
    case 'Tsai':
      mapTsai.flyTo(chaptersTsai[chapterName]);
      break;
  }

  // document.getElementById(chapterName).setAttribute('class', 'active');
  // document.getElementById(activeChapterName).setAttribute('class', '');

  activeChapterName = chapterName;
}

function isElementOnScreen(id) {
  let element = document.getElementById(id);
  let bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}