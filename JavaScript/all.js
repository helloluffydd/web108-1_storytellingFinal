// Loader Animation -------------------------------------
document.onreadystatechange = function(){
	// Scrolling forbidden 
	document.documentElement.style.overflowY = 'hidden'; 

	// When the loading completed ...
	if(document.readyState == "complete"){
		// Hide the loader
		document.getElementById('loading').style.opacity="0";
		document.getElementById('loading').style.zIndex="0";
		// Scrolling allowed
		document.documentElement.style.overflowY = 'scroll'; 
	}
}

// Global Variables ------------------------------------
let whoScrolled = 'Han';

// jQuery ----------------------------------------------
$(document).ready(function() {
  
  let routeHan = $('#routes-han').offset().top;
  let routeTsai = $('#routes-tsai').offset().top;
  let bridgeSection = $('#bridge').offset().top;
  
  $(window).scroll(function() {
    let windowHeight = $(this).height();
    let scrolledY = $(this).scrollTop();
    let scrollFadeInSensed = scrolledY + windowHeight / 3;

    // Sense the scroll the activate the fade animation 
    let sectionLeading = $('#leading').offset().top;
    if (scrollFadeInSensed > sectionLeading) {
      $('#leading .fade-left-item').removeClass('fade-in-left');
      $('#leading .fade-right-item').removeClass('fade-in-right');
    }

    let sectionBridge = $('#bridge').offset().top;
    if (scrollFadeInSensed > sectionBridge) {
      $('#bridge .fade-top-item').removeClass('fade-in-top');
    }

    $('#features-han .features-content').each(function () {
      let thisPos = $(this).offset().top;
      if (scrollFadeInSensed > thisPos) $(this).removeClass('fade-in-right');
    })

    $('#features-tsai .features-content').each(function () {
      let thisPos = $(this).offset().top;
      if (scrollFadeInSensed > thisPos) $(this).removeClass('fade-in-left');
    })

    $('#election .fade-item').each(function () {
      let thisPos = $(this).offset().top;
      if (scrollFadeInSensed > thisPos) $(this).removeClass('opacity-0');
    })

    $('#temple .fade-item').each(function () {
      let thisPos = $(this).offset().top;
      if (scrollFadeInSensed > thisPos) $(this).removeClass('opacity-0');
    })

    // Click the link to scroll up to the landing 
    $('.btn-toTop').click(function(e){
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $('#landing').offset().top
      }, 1500 );
    })

    // Whether the viewport is less than, or equal to, 768 pixels wide
    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Switch the whoScrolled to fly the map
    // scrolledY >= routeTsai ? whoScrolled = 'Tsai' : whoScrolled = 'Han';
    whoScrolled = (scrolledY >= bridgeSection ? 'Tsai' : 'Han');
    // console.log(scrolledY, bridgeSection)

    // scrollZoom forbidden before scrolling to the route sections
    mapHan.scrollZoom = (scrolledY >= routeHan - 300 && scrolledY <= routeHan + 300 ? false : true);
    mapTsai.scrollZoom = (scrolledY >= routeTsai - 300 && scrolledY <= routeTsai + 300 ? false : true);

    // add mobile class when scrolling the route sections with mobile device
    $('#map-han')[scrolledY >= routeHan && isMobile ? 'addClass' : 'removeClass']('fixedBackground');
    $('#map-tsai')[scrolledY >= bridgeSection && isMobile ? 'addClass' : 'removeClass']('fixedBackground');
  })
})


// D3.js -------------------------------------------------
d3.json('./JavaScript/2018votes.json').then(data => {
  const allSvg = d3.selectAll('svg')
    .attr('width', 350)
    .attr('height', 50);

  allSvg.each(function() {
    const svgDataCity = d3.select(this).attr('data-city');    
    const thisSvg = d3.select(this);
    const groups = thisSvg.selectAll('g')
      .data(data[svgDataCity])
      .enter()
      .append('g');

    const widthLinear = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 300]);

    groups.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', d => widthLinear(d.KMT))
      .attr('height', 15)
      // .attr('fill', '#00358A');
      .attr('fill', '#7cdeff');

    groups.append('text')
      .text(d => `國民黨 ${d.KMT} %`)
      .attr('x', d => widthLinear(d.KMT) + 10)
      .attr('y', 15)
      .style('font-size', '16px')
      // .attr('fill', '#00358A');
      .attr('fill', '#7cdeff');

    groups.append('rect')
      .attr('x', 0)
      .attr('y', 30)
      .attr('width', d => widthLinear(d.DPP))
      .attr('height', 15)
      // .attr('fill', '#09A34A');
      .attr('fill', '#7cff8e');

    groups.append('text')
      .text(d => `民進黨 ${d.DPP ? `${d.DPP} %` : `未提名候選人`} `)
      .attr('x', d => widthLinear(d.DPP) + 10)
      .attr('y', 45)
      .style('font-size', '16px')
      // .attr('fill', '#09A34A');
      .attr('fill', '#7cff8e');
  })
})

// Mapbox Settings ---------------------------------------
mapboxgl.accessToken = 'pk.eyJ1IjoibHVmZnljaGVuIiwiYSI6ImNrNGMzcjRqNjBrNTEzc28yYjVpa2ZhNXUifQ.Yy8CvIdVqlHkg6IsjQhOJg';

// Han's routes map
let mapHan = new mapboxgl.Map({
  container: 'map-han',
  style: 'mapbox://styles/luffychen/ck4l21n2g0oc11cp4zzwrdvnc',
  center: [121.264041, 24.96574],
  zoom: 16,
  bearing: 20,
  pitch: 30,
  minZoom: 6
});

let chaptersHan = {
  'han-route-1': {
    center: [121.264041, 24.96574],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-2': {
    center: [120.194002, 22.986756],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-3': {
    center: [120.439026, 23.799939],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-4': {
    center: [121.5453, 25.026424],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-5': {
    center: [120.564732, 24.206477],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-6': {
    center: [120.393629, 23.432063],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-7': {
    center: [119.932898, 26.159126],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-8': {
    center: [120.352417, 22.567179],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-9': {
    center: [120.568866, 23.970183],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'han-route-10': {
    center: [121.492139, 25.073297],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  }
};

// Tsai's routes map
let mapTsai = new mapboxgl.Map({
  container: 'map-tsai',
  style: 'mapbox://styles/luffychen/ck4l21n2g0oc11cp4zzwrdvnc',
  center: [121.009517, 24.828411],
  zoom: 16,
  bearing: 20,
  pitch: 30,
  minZoom: 6
});

let chaptersTsai = {
  'tsai-route-1': {
    center: [121.009517, 24.828411],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-2': {
    center: [121.155255, 22.755352],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-3': {
    center: [120.6816, 23.904987],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-4': {
    center: [120.966981, 24.808912],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-5': {
    center: [120.48499, 22.676693],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-6': {
    center: [119.567709, 23.575697],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-7': {
    center: [120.425216, 23.550282],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-8': {
    center: [120.489134, 24.017367],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-9': {
    center: [121.51501, 25.039809],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
  },
  'tsai-route-10': {
    center: [121.447539, 25.064957],
    zoom: Math.floor(Math.random()*(2))+15,
    bearing: Math.floor(Math.random()*(180))+1,
    pitch: Math.floor(Math.random()*(60))+1
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