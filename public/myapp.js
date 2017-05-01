/*We need to manually start angular as we need to
wait for the google charting libs to be ready*/  
/*google.setOnLoadCallback(function () {  
    angular.bootstrap(document, ['my-app']);
});*/

 var myApp = angular.module("my-app",["google-chart"])
    .controller("IndexCtrl",['$rootScope','$scope','$http',function($rootScope,$scope,$http){  
         
         $scope.content = {};
        var array = [];
        var dataTable = new google.visualization.DataTable();
         dataTable.addColumn("string","Earthquakes")
         dataTable.addColumn("number","Data")
         $scope.data2 = {title: "Earth Quakes",
                        dataTable: dataTable};
         
       
        $http.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
            .then(function(res){
               $scope.content = res;
                var features=res.data.features;
                features.forEach(function(feature){
                    var name=feature.properties.place;
                    array.push([name,feature.properties.mag])
                })
               /* for (var i=0; i<features.length;i++){
                    var name = features[i].properties.place
                    array.push([name,features[i].properties.mag])
                }*/
             
              //  console.log($scope.content.data.features[3].properties)
                $scope.data2.dataTable.addRows(array)         
                $rootScope.$broadcast('updates')
            })
            
    }]);

google.load('visualization', '1', {packages: ['corechart']});