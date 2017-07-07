var 
    app = angular.module("app", []);

app.controller('ctrl', function($scope, deepstream){
    deepstream.login({username: 'df'}, function(success){
        console.log(success);
    });

    
    var record = deepstream.record.getRecord('test/game'),
        uid    = null,
        timer  = {};
    

    init();
    
    record.subscribe(function(data){
        console.log('score : ', data);

        if($scope.$$phase == '$apply' || $scope.$$phase == '$digest'){
            $scope.player1 = data.player1;
            $scope.player2 = data.player2;
        }else{
            $scope.$apply(function() {
                $scope.player1 = data.player1;
                $scope.player2 = data.player2;
            });
        }

    });

    function shot(key){
        record.set(key, record.get(key)+1);
    }

    function init(){
        // record.set('len', 0);
        
        record.set('player1', 0);
        record.set('player2', 0);
    }

    $scope.join = function(){
        var 
            len = record.get('len');

        if(uid !== null)return alert('이미 참여중');

        switch(len){
            case 0 :
                uid = 'player1';
                record.set('len', 1);

                console.log(uid);
                timer[uid] = setInterval(function(){
                    shot(uid);

                }, 1500);
                break;
            case 1 :
                uid = 'player2';
                record.set('len', 2);

                console.log(uid);
                timer[uid] = setInterval(function(){
                    shot(uid);

                }, 2500);
                break;
            default : break;
        }

    };

    $scope.exit = function(){
        console.log('exit');

        if(uid === null)return alert('참여중이지 않음');

        clearInterval(timer[uid]);
        var len = record.get('len');
        record.set('len', len-1);
        uid = null;

    };

});



/* 딥스트림 */
app.service('deepstream', function(){
    return deepstream('localhost:6020');
    
});