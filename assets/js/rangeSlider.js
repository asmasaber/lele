//price range 
$("#slider-range").slider({
    range: true,
    min: 0,
    max: 1000,
    step: 5,
    values: [200, 500],
    isRTL: true,
    slide: function (e, ui) {
        $('.slider-price').html(ui.values[0]);
        $('.slider-price2').html(ui.values[1]);
    }
});

//price range in mobile mode
$("#slider-range-sm").slider({
    range: true,
    min: 0,
    max: 1000,
    step: 5,
    values: [200, 500],
    isRTL: true,
    slide: function (e, ui) {
        $('#slider-price-sm').html(ui.values[0]);
        $('.slider-price2-sm').html(ui.values[1]);
    }
});