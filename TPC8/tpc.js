$(function(){
    //Carrega a lista de parágrafos da BD
    $.get("http://localhost:7709/paras", function(data){
        data.forEach(p => {
            $("#paraList").append("<li id=\""+p._id+"\"><b>"+p.data +"</b>: "+p.para + " <button class=\"edit\" data-value='"+JSON.stringify(p)+"'>Editar</button> <button class=\"delete\" data-value='"+JSON.stringify(p)+"'>Eliminar</button></li>");
        });
    }).fail(function(response) {
        alert('Error: ' + response.responseText);
    });
    
    $("#botao").click(function(){                
        $.post("http://localhost:7709/paras", $("#myParaForm").serialize(), function(data){
            
            if($('#'+data._id).length){
                $('#'+data._id).empty()
                $('#'+data._id).append("<b>"+data.data +"</b>: "+data.para+ " <button class=\"edit\" data-value='"+JSON.stringify(data)+"'>Editar</button> <button class=\"delete\" data-value='"+JSON.stringify(data)+"'>Eliminar</button>")
            }else{
                $("#paraList").append("<li id=\""+data._id+"\"><b>"+data.data +"</b>: "+data.para + " <button class=\"edit\" data-value='"+JSON.stringify(data)+"'>Editar</button> <button class=\"delete\" data-value='"+JSON.stringify(data)+"'>Eliminar</button></li>")
            }
        }).fail(function(response) {
           
            alert('Error: ' + response.responseText);
        });

        $("#para").val("");
        $("#_id").val("");
        $("#data").val("");
        $("#novoParagrafo").text("Novo parágrafo")
        $("#botao").val("Novo parágrafo")
    });

    $("#limpar").click(function(){                
        $("#para").val("");
        $("#_id").val("");
        $("#data").val("");
        $("#novoParagrafo").text("Novo parágrafo")
        $("#botao").val("Novo parágrafo")
    });

    $("#paraList").on("click", "button.delete", function(e){
        var $target = $(event.target)
        var data = $target.data("value")
       

        var $parent = $(this).parent()
        $.ajax({
            url: 'http://localhost:7709/paras/'+data._id,
            type: 'DELETE',
            success: function(result) {
                
                $parent.remove()
                $("#para").val("");
                $("#_id").val("");
                $("#data").val("");
                $("#novoParagrafo").text("Novo parágrafo")
                $("#botao").val("Novo parágrafo")
            },
            error : function ( jqXhr, textStatus, errorMessage ) {
                
                alert("Delete Failed: "+errorMessage)
            }
        });
        
    });

    $("#paraList").on("click", "button.edit", function(e){
        var $target = $(event.target)
        var data = $target.data("value")
        
        $("#para").val(data.para);
        $("#_id").val(data._id);
        $("#data").val(data.data);
        $("#novoParagrafo").text("A editar "+data.para)
        $("#botao").val("Editar parágrafo")
    });
});
