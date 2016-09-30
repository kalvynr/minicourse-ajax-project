
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    var $city = $('#city').val();
    var location = encodeURIComponent($street) + ', ' + encodeURIComponent($city);
    
    var imageUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + location + '&heading=151.78&pitch=-0.76&key=' + GOOGLE_STREETVIEW_API_KEY;

    $body.append('<img class="bgimg" src="' + imageUrl + '">');
    
    var placesUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + location + '&radius=500&type=food&key=' + GOOGLE_PLACES_API_KEY;
    console.log(placesUrl);
    
    $.getJSON(placesUrl, function(data) {
       console.log(data); 
    });
    
    var wikipediaUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + encodeURIComponent($city) + '&format=json';
    
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("Failed to get wiki resources");
    }, 8000);
    
    $.ajax(wikipediaUrl, {
        dataType: "jsonp",
        success: function(response) {
            console.log(response);
            
            clearTimeout(wikiRequestTimeout);
        }
    });
    
    return false;
};

$('#form-container').submit(loadData);

// loadData();
