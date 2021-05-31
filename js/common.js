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
  slidesPerView: 3,
  spaceBetween: 24,
  noSwiping: true,
  loop: false,
  allowTouchMove: false,
  navigation: {
    nextEl: '.blog-button-next',
    prevEl: '.blog-button-prev',
  },
});
	var swiper = new Swiper('#production-carousel', {
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
	$('.gallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true,
          tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
        }
    });
});
		$('.watch-video').each(function() { // the containers for all your galleries
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
});
	$('.contact').click(function(event){
		$('.popup-contact').addClass('active');
		$('body').addClass('lock');
	});
	$('.modal-close').click(function(event){
		$('.popup-contact').removeClass('active');
		$('body').removeClass('lock');
	});
});
