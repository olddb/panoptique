angular.module('D3GroupeHemiCtrl', []).controller('D3GroupeHemiController', function($scope) {
  //Creation de la hierarchie
  var assemblee = {
    nom : "",
    children : $scope.hemi
  };
  root = d3.hierarchy(assemblee)
      .sum(function(d)      { return d.size; })
      .sort(function(a, b)  { return b.value - a.value; });

  console.log('{D3GroupeHemiCtrl}');

  //
  // $scope.bjr = function () {
  //   console.log('$scope.hello = ' + $scope.hello);
  // };

  function bindEvents () {
    d3.selectAll('.groupeHemi,.deputeHemi').on("mouseover", function(){
      var that = d3.select(this);
      var parti = that.attr('data-parti');
      // console.log('parti FIRST => ' +  parti);
      if (that.attr('class').includes('deputeHemi')) {
        d3.selectAll('.groupeHemi').filter(function (d){
          return parti === d.data.nom;
        }).select('text').attr("opacity", "0");
      }
      else {d3.select(this).select('text').attr("opacity", "0");}
      d3.selectAll('.deputeHemi')
        .filter(function (d){ return parti === d.data.partiPolitique; })
        .attr("visibility", 'visible')
        .attr('opacity', '1');
        // .attr("class", "fadeInSpeed");
    });
    d3.selectAll('.groupeHemi,.deputeHemi').on("mouseout", function(){
      d3.selectAll('.deputeHemi').attr('opacity', '0');
      d3.selectAll('.groupeHemi').select('text').attr("opacity", "1");
    });
    d3.selectAll('.deputeHemi').on('click', function (d) {
      hello = d3.select(this).attr('data-name');
      // alert(d3.select(this).attr('data-name'));
    })
  };

  function resizeHemi () {
    console.log('{resizeHemi}');
    // Responsive layout
    var width = d3.select('#hemi').style("width");
    width = width.substring(0, (width.length - 2));
    d3.select('#hemi').attr("height", width);

    var svg = d3.select("svg"),
        diameter = width,
        g = svg.append("g").attr("transform", "translate(2,2)"),
        format = d3.format(",d");

    g.attr('id', 'hemiG');
    var pack = d3.pack()
        .size([diameter - 4, diameter - 4]);

    var node = g.selectAll(".node")
      .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function(d) {
          return (d.value > 700 ? 'assemblee node' : d.value == 1 ? 'deputeHemi node' : "groupeHemi node");
        })
        .attr('data-parti', function(d) {
          return d.data.partiPolitique || d.data.nom;
        })
        .attr('data-name', function(d) {
          return d.data.nom;
        })
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      d3.selectAll('.deputeHemi')
        .attr("visibility", "hidden");

        // $scope.$apply();

    node.append("title")
        .text(function(d) { return d.value === 1 ? d.data.nom : ''; });

    node.append("circle")
        .attr("r", function(d) { return d.r; });

    node.filter(function(d) { return d.children; }).append("text")
        .attr("dy", "0.3em")
        .attr('font-size', function (d){
          return (10 + d.value / 10)
        })
        .text(function(d) { return d.data.groupe_sigle; });
  }

  resizeHemi(); // must be call at window's resize
  bindEvents();

  $scope.bonjour = function () {
    alert('bonjour');
  };

});
