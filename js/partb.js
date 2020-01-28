$(document).ready(function(){
    var userLat, userLong;
    var locationFound = false;

    navigator.geolocation.getCurrentPosition(function(position) {
        //set latitude and longitude
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        $("#status").html("Finding restaurants near you...");

        $.get({
            url: "https://csunix.mohawkcollege.ca/tooltime/10133/api/api.php",
            data: {lat: userLat, long: userLong},
            success: function(data)
            {
                // insert media divs for all restaurants in data
                var restaurants = JSON.parse(data);
                var html = "";
                $("#status").html("Found these restaurants...");
                $("#loader").addClass("d-none");

                for(var i =0; i < restaurants.businesses.length; i++)
                {
                    html += "<li class='media'><img src='" + restaurants.businesses[i].image_url + "' class='mr-3' style='height: 100px; width: 100px'><div class='media-body'><h5 class='mt-0 mb-1'>" + restaurants.businesses[i].name + "</h5>";
                    for(var x = 0; x < restaurants.businesses[i].categories.length; x++)
                    {
                        if(x == restaurants.businesses[i].categories.length - 1)
                        {
                            html += restaurants.businesses[i].categories[x].title;
                        }
                        else
                        {
                            html += restaurants.businesses[i].categories[x].title + ", ";
                        }
                        
                    }
                    html += "<br>" + restaurants.businesses[i].location.address1 + "<br>" + restaurants.businesses[i].phone + "</div></li>";
                }

                $("ul").append(html);
            }
        });

      }, function(error){
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("Error: User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Error: Location information is unavailable.")
            break;
          case error.TIMEOUT:
            console.log("Error: The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            console.log("Error: An unknown error occurred.")
            break;
        };
      });
    
});