$(document).ready(function() {
    if ($('#staffList').length) {
        $.ajax({
            url: 'https://kerbau.odaje.biz/getstaff.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log('AJAX call successful:', response);  // Debugging line
                if (response && response.length > 0) {
                    response.forEach(function(item) {
                        console.log('Processing item:', item);  // Debugging line
                        var data = JSON.parse(item);
                        if (data.email) {
                            $('#staffList').append('<li class="list-group-item"><a href="secondpage.html?id=' + data.employeeNumber + '">' + data.email + '</a></li>');
                        }
                    });
                } else {
                    $('#staffList').append('<li class="list-group-item">No staff found</li>');
                }
            },
            error: function(error) {
                console.error('Error fetching staff data', error);
            }
        });
    }

    if ($('#staffDetails').length) {
        var urlParams = new URLSearchParams(window.location.search);
        var employeeNumber = urlParams.get('id');

        if (employeeNumber) {
            $.ajax({
                url: 'https://kerbau.odaje.biz/getstaffbyid.php',
                method: 'GET',
                data: { id: employeeNumber },
                dataType: 'json',
                success: function(response) {
                    if (response && response.length > 1) {
                        var data = JSON.parse(response[1]);
                        var detailsHtml = `
                            <p class="card-text">Employee Number     ${data.employeeNumber}</p>
                            <p class="card-text">First Name          ${data.firstName}</p> 
                            <p class="card-text">Last Name           ${data.lastName}</p> 
                            <p class="card-text">Office Code         ${data.officeCode}</p> 
                            <p class="card-text">Phone Extension     ${data.extension}</p> 
                            <p class="card-text">Email Address       ${data.email}</p> 
                            <p class="card-text">Job Title           ${data.jobTitle}</p> 
                            <p class="card-text">Reports To          ${data.reportsTo}</p> 
                        `;
                        $('#staffDetails .card-body').html(detailsHtml);
                    } else {
                        $('#staffDetails .card-body').html('<p>No details found for this employee</p>');
                    }
                },
                error: function(error) {
                    console.error('Error fetching staff details', error);
                }
            });
        } else {
            $('#staffDetails .card-body').html('<p>Invalid employee number</p>');
        }
    }
});
