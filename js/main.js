jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1170;
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile - open lateral menu clicking on the menu icon
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.cd-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		} else {
			$(this).addClass('nav-is-visible');
			$('.cd-primary-nav').addClass('nav-is-visible');
			$('.cd-main-header').addClass('nav-is-visible');
			$('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			toggleSearch('close');
			$('.cd-overlay').addClass('is-visible');
		}
	});

	//open search form
	$('.cd-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
	});

	//close lateral menu on mobile 
	$('.cd-overlay').on('swiperight', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.nav-on-left .cd-overlay').on('swipeleft', function(){
		if($('.cd-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.cd-overlay').removeClass('is-visible');
		}
	});
	$('.cd-overlay').on('click', function(){
		closeNav();
		toggleSearch('close')
		$('.cd-overlay').removeClass('is-visible');
	});


	//prevent default clicking on direct children of .cd-primary-nav 
	$('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
		event.preventDefault();
	});
	//open submenu
	$('.has-children').children('a').on('click', function(event){
		if( !checkWindowWidth() ) event.preventDefault();
		var selected = $(this);
		if( selected.next('ul').hasClass('is-hidden') ) {
			//desktop version only
			selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
			selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
			$('.cd-overlay').addClass('is-visible');
		} else {
			selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
			$('.cd-overlay').removeClass('is-visible');
		}
		toggleSearch('close');
	});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

	function closeNav() {
		$('.cd-nav-trigger').removeClass('nav-is-visible');
		$('.cd-main-header').removeClass('nav-is-visible');
		$('.cd-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close serach 
			$('.cd-search').removeClass('is-visible');
			$('.cd-search-trigger').removeClass('search-is-visible');
			$('.cd-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.cd-search').toggleClass('is-visible');
			$('.cd-search-trigger').toggleClass('search-is-visible');
			$('.cd-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.cd-search').hasClass('is-visible')) $('.cd-search').find('input[type="search"]').focus();
			($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible') ;
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var navigation = $('.cd-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		} else {
			navigation.detach();
			navigation.insertAfter('.cd-main-content');
		}
	}
	
	
	
	// killcarousel setting
	
	$('#coverflow').KillerCarousel({
		frontItemIndex: 0,
		fadeEdgeItems: true,
		autoChangeDirection: 1,
		autoChangeDelay: 1500,
		infiniteLoop: true,
		// Bottom shadows on.
		showShadow: false,
		// Image reflections on.
		showReflection: false,
		// Scale at 100% of parent element.
		
		
		// Choose 'flow' style rendering modes for 3d and 2d.
		
		animStopCallback: function () {
			clearInterval(this.animating);
			getAlt();
			//getData();
		},
		animStartCallback: function () {
			this.animating = setInterval(function () {
				getAlt()
			}, 100);
//			this.animating = setInterval(function () {
//				getData()
//			}, 100);
		},
		profiles:[
			{
				minWidth:0, maxWidth: 480,
				horizon: 'top:40%',
				renderer3d: 'render3dFlow',
				renderer2d: 'render2dFlow',
				width:300,
				// Item spacing in 3d (CSS3 3d) mode.
				spacing3d: 140,
				// Item spacing in 2d (no CSS3 3d) mode. 
				spacing2d: 180,
				autoScale: 50,
				scale:50
			},
			{
				minWidth:481, maxWidth: 650,
				horizon: 'top:40%',
				renderer3d: 'render3dFlow',
				renderer2d: 'render2dFlow',
				// Width of carousel.
				width: 450,
				// Item spacing in 3d (CSS3 3d) mode.
				spacing3d: 120,
				// Item spacing in 2d (no CSS3 3d) mode. 
				spacing2d: 180,
				autoScale: 50
			},
			{
				minWidth:651, maxWidth: 990,
				horizon: 'top:30%',
				renderer3d: 'render3dFlow',
				renderer2d: 'render2dFlow',
				// Width of carousel.
				width: 450,
				// Item spacing in 3d (CSS3 3d) mode.
				spacing3d: 120,
				// Item spacing in 2d (no CSS3 3d) mode. 
				spacing2d: 180,
				autoScale: 40
			},
			{
				minWidth:991, maxWidth: 1200,
				horizon: 'top:25%',
				renderer3d: 'render3dFlow',
				renderer2d: 'render2dFlow',
				// Width of carousel.
				width: 650,
				// Item spacing in 3d (CSS3 3d) mode.
				spacing3d: 140,
				// Item spacing in 2d (no CSS3 3d) mode. 
				spacing2d: 180,
				autoScale: 50
			},
			{
				minWidth:1201, maxWidth: 1450,
				horizon: 'top:20%',
				renderer3d: 'render3dFlow',
				renderer2d: 'render2dFlow',
				// Width of carousel.
				width: 800,
				// Item spacing in 3d (CSS3 3d) mode.
				spacing3d: 140,
				// Item spacing in 2d (no CSS3 3d) mode. 
				spacing2d: 180,
				autoScale:40
			},
			{
				minWidth:1451, maxWidth: 99999,
				horizon: 'top:13%',
				renderer3d: 'render3dFlow',
				renderer2d: 'render2dFlow',
				// Width of carousel.
				width: 800,
				// Item spacing in 3d (CSS3 3d) mode.
				spacing3d: 140,
				// Item spacing in 2d (no CSS3 3d) mode. 
				spacing2d: 180,
				autoScale:40
			}
		]
	});

	$('#next').on('click', function () {
		$('#coverflow').data('KillerCarousel').animateToRelativeItem(1);
	});
	$('#prev').on('click', function () {
		$('#coverflow').data('KillerCarousel').animateToRelativeItem(-1);
	});

	var getAlt = function (evt) {
		var kc = $('#coverflow').data('KillerCarousel');
		var i = kc.getFrontItemIndex();
		var $el = kc.getItemElement(i);
		var $img = $el.find('[alt]');
		$('#output').text($img.attr('alt'));
	};
	getAlt();
	
//	var getData = function (evt) {
//		var kc = $('#coverflow').data('KillerCarousel');
//		var i = kc.getFrontItemIndex();
//		var $el = kc.getItemElement(i);
//		var $img = $el.find('[data]');
//		$('#output2').text($img.attr('data'));
//	};
//	getData();
	
});