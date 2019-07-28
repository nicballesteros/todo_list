const URL = "http://192.168.2.55:5000/api/v1/todos/";

function loadTable(){
    $("#todolist").find("tr:gt(0)").remove();
    
    $.ajax({
        url: URL,
        type: 'GET',
        crossDomain: true,
        success: function(result){
            let arr = result.todos;
            console.log(arr);
            for(let i = 0; i < arr.length; i++){
                $('#todolist').append("<tr id=\"row" + (i + 1) + "\"></tr>");
                $('#row' + (i + 1)).append("<td>" + arr[i].id + "</td>");
                $('#row' + (i + 1)).append("<td>" + arr[i].title + "</td>");
                $('#row' + (i + 1)).append("<td>" + arr[i].description + "</td>");
            }
        },
        error: function(){
            console.log("error thrown");
        }
    });
}

$(document).ready(function(){     
    loadTable();
    
    $('#add').click(function(){
        let name = $('#name').val();
        let desc = $('#desc').val();
        
        if(name != "" && desc != ""){
            let jsonObj = { title: name, description: desc};
            let jsonData = JSON.stringify(jsonObj, null, 2);
            
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
                    loadTable();
                },
                error: (err) => {
                    console.log(err);
                    console.log("error");
                }
            });
            $('#name').val("");
            $('#desc').val("");
            
        }
        else{
            alert("Make sure the input is valid");
        } 
    });
    
    $('#delete').click(function(){
        let id = $('#id').val();
        
        if(id != ""){
           $.ajax({
                url: URL + id,
                type: 'DELETE',
                contentType: 'application/x-www-form-urlencoded',
                success: function(result){
                    console.log(result);
                    loadTable();
                },
                error: (err) => {
                    console.log(err); 
                    alert("Make sure id is valid");
                }
            });
            
            $('#id').val("");
        }
        else{
            alert("Make sure id is valid");
        }
        
        
    });
    $('#update').click(function(){
       //get changes
        let id = $('#idU').val();
        let name = $('#nameU').val();
        let desc = $('#descU').val();
        
        let jsonObj = { title: name, description: desc};
        let jsonData = JSON.stringify(jsonObj);
        
        $.ajax({
            url: URL + id,
            type: 'PUT',
            contentType: 'application/json',
            data: jsonData,
            success: function(result){
                console.log(result);
                loadTable();
            },
            error: (err) => {
                console.log(err);            
            }
        });
        
        $('#idU').val("");
        $('#nameU').val("");
        $('#descU').val("");
    });
    $('#reload').click(function(){
       loadTable(); 
    });
});