var next_step = true;
var lang;
function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}
function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}
function checkEmpty (parent_fieldset){
	parent_fieldset.find('input[type="text"], input[type="password"], input[type="file"], textarea').each(function() {	
		if( $(this).val() == "" ) {
			if(this.id == 'selectedFilePath')
			{
				$("#idImg").addClass('img-error');	
			}
			else
			{
				$(this).addClass('input-error');
			}
		next_step = false;
		}
		else {
			if(this.id == 'selectedFilePath')
			{
				$("#idImg").removeClass('img-error');	
			}
			else
			{
				$(this).removeClass('input-error');
			}
		next_step = true;
		}
	});
}
function nextStatment (parent_fieldset,current_active_step,progress_line){
	parent_fieldset.fadeOut(400, function() {
		// change icons
		current_active_step.removeClass('active').addClass('activated').next().addClass('active');
		// progress bar
		bar_progress(progress_line, 'right');
		// show next step
		$(this).next().fadeIn();
		// scroll window to beginning of the form
		scroll_to_class( $('.f1'), 20 );
	});
}
function checkPhoneValidation(){
	var phonePattern = "^[0][1][0-2]([0-9]{8})$";
	var phne = document.getElementById("f1-phone");
	if(!phne.value.match(phonePattern))
	{ 
		if(lang == 'rtl')
		{
			document.getElementById("MobileError").innerHTML  = "ادخل رقم صحيح";
		}
		else
		{
			document.getElementById("MobileError").innerHTML  = "enter valid phone number";
		}
		next_step = false;
	}
	else
	{
		document.getElementById("MobileError").innerHTML  = "";
	}
}


jQuery(document).ready(function() {
	lang = $("body").css("direction");
    /* Fullscreen background */
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /* Form */
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
	$('#f1-phone').on('focus', function() {
    	document.getElementById("MobileError").innerHTML  = "";
    });
     
	$("#checkcustomerinfo").click(function(){
		 next_step = true;
		 var parent_fieldset = $(this).parents('fieldset');
		 var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		 var progress_line = $(this).parents('.f1').find('.f1-progress-line');
		 checkEmpty(parent_fieldset);
		 if( next_step ) 
		 {
			checkPhoneValidation();
		 }
		 if( next_step ) 
		 {
		 	$("#shipping-address").text($("#CountryList").find("option:selected").text() +', '+ $("#CityList").find("option:selected").text()+', '+ $("#f1-area").val());
			 nextStatment(parent_fieldset,current_active_step,progress_line);
		 }
	});
	$("#checkrecivemethod").click(function(){
		 next_step = true;
		 var parent_fieldset = $(this).parents('fieldset');
		 var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		 var progress_line = $(this).parents('.f1').find('.f1-progress-line');
		 if( next_step ) 
		 {
			 nextStatment(parent_fieldset,current_active_step,progress_line);
		 }
	});
	
	$("#checkpymentmethod").click(function(){
		 next_step = true;
		 var parent_fieldset = $(this).parents('fieldset');
		 var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		 var progress_line = $(this).parents('.f1').find('.f1-progress-line');
		 if( next_step ) 
		 {
		 	$("#phoneNumber").text($("#f1-phone").val());
		 	$("#address").text($("#CountryList").find("option:selected").text() +', '+ $("#CityList").find("option:selected").text()+', '+ $("#f1-area").val());
		 	$("#checkedReciveType").text($('[name="rdReciveMethod"]:checked').val());
		 	$("#checkedPaymentType").text($('[name="rdPaymentMethod"]:checked').val());
			 nextStatment(parent_fieldset,current_active_step,progress_line);
		 }
	});
	//submit
	$('.f1').on('submit', function(e) {
		
		if(next_step){
			if( !next_step )
			{
				e.preventDefault();
			}
		}
    });

    // previous step
    $('.f1 .btn-previous').on('click', function() {
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	$(this).parents('fieldset').fadeOut(400, function() {
    		// change icons
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		// progress bar
    		bar_progress(progress_line, 'left');
    		// show previous step
    		$(this).prev().fadeIn();
    		// scroll window to beginning of the form
			scroll_to_class( $('.f1'), 20 );
    	});
    });


    $(document).on("change","input[type=radio]",function(){
		    var selectedValue =$('[name="rdReciveMethod"]:checked').val();

		    var subTotal = parseFloat($("#subTotalValue").html());
			var shipping = 12; // replace with city shipping value from sity drop down list 

		    if(selectedValue == "shipping")
		    {
		    	$("#shippingValue").html(shipping+" L.E");
		    	$("#totalValue").html((subTotal+shipping)+" L.E");
		    }
		    else
		    {
		    	$("#shippingValue").html("-");
		    	$("#totalValue").html(subTotal+" L.E");
		    }
	});

	$( "#toggleCart" ).click(function() {
	    $( "#CartSummary" ).slideToggle(300 , function(){
	    	if ($(this).is(':visible')) {
             $( "#toggleCart" ).html('Hide Cart Summary');               
        } else {
             $( "#toggleCart" ).html('Show Cart Summary');               
        }        
	    });
	     
    }); 
 

window.onresize = function(event) {
  if ($('#toggleCart').css('display')  == 'none'){
   $("#CartSummary").css("display", "block");
    $( "#toggleCart" ).html('Hide Cart Summary');
 }
};
});


