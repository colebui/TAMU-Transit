var startLat;
var startLng;
var endLat;
var endLng;
var arr=[];
var geo;
var currMode;
/*global google*/
/*global infoWindow*/
/*global navigator*/
/*global $*/
/*global map*/
/*global */
/*global */
var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};
var startURL = "",endURL="";
var params = getParams(window.location.href);


if(params.start && params.end){
  startURL = params.start;
  endURL = params.start;
}

console.log(startURL);








function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: {lat: 30.618811, lng: -96.336424},
      zoom: 13
    });

    infoWindow = new google.maps.InfoWindow;
    
  
    new AutocompleteDirectionsHandler(map);
    if(startURL.localeCompare(endURL) != 0){
      console.log("worked");
      bikeButton();
    }
  }
  function AutocompleteDirectionsHandler(map) {
    
  
    

    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    var geocoder = new google.maps.Geocoder();
    this.directionsRenderer.setMap(map);
    //this.directionsRenderer.setPanel(document.getElementById('output'));

    
  
    var originInput = document.getElementById('currentLocation');
    var destinationInput = document.getElementById('destination');
  
    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id', 'geometry']);
  
    var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id', 'geometry']);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // if the geolocation was recognized and an address was found
            if (results[0]) {
              // add a marker to the map on the geolocated point
              geo = results[0];
              startURL = geo.placeId;
              // compose a string with the address parts
              var address = results[0].address_components[1].long_name+' '+results[0].address_components[0].long_name+', '+results[0].address_components[3].long_name;

              document.getElementById("currentLocation").value = address;
            }
          } else {
            // if the address couldn't be determined, alert and error with the status message
            alert("Geocoder failed due to: " + status);
          }
        });
        
        
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
    this.setupClickListener('walk', 'WALKING');
    this.setupClickListener('bus', 'TRANSIT');
    this.setupClickListener('car', 'DRIVING');
    this.setupClickListener('bike', 'BICYCLING');
    this.setupClickListener('wheelchair', 'ACCESIBLE');
    
    
  
    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    

  
  }
  
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  AutocompleteDirectionsHandler.prototype.setupClickListener = function(
      id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;
  
    radioButton.addEventListener('click', function() {
      me.travelMode = mode;
      me.route();
    });
  };
  
  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(
      autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
  
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      
      if (!place.place_id) {
        window.alert('Please select an option from the dropdown list.');
        return;
      }
      if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
        startLat = place.geometry.location.lat();
        startLng = place.geometry.location.lng();
      } else {
        me.destinationPlaceId = place.place_id;
        endLat = place.geometry.location.lat();
        endLng = place.geometry.location.lng();
      }
      me.route();
    });
  };
  
  AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    var me = this;

    
    
    if (this.travelMode == 'TRANSIT'){
      var url = "https://aggiemapstest.appspot.com/routes/"+startLat+"/"+startLng+"/"+endLat+"/"+endLng+"/weekdays";
      arr = [];
      $.ajax({
        method: "GET",
        cache: false,
        url: url,
        success: function(data) {
          var path1 = data.path1;
          var path2 = data.path2;
          var path3 = data.path3;

          var coords1 = data.coords1;
          var coords2 = data.coords2;
          var coords3 = data.coords3;
          
          mapit(startLat, startLng, endLat, endLng, coords1, path1);
        }
      });
    }
    else if (this.travelMode == 'ACCESIBLE'){
      var url = "https://aggiemapstest.appspot.com/routes/"+startLat+"/"+startLng+"/"+endLat+"/"+endLng+"/weekdays";
      $.ajax({
        method: "GET",
        cache: false,
        url: url,
        success: function(data) {
          var path1 = data.path1;
          var path2 = data.path2;
          var path3 = data.path3;

          var coords1 = data.coords1;
          var coords2 = data.coords2;
          var coords3 = data.coords3;
          var paths = [];
          paths.push(path1);
          paths.push(path2);
          paths.push(path3);
          var bestPath = [0,0,0];
          for(var i = 0; i<3; i++){
            for(var j = 1; j<paths[i].length; j+=2){
              if(paths[i][j] == [-1]){
                bestPath[i]++;
              }
            }
          }
          var choice = 0;
          if(bestPath[0]<=bestPath[1] && bestPath[0]<=bestPath[2]){
            mapit(startLat, startLng, endLat, endLng, coords1, path1);
          }
          else if (bestPath[1]<=bestPath[0] && bestPath[1]<=bestPath[2]){
            mapit(startLat, startLng, endLat, endLng, coords2, path2);
          }
          else{
            mapit(startLat, startLng, endLat, endLng, coords3, path3);
          }
        }
      });
    }
    else {
      this.directionsService.route(
          {
            origin: {'placeId': this.originPlaceId},
            destination: {'placeId': this.destinationPlaceId},
            travelMode: this.travelMode
          },
          function(response, status) {
            if (status === 'OK') {
              me.directionsRenderer.setDirections(response);
              displayTextDirections(me.directionsRenderer.directions.routes[0].legs[0]);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    }
  };

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  };

  function mapit(startLat, startLng, endLat, endLng, coords, path) {
    var waypts = [];
    for (var i = 0; i < coords.length; i++){
      waypts.push({
        location: {lat:coords[i][0],lng:coords[i][1]},
        stopover: true
      });
    }
    var marker = new google.maps.Marker({
      map: map,
    });
    var walkingPath = {
      strokeOpacity: 0,
      icons: [{
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#4285F4',
          fillOpacity: 1,
          scale: 5,
        },
        offset: '5',
        repeat: '22px'
      }]
    };
    var busPath = {
      strokeColor: '#06427e',
      strokeWeight: 7.5
    };
    function makeMarker( position, icon ) {
       new google.maps.Marker({
        position: position,
        map: map,
        icon: icon,
       });
     };
    var circle = {
       path: google.maps.SymbolPath.CIRCLE,
       fillColor: 'white',
       fillOpacity: 1,
       scale: 5,
       strokeColor: 'black',
       strokeWeight: 2.5
    };
    var goo = google.maps,
      map = new goo.Map(document.getElementById('map'), {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        center: {lat:30.6172107, lng: -96.3384577},
        zoom: 16
      });
      App = {
        map: map,
        bounds: new goo.LatLngBounds(),
        directionsService: new goo.DirectionsService(),
        directionsDisplayStart: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: walkingPath
        }),
        directionsDisplayEnd: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: walkingPath
        }),
        directionsDisplay1: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: walkingPath
        }),
        directionsDisplay2: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: walkingPath
        }),
        directionsDisplay3: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: walkingPath
        }),
        directionsDisplay4: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: walkingPath
        }),
        directionsDisplay5: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: busPath
        }),
        directionsDisplay6: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: busPath
        }),
        directionsDisplay7: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: busPath
        }),
        directionsDisplay8: new goo.DirectionsRenderer({
          suppressMarkers: true,
          map: map,
          preserveViewport: true,
          polylineOptions: busPath
        }),
      },
      
      App.directionsService.route({
        origin: {lat:parseFloat(startLat),lng:parseFloat(startLng)},
        destination: {lat:coords[0][0],lng:coords[0][1]},
        travelMode: goo.TravelMode.WALKING},
        function (result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            App.directionsDisplayStart.setDirections(result);
            var leg = result.routes[ 0 ].legs[ 0 ];
            //console.log("1");
              displayTextDirections(leg);
            makeMarker( leg.start_location, circle );
            makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
            App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
          }
      });

      var boolArray = [true,true,true,true,true,true,true,true];
      var walking = true;

      for (var i = 0; i < waypts.length-1 ; i++){
        var j = i+1;
        var k = (j*2)-1;
        if (parseInt(path[k])<0){
          var mode = goo.TravelMode.WALKING;
          walking = true;
        } else {
          var mode = goo.TravelMode.DRIVING;
          walking = false;
        }
        if (boolArray[0] && walking) {
          boolArray[0] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay1.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("2");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[1] && walking) {
          boolArray[1] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay2.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("3");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[2] && walking) {
          boolArray[2] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay3.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("4");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[3] && walking) {
          boolArray[3] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay4.setDirections(result);
              
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("5");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[4] && !walking) {
          boolArray[4] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay5.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("6");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[5] && !walking) {
          boolArray[5] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay6.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("7");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[6] && !walking) {
          boolArray[6] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay7.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("8");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
        else if (boolArray[7] && !walking) {
          boolArray[7] = false;
          App.directionsService.route({
            origin: waypts[i].location,
            destination: waypts[j].location,
            travelMode: mode
          },
          function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              App.directionsDisplay8.setDirections(result);
              var leg = result.routes[ 0 ].legs[ 0 ];
              //console.log("9");
              displayTextDirections(leg);
              makeMarker( leg.end_location, 'https://raw.githubusercontent.com/danielabreo/aggiemaps/master/data/busicon.PNG' );
              App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
            }
          });
        }
      }

      App.directionsService.route({
        origin: {lat:coords[coords.length-1][0],lng:coords[coords.length-1][1]},
        destination: {lat:parseFloat(endLat),lng:parseFloat(endLng)},
        travelMode: goo.TravelMode.WALKING
      },
      function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          App.directionsDisplayEnd.setDirections(result);
          App.map.fitBounds(App.bounds.union(result.routes[0].bounds));
          var leg = result.routes[ 0 ].legs[ 0 ];
          //console.log("10");
          displayTextDirections(leg);
          makeMarker( leg.end_location, marker );
        }
      });
  };
  

  
  function displayTextDirections(legs){
    
    arr.push(legs);
    var startIdx;
    
    for(var i =0;i<arr.length;i++){
      var count =0;
      for(var j =0;j<arr.length;j++){
        if(arr[i] != arr [j]){
          if(arr[i].start_address != arr[j].end_address)//not start
            count++;
        }
      }
      if(count == arr.length-1)
        startIdx = i;
    }
    
    var orderedArr = [];
    orderedArr.push(arr[startIdx]);
      
      
    
   
    for(var j =0;j<arr.length;j++){
      for(var i =0; i <arr.length; i++)
      {
        if(orderedArr[orderedArr.length-1].end_address == arr[i].start_address){

          orderedArr.push(arr[i]);
          break;
        }
        
      }
    }
    
    
    
    
          
      
    var panel = document.getElementById("output");
    panel.innerHTML = "";
    ////console.log(orderedArr);
    
    var today = new Date();
    var hr = today.getHours()%12;
    var min = today.getMinutes()%60;
    var time = hr + ":" + min;
  
    
    for(var i=0;i<orderedArr.length;i++){
      var start = orderedArr[i].start_address.split(" ");
        if(i!=0){
          var dur = orderedArr[i-1].duration.text.split(" ");
          
          min+=parseInt(dur[0]) 
          if(min >= 60){
            hr+= Math.floor(min/60);
            min = min%60;
          }
          
          hr= hr%12;
          time = hr + ":" + min;
        
    }
        
    addDirectionLeg(
      time,
      start[0] + " "+start[1] + " " + start[2],
      start[3]+" "+start[4],
      i,
      orderedArr[i].steps[0].travel_mode,
      "About " + orderedArr[i].duration.text + ", " +orderedArr[i].distance.text,
      orderedArr[i].steps
      );
      
    }
    
    
    ////console.log("worked");
    ////console.log(legs);
    
  }
  
  function addDirectionLeg(time,startLocation,city,idx,mode,estimate,steps){
    var clon = document.getElementsByTagName("template")[0];
    clon.content.getElementById("time").innerHTML = time;
    clon.content.getElementById("start").innerHTML = startLocation;
    clon.content.getElementById("city").innerHTML = city;
    clon.content.getElementById("details").setAttribute("onClick","showDetails("+idx+")");
    clon.content.getElementById("estimate").innerHTML = estimate;
    
    clon.content.getElementById("steps").innerHTML = "";
    for(var i =0;i<steps.length;i++){
      clon.content.getElementById("steps").innerHTML+="<div class=\"step\">" + steps[i].instructions+"</div>";
    }
    
    if(mode === "WALKING"){
      clon.content.getElementById("mode").innerHTML = "Walk";
      clon.content.getElementById("visualLine").style.borderLeft = "6px dotted #003C71";
      clon.content.getElementById("dot").setAttribute('class', 'dot');
      clon.content.getElementById("dot").innerHTML = "";   
      clon.content.getElementById("visualLine").style.top = "47px";
      clon.content.getElementById("visualLine").style.height = "121px";
    }else{
      clon.content.getElementById("mode").innerHTML = "Bus ##";                                                     //bus number here
     
      clon.content.getElementById("visualLine").style.borderLeft = "6px solid #003C71";
      clon.content.getElementById("dot").setAttribute('class', 'stop');
      clon.content.getElementById("dot").innerHTML = "00";                                                         ///enter bus number here
      clon.content.getElementById("visualLine").style.top = "75px";
      clon.content.getElementById("visualLine").style.height = "89px";
    }
    
    //console.log(clon);
    
    var c = clon.content.cloneNode(true);
    document.getElementById("output").appendChild(c);
  }
