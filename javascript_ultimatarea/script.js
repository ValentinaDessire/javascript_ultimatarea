document.getElementById('carForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var carName = document.getElementById('carName').value;
    var lastMaintenanceDate = document.getElementById('lastMaintenanceDate').value;
    var maintenanceInterval = parseInt(document.getElementById('maintenanceInterval').value);

    var car = {
        name: carName,
        lastMaintenanceDate: lastMaintenanceDate,
        maintenanceInterval: maintenanceInterval
    };

    var carList = JSON.parse(localStorage.getItem('carList')) || [];

    carList.push(car);

    localStorage.setItem('carList', JSON.stringify(carList));

    document.getElementById('carForm').reset();

    updateCarList();
});

function updateCarList() {
    var carList = JSON.parse(localStorage.getItem('carList'));

    document.getElementById('carList').innerHTML = '';

    if (carList && carList.length > 0) {
        carList.forEach(function (car, index) {
            var lastMaintenanceDate = new Date(car.lastMaintenanceDate);
            var nextMaintenanceDate = new Date(lastMaintenanceDate.getTime() + car.maintenanceInterval * 24 * 60 * 60 * 1000);
            var daysRemaining = Math.floor((nextMaintenanceDate - Date.now()) / (24 * 60 * 60 * 1000));

            var carItem = document.createElement('div');
            carItem.classList.add('carItem');
            carItem.innerHTML = '<strong>' + car.name + '</strong> - Último Mantenimiento: ' + car.lastMaintenanceDate + ' - Próximo Mantenimiento en ' + daysRemaining + ' días';
            document.getElementById('carList').appendChild(carItem);
        });
    }
}

updateCarList();
