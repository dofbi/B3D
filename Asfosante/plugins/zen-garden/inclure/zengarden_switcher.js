jQuery(function() {
	jQuery("#switcher_zen select")
		.change(function(){
			jQuery(this).parents('form').get(0).submit();
		})
		.attr('value',theme_selected)
	  .siblings("input[type=submit]").hide();
});