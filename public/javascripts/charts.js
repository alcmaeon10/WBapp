var googleChart = angular.module("google-chart",[])
    .directive("googleChart",function(){  
        return {
            restrict : "A",
            link: function($scope, $elem, $attr){
                var data = $scope[$attr.ngModel].dataTable;
                
                var options = {
                'title': 'Earthquake Register',
                'width':700,
                'height':700,
                'isStacked': 'true'
                };
              
            //   setTimeout(function(){
            //     var googleChart = new google.visualization[$attr.googleChart]($elem[0])
            //         .draw(data,options)
            //         console.log("here")
            //     },500)
            var googleChart = new google.visualization[$attr.googleChart]($elem[0])
            $scope.$on('updates',function(){
                    googleChart.draw(data,options)
            })
            }
        }
});