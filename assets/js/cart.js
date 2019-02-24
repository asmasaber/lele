var fadeTime = 300;
/* Assign actions */
$('.qty').change( function() {
  updateQuantity(this);
});
// Remove Items From Cart
$('a.remove').click(function(){
  event.preventDefault();
  removeItem(this);
 });

// Just for testing, show all items
 $('a.btn.continue').click(function(){
 })

  /* Recalculate cart */
function recalculateCart(){
  var subTotal = 0;
  var shipping = $('#Shipping').text();
  var total = 0; 
  /* Sum up row totals */
  $('.prodTotal').each(function () {
    subTotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Update totals display */
  $('.subtotal').fadeOut(fadeTime, function() {
    $('#Subtotal').html(subTotal.toFixed(2));
    if(subTotal == 0){
      $('.checkout').fadeOut(fadeTime);
        $('#Total').html('0.00');
    }else{

      total = subTotal +parseFloat( shipping) ;
      $('#Total').html(total.toFixed(2));
      $('.checkout').fadeIn(fadeTime);
    }
    $('.subtotal').fadeIn(fadeTime);
  });
}
/* Update quantity */
function updateQuantity(quantityInput){
  /* Calculate line price */
  var productRow = $(quantityInput).parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  /* Update line price display and recalc cart totals */
  productRow.parent().children('.prodTotal').children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}

/* Remove item from cart */
function removeItem(removeButton){
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}