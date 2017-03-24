$(document).ready(function () {

    $('#submit').click(function () {
        toastr.options = {
            closeButton: true,
            progressBar: false,
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
            timeOut: 5000,
            positionClass: "toast-bottom-right"
        };
        toastr.success('Checkout settings menu on left!', 'Payment successful');
    })

});