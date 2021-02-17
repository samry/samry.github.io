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
            "failover": false,
            "url": "https://www.nagios.com/products/nagios-log-server/buy/?field4=1%20Instance%20License%20-%20$3,995"
        },
        {
            "count": 2,
            "price": "$4,995",
            "failover": true,
            "url": "https://www.nagios.com/products/nagios-log-server/buy/?field4=2%20Instance%20License%20-%20$4,995"
        },
        {
            "count": 3,
            "price": "$5,995",
            "failover": true,
            "url": "https://www.nagios.com/products/nagios-log-server/buy/?field4=3%20Instance%20License%20-%20$5,995"
        },
        {
            "count": 4,
            "price": "$6,995",
            "failover": true,
            "url": "https://www.nagios.com/products/nagios-log-server/buy/?field4=4%20Instance%20License%20-%20$6,995"
        },
        {
            "count": 10,
            "price": "$14,995",
            "failover": true,
            "url": "https://www.nagios.com/products/nagios-log-server/buy/?field4=10%20Instance%20License%20-%20$14,995"
        },
        {
            "count": null,
            "price": "Contact Sales",
            "failover": true,
            "url": "#"
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

            instances = ((data * 2) * retention) / (drive - 10); // buffer    

        } else {

            instances = (((data * 2) * retention) + (recall * 2 * data)) / (drive - 10); // buffer
        
        }

        if (instances <= 2) {instances = 2}
        else if (instances <= 3) {instances = 3}
        else if (instances <= 4) {instances = 4}
        else if (instances <= 10) {instances = 10}
        else if (instances > 10) {instances = null} 

        var viewModel = viewModels.filter(d => d.count == instances)[0];

        
        $(".circle").addClass("d-none");
        if (instances != null) {
            
            $(".circle").each(function(i){
                
                if (i < instances) {
                    $(this).removeClass("d-none");
                }

            });

            $(".cluster-node-count").text(instances);
 
            $(".cluster-price").text(viewModel.price);

            $("#buy-now")
                .text("Buy Now")
                .attr("href", viewModel.url);

        } else {

            $(".cluster-node-count").text("Custom");
 
            $(".cluster-price").text("Contact Sales");

            $("#buy-now")
                .text("Contact Sales")
                .attr("href", "mailto:sales@nagios.com");

        }


    }

}

$(document).ready(function(){

    calculate();

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('input.input-value').on('input', function () {
        
        var value = parseInt($(this).val());
        var min = parseInt($(this).attr("min"));
        var max = parseInt($(this).attr("max"));
        
        if (!isNaN(value)) {
            $(this).val(Math.max(Math.min(value, max)), min);
        } else {
            $(this).val(min);
        }
    });

});
