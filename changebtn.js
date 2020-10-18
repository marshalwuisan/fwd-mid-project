document.getElementById("formbtn").addEventListener("click", function() {
	if (formbtn.innerHTML == "Hide Form Add New Student") { formbtn.innerHTML = "Show Form Add New Student"; }
    else { formbtn.innerHTML = "Hide Form Add New Student"; }
    
    if ($("#sel1").data('options') === undefined) {
		$("#sel1").data('options', $('#sel2 option').clone());
	}
	var id = $("#sel1").val();
	var options = $("#sel1").data('options').filter('[class='+ id +']');
	$('#sel2').html(options);
} );