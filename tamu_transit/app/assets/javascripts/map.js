var startLat;
var startLng;
var endLat;
var endLng;
var arr=[];
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: {lat: 30.618811, lng: -96.336424},
      zoom: 13
    });

    infoWindow = new google.maps.InfoWindow;
  
    new AutocompleteDirectionsHandler(map);
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
    this.directionsRenderer.setPanel(document.getElementById('output'));

    
  
    var originInput = document.getElementById('currentLocation');
    var destinationInput = document.getElementById('destination');
  
    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id', 'geometry']);
  
    var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id', 'geometry']);
  
    this.setupClickListener('walk', 'WALKING');
    this.setupClickListener('bus', 'TRANSIT');
    this.setupClickListener('car', 'DRIVING');
    this.setupClickListener('bike', 'BICYCLING');
    this.setupClickListener('wheelchair', 'ACCESIBLE');
  
    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // if the geolocation was recognized and an address was found
            if (results[0]) {
              // add a marker to the map on the geolocated point
              
              // compose a string with the address parts
              var address = results[0].address_components[1].long_name+' '+results[0].address_components[0].long_name+', '+results[0].address_components[3].long_name
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
      var route1_waypts = [];
      var route5_waypts = [];
      route1_waypts.push({
        location: {lat:30.618900, lng:-96.342874},
        stopover: false
      });
      route1_waypts.push({
        location: {lat:30.611624,lng:-96.350726},
        stopover: false
      });
      route1_waypts.push({
        location: {lat:30.611669, lng:-96.347243},
        stopover: false
      });
      route1_waypts.push({
        location: {lat:30.606778, lng:-96.344749},
        stopover: false
      });
      route1_waypts.push({
        location: {lat:30.604763, lng:-96.345291},
        stopover: false
      });
      route1_waypts.push({
        location: {lat:30.605534, lng:-96.347500},
        stopover: false
      });
      route5_waypts.push({
        location: {lat:30.614096, lng:-96.341778},
        stopover: false
      });
      route5_waypts.push({
        location: {lat:30.609960, lng:-96.346758},
        stopover: false
      });
      route5_waypts.push({
        location: {lat:30.607105, lng:-96.347930},
        stopover: false
      });

      var bus_route = 5;
      //figure out the route to take
      if(bus_route == 1){
        this.directionsService.route(
          {
            origin: route1_waypts[0],
            destination: route1_waypts[5],
            waypoints: route1_waypts,
            optimizeWaypoints: false,
            travelMode: 'Driving'
          },
          function(response, status) {
            if (status === 'OK') {
              me.directionsRenderer.setDirections(response);
              displayTextDirections(me.directionsRenderer.directions.routes[0].legs[0]);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          }
        );
      }
      else{ //bus route 5

      }



    }
    else if (this.travelMode == 'ACCESIBLE'){
      var url = "https://aggiemapsapi.appspot.com/routes?startLat="+startLat+"&startLng="+startLng+"&endLat="+endLat+"&endLng="+endLng;
      $.ajax({
        method: "GET",
        cache: false,
        url: url,
        success: function(data) {
          var routes = [];
          routes.push(data.route1);
          routes.push(data.route2);
          routes.push(data.route3);
          var paths = [];
          paths.push(data.path1);
          paths.push(data.path2);
          paths.push(data.path3);
          var new_paths = [];
          //gives paths
          for(var i = 0; i<3; i++){
            var new_path = [];
            for(var j = 0; j < routes[i].length; j++){
              var stop = [routes[i][j][0]];
              new_path.push(paths[i][j]);
              new_path.push(stop);
            }
            new_path.push(paths[i][routes[i].length]);
            new_paths.push(new_path);
          }
          // get coords
          var new_coords = [];
          for(var i = 0; i < 3 ; i++){
            var new_coord = [];
            for(var j = 0; j < paths[i].length; j++){
              var coord_url = "https://aggiemapsapi.appspot.com/coordinates?stop=" + paths[i][j];
              $.ajax({
                method: "GET",
                cache: false,
                url: coord_url,
                success: function(data) {
                  new_coord.push(data[paths[i][j]]);
                }
              });
              new_coords.push(new_coord);
            }
          }
          
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
            console.log("1");
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
              console.log("2");
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
              console.log("3");
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
              console.log("4");
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
              console.log("5");
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
              console.log("6");
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
              console.log("7");
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
              console.log("8");
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
              console.log("9");
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
          console.log("10");
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
    console.log(orderedArr);
    
    for(var i=0;i<orderedArr.length;i++){
      if(i!= orderedArr.length-1 && orderedArr[i].steps[0].travel_mode == "DRIVING"){
        panel.innerHTML += "Get on bus <br>"; 
      }
      //if(orderedArr[i].steps[0].travel_mode != "DRIVING")
       orderedArr[i].steps.forEach(element => panel.innerHTML += element.instructions + "<br>");
      if(i!= orderedArr.length-1 && orderedArr[i].steps[0].travel_mode == "DRIVING"){
        panel.innerHTML += "Get off bus <br>"; 
      }
    }
    
    
    //console.log("worked");
    //console.log(legs);
    
  }