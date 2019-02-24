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
function checkPasswordValidation(){
	var pass = document.getElementById("f1-password")
	, confirm_password = document.getElementById("f1-repeat-password");
	if(pass.value.length < 6)
	{
		if(lang == 'rtl')
		{
			document.getElementById("PassError").innerHTML = "اقل عدد حروف 6" ;
			//pass.setCustomValidity("اقل عدد حروف 6");
		}
		else
		{
			document.getElementById("PassError").innerHTML = "min length 6 Char.";
			//pass.setCustomValidity("min length 6 Char.");
		}
		//document.getElementById("complate").click()
		next_step = false;
	}
	else
	{
		document.getElementById("PassError").innerHTML = "";
		//pass.setCustomValidity('');
		if( pass.value != confirm_password.value) {
			if(lang == 'rtl')
			{
				document.getElementById("repeatPassError").innerHTML = "غير متشابهين";
			}
			else
			{
				document.getElementById("repeatPassError").innerHTML = "Passwords Don't Match";
			}
			next_step = false;
		  }else {
			document.getElementById("repeatPassError").innerHTML = "";
		  } 
	}
}
function checkHeirIDValidation(){
	var IDPattern = "^([0-9]{14})$";
	var HeirID = document.getElementById("f1-heir-id");
	if(!HeirID.value.match(IDPattern))
	{ 
		if(lang == 'rtl')
		{
			document.getElementById("HeirError").innerHTML = "ادخل رقم صحيح";
		}
		else
		{
			document.getElementById("HeirError").innerHTML = "enter valid ID";
		}
		next_step = false;
	}
	else
	{
		document.getElementById("HeirError").innerHTML = "";
		next_step = true;
	}
}
jQuery(document).ready(function() {
	lang = $("body").css("direction");
    /* Fullscreen background */
    $.backstretch("assets/images/try.png");
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /* Form */
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea, .f1 input[type="file"]').on('focus', function() {
    	$(this).removeClass('input-error');
    });
	$('#f1-phone').on('focus', function() {
    	document.getElementById("MobileError").innerHTML  = "";
    });
	$('#f1-password').on('focus', function() {
    	document.getElementById("PassError").innerHTML  = "";
    });
	$('#f1-repeat-password').on('focus', function() {
    	document.getElementById("repeatPassError").innerHTML  = "";
    });
	$('#idImg').on('click', function() {
		$(this).removeClass('img-error');
    });
    $('#f1-heir-id').on('focus', function() {
    	document.getElementById("HeirError").innerHTML  = "";
    });
     
	//1st next
	$("#checkUser").click(function(){
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
			 nextStatment(parent_fieldset,current_active_step,progress_line);
		 }
	});
	//2nd next
	$("#confirmCode").click(function(){
		 next_step = true;
		 var parent_fieldset = $(this).parents('fieldset');
		 var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		 var progress_line = $(this).parents('.f1').find('.f1-progress-line');
		 checkEmpty(parent_fieldset);
		 
		 
		 if( next_step ) 
		 {
			 nextStatment(parent_fieldset,current_active_step,progress_line);
		 }
	});
	//3rd next
	$("#confirmPassword").click(function(){
		 next_step = true;
		 var parent_fieldset = $(this).parents('fieldset');
		 var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		 var progress_line = $(this).parents('.f1').find('.f1-progress-line');
		 checkEmpty(parent_fieldset);
		 if( next_step ) 
		 {
			checkPasswordValidation();
		 }
		 if( next_step ) 
		 {
			 nextStatment(parent_fieldset,current_active_step,progress_line);
		 }
	});
	
	//submit
	$('.f1').on('submit', function(e) {
		$(this).find('input[type="text"], input[type="password"]').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			next_step = false;
    			$(this).addClass('input-error');
    		}
    		else {
    			next_step = true;
    			$(this).removeClass('input-error');
    		}
    	});
		if(next_step){
	    	checkHeirIDValidation();
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

	//Upload img 
	function maskImgs() {	
		$.each($('.img-wrapper img'), function(index, img) {
			var src = $(img).attr('src');
			var parent = $(img).parent();
			parent
				.css('background', 'url(' + src + ') no-repeat center center')
				.css('background-size', 'cover');
			$(img).remove();
		});
	}
	var preview = {
		init: function() {
			preview.setPreviewImg();
			preview.listenInput();
		},
		setPreviewImg: function(fileInput) {
			var path = $(fileInput).val();
			var uploadText = $(fileInput).siblings('.file-upload-text');

			if (!path) {
				//$(uploadText).val('');
			} else {
				path = path.replace(/^C:\\fakepath\\/, "");
				$(uploadText).val(path);

				preview.showPreview(fileInput, path, uploadText);
			}
		},
		showPreview: function(fileInput, path, uploadText) {
			var file = $(fileInput)[0].files;

			if (file && file[0]) {
				var reader = new FileReader();

				reader.onload = function(e) {
					var previewImg = $(fileInput).parents('.file-upload-wrapper').siblings('.preview');
					var img = $(previewImg).find('img');

					if (img.length == 0) {
						$(previewImg).html('<img src="' + e.target.result + '" alt=""/>');
					} else {
						img.attr('src', e.target.result);
					}

					uploadText.val(path);
					maskImgs();
				}

				reader.onloadstart = function() {
					$(uploadText).val('uploading..');
				}

				reader.readAsDataURL(file[0]);
			}
		},
		listenInput: function() {
			$('.file-upload-native').on('change', function() {
				preview.setPreviewImg(this);
			});
		}
	};
	preview.init();
    
});


