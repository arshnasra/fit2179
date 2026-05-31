const embedOpt = { actions: false };

/* 1. STADIUM MAP */
const stadiumMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 760,
  "height": 500,
  "title": "Major Cricket Stadiums in Australia",
  "projection": {"type": "mercator", "center": [134, -28], "scale": 700},
  "layer": [
    {
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega-datasets/main/data/world-110m.json",
        "format": {"type": "topojson", "feature": "countries"}
      },
      "transform": [{"filter": "datum.id == 36"}],
      "mark": {"type": "geoshape", "fill": "#eeeeee", "stroke": "#999"}
    },
    {
      "data": {
        "values": [
          {"stadium":"MCG","city":"Melbourne","state":"VIC","lat":-37.8199,"lon":144.9834,"capacity":100024},
          {"stadium":"SCG","city":"Sydney","state":"NSW","lat":-33.8917,"lon":151.2240,"capacity":48000},
          {"stadium":"Adelaide Oval","city":"Adelaide","state":"SA","lat":-34.9154,"lon":138.5961,"capacity":53500},
          {"stadium":"Optus Stadium","city":"Perth","state":"WA","lat":-31.9510,"lon":115.8890,"capacity":61000},
          {"stadium":"The Gabba","city":"Brisbane","state":"QLD","lat":-27.4850,"lon":153.0381,"capacity":42000},
          {"stadium":"Bellerive Oval","city":"Hobart","state":"TAS","lat":-42.8773,"lon":147.3740,"capacity":20000},
          {"stadium":"Manuka Oval","city":"Canberra","state":"ACT","lat":-35.3183,"lon":149.1344,"capacity":13550}
        ]
      },
      "mark": {"type": "circle", "opacity": 0.85, "stroke": "white", "strokeWidth": 1.5},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "size": {"field": "capacity", "type": "quantitative", "scale": {"range": [150, 3000]}, "title": "Capacity"},
        "color": {"field": "state", "type": "nominal", "title": "State"},
        "tooltip": [
          {"field": "stadium"},
          {"field": "city"},
          {"field": "state"},
          {"field": "capacity", "format": ","}
        ]
      }
    }
  ]
};

/* 2. CAPACITY LOLLIPOP */
const capacityChart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 760,
  "height": 390,
  "title": "The MCG Is Australia’s Largest Cricket Stage",
  "data": {
    "values": [
      {"stadium":"MCG","capacity":100024,"highlight":"Largest"},
      {"stadium":"Optus Stadium","capacity":61000,"highlight":"Other"},
      {"stadium":"Adelaide Oval","capacity":53500,"highlight":"Other"},
      {"stadium":"SCG","capacity":48000,"highlight":"Other"},
      {"stadium":"The Gabba","capacity":42000,"highlight":"Other"},
      {"stadium":"Bellerive Oval","capacity":20000,"highlight":"Other"},
      {"stadium":"Manuka Oval","capacity":13550,"highlight":"Other"}
    ]
  },
  "layer": [
    {
      "mark": {"type": "rule", "strokeWidth": 4},
      "encoding": {
        "y": {"field": "stadium", "type": "nominal", "sort": "-x", "title": null},
        "x": {"field": "capacity", "type": "quantitative", "title": "Capacity"},
        "color": {"field": "highlight", "scale": {"range": ["#d71920", "#888"]}, "legend": null}
      }
    },
    {
      "mark": {"type": "circle", "filled": true, "size": 220},
      "encoding": {
        "y": {"field": "stadium", "type": "nominal", "sort": "-x"},
        "x": {"field": "capacity", "type": "quantitative"},
        "color": {"field": "highlight", "scale": {"range": ["#d71920", "#888"]}, "legend": null}
      }
    },
    {
      "mark": {"type": "text", "align": "left", "dx": 10, "fontWeight": "bold"},
      "encoding": {
        "y": {"field": "stadium", "type": "nominal", "sort": "-x"},
        "x": {"field": "capacity", "type": "quantitative"},
        "text": {"field": "capacity", "format": ","}
      }
    }
  ]
};

