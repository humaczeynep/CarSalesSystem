
let storedCars = [];


document.addEventListener('DOMContentLoaded', function() {
    storedCars = JSON.parse(localStorage.getItem('cars'));
    loadCarsFromLocalStorage();
    console.log(storedCars);
});



function addCar() {
   
    const carBrand = document.getElementById("carBrand").value;
    const carName = document.getElementById("carName").value;
    const carModel = document.getElementById("carModel").value;
    const productionYear = document.getElementById("productionYear").value;
    const price = document.getElementById("price").value;
    const kilometer = document.getElementById("kilometer").value;
    const carImage = document.getElementById("carImage").files[0];

    var reader = new FileReader();
    reader.readAsDataURL(carImage);
    reader.onload = function (e) {
        var car = {
            carBrand: carBrand,
            carName: carName,
            carModel: carModel,
            productionYear: productionYear,
            price: price,
            kilometer: kilometer,
            carImage: reader.result
        };

        storedCars.push(car);
        localStorage.setItem("cars", JSON.stringify(storedCars));
        alert("Araç başarıyla eklendi");
        console.log(storedCars);
        document.getElementById("addCarForm").reset();
    };
}



function loadCarsFromLocalStorage() {
    const carList = document.getElementById('carList');
    if (carList) {
        storedCars.forEach((car, index) => {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `
                <div class="image">
                    <img src="${car.carImage}" alt="${car.carBrand} ${car.carName}">
                </div>
                <div class="content">
                    <div class = "year-km">
                    <p>${car.productionYear}</p> <p>${car.kilometer} km</p>
                    </div>
                    <p>${car.carBrand} ${car.carName}</p>
                    <p>${car.carModel}</p>
                    <div class="price">${car.price} TL</div>
                    <button class="delete-button" onclick="removeCar(${index})">X</button>
                </div>
            `;
            carList.appendChild(col);
        });
    }
}


function removeCar(index) {
    if (confirm("Bu arabayı silmek istediğinize emin misiniz?")) {
        storedCars.splice(index, 1);
        localStorage.setItem('cars', JSON.stringify(storedCars));
        location.reload(); 
    }
}
    
   
  