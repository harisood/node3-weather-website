const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const messageThree = document.querySelector('#message-three');
const messageFour = document.querySelector('#message-four');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.locationProblem) {
                return messageOne.textContent = data.locationProblem;
            }

            const weatherIcons = [
                {
                    weather: 'Partly cloudy', 
                    icon: '<ion-icon name="partly-sunny-outline"></ion-icon>'
                },
                {
                    weather: 'Sunny', 
                    icon: '<ion-icon name="sunny-outline"></ion-icon>'
                },
                {
                    weather: 'Clear', 
                    icon: '<ion-icon name="sunny-outline"></ion-icon>'
                },
                {
                    weather: 'Partly cloudy', 
                    icon: '<ion-icon name="cloud-outline"></ion-icon>'
                },
                {
                    weather: 'Cloudy', 
                    icon: '<ion-icon name="cloudy-outline"></ion-icon>'
                },
                {
                    weather: 'Overcast', 
                    icon: '<ion-icon name="cloudy-outline"></ion-icon><ion-icon name="cloudy-outline"></ion-icon>'
                },
                {
                    weather: 'Light rain', 
                    icon: '<ion-icon name="rainy-outline"></ion-icon>'
                },
                {
                    weather: 'Heavy rain', 
                    icon: '<ion-icon name="rainy-outline"></ion-icon><ion-icon name="rainy-outline"></ion-icon></ion-icon><ion-icon name="rainy-outline"></ion-icon>'
                },
                {
                    weather: 'Rain, Mist', 
                    icon: '<ion-icon name="rainy-outline"></ion-icon><ion-icon name="rainy-outline"></ion-icon>'
                },
                {
                    weather: 'Mist', 
                    icon: '<ion-icon name="rainy-outline">'
                },
            ];

            weatherType = (arr) => {
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i].weather === data.weather[0]) {
                        return arr[i].icon;
                    };
                };
                return ''
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            messageThree.innerHTML = weatherType(weatherIcons);
            messageFour.textContent = `${data.temperature}\u00B0C`;
        })
    });

    search.value = '';
});