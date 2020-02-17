
$(document).ready(function() {
  //Inicializamos los calendarios
  $('.datepicker').datepicker({
      orientation: 'bottom right',
      container: $(document.activeElement).parent(),
      language: 'es'
  });

  $('.input-daterange input').each(function() {
      $(this).datepicker({ 
          orientation: 'bottom right',
          container: $(document.activeElement).parent(),
          language: 'es' 
      });
  });
  //Inicializamos los calendarios

  // Get: films
  $.ajax({
    type: 'GET',
    url: 'https://magneto-365.herokuapp.com/api/v1/films',
    success: function(data) {
      $.each(data, function(index, item) {
        $('<div class="galleryItem col-lg-3 col-md-3 col-sm-3 col-xs-6" title="'+item.name+'"><img alt="picture" src="'+item.url_image+'" class="img-fluid"></div>').appendTo( $('#gallery') );
      });
    }
  });

  //POST: create film
  $('#createMovie').click(function(){
    
    var dateInit = new Date($('#movieDateInit').datepicker("getDate")).toLocaleDateString("en-US");
    var dateEnd = new Date($('#movieDateEnd').datepicker("getDate")).toLocaleDateString("en-US");
    var film = {
        name:$('#movieTitle').val(),
        description:$('#movieSipnopsis').val(),
        url_image:$('#movieURL').val(),
        start_date:dateInit, 
        final_date:dateEnd
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/api/v1/films',
      dataType: 'json',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ film: film }),
      success: function(data) {
        ClearModalPelicula();
        $.ajax({
          type: 'GET',
          url: 'https://magneto-365.herokuapp.com/api/v1/films',
          success: function(data) {
            $.each(data, function(index, item) {
              $('<div class="galleryItem col-lg-3 col-md-3 col-sm-3 col-xs-6" title="'+item.name+'"><img alt="picture" src="'+item.url_image+'" class="img-fluid"></div>').appendTo( $('#gallery') );
            });
          }
        });
      },
      error: function(error) {
        alert("status: " + error.responseJSON.error);
      }
    });
  });

  $('#cancelCreate').click(function() {
    ClearModalPelicula()
  });

  function ClearModalPelicula() {
    $('#movieTitle').val('');
    $('#movieSipnopsis').val('');
    $('#movieURL').val('');
    $('#movieDateInit').val('');
    $('#movieDateEnd').val('');
  }
});


// https://www.lavanguardia.com/r/GODO/LV/p6/WebSite/2019/12/20/Recortada/img_astrid_20191223-145256_imagenes_lv_terceros_combopelis19-k3S-U472367896624VND-992x558@LaVanguardia-Web.jpg
