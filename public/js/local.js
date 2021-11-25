import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, setDoc , doc } from "firebase/firestore"

/*
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAc-8qZIk7sIMdzy1R3TIsSsPtUxM52JQ8",
    authDomain: "ta-chegando-final.firebaseapp.com",
    projectId: "ta-chegando-final"
});
*/


const db = getFirestore();


function logar(a){
    localStorage.setItem("cliente", a);
}



function cad(){
    cadastro = localStorage.getItem("cliente")
    if(cadastro == 1){
        window.location.href = "cadastro";
    }else if(cadastro == 2){
        window.location.href = "cadastroent";
    } else if (cadastro == 3){
        window.location.href = "cadastroemp";
    } else{
        window.location.href = "home";
    }
}

/*function geoLocation(){
    if('geolocation' in navigator){
        console.log('sim')
        const local = navigator.geolocation.getCurrentPosition(function(position){
             mapInit()
            //console.log(position.coords.latitude)
        }, function(error){
            console.log(error)
        }
    )
        
        const rastreio = navigator.geolocation.watchPosition(function(position){
            var lat = position.coords.latitude
            var lng = position.coords.longitude
            markerMove(lat, lng)
            //console.log(position.coords.latitude)
        }, function(error){
            console.log(error)
        }, {enableHighAccuracy: true, maximumAge: 5000, timeout:5000})
    }else{
        console.log('nao')
    }
    
}
var map;
function mapInit(){
    map = new google.maps.Map(document.getElementById("map"),{
        center: {lat: -8.043123488579804, lng: -34.88161061673485},
        zoom: 18
    })

    var marker = new google.maps.Marker({
        position: {lat: -8.043123488579804, lng: -34.88161061673485},
        map: map 
    })
    //console.log(map)
}

function markerMove(lat, lng){
    var marker1 = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map 
    })
}
*/

function mapInit() {
    //var pointFix
    var lat
    var lng
   
        
    if (navigator.geolocation){
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: -8.043123488579804, lng: -34.88161061673485},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var markerFix = new google.maps.Marker({
    position: {lat: -8.043123488579804, lng: -34.88161061673485},
    map: map
    });


    /*  navigator.geolocation.getCurrentPosition(function(position) {  
    var pointFix = new google.maps.LatLng(position.coords.latitude, 
                                          position.coords.longitude);
    
                                          
    //map.setCenter(pointFix)
    })
    */
   // map.setCenter(pointFix)
  
  var marker = null;
  
  function autoUpdate() {
    navigator.geolocation.getCurrentPosition(function(position) {  
      var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                            position.coords.longitude);
        localStorage.setItem("latitude", position.coords.latitude)
        localStorage.setItem("longitude", position.coords.longitude)
        console.log("geolocation")
      if (marker) {
        // Marker already created - Move it
        
        marker.setPosition(newPoint);
        //upTracker(newPoint[0], newPoint[1])
      }
      else {
        // Marker does not exist - Create it
        marker = new google.maps.Marker({
          position: newPoint,
          map: map
        });
      }
  
      // Center the map on the new position
     // map.setCenter(newPoint);
    }); 
  
    // Call the autoUpdate() function every 5 seconds
    setTimeout(autoUpdate, 5000);
  }
  
  autoUpdate();
}else{
    alert('W3C Geolocation API is not available');
}
}



function autoUpdateEnt() {
    navigator.geolocation.getCurrentPosition(function(position) {  
        var marker = null;
        var ref = null;
      var newPoint = new google.maps.LatLng(position.coords.latitude, 
                                            position.coords.longitude);
        console.log("geolocation")
        console.log(position.coords.latitude)
        if(ref){
        try {
            const docRef = await addDoc(collection(db, "rastreio"), {
              lat: position.coords.latitude,
              long: position.coords.longitude
            });
            console.log("Document written with ID: ", docRef.id);
            ref = docRef.id;
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }else{
            await setDoc(doc(db, "rastreio", ref), {
                lat: position.coords.latitude,
                long: position.coords.longitude
              });

        }


      if (marker) {
        // Marker already created - Move it
        
        marker.setPosition(newPoint);
        //upTracker(newPoint[0], newPoint[1])
      }
      else {
        // Marker does not exist - Create it
        marker = new google.maps.Marker({
          position: newPoint
         // map: map
        });
      }
  
      // Center the map on the new position
     // map.setCenter(newPoint);
    }); 
  
    // Call the autoUpdate() function every 5 seconds
    setTimeout(autoUpdateEnt, 5000);
  }
//openEmp()