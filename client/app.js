const URL = "http://192.168.2.55/api/v1/todos/";

function getTodo(){
    $.ajax({
        url: URL,
        type: 'GET',
        crossDomain: true,
        success: function(){
            console.log(result);
            console.log("hello");
        },
        error: function(){
            console.log("error thrown");
        }
    });
}

$(document).ready(function(){ 
    getTodo();
    
    $('#add').click(function(){
        $.ajax({
            url: URL,
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'application/json',
            data: {title: nic, description: nic2},
            success: function(){
                console.log(result);
            }
        });
    });
    
    $('#delete').click(function(){
       console.log("add"); 
    });
    $('#update').click(function(){
       console.log("add"); 
    });
    $('#reload').click(function(){
       console.log("add"); 
    });
});