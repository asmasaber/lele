
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

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
	var lang = $("body").css("direction");
	
    $.backstretch("assets/images/thumb-1920-329203.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // next step
    $('.f1 .btn-next').on('click', function() {
		
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	// fields validation
    	parent_fieldset.find('input[type="text"], input[type="password"], input[type="file"], textarea').each(function() {
			
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');			
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
			

			
    	});
		if(this.id == 'setUpAccount-btn' && next_step == true)
		{
				var phonePattern = "[0][1][0-2]([0-9]{8})$";
				var phne = document.getElementById("f1-phone");
				if(!phne.value.match(phonePattern))
				{ 
					if(lang == 'rtl')
					{
						phne.setCustomValidity("ادخل رقم صحيح");
					}
					else
					{
						phne.setCustomValidity("enter valid phone [start with 011 | 012 | 010 & have 11 number]");
					}
					document.getElementById("complate").click()
					next_step = false;
				}
				else
				{
					phne.setCustomValidity('');
				}
				var pass = document.getElementById("f1-password")
				, confirm_password = document.getElementById("f1-repeat-password");
				if(pass.value.length < 6)
				{
					if(lang == 'rtl')
					{
						pass.setCustomValidity("اقل عدد حروف 6");
					}
					else
					{
						pass.setCustomValidity("min length 6 Char.");
					}
					document.getElementById("complate").click()
					next_step = false;
				}
				else
				{
					pass.setCustomValidity('');
					if( pass.value != confirm_password.value) {
						if(lang == 'rtl')
						{
							confirm_password.setCustomValidity("غير متشابهين");
						}
						else
						{
							confirm_password.setCustomValidity("Passwords Don't Match");
						}
						
						document.getElementById("complate").click()
						next_step = false;
					  }else {
						confirm_password.setCustomValidity('');
					  } 
				}
			
		}

    	// fields validation	
    	if( next_step ) {
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
    
    // submit
    $('.f1').on('submit', function(e) {
    	// fields validation
    	$(this).find('input[type="text"], input[type="password"]  , textarea').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
				$("#idImg").addClass('img-error');	
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
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
				$(uploadText).val('');
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


