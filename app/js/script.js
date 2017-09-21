$(function() {
  var $window = $(window);
  

  //
  // Переключатель для моб. версии главного меню сайта
  //---------------------------------------------------------------------------------------
    // Показываем/Скрываем боковое меню
    function toggleMenuVisibility(){
      $('.b-mobile-nav').toggleClass('is--visible');
    }

    // Показываем/Скрываем затемнение фона
    function toggleBodyBackground(){
      $('body').toggleClass('is--mobile-active');
    }
    
    // Добавляем/Удаляем активный класс для переключателя меню
    function toggleMenuTriggerClass(){
      $('.js-nav-toggle').toggleClass('is--active');
    }

    // Закрываем мобильное меню - меняем состояния через классы
    function closeMobileMenu(){
      $('body').removeClass('is--mobile-active');
      $('.js-nav-toggle').removeClass('is--active');
    }

    // Закрываем мобильное меню при клике на область вне его
    function closeMobileMenuOnOutOfClick(){
      $('body').mouseup(function(e) {
        var subject = $('.is--visible');

        if( subject.length
          && !$(e.target).hasClass('js-nav-toggle')
          && !$(e.target).hasClass('icon-nav')
          && e.target.className != subject.attr('class')
          && !subject.has(e.target).length){
          toggleMenuVisibility();
          toggleBodyBackground();
          toggleMenuTriggerClass();
        }
      });
    }

    
    /* Подключаем обработчик моб. меню */
    (function(){
      closeMobileMenuOnOutOfClick();

      // Добавляем обработчик для переключателя меню
      $('.js-nav-toggle').on('click',function(){
        toggleMenuVisibility();
        toggleMenuTriggerClass();
        toggleBodyBackground();
      });
    })();


    // Accordion
    // sSelector - css selector of the container which contains accordions inside
    // fCallback - cb f-n, which fires after each accordion toggle (trigger click)
    accordion = function(sSelector, fCallback){
    	var  
    		 $container = $(sSelector)
    		,$accordions = $container.find(".js-accordion__item")
    		,$accordionTriggers = $accordions.find(".js-accordion__trigger")
			,$accordionContents = $accordionTriggers.siblings(".js-accordion__content")
    		;

    	$accordionTriggers.on("click", function(){
			var  $trigger = $(this)
				,$content = $trigger.siblings(".js-accordion__content")
				,$parent = $(this).parents(".js-accordion__item")
				;
			// close all opened accordion items except of clicked
			$accordionContents.each(function(index, element){
				var currentParent = $accordions[index]
				if ((element !== $content[0])&&(currentParent.classList.contains("opened"))){
					$(this).slideUp(300);
					currentParent.classList.remove("opened");
					currentParent.classList.add("closed");
				}
			});
			$parent.toggleClass("opened").toggleClass("closed");
			$content.slideToggle(300, function(){
				if (typeof fCallback == "function"){
					fCallback($container);
				}
			});
		});
    };

    // акордеон + кастомна прокрутка (моб меню)
    (function(){
    	var  $container = $(".b-mobile-nav_wrapper").jScrollPane({
			showArrows: false
		});

    	function callback($container){
	    	$container.data('jsp').reinitialise();	// reinitialize jScrollPane
	   	}

    	accordion(".b-mobile-nav_wrapper",	callback);	// initialize accordions in mobile menu

    	$window.on("resize", function(){	// reinitialize jScrollPane after window resizing
    		callback($container);
    	});

    })();

    //
    //кастомна смуга прокрутки
 	//---------------------------------------------------------------------------------------
   	// $(".js-scrollPane").jScrollPane({
    // 	showArrows: false
    // });

	// Mobile menu search and minicart
	//---------------------------------------------------------------------------------------
	(function(){
		var  $searchForm = $(".js-search")
			,$searchIcon = $searchForm.children("button[type='submit']")
			,$searchField = $searchForm.children(".js-minisearch")
			,$minicartIcon = $(".js-cart")
			,$minicart = $minicartIcon.find(".js-minicart")
			;

		var hideSearch = function(iTime){
			$searchField.fadeOut(iTime);
			console.log("Hide search");
		}
		var toggleSearch = function(iTime){
			$searchField.fadeToggle(iTime);
			console.log("Hide search");
		}

		var hideCart = function(iTime){
			$minicart.slideUp(iTime);
			console.log("toggle minicart");
		}
		var toggleCart = function(iTime){
			$minicart.slideToggle(iTime);
			console.log("toggle minicart");
		}

		var hideSearchAndCart = function(iTime){
			hideSearch(iTime);
			hideCart(iTime);
		}

		$searchIcon.on("click", function(e){
			if(window.innerWidth < 1220){
				e.preventDefault();
				console.log("search icon click")
			}
		});

		$minicartIcon.on("click", function(e){
			e.stopPropagation();
			if(window.innerWidth < 1220){
				hideSearch(300);
			}
			toggleCart(300);
		});

		$window.on("resize", function(){
			$searchForm.off("click");
			hideSearchAndCart(0);

			if(window.innerWidth < 1220){
				$searchForm.on("click", function(e){
					e.stopPropagation();
					hideCart(300);
					toggleSearch(300);
				});
			} else{
				if ($searchField.is(":hidden")){$searchField.show(0)};
			}

		}).trigger("resize");


		$window.on("click", function(){
			if(window.innerWidth < 1220){
				$searchField.fadeOut(300);
				$minicart.slideUp(300);
			};

		});

	})();

  //
  // Modal Popup
  //---------------------------------------------------------------------------------------
  (function(){
    $.arcticmodal('setDefault', {
      beforeOpen: function() {
        $('body').css({
          'overflow': 'auto',
          'margin-right': '0px'
        })
      },
      afterClose: function() {
        $('body').css({
          'overflow': 'auto',
          'margin-right': '0px'
        })
      }
    });
    $('[data-modal]').on('click', function (e) {
      e.preventDefault();
      $.arcticmodal('close');
      var link = $(this).data('modal');
      if (link) { $('#'+link).arcticmodal() }
    });
  })();

  //
  // Валидация форм
  //---------------------------------------------------------------------------------------
  (function(){
    var settings = {
     rules:{
      name:{
       required: true,
      },
      phone:{
       required: true,
       digits: true
      },
	    email:{
	     required: true,
	     email: true
	    }
     },
	   messages:{
	   	name: { required: "Введите Ваше имя" },
	    phone:{
	     required: "Введите Ваш номер телефона",
	     digits: "Вводите только цифры"
	    },
	    email:{
	     required: "Введите Ваш e-mail адрес",
	     email: "Введите корректный e-mail адрес"
	    }
	   },
     focusCleanup: true,
     focusInvalid: false
    };

    var settings2 = {
     rules:{
      name:{
       required: true,
      },
      phone:{
       required: true,
       digits: true
      }
     },
	   messages:{
	   	name: { required: "Введите Ваше имя" },
	    phone:{
	     required: "Введите Ваш номер телефона",
	     digits: "Вводите только цифры"
	    }
	   }
    };

    var settings3 = {
     rules:{
      name:{
       required: true,
      },
	    email:{
	     required: true,
	     email: true
	    }
     },
	   messages:{
	   	name: { required: "Введите Ваше имя" },
	    email:{
	     required: "Введите Ваш e-mail адрес",
	     email: "Введите корректный e-mail адрес"
	    }
	   }
    };

    $('.js-form-feedback').validate(settings);
    $('.js-form-callback').validate(settings2);
    $('.js-form-subscribe').validate(settings3);

  })();


  //
  // Product Qty Block 
  //---------------------------------------------------------------------------------------
   (function(){
    if ( $('.b-product__qty').length ){
     
     $('.js-qty-plus').on('click', function(){
       var qty = parseInt( $(this).parent().find('.js-qty-input').val() );
        qty = qty+1;
       
       $(this).parent().find('.js-qty-input').val(qty);
     });
     
     $('.js-qty-minus').on('click', function(){
       var qty = parseInt( $(this).parent().find('.js-qty-input').val() );
        qty = (qty>1)? qty-1 : 1;
       
       $(this).parent().find('.js-qty-input').val(qty);
     });
    }
   })();

  //
  // Fixed Header
  //---------------------------------------------------------------------------------------
  (function(){
  	$(window).on("load",function(){

	  	var fixedHeader = $('.js-fixed-header');
	  	var servicesTop = $('.section--services').length 
	  										? $('.section--services').offset().top 
	  										: 600;

	  	$(window).scroll(function(e){

	  		if ( servicesTop > document.body.scrollTop ){
	  			fixedHeader.removeClass('is--active');
	  		} else {
	  			fixedHeader.addClass('is--active');
	  		}
	  	});

  	});
  })();



  //
  // Main Slider
  //---------------------------------------------------------------------------------------
	(function(){

		var $slider = $('.js-slider').bxSlider({
				// auto: true,
				pager: true,
				controls:false
			});

		$window.on("resize", function(){
			if (window.innerWidth <= 480){
				// $slider.reloadSlider();
				$slider.destroySlider();
				$('.js-slider').bxSlider({
					slideSelector: ".b-slider__slide.visible-xs-block",
					// auto: true,
					// pager: true,
					// controls:false
				})
			}
		}).trigger("resize");		

		$(window).on("load", function(){
			//verticalAlign( $('.b-slider__desc') );
		});

		function verticalAlign($el){
			var parentHeight = $el.parents('.b-slider__slide').outerHeight(); 
			console.log(parentHeight);

			$el.each(function(){
				var h = $(this).outerHeight();
				console.log(h);
				console.log( (parentHeight-h)/2 );
				$(this).css({ top: (parentHeight-h)/2 });
			})
		}

	})();

	//
	// Catalog - Products Sort Block
	//---------------------------------------------------------------------------------------
		(function(){
			var $sort = $('.b-sort');
			if ( $sort.length ){
				$sort.find('.b-sort__selected').on('click',function(){
					$(this).parents('.b-sort').toggleClass('is--open');
				});
			}
		})();

	//
	// Catalog - Filter Toggle
	//---------------------------------------------------------------------------------------
		(function(){
			var $filter = $('.b-filter');
			if ( $filter.length ){
				$filter.on('click', '.b-filter__title', function(){
					$(this).parent().toggleClass('is--closed');
				});
			}
		})();

	//
	// SEO text
	//---------------------------------------------------------------------------------------
	(function(){
		var $seoText = $('.js-seo');
		var status   = $('.js-seo-action a').text();
 		if ( $seoText.length ){
			$seoText.addClass('is--short');

			$('.js-seo-action').on('click','a',function(e){
				e.preventDefault();

				$seoText.toggleClass('is--short is--full');
				status = (status == "Подробнее") ? "Свернуть" : "Подробнее";
				$(this).text(status);
			});
		}
	})();

	//
  	// Filter
    //---------------------------------------------------------------------------------------
    (function(){
	    var $filter = $('.b-filter');

		$filter.find('.b-filter__block-items').jScrollPane({
	    	showArrows: false
	    });

	})();

	//
	// Slide Up
	//---------------------------------------------------------------------------------------
	(function(){
		var limit     = $(window).height(),
				$backToTop = $('.js-up');

		$(window).scroll(function () {
			if ( $(this).scrollTop() > limit ) {
				$backToTop.fadeIn();
			} else {
				$backToTop.fadeOut();
			}
		});

		$backToTop.on('click',function(e){
			e.preventDefault();

			$('body,html').animate({ scrollTop: 0 }, 1000);

		});

	})();

	//
	// Price Range Slider
	//---------------------------------------------------------------------------------------
  	(function(){
      $("#price_range").ionRangeSlider({
          type: "double",
          grid: true,
          min: 0,
          max: 2000,
          from: 0,
          to: 2000,
          postfix: " грн"
      });
  	})();

});