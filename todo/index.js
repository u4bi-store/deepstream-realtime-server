var 
    element = document.getElementById('board');

var client = deepstream('localhost:6020'),
    board;

client.login({}, function(success){
    console.log(success);

    /*  List
        https://deepstream.io/docs/client-js/datasync-list

    */
    board = client.record.getList('todo');

    board.whenReady(function(){
        console.log(board.getEntries());

        board.getEntries().forEach(function(entry){
            
            console.log(entry);

            element.appendChild(create(entry));

        });

        board.subscribe(function(entries){
            console.log('subscribe : ',entries);
            
            element.innerHTML = '';

            entries.forEach(function(entry){

                element.appendChild(create(entry));

            });

        });

        board.on('entry-added', function(recordName, index){
            console.log('add ', recordName, index);

        });

        board.on('entry-removed', function(recordName, index){
            console.log('remove ', recordName, index);

        });

    });

});


function add(content){
    board.addEntry(content);
    
}

function remove(content){
    board.removeEntry(content);
    
}

function create(value){
    var 
        li = document.createElement('li');
        
    li.innerText = value;

    return li;
}