/* 3. STADIUM TIERS */
const tiers = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 760,
  "height": 380,
  "title": "Australian Cricket Stadium Capacity Tiers",
  "data": {
    "values": [
      {"stadium":"MCG","capacity":100024,"tier":"Mega"},
      {"stadium":"Optus Stadium","capacity":61000,"tier":"Large"},
      {"stadium":"Adelaide Oval","capacity":53500,"tier":"Large"},
      {"stadium":"SCG","capacity":48000,"tier":"Medium"},
      {"stadium":"The Gabba","capacity":42000,"tier":"Medium"},
      {"stadium":"Bellerive Oval","capacity":20000,"tier":"Small"},
      {"stadium":"Manuka Oval","capacity":13550,"tier":"Small"}
    ]
  },
  "mark": {"type": "circle", "filled": true, "opacity": 0.85},
  "encoding": {
    "x": {"field": "tier", "type": "nominal", "sort": ["Small", "Medium", "Large", "Mega"], "title": "Capacity Tier"},
    "y": {"field": "capacity", "type": "quantitative", "title": "Capacity"},
    "size": {"field": "capacity", "type": "quantitative", "scale": {"range": [300, 3000]}, "legend": null},
    "color": {
      "field": "tier",
      "type": "nominal",
      "scale": {"range": ["#b7e4c7", "#74c69d", "#2d6a4f", "#ffcd00"]},
      "legend": null
    },
    "tooltip": [
      {"field": "stadium"},
      {"field": "tier"},
      {"field": "capacity", "format": ","}
    ]
  }
};

/* 4. TEST VS ODI RUN RATE */
const runrate = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 820,
  "height": 420,
  "title": {
    "text": "The Scoring Gap Between Test and ODI Cricket",
    "fontSize": 18,
    "fontWeight": "bold",
    "anchor": "middle"
  },
  "data": {
    "values": [
      {"year":1980,"Test":2.8,"ODI":4.2},
      {"year":1990,"Test":3.0,"ODI":4.6},
      {"year":2000,"Test":3.2,"ODI":5.0},
      {"year":2010,"Test":3.4,"ODI":5.6},
      {"year":2020,"Test":3.6,"ODI":6.2}
    ]
  },
  "layer": [
    {
      "mark": {"type":"area","opacity":0.22,"color":"#ffcd00"},
      "encoding": {
        "x": {"field":"year","type":"quantitative","axis":{"format":"d", "values":[1980,1990,2000,2010,2020]},"title":"Year"},
        "y": {"field":"Test","type":"quantitative","title":"Runs Per Over"},
        "y2": {"field":"ODI"}
      }
    },
    {
      "transform": [{"fold":["Test","ODI"],"as":["format","rate"]}],
      "mark": {"type":"line","point":{"filled":true,"size":70},"strokeWidth":4},
      "encoding": {
        "x": {"field":"year","type":"quantitative","axis":{"format":"d", "values":[1980,1990,2000,2010,2020]}},
        "y": {"field":"rate","type":"quantitative"},
        "color": {
          "field":"format",
          "scale":{"domain":["ODI","Test"],"range":["#0b3b25","#1f77b4"]},
          "legend":{"title":"Format"}
        },
        "tooltip":[
          {"field":"year"},
          {"field":"format"},
          {"field":"rate","title":"Runs per over"}
        ]
      }
    },
    {
      "data":{"values":[{"year":2011,"rate":5.25,"label":"The gap widens as limited-overs cricket accelerates"}]},
      "mark":{"type":"text","align":"left","fontWeight":"bold","fontSize":12,"color":"#1f2a24"},
      "encoding":{
        "x":{"field":"year","type":"quantitative"},
        "y":{"field":"rate","type":"quantitative"},
        "text":{"field":"label"}
      }
    }
  ],
  "config": {
    "axis": {"labelFontSize": 11, "titleFontSize": 12, "gridColor": "#e2e2e2"},
    "legend": {"labelFontSize": 12, "titleFontSize": 12},
    "view": {"stroke": null}
  }
};

