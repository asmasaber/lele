var _validPhone = true;
var _validPassword = true;
var _validHeir = true;
var lang;
function checkPhoneValidation(){
	var phonePattern = "^[0][1][0-2]([0-9]{8})$";
	var phne = document.getElementById("newPhone");
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
		_validPhone= false;
	}
	else
	{
		document.getElementById("MobileError").innerHTML  = "";
	}
}
function checkHeirIDValidation(){
	var IDPattern = "^([0-9]{14})$";
	var HeirID = document.getElementById("newHeirID");
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
		_validHeir = false;
	}
	else
	{
		document.getElementById("HeirError").innerHTML = "";
		next_step = true;
	}
}
function checkPasswordValidation(){
	var pass = document.getElementById("newPassword")
	, confirm_password = document.getElementById("repeatPassword");
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
		_validPassword = false;
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
			_validPassword = false;
		  }else {
			document.getElementById("repeatPassError").innerHTML = "";
		  } 
	}
}
$(document).ready(function(){
	lang = $("body").css("direction");
			$('input[type="text"], input[type="password"]').on('click', function() {
				$(this).removeClass('input-error');
		    });

		    $('#newPhone').on('focus', function() {
		    	document.getElementById("MobileError").innerHTML  = "";
		    });

		    $('#newPassword').on('focus', function() {
		    	document.getElementById("PassError").innerHTML  = "";
		    });
		     $('#repeatPassword').on('focus', function() {
		    	document.getElementById("repeatPassError").innerHTML  = "";
		    });
			
			$("#editName").click(function(){
				$(this).hide(1000);
				$('#name').hide(1000);
				$('#editNameSection').show(1000);
			});
			$("#saveEditName").click(function(){
				if($('#newName').val() == "" ) 
				{
					$('#newName').addClass('input-error');
				}
				else
				{
						//ajax request to edit phone
				}
				});
			$("#cancleEditName").click(function(){
				$('#editName').show(1000);
				$('#name').show(1000);
				$('#editNameSection').hide(1000);
				
				});
			
			$("#editPhone").click(function(){
				$(this).hide(1000);
				$('#newPhone').val($('#phone').text());
				$('#phone').hide(1000);
				$('#editPhoneSection').show(1000);
			});
			$("#saveEditPhone").click(function(){
				if($('#newPhone').val() == "" ) 
				{
					$('#newPhone').addClass('input-error');
				}
				else
				{
					checkPhoneValidation();
					if(_validPhone)
					{
						//ajax request to edit phone
					}
				}
				});
			$("#cancleEditPhone").click(function(){
				$('#editPhone').show(1000);
				$('#phone').show(1000);
				$('#editPhoneSection').hide(1000);
			});
			
			$("#editGender").click(function(){
				$(this).hide(1000);
				$('#gender').hide(1000);
				$('#editGenderSection').show(1000);
			});
			$("#cancleEditGender").click(function(){
				$('#editGender').show(1000);
				$('#gender').show(1000);
				$('#editGenderSection').hide(1000);
			});
			
			$("#editAddress").click(function(){
				$(this).hide(1000);
				$('#address').hide(1000);
				$('#editAddressSection').show(1000);
			});
			$("#saveEditAdrress").click(function(){
				if($('#newArea').val() == "" ) 
				{
					$('#newArea').addClass('input-error');
				}
				else
				{
						//ajax request to edit phone
					
				}
				});
			$("#cancleEditAddress").click(function(){
				$('#editAddress').show(1000);
				$('#address').show(1000);
				$('#editAddressSection').hide(1000);
			});
			
			$("#editHeir").click(function(){
				$(this).hide(1000);
				$('#heir').hide(1000);
				$('#editHeirSection').show(1000);
			});
			$("#saveEditHeir").click(function(){
				if (($('#newHeirName').val() == "" ) && ($('#newHeirID').val() == "") )
				{
					$('#newHeirName').addClass('input-error');
					$('#newHeirID').addClass('input-error');
				}
				else if($('#newHeirName').val() == "" ) 
				{
					$('#newHeirName').addClass('input-error');
				}
				else if($('#newHeirID').val() == "" ) 
				{
					$('#newHeirID').addClass('input-error');
				}
				else
				{
					checkHeirIDValidation();
					if(_validHeir)
					{
						//ajax request to edit phone
					}
					
				}
				});

			$("#cancleEditHeir").click(function(){
				$('#editHeir').show(1000);
				$('#heir').show(1000);
				$('#editHeirSection').hide(1000);
			});
			$("#editPassword").click(function(){
				$(this).hide(1000);
				
				$('#editPasswordSection').show(1000);
			});
			$("#saveEditPassword").click(function(){
				
				if($('#oldPassword').val() == "" ) 
				{
					$('#oldPassword').addClass('input-error');
				}
				 if($('#newPassword').val() == "" ) 
				{
					$('#newPassword').addClass('input-error');
				}
				 if($('#repeatPassword').val() == "" ) 
				{
					$('#repeatPassword').addClass('input-error');
				}
				else
				{
					if (($('#oldPassword').val() != "" ) && ($('#newPassword').val() != "") && ($('#repeatPassword').val() != ""))
					{
						checkPasswordValidation();
						if(_validPassword)
						{
							//ajax request to edit phone
						}
					}
					
				}
				});
			$("#cancleEditPassword").click(function(){
				$('#editPassword').show(1000);
				$('#editPasswordSection').hide(1000);
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