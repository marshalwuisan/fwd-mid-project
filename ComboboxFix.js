// Add Student Combobox hotfix
$("#sel1").change(function () {
    var id = $(this).val();
	var options = $(this).data('options').filter('[class=' + id + ']' || '[class="0"]');
	$('#sel2').html(options);
}); 