/* 5. BBL RUN RATE FROM BBL JSON */
const bblRunrate = {
  "$schema":"https://vega.github.io/schema/vega-lite/v5.json",
  "width":760,
  "height":420,
  "title":{
    "text":"BBL Runs Per Over by Season",
    "fontSize":20,
    "fontWeight":"bold"
  },
  "data":{
    "values":[
      {"season":"2011/12","rate":7.83},
      {"season":"2012/13","rate":7.53},
      {"season":"2013/14","rate":7.89},
      {"season":"2014/15","rate":7.87},
      {"season":"2015/16","rate":8.24},
      {"season":"2016/17","rate":8.36},
      {"season":"2017/18","rate":8.11},
      {"season":"2018/19","rate":7.80},
      {"season":"2019/20","rate":8.15},
      {"season":"2020/21","rate":8.28},
      {"season":"2021/22","rate":8.12},
      {"season":"2022/23","rate":8.00},
      {"season":"2023/24","rate":8.22},
      {"season":"2024/25","rate":8.53},
      {"season":"2025/26","rate":8.58}
    ]
  },
  "layer":[
    {
      "mark":{"type":"area","color":"#ffcd00","opacity":0.30},
      "encoding":{
        "x":{"field":"season","type":"ordinal","title":"Season"},
        "y":{"field":"rate","type":"quantitative","title":"Runs Per Over"}
      }
    },
    {
      "mark":{"type":"line","stroke":"#005a32","strokeWidth":5,"point":{"filled":true,"size":80}},
      "encoding":{
        "x":{"field":"season","type":"ordinal"},
        "y":{"field":"rate","type":"quantitative"},
        "tooltip":[{"field":"season"},{"field":"rate"}]
      }
    }
  ],
  "config":{"view":{"stroke":null}}
};

/* 6. ICC HEATMAP */
const heatmap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 600,
  "height": 340,
  "title": "ICC Ratings Across Formats",
  "data": {
  "url": "rankings.csv"
},
  "layer": [
    {
      "mark": "rect",
      "encoding": {
        "x": {"field": "format", "type": "nominal", "title": "Format"},
        "y": {"field": "team", "type": "nominal", "title": "Team"},
        "color": {"field": "rating", "type": "quantitative", "scale": {"scheme": "blues"}},
        "tooltip": [{"field": "team"}, {"field": "format"}, {"field": "rating"}]
      }
    },
    {
      "mark": {"type": "text", "fontWeight": "bold"},
      "encoding": {
        "x": {"field": "format", "type": "nominal"},
        "y": {"field": "team", "type": "nominal"},
        "text": {"field": "rating"},
        "color": {"value": "black"}
      }
    }
  ]
};

/* 7. BUMP CHART */
const bump = {
  "$schema":"https://vega.github.io/schema/vega-lite/v5.json",
  "width":820,
  "height":430,
  "title":{
    "text":"ICC Ratings by Team and Format",
    "fontSize":18,
    "fontWeight":"bold"
  },

  "data":{
    "url":"rankings.csv"
  },

  "mark":"bar",

  "encoding":{
    "x":{
      "field":"team",
      "type":"nominal",
      "title":"Team"
    },

    "xOffset":{
      "field":"format"
    },

    "y":{
      "field":"rating",
      "type":"quantitative",
      "title":"Rating"
    },

    "color":{
      "field":"format",
      "type":"nominal"
    },

    "tooltip":[
      {"field":"team"},
      {"field":"format"},
      {"field":"rating"}
    ]
  }
};

/* 8. WORLD CUP WINS FROM ICC DATASET */
const worldCupWins = {
  "$schema":"https://vega.github.io/schema/vega-lite/v5.json",
  "width":760,
  "height":430,
  "title":{
    "text":"ICC Tournament Wins by Country",
    "fontSize":20,
    "fontWeight":"bold"
  },
  "data":{
    "values":[
      {"country":"Australia","wins":9},
      {"country":"India","wins":6},
      {"country":"West Indies","wins":5},
      {"country":"England","wins":3},
      {"country":"Pakistan","wins":3},
      {"country":"Sri Lanka","wins":2},
      {"country":"South Africa","wins":1},
      {"country":"New Zealand","wins":1}
    ]
  },
  "layer":[
    {
      "mark":{"type":"bar","cornerRadiusEnd":10},
      "encoding":{
        "y":{"field":"country","type":"nominal","sort":"-x","title":null},
        "x":{"field":"wins","type":"quantitative","title":"Tournament Wins"},
        "color":{
          "condition":{"test":"datum.country == 'Australia'","value":"#005a32"},
          "value":"#b7e4c7"
        },
        "tooltip":[{"field":"country"},{"field":"wins"}]
      }
    },
    {
      "mark":{"type":"text","align":"left","dx":8,"fontWeight":"bold","color":"#102f20"},
      "encoding":{
        "y":{"field":"country","type":"nominal","sort":"-x"},
        "x":{"field":"wins","type":"quantitative"},
        "text":{"field":"wins"}
      }
    }
  ],
  "config":{"view":{"stroke":null}}
};

