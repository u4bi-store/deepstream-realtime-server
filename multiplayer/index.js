var 
    uid = new Date().getTime();

var 
    name = prompt("사용하실 닉네임을 입력해주세요" );

var 
    ds;

ds = deepstream( 'localhost:6020' ).login({}, function(success){
    console.log(success);

});

ds.record.getRecord('player/'+uid).whenReady(function(record){
    
    record.set({
        uid  : uid,
        name : name,
        hp   : 100,
        position : {
            x : 0,
            y : 0,
            z : 0
        },
        moving: false
    });

    console.log(record.get());


    window.onkeydown = function(e){
    
        if(e.keyCode === 38 || e.keyCode === 37 ||e.keyCode ===  40 || e.keyCode === 39){
            record.set('moving', true);
            console.log(record.get('moving'));
        }

    };

    window.onkeyup = function(e){

        if(e.keyCode === 38 || e.keyCode === 37 ||e.keyCode ===  40 || e.keyCode === 39){
            record.set('moving', false);
            console.log(record.get('moving'));
        }
    
    }

    ds.event.subscribe( 'status/'+uid, function(data){
        console.log(data);

    });
    
    ds.event.listen( 'status/.*', playerOnlineStatusChanged.bind(this));
    
    
});

function playerOnlineStatusChanged(match, isSubscribed){
    console.log(match, isSubscribed);

}
