$(function () {

    'use strict';

    // Showing page loader
    $(window).on('load', function () {
        populateColorPlates();
        setTimeout(function () {
            $(".page_loader").fadeOut("fast");
        }, 100);

        if ($('body .filter-portfolio').length > 0) {
            $(function () {
                $('.filter-portfolio').filterizr(
                    {
                        delay: 0
                    }
                );
            });
            $('.filteriz-navigation li').on('click', function () {
                $('.filteriz-navigation .filtr').removeClass('active');
                $(this).addClass('active');
            });
        }

        if($("#map").length > 0) {
            var latitude = 51.541216;
            var longitude = -0.095678;
            var layout = $('#map').attr('data-map');
            var providerName = 'OpenStreetMap';
            generateMap(latitude, longitude, providerName, layout);
        }

        if($("#contactMap").length > 0) {
            LoadMap('contactMap');
        }
    });

    // Made the left sidebar's min-height to window's height
    var winHeight = $(window).height();
    $('.dashboard-nav').css('min-height', winHeight);

    // Magnify activation
    $('.portfolio-item').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{enabled:true}
    });

    // Sidebar
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#drawer').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });


    var $ul   =   $('.sidebar-navigation > ul');
    $ul.find('li a').click(function(e){
        var $li = $(this).parent();

        if($li.find('ul').length > 0){
            e.preventDefault();

            if($li.hasClass('selected')){
                $li.removeClass('selected').find('li').removeClass('selected');
                $li.find('ul').slideUp(400);
                $li.find('a em').addClass('fa-chevron-down');
                $li.find('a em').removeClass('fa-chevron-up');
            }else{

                if($li.parents('li.selected').length == 0){
                    $ul.find('li').removeClass('selected');
                    $ul.find('ul').slideUp(400);
                    $ul.find('li a em').addClass('fa-chevron-down');
                    $ul.find('li a em').removeClass('fa-chevron-up');
                }else{
                    $li.parent().find('li').removeClass('selected');
                    $li.parent().find('> li ul').slideUp(400);
                    $li.parent().find('> li a em').addClass('fa-chevron-down');
                    $li.parent().find('> li a em').removeClass('fa-chevron-up');
                }

                $li.addClass('selected');
                $li.find('>ul').slideDown(400);
                $li.find('>a>em').addClass('fa-chevron-up');
                $li.find('>a>em').removeClass('fa-chevron-down');
            }
        }
    });
    $('.sidebar-navigation > ul ul').each(function(i){
        if($(this).find('>li>ul').length > 0){
            var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
            var pIntPLeft   = parseInt(paddingLeft);
            var result      = pIntPLeft + 20;

            $(this).find('>li>a').css('padding-left',result);
        }else{
            var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
            var pIntPLeft   = parseInt(paddingLeft);
            var result      = pIntPLeft + 20;

            $(this).find('>li>a').css('padding-left',result).parent().addClass('selected--last');
        }
    });

    // Header shrink while page scroll
    adjustHeader();
    doSticky();
    placedDashboard();
    $(window).on('scroll', function () {
        adjustHeader();
        doSticky();
        placedDashboard();
    });

    // Header shrink while page resize
    $(window).on('resize', function () {
        adjustHeader();
        doSticky();
        placedDashboard();
    });

    function adjustHeader()
    {
        var windowWidth = $(window).width();
        if(windowWidth > 0) {
            if ($(document).scrollTop() >= 100) {
                if($('.header-shrink').length < 1) {
                    $('.sticky-header').addClass('header-shrink');
                }
                if($('.do-sticky').length < 1) {
                    $('.logo img').attr('src', 'img/logos/black-logo.png');
                }
            }
            else {
                $('.sticky-header').removeClass('header-shrink');
                if($('.do-sticky').length < 1 && $('.fixed-header').length == 0 && $('.fixed-header2').length == 0) {
                    $('.logo img').attr('src', 'img/logos/logo.png');
                } else {
                    $('.logo img').attr('src', 'img/logos/logo.png');
                }
            }
        } else {
            $('.logo img').attr('src', 'img/logos/black-logo.png');
        }
    }

    function doSticky()
    {
        if ($(document).scrollTop() > 40) {
            $('.do-sticky').addClass('sticky-header');
            //$('.do-sticky').addClass('header-shrink');
        }
        else {
            $('.do-sticky').removeClass('sticky-header');
            //$('.do-sticky').removeClass('header-shrink');
        }
    }

    function placedDashboard() {
        var headerHeight = parseInt($('.main-header').height(), 10);
        $('.dashboard').css('top', headerHeight);
    }

    if($(document).find('#boxgallery').length > 0) {
        new BoxesFx( document.getElementById( 'boxgallery' ) );
    }

    // Banner slider
    (function ($) {
        //Function to animate slider captions
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $myCarousel = $('#carousel-example-generic')
        var $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $myCarousel.carousel();

        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Pause carousel
        $myCarousel.carousel('pause');
        //Other slides to be animated on carousel slide event
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });
        $('#carousel-example-generic').carousel({
            interval: 3000,
            pause: "false"
        });
    })(jQuery);

    // Page scroller initialization.
    $.scrollUp({
        scrollName: 'page_scroller',
        scrollDistance: 300,
        scrollFrom: 'top',
        scrollSpeed: 500,
        easingType: 'linear',
        animation: 'fade',
        animationSpeed: 200,
        scrollTrigger: false,
        scrollTarget: false,
        scrollText: '<i class="fa fa-chevron-up"></i>',
        scrollTitle: false,
        scrollImg: false,
        activeOverlay: false,
        zIndex: 2147483647
    });

    // Counter
    function isCounterElementVisible($elementToBeChecked) {
        var TopView = $(window).scrollTop();
        var BotView = TopView + $(window).height();
        var TopElement = $elementToBeChecked.offset().top;
        var BotElement = TopElement + $elementToBeChecked.height();
        return ((BotElement <= BotView) && (TopElement >= TopView));
    }

    $(window).on('scroll', function () {
        $(".counter").each(function () {
            var isOnView = isCounterElementVisible($(this));
            if (isOnView && !$(this).hasClass('Starting')) {
                $(this).addClass('Starting');
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            }
        });
    });


    // Countdown activation
    $( function() {
        // Add background image
        //$.backstretch('../img/nature.jpg');
        var endDate = "December  27, 2019 15:03:25";
        $('.countdown.simple').countdown({ date: endDate });
        $('.countdown.styled').countdown({
            date: endDate,
            render: function(data) {
                $(this.el).html("<div>" + this.leadingZeros(data.days, 3) + " <span>Days</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>Hours</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>Minutes</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>Seconds</span></div>");
            }
        });
        $('.countdown.callback').countdown({
            date: +(new Date) + 10000,
            render: function(data) {
                $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
            },
            onEnd: function() {
                $(this.el).addClass('ended');
            }
        }).on("click", function() {
            $(this).removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
        });

    });

    $(".range-slider-ui").each(function () {
        var minRangeValue = $(this).attr('data-min');
        var maxRangeValue = $(this).attr('data-max');
        var minName = $(this).attr('data-min-name');
        var maxName = $(this).attr('data-max-name');
        var unit = $(this).attr('data-unit');

        $(this).append("" +
            "<span class='min-value'></span> " +
            "<span class='max-value'></span>" +
            "<input class='current-min' type='hidden' name='"+minName+"'>" +
            "<input class='current-max' type='hidden' name='"+maxName+"'>"
        );
        $(this).slider({
            range: true,
            min: minRangeValue,
            max: maxRangeValue,
            values: [minRangeValue, maxRangeValue],
            slide: function (event, ui) {
                event = event;
                var currentMin = parseInt(ui.values[0], 10);
                var currentMax = parseInt(ui.values[1], 10);
                $(this).children(".min-value").text( currentMin + " " + unit);
                $(this).children(".max-value").text(currentMax + " " + unit);
                $(this).children(".current-min").val(currentMin);
                $(this).children(".current-max").val(currentMax);
            }
        });

        var currentMin = parseInt($(this).slider("values", 0), 10);
        var currentMax = parseInt($(this).slider("values", 1), 10);
        $(this).children(".min-value").text( currentMin + " " + unit);
        $(this).children(".max-value").text(currentMax + " " + unit);
        $(this).children(".current-min").val(currentMin);
        $(this).children(".current-max").val(currentMax);
    });

    // Select picket
    $('.selectpicker').selectpicker();

    // Search option's icon toggle
    $('.search-options-btn').on('click', function () {
        $('.search-section').toggleClass('show-search-area');
        $('.search-options-btn .fa').toggleClass('fa-chevron-down');
    });

    // Carousel with partner initialization
    (function () {
        $('#ourPartners').carousel({interval: 3600});
    }());

    (function () {
        $('.our-partners .item').each(function () {
            var itemToClone = $(this);
            for (var i = 1; i < 4; i++) {
                itemToClone = itemToClone.next();
                if (!itemToClone.length) {
                    itemToClone = $(this).siblings(':first');
                }
                itemToClone.children(':first-child').clone()
                    .addClass("cloneditem-" + (i))
                    .appendTo($(this));
            }
        });
    }());


    // Partners strat
    $('.custom-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    });


    //slide-container
    (function() {
        var slideContainer = $('.slide-container');
        slideContainer.slick({
            arrows: false,
            initialSlide:0,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 4,
            swipeToSlide:true,
            responsive: [
                {
                    breakpoint: 1224,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    })();

    if($(document).find('.slider-container').length > 0) {
        const sliderContainer = document.querySelector('.slider-container')
        const slideRight = document.querySelector('.right-slide')
        const slideLeft = document.querySelector('.left-slide')
        const upButton = document.querySelector('.up-button')
        const downButton = document.querySelector('.down-button')
        const slidesLength = slideRight.querySelectorAll('div').length

        let activeSlideIndex = 0

        slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

        upButton.addEventListener('click', () => changeSlide('up'))
        downButton.addEventListener('click', () => changeSlide('down'))

        const changeSlide = (direction) => {
            const sliderHeight = sliderContainer.clientHeight
            if(direction === 'up') {
                activeSlideIndex++
                if(activeSlideIndex > slidesLength - 1) {
                    activeSlideIndex = 0
                }
            } else if(direction === 'down') {
                activeSlideIndex--
                if(activeSlideIndex < 0) {
                    activeSlideIndex = slidesLength - 1
                }
            }

            slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
            slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
        }
    }

    // Comon slick strat
    $('.slick').slick({
        dots: false,
        infinite: true,
        touchThreshold : 100,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
        nextArrow: '<button class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        prevArrow: '<button class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    });

    //featured-slider
    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    //product-slider-box
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical:true,
        asNavFor: '.slider-for',
        dots: false,
        focusOnSelect: true,
        verticalSwiping:true
    });

    // Banner 2 start initialization.
    if($(document).find('.slide').length > 0) {
        function sliderPluggin(activeslide = 0) {
            const slides = document.querySelectorAll('.slide');
            slides[activeslide].classList.add('active');
            function clearActiveClasses() {
                slides.forEach((slide) => {
                    slide.classList.remove('active');
                });
            }

            for (const slide of slides) {
                slide.addEventListener('click', () => {
                    clearActiveClasses();
                    slide.classList.add('active');
                });
            }
        }

        sliderPluggin(0);
    }

    //Banner 3 slide-container
    (function() {
        var slideContainer = $('.slide-container');
        slideContainer.slick({
            arrows: false,
            initialSlide:0,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 4,
            swipeToSlide:true,
            responsive: [
                {
                    breakpoint: 1224,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    })();

    if($(document).find('.slider-container').length > 0) {
        const sliderContainer = document.querySelector('.slider-container')
        const slideRight = document.querySelector('.right-slide')
        const slideLeft = document.querySelector('.left-slide')
        const upButton = document.querySelector('.up-button')
        const downButton = document.querySelector('.down-button')
        const slidesLength = slideRight.querySelectorAll('div').length

        let activeSlideIndex = 0

        slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

        upButton.addEventListener('click', () => changeSlide('up'))
        downButton.addEventListener('click', () => changeSlide('down'))

        const changeSlide = (direction) => {
            const sliderHeight = sliderContainer.clientHeight
            if(direction === 'up') {
                activeSlideIndex++
                if(activeSlideIndex > slidesLength - 1) {
                    activeSlideIndex = 0
                }
            } else if(direction === 'down') {
                activeSlideIndex--
                if(activeSlideIndex < 0) {
                    activeSlideIndex = slidesLength - 1
                }
            }

            slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
            slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
        }
    }

    // Background video playing script
    $(document).ready(function () {
        $(".player").mb_YTPlayer(
            {
                mobileFallbackImage: 'img/banner/banner-1.jpg'
            }
        );
    });

    // Multilevel menuus
    $('[data-submenu]').submenupicker();

    // Expending/Collapsing advance search content
    $('.show-more-options').on('click', function () {
        if ($(this).find('.fa').hasClass('fa-minus-circle')) {
            $(this).find('.fa').removeClass('fa-minus-circle');
            $(this).find('.fa').addClass('fa-plus-circle');
        } else {
            $(this).find('.fa').removeClass('fa-plus-circle');
            $(this).find('.fa').addClass('fa-minus-circle');
        }
    });

    var videoWidth = $('.sidebar-widget').width();
    var videoHeight = videoWidth * .61;
    $('.sidebar-widget iframe').css('height', videoHeight);


    // Megamenu activation
    $(".megamenu").on("click", function (e) {
        e.stopPropagation();
    });

    // Dropdown activation
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');


        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });


    // Full  Page Search Activation
    $(function () {
        $('a[href="#full-page-search"]').on('click', function(event) {
            event.preventDefault();
            $('#full-page-search').addClass('open');
            $('#full-page-search > form > input[type="search"]').focus();
        });

        $('#full-page-search, #full-page-search button.close').on('click keyup', function(event) {
            if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
                $(this).removeClass('open');
            }
        });
    });


    // Slick Sliders
    $('.slick-carousel').each(function () {
        var slider = $(this);
        $(this).slick({
            infinite: true,
            dots: false,
            arrows: false,
            centerMode: true,
            centerPadding: '0'
        });
        
        $(this).closest('.slick-slider-area').find('.slick-prev').on("click", function () {
            slider.slick('slickPrev');
        });
        $(this).closest('.slick-slider-area').find('.slick-next').on("click", function () {
            slider.slick('slickNext');
        });
    });


    $(".dropdown.btns .dropdown-toggle").on('click', function() {
        $(this).dropdown("toggle");
        return false;
    });



    // Dropzone initialization
    Dropzone.autoDiscover = false;
    $(function () {
        $("div#myDropZone").dropzone({
            url: "/file-upload"
        });
    });

    // Filterizr initialization
    $(function () {
        //$('.filtr-container').filterizr();
    });

    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".fa")
            .toggleClass('fa-minus fa-plus');
    }

    $('.panel-group').on('shown.bs.collapse', toggleChevron);
    $('.panel-group').on('hidden.bs.collapse', toggleChevron);

    // Switching Color schema
    function populateColorPlates() {
        var plateStings = '\n';
        $('body').append(plateStings);
    }
    $(document).on('click', '.color-plate', function () {
        var name = $(this).attr('data-color');
        $('link[id="style_sheet"]').attr('href', 'css/skins/' + name + '.css');
    });

    $(document).on('click', '.setting-button', function () {
        $('.option-panel').toggleClass('option-panel-collased');
    });
});

// mCustomScrollbar initialization
(function ($) {
    $(window).resize(function () {
        $('#map').css('height', $(this).height() - 110);
        if ($(this).width() > 768) {
            $(".map-content-sidebar").mCustomScrollbar(
                {theme: "minimal-dark"}
            );
            $('.map-content-sidebar').css('height', $(this).height() - 110);
        } else {
            $('.map-content-sidebar').mCustomScrollbar("destroy"); //destroy scrollbar
            $('.map-content-sidebar').css('height', '100%');
        }
    }).trigger("resize");
})(jQuery);
