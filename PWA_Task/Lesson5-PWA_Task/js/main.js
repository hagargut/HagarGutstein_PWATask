window.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#find-me').addEventListener('click', geoFindMe);
    document.querySelector('#shareBtn').addEventListener('click', share);

    //document.getElementById("shareBtn").addEventListener("click", share);

    let coord = '';

    function geoFindMe() {

        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');

        mapLink.href = '';
        mapLink.textContent = '';

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            coord = latitude + " " + longitude;
            status.textContent = '';
            mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

            document.getElementById("iframe").src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
            document.getElementById("iframe").classList.remove("d-none");
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'מאתר את מיקומך...';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    function share() {

        const shareData = {
            title: 'מיקום',
            text: coord
        }

        const btn = document.querySelector('#shareBtn');
        const resultPara = document.querySelector('.result');

        // Share must be triggered by "user activation"
        btn.addEventListener('click', async () => {
            try {
                await navigator.share(shareData);
                resultPara.textContent = 'מיקום שותף בהצלחה';
            } catch (err) {
                resultPara.textContent = `Error: ${err}`;
            }
        });
}


})