$(function() {

	// Custom JS
const items = document.querySelectorAll(".accordion button");
	function toggleAccordion() {
		const itemToggle = this.getAttribute('aria-expanded');
		for (i = 0; i < items.length; i++) {
			items[i].setAttribute('aria-expanded', 'false');
		}
		if (itemToggle == 'false') {
			this.setAttribute('aria-expanded', 'true');
		}
	}
	items.forEach(item => item.addEventListener('click', toggleAccordion));
	var swiper = new Swiper('#blog-carousel', {
  slidesPerView: 1,
  spaceBetween: 24,
  noSwiping: true,
  loop: false,
  allowTouchMove: false,
  navigation: {
    nextEl: '.blog-button-next',
    prevEl: '.blog-button-prev',
  },
  breakpoints: {
990: {
        slidesPerView: 2,
        spaceBetween: 23,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 23,
      }
  }
});
	const product_slider = new Swiper('.swiper-container.product_slider', {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    followFinger: false,
    initialSlide: 1,
    spaceBetween: 0,
    
    slideToClickedSlide: true,

    coverflowEffect: {
        rotate: 12,
        stretch: 100,
        depth: 180,
        modifier: 2,
        stretch: 5,
        slideShadows: false,
    },
    navigation: {
        nextEl: '.product_slider_nav_next',
        prevEl: '.product_slider_nav_prev',
    },
    breakpoints: {
    	1024: {
        slidesPerView: 3.5,
      },
    }
});
$(".hidden-content").hide();
    $(".show_hide").on("click", function () {
        
        $(this).prev('.hidden-content').slideToggle(200);
        return false;

    });
	var swiper = new Swiper('#production-carousel', {
     preventClicks: false,
    preventClicksPropagation: false,
  slidesPerView: 1,
  spaceBetween: 0,
  noSwiping: true,
  loop: false,
  allowTouchMove: false,
  navigation: {
    nextEl: '.production-button-next',
    prevEl: '.production-button-prev',
  },
  pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return '<span>' + '0' +current + '/' + '0' + (total + 0) + '</span>'; 
        }
      },
});
var swiper = new Swiper('#works-carousel', {
  slidesPerView: 1,
  spaceBetween: 0,
  noSwiping: true,
  loop: true,
  allowTouchMove: true,
  navigation: {
    nextEl: '.production-button-next',
    prevEl: '.production-button-prev',
  },
  pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    clickable: true,
 breakpoints: {
      1024: {
        slidesPerView: 4,
      },
    }
});
	$('.gallery1').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true,
          tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
        }
    });
});
  $('.scrollto a').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 370,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});
$(window).scroll(function() {
  if ($(window).scrollTop() >= 300) {
    $('#top-bar').addClass('fixed');
    $('#mobile-bar').addClass('fixed');
  } else {
    $('#top-bar').removeClass('fixed');
    $('#mobile-bar').removeClass('fixed');
  }
});
/*		$('.watch-video').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
type: 'iframe',
	mainClass: 'mfp-fade',
	removalDelay: 400,
	preloader: false,
	iframe: {
		patterns: {
			youtube: {
				index: 'youtube.com',
				id: 'v=',
				src: 'https://www.youtube.com/embed/%id%?rel=0&autoplay=1'
			}
		}
	},
    });
});*/
	$('.contact').click(function(event){
		$('.popup-contact').addClass('active');
		$('body').addClass('lock');
	});
	$('.modal-close').click(function(event){
		$('.popup-contact').removeClass('active');
		$('body').removeClass('lock');
	});

  $(".form").submit(function(){
    var th = $(this);
    $.ajax({
        type: "POST",
        url: "mail.php",
        data: th.serialize()
    }).done(function(){
        $(th).find('.success').addClass('active').css('display','flex').hide().fadeIn();
        setTimeout(function(){
            $(th).find('.success').removeClass('active').fadeOut();
            th.trigger('reset');
        }, 5000);
    });
    return false;
});
});
