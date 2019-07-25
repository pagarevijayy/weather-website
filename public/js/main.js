console.log("Client-side javaScript file is loaded!");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("testing..");
    fetch(`/weather?location=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                // console.log(data.error);
            } else {
                msg2.textContent = `location: ${data.location} <br> temp: ${data.temperature} <br> summary: ${data.summary}`
                console.log(data);
            }
        })
    })
})