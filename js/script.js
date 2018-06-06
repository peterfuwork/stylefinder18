//+ Style Finder 2018
$(function () {
	if ($('.stylefinder18').length) {
		$('.stylefinder18 .slick-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 500,
			arrows: true,
			swipe: false,
			nextArrow: '<button type="button" class="slick-next">&#10095;</button>',
			prevArrow: '<button type="button" class="slick-prev">&#10094;</button>',
			dots: false,
			infinite: false
		});

		function disableNextBtn() {
			$('.slick-next.slick-arrow').addClass('slick-disabled');
			$('.slick-next.slick-arrow').attr('aria-disabled', true);
			$('.slick-next.slick-arrow').hide();
		}

		function enableNextBtn() {
			$('.slick-next.slick-arrow').removeClass('slick-disabled');
			$('.slick-next.slick-arrow').attr('aria-disabled', false);
			$('.slick-next.slick-arrow').show();
		}

		// initially disable the next arrow button
		disableNextBtn();

		// On 'after change' event
		$('.stylefinder18 .slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			if($('.slick-current.slick-active').find('.radioLabel.active').length >= 1) {
				enableNextBtn();
			}
		});

		// when the prev button is clicked.
		$('.slick-prev.slick-arrow').on('click', function () {
			// disable the next button on first slide
			if ($('.slick-current').attr('data-slide') === '0') {
				disableNextBtn();
			}
			checkPage();
		})

		// when the next button is clicked.
		$('.slick-next.slick-arrow').on('click', function () {
			var activeSlide = $('.stylefinder18 .slick-slide.slick-current.slick-active').data("slide");
			disableNextBtn();
			if ($('.stylefinder18 ul li .form[data-form=' + 'form-' + activeSlide + '] .radioLabel').hasClass('active')) {
				enableNextBtn();
			}
		})

		// check if it's not the first page and display static background.
		function checkPage() {
			if (!$('li[data-slide="0"]').hasClass('slick-active')) {
				$('.slideshow-desktop').addClass('static');
				$('.slideshow-desktop li').css('display','none');
				$('.slideshow-desktop li:nth-child(4)').css('display','block');
			} else {
				$('.slideshow-desktop').removeClass('static');
				$('.slideshow-desktop li').css('display','block');
				$('.slideshow-desktop li:nth-child(4)').css('display','none');
			}
		}

		// when the click to start button is clicked.
		$('#clickToStart').on('click', function () {
			// Goes to the next slide
			$('.slick-slider').slick('slickNext', '<div></div>');
			// checking if the question 1 slide is having the selection already
			if (!$('.stylefinder18 ul li .form[data-form="form-1"] .radioLabel').hasClass('active')) {
				disableNextBtn();
			}
			checkPage();
		});

		// create an object to hold all the radio selections.
		var slideObj = new Object();
		// when radio button is selected...
		$('.radioSelection').on('click', function (event) {
			event.preventDefault();
			var currentSlide = $('.slick-current.slick-active');
			var currentType = $(this).data("type");
			var currentId = $(this).data("radio");
			if (!$('.stylefinder18 ul li .form[data-form=' + 'form-' + currentId + '] .radioLabel').hasClass('active')) {
				// adding the active class to new label
				$(this).parent().parent().addClass('active');
				// update the value in the object
				slideObj[currentId] = currentType;
				$('.slick-slider').slick('slickNext', '<div></div>');
				disableNextBtn();
			} else {
				// removing the active class in all the children
				$(this).parent().parent().parent().find('.radioLabel').removeClass('active');
				// adding the active class to new label
				$(this).parent().parent().addClass('active');
				// update the value in the object
				slideObj[currentId] = currentType;
				enableNextBtn();
			}
		});



		$('#slideCal').on('click', function (event) {
			// push object values to array
			var radioSelections = [];
			for (var i in slideObj) {
				radioSelections.push(slideObj[i])
			}

			// count out the existence of each value and sort the result in a new object
			var totalCounts = radioSelections.reduce(function (obj, val) {
				obj[val] += 1;
				return obj;
			}, {
				winter: 0,
				autumn: 0,
				summer: 0,
				spring: 0
			});
			console.log('totalCounts', totalCounts);

			var bestMatch = Object.keys(totalCounts).reduce(function (a, b) {
				return totalCounts[a] > totalCounts[b] ? a : b
			});
			console.log('best match', bestMatch);

			var sumArr = Object.keys(totalCounts).map(function (key) {
				return totalCounts[key];
			});
			console.log('sum array', sumArr);

			var maxValue = Math.max.apply(null, sumArr);
			console.log('max value', maxValue);

			// disable the previous arrow
			$('.slick-prev.slick-arrow').addClass('slick-disabled');
			$('.slick-prev.slick-arrow').attr('aria-disabled', true);

			var springUrl = $(this).attr('data-spring-url'),
			summerUrl = $(this).attr('data-summer-url'),
			autumnUrl = $(this).attr('data-autumn-url'),
			winterUrl = $(this).attr('data-winter-url');

			if (bestMatch === 'spring') {
				//check spring
				if (maxValue === totalCounts.summer) {
					if (maxValue === totalCounts.autumn || maxValue === totalCounts.winter) {
						$(this).attr("href", springUrl);
					} else {
						$(this).attr("href", springUrl);
					}
				} else if (maxValue === totalCounts.autumn) {
					if (maxValue === totalCounts.winter) {
						$(this).attr("href", springUrl);
					} else {
						$(this).attr("href", springUrl);
					}
				} else if (maxValue === totalCounts.winter) {
					$(this).attr("href", springUrl);
				} else {
					$(this).attr("href", springUrl);
				}
			} else if (bestMatch === 'summer') {
				//check summer
				if (maxValue === totalCounts.autumn) {
					if (maxValue === totalCounts.winter) {
						$(this).attr("href", summerUrl);
					} else {
						$(this).attr("href", summerUrl);
					}
				} else if (maxValue === totalCounts.winter) {
					$(this).attr("href", summerUrl);
				} else {
					$(this).attr("href", summerUrl);
				}
			} else if (bestMatch === 'autumn') {
				//check autumn
				if (maxValue === totalCounts.winter) {
					$(this).attr("href", autumnUrl);
				} else {
					$(this).attr("href", autumnUrl);
				}
			} else if (bestMatch === 'winter') {
				//check winter
				$(this).attr("href", winterUrl);
			}
			
			// remove this event prevent to make it to work!!!
			event.preventDefault();
		})

	}
});