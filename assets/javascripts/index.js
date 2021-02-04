function validateForm(form) {

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

function calculate(form) {

    var data = form.data.value;
    var retention = form.retention.value;
    var drive = form.drive.value;

    var formValidated = validateForm(form);

    if (formValidated == true) {

        var instances = ((data * 2) * retention) / ((drive * 1024) - 10);

        if (instances <= 2) {instances = 2}
        else if (instances <= 3) {instances = 3}
        else if (instances <= 4) {instances = 4}
        else if (instances <= 10) {instances = 10}
        else if (instances > 10) {instances = 10};

        // TODO: 20

        document.getElementById("node-count").innerText = instances;
        document.getElementById("diagram").setAttribute("src", "assets/img/" + instances + ".png");
        document.getElementById("results").classList.remove("hidden");

    }

}