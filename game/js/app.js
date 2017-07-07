var 
    app = angular.module("app", []);

app.controller('ctrl', function($scope, deepstream){
    deepstream.login({username: 'df'}, function(success){
        console.log(success);
    });


    var
        record = deepstream.record.getRecord('test/game');
    init();
    
    record.subscribe(function(data){
        console.log('score : ', data);

        $scope.$apply(function(){
            $scope.player1 = data.player1;
            $scope.player2 = data.player2;

        });

    });

    record.subscribe('len', function(data){
        console.log('join length : ', data);
    });

    setInterval(function(){
        shot('player1');

    }, 1500);

    setInterval(function(){
        shot('player2');

    }, 2500);

    function shot(key){
        record.set(key, record.get(key)+1);
    }

    function init(){
        record.set('len', 0);
        record.set('player1', 0);
        record.set('player2', 0);
    }

});



/* 딥스트림 */
app.service('deepstream', function(){
    return deepstream('localhost:6020');
    
});