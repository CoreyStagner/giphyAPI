var buttons = ['Pitch Perfect', 
				'Good Will Hunting', 
				'Transformers', 
				'Fail', 
				'Ouch', 
				'Funny', 
				'Cats', 
				'Dogs', 
				'Hamsters', 
				'Help'];

function updatePage(){

	$("#options").empty();

	for(i=0; i<buttons.length; i++){
		var btn = $("<button class='searchButton'>");
		btn.text(buttons[i]).val();
		btn.attr("data-value", buttons[i]);
		$("#options").append(btn);
	}
}


updatePage();


$(".searchButton").on("click", function(){
	$("#gifList").empty();
	console.log("Initial call of this on button click:")

	var search = $(this).attr("data-value")
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        search + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response){
		console.log("Initial call of response:");
		console.log(response);

		for(var i=0; i < response.data.length; i++){
			var giphyDiv = $("<div class='gifDiv'>");
			var giphyImg = $("<img class='gif'>");
			giphyImg.attr("src", response.data[i].images.original_still.url);
			giphyImg.attr("animate-url", response.data[i].images.original.url);
			giphyImg.attr("still-url",response.data[i].images.original_still.url);
			giphyImg.attr("status", "still");
			giphyDiv.append(giphyImg);
			$("#gifList").append(giphyDiv);
		}// End for
	})// End AJAX
})// End .searchButton On Click

$(document).on("click", ".gif", function(){

	var state = $(this).attr("status");
	
	if(state === "still"){
		$(this).attr("src", $(this).attr("animate-url"));
		$(this).attr("status", "animate");
	} else {
		$(this).attr("src", $(this).attr("still-url"));
		$(this).attr("status", "still");
	}// End If/Else
});// End .gif onClick

$("#add-gif").on("click", function(){
	event.preventDefault();
	var add = $("#gif-input").val().trim();
	buttons.push(add);
	console.log(add + " was added to your choices.")
	updatePage();
});