/* 9. BBL ATTENDANCE */
const bbl = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 760,
  "height": 420,
  "title": "BBL Attendance Recovery by Season",

  "data": {
    "url": "bbl_crowds.csv"
  },

  "mark": {
    "type": "bar",
    "cornerRadiusTopLeft": 10,
    "cornerRadiusTopRight": 10
  },

  "encoding": {
    "x": {
      "field": "season",
      "type": "ordinal",
      "title": "Season"
    },

    "y": {
      "field": "total_attendance",
      "type": "quantitative",
      "title": "Total Attendance"
    },

    "color": {
      "field": "season",
      "type": "nominal",
      "scale": {
        "range": ["#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#005a32"]
      },
      "legend": null
    },

    "tooltip": [
      {"field": "season"},
      {"field": "total_attendance", "format": ","},
      {"field": "average_attendance", "format": ","}
    ]
  }
};

/* 10. BBL TOSS TRENDS FROM BBL JSON */
const tossTrends = {
  "$schema":"https://vega.github.io/schema/vega-lite/v5.json",
  "width":760,
  "height":420,
  "title":{
    "text":"BBL Toss Decisions by Season",
    "fontSize":20,
    "fontWeight":"bold"
  },
  "data":{
    "values":[
      {"season":"2011/12","decision":"Bat first","count":24},
      {"season":"2011/12","decision":"Bowl first","count":3},
      {"season":"2012/13","decision":"Bat first","count":15},
      {"season":"2012/13","decision":"Bowl first","count":13},
      {"season":"2013/14","decision":"Bat first","count":24},
      {"season":"2013/14","decision":"Bowl first","count":10},
      {"season":"2014/15","decision":"Bat first","count":16},
      {"season":"2014/15","decision":"Bowl first","count":18},
      {"season":"2015/16","decision":"Bat first","count":15},
      {"season":"2015/16","decision":"Bowl first","count":17},
      {"season":"2016/17","decision":"Bat first","count":7},
      {"season":"2016/17","decision":"Bowl first","count":28},
      {"season":"2017/18","decision":"Bat first","count":13},
      {"season":"2017/18","decision":"Bowl first","count":30},
      {"season":"2018/19","decision":"Bat first","count":10},
      {"season":"2018/19","decision":"Bowl first","count":49},
      {"season":"2019/20","decision":"Bat first","count":31},
      {"season":"2019/20","decision":"Bowl first","count":30},
      {"season":"2020/21","decision":"Bat first","count":19},
      {"season":"2020/21","decision":"Bowl first","count":42},
      {"season":"2021/22","decision":"Bat first","count":34},
      {"season":"2021/22","decision":"Bowl first","count":26},
      {"season":"2022/23","decision":"Bat first","count":29},
      {"season":"2022/23","decision":"Bowl first","count":32},
      {"season":"2023/24","decision":"Bat first","count":12},
      {"season":"2023/24","decision":"Bowl first","count":29},
      {"season":"2024/25","decision":"Bat first","count":2},
      {"season":"2024/25","decision":"Bowl first","count":40},
      {"season":"2025/26","decision":"Bat first","count":1},
      {"season":"2025/26","decision":"Bowl first","count":43}
    ]
  },
  "mark":{"type":"area","interpolate":"monotone","opacity":0.9},
  "encoding":{
    "x":{"field":"season","type":"ordinal","title":"Season"},
    "y":{"field":"count","type":"quantitative","stack":"normalize","title":"Share of Toss Decisions"},
    "color":{
      "field":"decision",
      "type":"nominal",
      "scale":{"range":["#ffcd00","#005a32"]}
    },
    "tooltip":[{"field":"season"},{"field":"decision"},{"field":"count"}]
  },
  "config":{"view":{"stroke":null}}
};

