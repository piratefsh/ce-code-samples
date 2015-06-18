$(function() {
  var clientID = "e82b3f54c78a4a0fba9aac5d3896fdf0";

  $('#search-form').submit(function(e) {
    e.preventDefault();

    var lat = $('#coordinate-lat').val();
    var lng = $('#coordinate-lng').val();

    $.ajax({
      type: 'GET', //type of request
      url: 'https://api.instagram.com/v1/media/search',
      dataType: 'jsonp', //response type
      data: { //query parameters
        lat: lat,
        lng: lng,
        count: 21,
        distance: 5000,
        client_id: clientID
      },
      //when we get the response data, do stuff 
    }).success(function(response) {
      //remove all existing photos
      $('.photos').html("");

      // replace with new photos
      var photos = response.data;
      // for each photo from response, add a <li> 
      // with an image to our list of photos
      for (photo of photos) {
        var caption = "";
        if (photo.caption) {
          caption = photo.caption.text;
        }
        $('.photos').append('<li><img src="' + photo.images.low_resolution.url + '"/> <p>' + caption + ' by <strong>' + photo.user.username + '</strong></p></li>');
      }
    });
  });

  $('#search-form').trigger('submit');

  // Create map
  L.mapbox.accessToken = 'pk.eyJ1IjoicGlyYXRlZnNoIiwiYSI6IjlNT2dMUGcifQ.cj4j9z29wjkXPAi7nK7ArA';
  var map = L.mapbox.map('map', 'piratefsh.mfinco1l')
    .setView([3.1333, 101.6833], 13);
  
  // Add marker
  var marker = L.marker([3.1333, 101.6833], {
    icon: L.mapbox.marker.icon({
        'marker-size': 'large',
        'marker-symbol': 'star',
        'marker-color': '#00bcbc'
    })
})
  
  marker.addTo(map);
  
  // On map click, move marker
  map.on('click', function(e) {
    marker.setLatLng(e.latlng);
    // Also center map to new marker position
    map.setView(e.latlng);
    
    // Update form input values
    $('#coordinate-lat').val(e.latlng.lat);
    $('#coordinate-lng').val(e.latlng.lng);
  });
});