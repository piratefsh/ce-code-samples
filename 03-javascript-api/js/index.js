$(function(){
  var clientID = "e82b3f54c78a4a0fba9aac5d3896fdf0";
  
  $('#search-form').submit(function(e){
    e.preventDefault();
    
    var hashtag = $('#hashtag').val();
    
    $.ajax({
      type: 'GET',          //type of request
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
      dataType: 'jsonp',    //response type
      data: {               //query parameters
        client_id: clientID,
        count: 21
      },  
    //when we get the response data, do stuff 
    }).success(function(response){ 
      //remove all existing photos
      $('.photos').html("");
      
      // replace with new photos
      var photos = response.data;
      // for each photo from response, add a <li> 
      // with an image to our list of photos
      for (photo of photos){
        $('.photos').append('<li><a target="_blank" href="' + photo.link + '"><img src="' + photo.images.low_resolution.url 
                            + '"/></a> <p>' + photo.caption.text + ' by <strong>' + photo.user.username + '</strong></p></li>');
      }
    });
  });
  
  $('#search-form').trigger('submit');
})