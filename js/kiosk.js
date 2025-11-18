var linkUrl;
var currentPage;
var target = document.body; 
var url = window.location;
var anchor=url.hash;

var refreshWeatherRate = 300000; //how often to refresh the weather in ms
var refreshStatsRate = 60000; //how often to refresh the stats in ms
var refreshUrgentRate = 120000; //how often to refresh the urgent in ms
var refreshSugarFeedRate = 120000; //how often to refresh the feed in ms

var fontsize = 100;

jQuery(document).ready(function(){

      //namespacing is nice
      if (typeof kiosk != "undefined"){
            //we've already been created!
            return false;
      }
      kiosk = {}
  
       kiosk.displayClock = function(){
			try
			{
				//clock js based on article at http://www.elated.com/articles/creating-a-javascript-clock/
				var currentTime = new Date();
			  
				var currentHours = currentTime.getHours();
				var currentMinutes = currentTime.getMinutes();
				var currentSeconds = currentTime.getSeconds();
				
				var daysString = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
				var currentDay = daysString[currentTime.getDay()];
				
				var monthString = new Array("Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec.");
				var currentMonth = monthString[currentTime.getMonth()];
				
				var currentDate = currentTime.getDate();
			  
				// Pad the minutes and seconds with leading zeros, if required
				currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
				currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
			  
				// Choose either "AM" or "PM" as appropriate
				var timeOfDayText = ( currentHours < 12 ) ? "a.m." : "p.m.";
				var timeOfDay = "<span id='amPm'>" + timeOfDayText + "</span>";
			  
				// Convert the hours component to 12-hour format if needed
				currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
			  
				// Convert an hours component of "0" to "12"
				currentHours = ( currentHours == 0 ) ? 12 : currentHours;
			  
				// Compose the string for display
				var currentDateString = currentDay + ", " + currentMonth + " ";
				var currentNumberDate = currentDate;
				var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
				var currentSecondsString = ":" + currentSeconds;
				
				// Update the time display
				$("#dateText").html(currentDateString).fadeIn("slow");
				$("#numberDate").html(currentDate).fadeIn("slow");
				$("#clock").html(currentTimeString).fadeIn("slow");
				$("#tick").html(currentSecondsString).fadeIn("slow");	
			}
			catch(err) {
			}
      }

		kiosk.getWeather = function(){
			try
			{		
				//load the weather over ajax, referesh set by refreshWeatherRate variable set at the top of this doc
				setTimeout(function() {
					  $("#weather").load("weather.php").fadeIn("slow");
				}, 1000);
				var refreshId = setInterval(function() {
					  $("#weather").fadeOut("slow").load("weather.php").fadeIn("slow");
				}, refreshWeatherRate);
				$.ajaxSetup({ cache: false });
				}
			catch(err) {
			}			
		}
		
		kiosk.getStats = function(){
			try
			{		
				//load the helpdesk stats
				setTimeout(function() {
					  $("#statstext").load("hd_stats.php").fadeIn("slow");
				}, 1000);
				var refreshId = setInterval(function() {
					  $("#statstext").fadeOut("slow").load("hd_stats.php").fadeIn("slow");
				}, refreshStatsRate);
				$.ajaxSetup({ cache: false });
			}
			catch(err) {
			}			
		}       

		kiosk.codeMaroon = function(){
			try
			{
				setTimeout(function() {
					  $("#urgent").load("code_maroon.php").fadeIn("slow");
				}, 1000);
				var refreshId = setInterval(function() {
					  $("#urgent").fadeOut("slow").load("code_maroon.php").fadeIn("slow");
				}, refreshUrgentRate);
				$.ajaxSetup({ cache: false });		
			}
			catch(err) {
			}			
			
		}    

		kiosk.sugarticker = function(){
			try
			{
				setTimeout(function() {
					  $("#sugarfeed").load("sugarfeed.php").fadeIn("slow");
				}, 1000);
				var refreshId = setInterval(function() {
					  $("#sugarfeed").fadeOut("slow").load("sugarfeed.php").fadeIn("slow");
				}, refreshSugarFeedRate);
				$.ajaxSetup({ cache: false });		
			}
			catch(err) {
			}			
			
		} 
		
		kiosk.vtick = function() {
			try
			{
				$('#sugarfeed').vTicker({ 
					speed: 1000,
					pause: 9000,
					animation: 'fade',
					mousePause: false,
					isPaused: false,
					showItems: 1
				});
			
			}
			catch(err) {
			}			
		} 		
		
	setInterval('kiosk.displayClock()', 1000 );  //update the clock every second
	kiosk.getWeather();
	kiosk.getStats();
	kiosk.sugarticker(); 	// Also used for Code Maroon
	kiosk.vtick();
	
});
