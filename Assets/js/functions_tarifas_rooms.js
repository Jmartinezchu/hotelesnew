
let tableTarifasHabitacion;

document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title : 'Por favor espere',
        text : 'Procesando...',
        timer: 700,
        icon : 'info',
        allowOutsideClick : false,
        allowEscapeKey : false
      })
      Swal.showLoading()
      tableTarifasHabitacion = $('#tableTarifasHabitacion').dataTable({
          "aProcessing":true,
          "aServerSide":true,
          "language": {
              "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
          },
          "ajax": {
              "url": " "+base_url+"/TarifasRooms/getAllTarifas",
              "dataSrc": ""
          },
          "columns": [
              {"data":"idTarifa"},
              {"data":"nombreTarifa"},
              {"data":"estado"},
              {"data":"options"}
          ],
          'dom': 'lBfrtip',
          'buttons': [
           
          ],
          
          "resonsieve":"true",
          "bDestroy":true,
          "iDisplayLength": 10,
          "order": [[0,"desc"]]
      });
  })
  
    function guardarTarifa(){
        let formTarifasRooms = document.querySelector("#formTarifasRooms");
          event.preventDefault();
          let nombre = document.querySelector("#nombretarifa").value;
          if(nombre  == '') {
              Swal.fire("Atencion","El campo es obligatorio","error");
              return false;
          }
          let request  = (window.XMLHttpRequest) ? new XMLHttpRequest() :  new ActiveXObject('Microsoft.XMLHTTP');
          let ajaxUrl = base_url+'/TarifasRooms/setTarifa';
          let formData = new FormData(formTarifasRooms);   
          request.open("POST",ajaxUrl,true);
          request.send(formData);
          
          request.onreadystatechange = function(){
              if(request.readyState == 4 && request.status == 200){
                //   console.log(JSON.parse(request.responseText));
                  let objData = JSON.parse(request.responseText);
                  
                  if(objData.status){
                      
                    Swal.fire("Tarifas",objData.msg,"success");
                      
                      tableTarifasHabitacion.api().ajax.reload();
                       formTarifasRooms.reset();
  
                  }else{
                    Swal.fire("Error",objData.msg,"error");
                  }
                  
              }
              window.location.reload();
      }
      
    }

    function cancelar(){
         formTarifasRooms.reset();
    }

    function DeleteTarifa(idTarifa){
        Swal.fire({
            title: 'Eliminar Tarifa',
                text: "¿Desea eliminar la Tarifa?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
        }).then((willDelete) => {
    
            if(willDelete.isConfirmed){
                var request=(window.XMLHttpRequest)  ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl=base_url+'/TarifasRooms/deleteTarifa';
                var strData="idtarifa="+idTarifa;

                request.open("POST",ajaxUrl,true);
                request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                request.send(strData);

                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status==200 )
                    {
                        var objData=JSON.parse(request.responseText);
                    
                        if(objData.status)
                        {
                            Swal.fire("Tarifa",objData.msg,"success");
                            tableTarifasHabitacion.api().ajax.reload();
                            
                        }
                        else
                        {
                            Swal.fire("Atencion",objData.msg,"error");
                        }
                    }
                }

            }
        })
    }

    

    function EditTarifa(idtarifa){
        var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var ajaxUrl = base_url+'/TarifasRooms/getUnaTarifa/'+idtarifa; //url
    
        request.open("POST",ajaxUrl,true);
        request.send();
    
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200)
            {
                var objData =  JSON.parse(request.responseText);
                document.querySelector('#idtarifa').value = objData.data.idTarifa;
                document.querySelector('#nombretarifa').value = objData.data.nombreTarifa;
    
            }
     }
    }
    $('#tableTarifasHabitacion').dataTable();        
    