/* 11. VENUE SCORING FROM BBL JSON */
const venueScoring = {
  "$schema":"https://vega.github.io/schema/vega-lite/v5.json",
  "width":760,
  "height":430,
  "title":{
    "text":"Highest Scoring BBL Venues",
    "fontSize":20,
    "fontWeight":"bold"
  },
  "data":{
    "values":[
      {"venue":"Gabba, Brisbane","runs":344.8},
      {"venue":"Docklands Stadium","runs":319.4},
      {"venue":"WACA Ground","runs":318.4},
      {"venue":"Adelaide Oval","runs":315.9},
      {"venue":"Bellerive Oval","runs":315.4},
      {"venue":"Manuka Oval","runs":311.0},
      {"venue":"Perth Stadium","runs":305.9}
    ]
  },
  "layer":[
    {
      "mark":{"type":"rule","strokeWidth":6,"color":"#d4d4d4"},
      "encoding":{
        "y":{"field":"venue","type":"ordinal","sort":"-x","title":null},
        "x":{"field":"runs","type":"quantitative","title":"Average Match Runs"}
      }
    },
    {
      "mark":{"type":"circle","size":420,"color":"#005a32","stroke":"white","strokeWidth":4},
      "encoding":{
        "y":{"field":"venue","type":"ordinal","sort":"-x"},
        "x":{"field":"runs","type":"quantitative"},
        "tooltip":[{"field":"venue"},{"field":"runs"}]
      }
    },
    {
      "mark":{"type":"text","align":"left","dx":10,"fontWeight":"bold","color":"#102f20"},
      "encoding":{
        "y":{"field":"venue","type":"ordinal","sort":"-x"},
        "x":{"field":"runs","type":"quantitative"},
        "text":{"field":"runs"}
      }
    }
  ],
  "config":{"view":{"stroke":null}}
};

/* 12. BBL TEAMS MAP */
const stateMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 760,
  "height": 500,
  "title": "Big Bash League Teams Across Australia",
  "projection": {"type": "mercator", "center": [134, -28], "scale": 700},

  "layer": [
    {
      "data": {
        "url": "https://raw.githubusercontent.com/vega/vega-datasets/main/data/world-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },
      "transform": [
        {"filter": "datum.id == 36"}
      ],
      "mark": {
        "type": "geoshape",
        "fill": "#eeeeee",
        "stroke": "#999999"
      }
    },

    {
      "data": {
        "url": "bbl_teams.csv"
      },

      "mark": {
        "type": "circle",
        "opacity": 0.9,
        "stroke": "white",
        "strokeWidth": 2
      },

      "encoding": {
        "longitude": {
          "field": "lon",
          "type": "quantitative"
        },

        "latitude": {
          "field": "lat",
          "type": "quantitative"
        },

        "size": {
          "field": "titles",
          "type": "quantitative",
          "scale": {
            "range": [250, 2500]
          },
          "title": "BBL Titles"
        },

        "color": {
          "field": "city",
          "type": "nominal",
          "title": "City"
        },

        "tooltip": [
          {"field": "team"},
          {"field": "city"},
          {"field": "titles", "title": "BBL Titles"}
        ]
      }
    }
  ]
};
vegaEmbed("#map", stadiumMap, embedOpt);
vegaEmbed("#capacity", capacityChart, embedOpt);
vegaEmbed("#tiers", tiers, embedOpt);
vegaEmbed("#runrate", runrate, embedOpt);
vegaEmbed("#bblRunrate", bblRunrate, embedOpt);
vegaEmbed("#heatmap", heatmap, embedOpt);
vegaEmbed("#bump", bump, embedOpt);
vegaEmbed("#worldCupWins", worldCupWins, embedOpt);
vegaEmbed("#bbl", bbl, embedOpt);
vegaEmbed("#tossTrends", tossTrends, embedOpt);
vegaEmbed("#venueScoring", venueScoring, embedOpt);
vegaEmbed("#stateMap", stateMap, embedOpt);
