// ------------------------- Update Date and Time -------------------------

        function updateTime() {
            const now = new Date();

            // format date: "weekday"
            const dayOptions = {
                weekday: 'long'
            };

            // format date: "22/07/2026"
            const dateOptions = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            // format time: "9:30 AM"
            const timeOptions = {
                hour: 'numeric',
                minute: '2-digit'
            };

            const dayString = now.toLocaleDateString(undefined, dayOptions);
            const dateString = now.toLocaleDateString(undefined, dateOptions);
            const timeString = now.toLocaleTimeString(undefined, timeOptions);

            document.getElementById('day').textContent = dayString;
            document.getElementById('date').textContent = dateString;
            document.getElementById('time').textContent = timeString;

        }

        setInterval(updateTime, 1000);
        updateTime();

// ------------------------- Fetch Weather -------------------------

        async function getWeather(lat, lon) {
            const apiKey = 'e1d748f65d4649f681d9a39f0c748380';
            const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${lat}&lon=${lon}&units=I`

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Weather data not found');
                const data = await response.json();
                
                const current = data.data[0];

                const condition = current.weather.description;
                const temp = Math.round(current.temp);
                const city = current.city_name;
                const iconCode = current.weather.icon;
                const iconUrl = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;   
                
                // Updates the elements with IDs 'temp', 'weather', & 'logo'
                document.getElementById('temp').textContent = `${temp}°F`;
                document.getElementById('weather').innerHTML = `${condition}`;
                document.getElementById('logo').innerHTML = `<img src="${iconUrl}" alt="${condition}" style="vertical-align: middle;">`;
            } catch (error) {
                document.getElementById('weather').textContent = 'Unable to fetch weather';
                console.error(error);
            }
        }
        
        
// ------------------------- Get User Location -------------------------

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    getWeather(30.616525521761005, -96.33824115183701);
                    // document.getElementById('weather').textContent = 'Location access denied.';
                }
            );
        } else {
            document.getElementById('weather').textContent = 'Geolocation not supported.';
        }
        
        