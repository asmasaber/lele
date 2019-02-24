// zoom in image

    // for fav
    $('.fa-heart').click(function(){
        $(this).toggleClass('fav'); 
    });
    
  // change image data
    $('.img-thumbs .pic').on('click', function(e) {
        e.preventDefault();
        /* Act on the event */
        $('.img-thumbs .item').removeClass('active');
        $(this).parents('.item').addClass('active');
        var dataLarge = $(this).attr('data-lg-img');
        $('.large-view').attr({
            'src': dataLarge
        });
       $('.fancy-view').attr({
            'href': dataLarge
        });
    });
//$(".fancy-view").fancybox();


//Reduce quantity by 1 if clicked
$(document).on("click", ".product-quantity-subtract", function(e){
  var value = $("#product-quantity-input").val();
  //console.log(value);
  var newValue = parseInt(value) - 1;
  if(newValue < 0) newValue=0;
  $("#product-quantity-input").val(newValue);
 
});

//Increase quantity by 1 if clicked
$(document).on("click", ".product-quantity-add", function(e){
  var value = $("#product-quantity-input").val();
  //console.log(value);
  var newValue = parseInt(value) + 1;
  $("#product-quantity-input").val(newValue);
});

$(document).on("blur", "#product-quantity-input", function(e){
  var value = $("#product-quantity-input").val();
  //console.log(value);
});
