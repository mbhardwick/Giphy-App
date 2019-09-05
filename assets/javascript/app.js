$(function(){
    populateButtons(searchArr,'searchButton','#buttonsArea');
});
//starting array
var searchArr = ["30 Rock", "The Golden Girls", "Dexter", "Flavor of Love", "Friends", "Parks and Rec", "The Office", "Big Little Lies", "Daria", "GLOW"];
//populate buttons function
function populateButtons(searchArr,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0;i<searchArr.length;i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',searchArr[i]);
        a.text(searchArr[i]);
        $(areaToAddTo).append(a);
    };
};
//link API
$(document).on('click','.searchButton',function(){
   $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=0sBEmny9kqsKfpaOTCV622tPjDLXzzGi&limit=10'
    $.ajax({url:queryURL,method:'GET'})
        //set images and ratings to appear
        .done(function(response){
            for(var i=0;i<response.data.length;i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text("Rating: "+rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src',still);
                image.attr('data-still',still);
                image.attr('data-animated',animated);
                image.attr('data-state','still');
                image.addClass('searchImage');
                searchDiv.append(image);
                searchDiv.append(p);
                $('#searches').append(searchDiv);
            }
        })
});
//click to play/pause
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if (state === 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
});
//create button with user input
$('#addSearch').on('click',function(){
    event.preventDefault();
    var newSearch = $('input').eq(0).val().trim();
    searchArr.push(newSearch);
    populateButtons(searchArr,'searchButton','#buttonsArea');
    return false;
});
