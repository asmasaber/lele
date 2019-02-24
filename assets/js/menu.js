/* MAIN MENU */
$('#main-menu > li:has(ul.sub-menu)').addClass('parent');
$('ul.sub-menu > li:has(ul.sub-menu) > a').addClass('parent');

$('#menu-toggle').click(function() {
  $('#main-menu').slideToggle(300);
  return false;
});

$(window).resize(function() {
  if ($(window).width() > 700) {
    $('#main-menu').removeAttr('style');
  }
});

$( "#searchIcon" ).click(function() {
   // $( "#searchDivsm" ).toggle( 'slide' , { direction: 'up'} , 500 );
    $( "#searchDivsm" ).slideToggle(300);
  });


$( "#history_toggle" ).click(function() {
    $( "#history_submenu" ).slideToggle(300);
  });
$( "#User_toggle" ).click(function() {
		$( "#User_submenu" ).slideToggle(300);
  });