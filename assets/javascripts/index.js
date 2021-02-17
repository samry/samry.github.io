function updateTextValue(el) {
    document.getElementById('text-value-' + el.id).value = el.value;
    calculate();
}

function updateRangeValue(el) {
    document.getElementById(el.id.replace("text-value-", '')).value = el.value;
    calculate();
}

function validateForm(form) {

    if (form.recallEnabled.checked == false) {
        document.getElementById("recall").setAttribute("disabled", null);
    } else {
        document.getElementById("recall").removeAttribute("disabled");
    }

    var data = form.data.value;
    var retention = form.retention.value;
    var drive = form.drive.value;

    function validateNumber(num, id) {

        if (num === "" || num < 0 || num === null) {
        
            document.getElementById('invalid-' + id).classList.add("visible");
        
            return false;
        
        }
        
        document.getElementById('invalid-' + id).classList.remove("visible");
        
        return true;
    
    }

    var dataValid = validateNumber(data, "data");
    var retentionValid = validateNumber(retention, "retention");
    var driveValid = validateNumber(drive, "drive");

    console.log(retentionValid);

    if (dataValid == false || retentionValid == false || driveValid == false) {        
        document.getElementById("results").classList.add("hidden");
        return false;
    }

    return true;

}

function calculate() {

    var viewModels = [
        {
            "count": 1,
            "price": "$3,995",
            "failover": false
        },
        {
            "count": 2,
            "price": "$4,995",
            "failover": true
        },
        {
            "count": 3,
            "price": "$5,995",
            "failover": true
        },
        {
            "count": 4,
            "price": "$6,995",
            "failover": true
        },
        {
            "count": 10,
            "price": "$14,995",
            "failover": true
        },
    ];

    var data = parseInt(document.getElementById("text-value-data-range").value);
    var retention = parseInt(document.getElementById("text-value-retention").value);
    var drive = parseInt(document.getElementById("text-value-drive").value);
    var recall = parseInt(document.getElementById("recall").value);

    // var formValidated = validateForm(form);
    var formValidated = true;
    if (formValidated == true) {

        var instances;

        if (isNaN(recall)) {    

            instances = ((data * 2) * retention) / ((drive * 1024) - 10); // buffer    

        } else {

            instances = (((data * 2) * retention) + (recall * 2 * data)) / ((drive * 1024) - 10); // buffer
        
        }

        if (instances <= 2) {instances = 2}
        else if (instances <= 3) {instances = 3}
        else if (instances <= 4) {instances = 4}
        else if (instances <= 10) {instances = 10}
        else if (instances > 10) {instances = 10};

        var viewModel = viewModels.filter(d => d.count == instances)[0];

        var items = document.getElementsByClassName("circle");
        for (var i = 0; i < items.length; i++) {
            if (i >= instances) {
                items[i].classList.add("d-none");
            } else {
                items[i].classList.remove("d-none");
            }
        }


        var items = document.getElementsByClassName("cluster-node-count");
        for (var i = 0; i < items.length; i++) {
            items[i].innerHTML = instances;
        }

        var items = document.getElementsByClassName("cluster-price");
        for (var i = 0; i < items.length; i++) {
            items[i].innerHTML = viewModel.price;
        }

    }

}

$(document).ready(function(){

    calculate();

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

});
