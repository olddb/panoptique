//using https://github.com/Caged/d3-tip

angular.module('D3TimelineCtrl', []).controller('D3TimelineController', function($scope) {


  $scope.themes = [];

  $scope.filterTheme = {nom: '', couleur: ''};
  $scope.filterDep = {nom: '', groupe: '', positionnements: {}};

  $scope.displayHoverTheme = {nom: '', couleur: ''};
  $scope.displayHoverDep = {nom: '', groupe: ''};

  $scope.pourcentagePour = 0;
  $scope.pourcentageContre = 0;
  $scope.pourcentageAbstention = 0;

  $scope.depIsActive = false;
  $scope.hasNoResult = false;
  $scope.depIsLoading = true;

  var filteringByGroups = false;

  var dom = {
      svg: undefined,
      lois: undefined,
      deputes: undefined,
      themes: undefined,
  }
  var lois = undefined;
  var themes = undefined;
  var deputes = undefined;


  // function init
  

  $scope.initFilters = function() {
    // console.log("click initfilters");

    $scope.hasNoResult = false;

    //reinit percentages
    $scope.depIsActive = false;

    //reinit deputes
    $scope.filterDep.nom = '';
    deputes.attr('class', 'depute');

    //reinit themes
    $scope.filterTheme.nom = '';
    themes.attr('class', 'theme');

    //reinit lois
    lois.attr('class', '');

    if (!$scope.$$phase && !$scope.$root.$$phase){
      $scope.$apply();
    }
  };



var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 760 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  //var init = $scope.$watch("lois", function(newValue, oldValue) {
  $scope.$watch("lois", function(newValue, oldValue) {
    

    // console.log("oldValue: ", oldValue);
    // console.log("newValue: ", newValue);

    if (!$scope.lois || ($scope.lois && $scope.lois.length === 0)){
      return;
    }


    
    // console.log("$scope.lois: ", $scope.lois);
    // init();



    // var margin = {top: 40, right: 20, bottom: 30, left: 40},
    

    var x = d3.scaleBand()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var offset = 10;

    var xAxis = d3.axisBottom()
      .scale(x)
      .tickValues([])
      .tickSizeOuter(offset);


    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // to do: custom color range because only 20 with schemeCategory20
    // var length = 25;
    // var color = d3.scaleLinear()
    //       .domain([1,length])
    //       .interpolate(d3.interpolateHcl)
    //       .range([d3.rgb("#FF0000"), d3.rgb('#0000FF')]);


    var unique_themes = $scope.lois.reduce(function(themes, loi ) { //list of unique themes
      if (themes.indexOf( loi.theme ) < 0) themes.push(loi.theme);
      return themes;
    }, []);

    unique_themes.sort(function(a, b){ //sort alphabetically

      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });

    $scope.themes = unique_themes.map(function(nom, i){
      return {nom: nom, couleur: color(i)};
    });



    var timeline = d3.select("#timeline")
      .append("svg")
        .attr("viewBox", "0 0 "+(width + margin.left + margin.right)+" "+(height*2/3 + margin.top + margin.bottom))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height*2/3 + margin.top + margin.bottom)

      //STRIPES
      .append("defs")
      .append("pattern")
        .attr('id','diagonalStripes')
        .attr('width','4')
        .attr('height','10')
        .attr('patternUnits','userSpaceOnUse')
        .attr('patternTransform','rotate(60)')
      .append("rect")
        .attr('width','1')
        .attr('height','10')
        .attr('transform','translate(0,0)')
        .attr('fill','white')


    var svg = d3.select("svg")
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var data = $scope.lois
                //.slice(0,99); //slice pour dév, pas utile en prod
                .sort(function(a, b){ //sort par numScrutin
                  if(a.numScrutin < b.numScrutin) return -1;
                  if(a.numScrutin > b.numScrutin) return 1;
                  return 0;
                });
    


    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-6, 0])
      .html(function(d, i) {

        var positionDep = '';
        if($scope.filterDep.nom!==''){
          for (var position in $scope.filterDep.positionnements) {
            if($scope.filterDep.positionnements[position].indexOf(d.numScrutin) > -1){
              positionDep = position;
            }
          }
          if(positionDep===''){
            positionDep = "absent ou non député";
          }
          positionDep = positionDep.replace('nonVotants', 'non votant');
        }

        var couleur = '';
        $scope.themes.map(function(theme, i){
          if(theme.nom==d.theme){
            couleur = theme.couleur;
          }
        });

        var tooltipContent = '<span class="tip-theme" style="color:'+couleur+'">'+d.theme +'</span>';
        tooltipContent += '<br>';
        tooltipContent += '<div class="tip-nom">'+ d.nomAlt +'</div>';
        if(positionDep!==''){
          tooltipContent += '<span class="tip-position">'+positionDep+'</span>';
        }      
        return tooltipContent;

        // return '<span style="color:'+color(couleur)+'">'+d.theme +'</span><br>'+ d.nomAlt +'<br>'+ d.dateDuVote + '<br>'+ positionDep;
        // return d.theme +'<br>'+ d.nomAlt +'<br>'+ d.dateDuVote +'<br>n°'+ d.numScrutin +'<br>'+ d.nombreDeVotant +'votants';
      });

    svg.call(tip);


    x.domain(data.map(function(d) { return d.numScrutin; }));


    var chartDates = [];
    data.forEach(function(d, i, array) {
      d.dateDuVote = d.dateDuVote.substring(0,4);
      if (i === 0) d.first = true; else if (d.dateDuVote != array[i - 1].dateDuVote) d.first = true;
      if (i === array.length - 1) d.last = true; else if (d.dateDuVote !== array[i + 1].dateDuVote) d.last = true;
      if (d.first) chartDates.push({
        date: d.dateDuVote,
        start: x(d.numScrutin)
      });
      if (d.last){
        chartDates[chartDates.length - 1].end = 
        i === array.length - 1 ? 
          x(d.numScrutin)+ x.bandwidth() : 
          ((x(d.numScrutin) + x(array[i + 1].numScrutin) + x.bandwidth()) / 2);
      }
    });


    y.domain([0, 1]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    // Lois rects
    lois = svg.selectAll(".bar")
        .data(data)
      .enter().append("a")
        .attr("class", "lienLoi")
        .attr("xlink:href", function(d) { return '/nicole?id=' + d.numScrutin; })
      .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.numScrutin); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(1-1/6); })
        // .attr("height", function(d) { return height; })
        .attr("height", function(d) { return height/3; })
        .attr("fill", function(d,i) { return color(unique_themes.indexOf(d.theme)); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);




    // Date axis

    var dates = svg.selectAll("g.chartDate")
        .data(chartDates)
      .enter().append("g")
        .attr("class", "chartDate")
        .attr("transform", "translate(" + 0 + "," + ((height*2/3 + margin.top + margin.bottom) + offset) + ")");

    dates.append("text")
      .attr("x", function(v) { return ( v.start + v.end) / 2; })
      .attr("y", -offset/2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .text(function(v) { return v.date; });

    dates.append("path")
      .attr("d", function(v) {
        var t = d3.select(this.parentNode).select("text").node().getBBox(),
            ttop = [t.x + t.width / 2, t.y];
        // console.log("v, t, ttop: ", v, t, ttop);
        // return "M" + v.start + ",0" + "V-20";
      return "M" + v.start + ",0" + "V" + -(offset);
      });



    dom.themes = d3.select('.themes');
    themes = dom.themes.selectAll('.theme').data($scope.themes).enter().append('div');
    
    themes
        .classed('theme', true)
        .attr('title', function(val) { return val.nom; })

        .attr('style', function(val) { return 'color:'+val.couleur+';border-color:'+val.couleur; })
        .on('click', function(val) { toggleTheme(val); })
        .on('mouseover', function(val) { hoverTheme(val); })
        .on('mouseout', function(val) { hoverTheme(); })
        .text(function(val) {
          return val.nom;
        })
      .append('span')
        .text('\u00A0X');


    function toggleTheme(theme) {

      //remove percentages
      $scope.depIsActive = false;

      //reinit depute filter
      $scope.filterDep.nom = '';
      deputes.attr('class', 'depute');

      if($scope.filterTheme.nom == theme.nom){
        $scope.filterTheme.nom = '';
      }else{  
        $scope.filterTheme = {nom: theme.nom, couleur: theme.couleur};
      }
      $scope.$apply();

      var filterTheme = $scope.filterTheme.nom;

      themes.attr('class', function(l) {
        return (filterTheme !== undefined && filterTheme == l.nom) ? 'theme active' : 'theme';
      })

      
    }

    function hoverTheme(theme) {
      // console.log("theme: ", theme);


      //remove percentage on hover, put in back on out
      if(theme){
        $scope.displayHoverTheme = {nom: theme.nom, couleur: theme.couleur};
        $scope.depIsActive = false;

        deputes.attr('class', 'depute'); //we disable depute selection temporarly
      }else{
        $scope.displayHoverTheme = {nom: '', couleur: ''};
        if($scope.filterDep.nom!==''){
          $scope.depIsActive = true;
        }

        var filterDepNom = $scope.filterDep.nom;
        if(filterDepNom!==''){ //we restore depute if one is selected
          deputes.attr('class', function(l) {
            return (filterDepNom !== undefined && filterDepNom == l.nom) ? 'depute active' : 'depute';
          })
        }
      }
      $scope.$apply();
      
      var filterTheme = $scope.filterTheme.nom;
      var filterDep = $scope.filterDep;

      lois
        .attr('class', function(l) {
          // console.log("l: ", l);

          //mouse out, when a depute is selected
          if(theme === undefined && filterTheme==='' && filterDep.nom!==''){
            var positionClass = 'none';
            for (var position in filterDep.positionnements) {
              if(filterDep.positionnements[position].indexOf(l.numScrutin) > -1){
                positionClass = position;
              }
            }
            return positionClass.toString().toLowerCase();
          }


          return ((theme !== undefined && theme.nom == l.theme) || filterTheme == l.theme ) ? 'active' : '';
      })
    }


  });

  
  $scope.$watch("filterText", function(text) {
    if(!deputes){
      return;
    }    

    //reinit filters
    $scope.initFilters();

    var filterText = text && text.toLowerCase().split(' ')

    var firstDepute = {nom: '', groupe: '', positionnements: {}};


      

    deputes
      .sort(function(a, b) { //to keep order (by group or alpha)
        return filteringByGroups ?
          d3.ascending(formatGroup(a.groupe), formatGroup(b.groupe)) :
          d3.ascending(a.nom, b.nom);
      })
      .attr('class', function(row, i) {
      
      // var hasMatch = Object.keys(row).some(function (key) { //search in all row
      var hasMatch = Object.keys({nom: row.nom}).some(function (key) { // search only in name

        var allKeywordsMatch = true;
        for (var i = 0; i < filterText.length; i++) {
            if (String(row[key]).toLowerCase().indexOf(filterText[i]) === -1) {
                allKeywordsMatch = false;
            }
        }
        return allKeywordsMatch;
      })


      //pour activer le premier député quand on filtre
      if(text!=='' && firstDepute.nom==='' && hasMatch){
        firstDepute = {nom: row.nom, groupe: formatGroup(row.groupe), positionnements: row.positionnements};
        hoverDepute(firstDepute); //on simule un hover
        $scope.filterDep = firstDepute; //on garde le depute
        return 'depute depute-isFirst';
      }
      
      return hasMatch ? 'depute' : 'depute depute-hidden';
    })


    if(text==='' || firstDepute.nom===''){
      $scope.filterDep.nom = '';
      $scope.displayHoverDep = {nom: '', groupe: ''};
      
      if(firstDepute.nom===''){
        $scope.hasNoResult = true;
      }
      if(text===''){
        $scope.hasNoResult = false;
      }
    }




  });



  function formatGroup(groupe) {

    var translations =  [
                          //DROITE
                          {'Groupe Les Républicains':'LR'},
                          {'Groupe de l\'union pour un mouvement populaire':'LR'}, //on fusionne
                          // {'Groupe de l\'union pour un mouvement populaire':'UMP'}, //c'est devenu LR
                          
                          //CENTRE DROIT
                          {'Groupe de l\'union des démocrates et indépendants': 'UDI'},

                          //CENTRE GAUCHE
                          {'Groupe radical, républicain, démocrate et progressiste' : 'RRDP'},

                          {'Groupe socialiste, écologiste et républicain' : 'SER'},
                          {'Groupe socialiste, républicain et citoyen' : 'SER'}, //on fusionne
                          // {'Groupe socialiste, républicain et citoyen' : 'SRC'}, //c'est devenu SER

                          //GAUCHE                    
                          {'Groupe écologiste' : 'ECO'}, //abbréviation n'existe pas j'ai l'impression
                          {'Groupe de la gauche démocrate et républicaine' : 'GDR'},

                          //Non inscrits
                          {'Non inscrits' : '---'}
    ];

    var filtre = translations.filter(function(translation, i){
      return Object.keys(translation)[0] === groupe;
    });

    if(filtre.length){ //if we have a match
      return filtre[0][groupe];
    }
    return groupe; //otherwise we keep the unformated name

  }



  $scope.filterIt = function() {
      
    if(filteringByGroups){
      deputes.sort(function(a, b) {
        return d3.ascending(a.nom, b.nom);
      });
    }else{
      deputes.sort(function(a, b) {
        return d3.ascending(formatGroup(a.groupe), formatGroup(b.groupe));
      });
    }

    filteringByGroups = !filteringByGroups;
  };

  $scope.$watch("deputes", function(newValue, oldValue) {

    if (!$scope.deputes || ($scope.deputes && $scope.deputes.length === 0)){
      return;
    }

    $scope.depIsLoading = false;


    dom.deputes = d3.select('.deputes');
    deputes = dom.deputes.selectAll('.depute')
              .data($scope.deputes)
              .enter().append('div');

    deputes
        .classed('depute', true)      
        .on('click', function(val) { toggleDepute(val); })
        .on('mouseover', function(val) { hoverDepute(val); })
        .on('mouseout', function(val) { hoverDepute(); })
      .append('div')
        .attr('class', 'depute-nom')
        .text(function(val) {
          return val.nom;
        })


    var partis = deputes
        .append('div')
          .attr('class', 'depute-parti')
          .text(function(val) {
            return formatGroup(val.groupe);
        });

  });


    function toggleDepute(depute) {

      // console.log("depute: ", depute);

      //reinit theme filter
      $scope.filterTheme.nom = '';
      themes.attr('class', 'theme');

      if($scope.filterDep.nom == depute.nom){
        $scope.filterDep.nom = '';    
      }else{
        $scope.filterDep = {nom: depute.nom, groupe: formatGroup(depute.groupe), positionnements: depute.positionnements};
      }
      if (!$scope.$$phase && !$scope.$root.$$phase){
        $scope.$apply();
      }

      
      var filterDepNom = $scope.filterDep.nom;    

      deputes
        .attr('class', function(l) {
          return (filterDepNom !== undefined && filterDepNom !== '' && filterDepNom == l.nom) ? 'depute active' : 'depute';          
      })
      
    }

    function hoverDepute(depute) {
      
      if(depute){
        var pour = depute.positionnements['pour'].length;
        var contre = depute.positionnements['contre'].length
        var abstention = depute.positionnements['abstention'].length;
        var total = (pour + contre + abstention);
        $scope.pourcentagePour = Math.round(pour*100/total);
        $scope.pourcentageContre = Math.round(contre*100/total);
        $scope.pourcentageAbstention = Math.round(abstention*100/total);
      }
      

      if(depute){
        $scope.displayHoverDep = {nom: depute.nom, groupe: formatGroup(depute.groupe)};
        $scope.depIsActive = true;

        themes.attr('class', 'theme'); //we disable theme selection temporarly
      }else{
        $scope.displayHoverDep = {nom: '', groupe: ''};
        if($scope.filterDep.nom===''){
          $scope.depIsActive = false;
        }

        var filterTheme = $scope.filterTheme.nom;
        if(filterTheme!==''){ //we restore theme if one is selected
          themes.attr('class', function(l) {
            return (filterTheme !== undefined && filterTheme == l.nom) ? 'theme active' : 'theme';
          })
        }
      }      
      if (!$scope.$$phase && !$scope.$root.$$phase){
        $scope.$apply();
      }

      //
      //todo: optimiser ça
      //
      lois.attr('class', function(d) {

        if(!depute){

          var filterTheme = $scope.filterTheme.nom;
          if(filterTheme==d.theme){ //keeping active theme filter
            return 'active';
          }

          var filterDep = $scope.filterDep;
          if(filterDep.nom===''){
            return '';
          }
          depute = filterDep;
        }


        var positionClass = 'none';
        for (var position in depute.positionnements) {          
          if(depute.positionnements[position].indexOf(d.numScrutin) > -1){
            positionClass = position;
          }
        }
        return positionClass.toString().toLowerCase();
      })

    }


  console.log('{D3TimelineCtrl}');


});