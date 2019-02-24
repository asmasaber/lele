//price range 
$("#slider-range").slider({
    range: true,
    min: -1000,
    max: 0,
    step: 5,
    values: [-500, -200],
    isRTL: true,
    slide: function (e, ui) {
        $('.slider-price').html(-ui.values[1]);
        $('.slider-price2').html(-ui.values[0]);
    }
});

//price range in mobile mode
$("#slider-range-sm").slider({
    range: true,
    min: -1000,
    max: 0,
    step: 5,
    values: [-500, -200],
    isRTL: true,
    slide: function (e, ui) {
        $('#slider-price-sm').html(-ui.values[1]);
        $('.slider-price2-sm').html(-ui.values[0]);
    }
});