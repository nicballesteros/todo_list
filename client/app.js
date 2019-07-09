const URL = "http://192.168.2.55:5000/api/v1/todos/";

function getTodo(){
    $.ajax({
        url: URL,
        type: 'GET',
        crossDomain: true,
        success: function(result){
            console.log(result);
        },
        error: function(){
            console.log("error thrown");
        }
    });
}

$(document).ready(function(){ 
    getTodo();

    $('#add').click(function(){
        //parse data
        
        
        let jsonObj = { title: "nic", description: "nic2"};
        let jsonData = JSON.stringify(jsonObj, null, 2);
        //jsonData = jsonData.serialize();
        console.log(jsonData);
        //api call
        $.ajax({
            url: URL,
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: jsonData,
            success: (result) => {
                console.log(result);
                getTodo();
            },
            error: (err) => {
                console.log(err);
                console.log("error");
            }
        });
    });
    
    $('#delete').click(function(){
        let id = 2;
        
        
        
        $.ajax({
            url: URL + id,
            type: 'DELETE',
            contentType: 'application/x-www-form-urlencoded',
            success: function(result){
                console.log(result);
            },
            error: (err) => {
                console.log(err);            
            }
        });
    });
    $('#update').click(function(){
       console.log("add"); 
    });
    $('#reload').click(function(){
       console.log("add"); 
    });
});