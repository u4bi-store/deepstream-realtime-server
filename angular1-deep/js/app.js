var 
    app = angular.module("app", []);

app.controller('ctrl', function($scope, deepstream, bindFields, scopeApply){
    console.log(deepstream);

    var
        record = deepstream.record.getRecord('test/johndoe');

    bindFields($scope, record, ['name', 'age']);






    /* event */
    $scope.eventText = '';
    $scope.eventReceive = [];

    $scope.eventClick = function(){
        console.log('클릭');
        deepstream.event.emit('data', $scope.eventText);

    };

    deepstream.event.subscribe('data', function(item){
        $scope.eventReceive.push(item);

        scopeApply($scope);

    });






    /* rpc call */
    
    deepstream.rpc.provide( 'rpc-sum', function(data, response){
        console.log(data);
        response.send(data.a + data.b);

    });

    deepstream.rpc.make( 'rpc-sum', { a : 6, b : 7 }, function(err, response){

        $scope.result = response;
        scopeApply($scope);
    });

});



/* 딥스트림 프로바이더 */
app.service('deepstream', function(){
    return deepstream('localhost:6020').login({username: 'u4bi'});
});

app.service('scopeApply', function(){
    return function (scope){

      if(!scope.$$phase ) scope.$apply();

    }    
});

app.service('bindFields', function(scopeApply){
    return function getField(scope, record, names) {
        
        // 필드 바인딩 : https://deepstream.io/tutorials/integrations/frontend-angular/

        angular.forEach(names, function(name){

            Object.defineProperty(scope, name, {

                get: function() {
                    return record.get(name);

                },
                set: function(newValue) {
                    if(newValue === undefined)return;

                    record.set(name, newValue);

                }
            });

        });

        record.subscribe(function() {
            scopeApply(scope)
        });

    }

});