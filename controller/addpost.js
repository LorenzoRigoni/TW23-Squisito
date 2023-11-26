$('#choose-image').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
       $('#hero-image').css('background-image', 'url("' + reader.result + '")');
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
    }
});
