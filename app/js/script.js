$(function() {
  var 	 $window = $(window)
  		,BREAKPOINT_RES = 1220	// px
  		,ANIM_TIME_SM = 300		// ms
  		;
  
// моб меню/фільтри/пошук/кошик - логіка:
	//
	// Переключатель для моб. версии главного меню сайта
	//---------------------------------------------------------------------------------------
	    // Показываем/Скрываем боковое меню
	    function toggleMenuVisibility(){
	      $('.b-mobile-nav').toggleClass('is--visible');
	    }
	    function removeMenuVisibility(){
	      $('.b-mobile-nav').removeClass('is--visible');
	    }

	    // Показываем/Скрываем затемнение фона
	    function toggleBodyBackground(){
	      // $('body').toggleClass('is--mobile-active');
	      console.log("toggle BG");
	    }
	    function removeBodyBackground(){
	      // $('body').removeClass('is--mobile-active');
	      console.log("remove BG");
	    }
	    
	    // Добавляем/Удаляем активный класс для переключателя меню
	    function toggleMenuTriggerClass(){
	      $('.js-nav-toggle').toggleClass('is--active');
	    }
	    function removeMenuTriggerClass(){
	      $('.js-nav-toggle').removeClass('is--active');
	    }

	    // Закрываем мобильное меню - меняем состояния через классы
	    function closeMobileMenu(){
	      $('body').removeClass('is--mobile-active');
	      $('.js-nav-toggle').removeClass('is--active');
	    }

	    // filters:
	    // Показываем/Скрываем бічне меню фільтрів
	    function toggleFiltersMenuVisibility(){
	      $('.js-filters').toggleClass('is--visible');
	    }

	    // Закрываем бічне меню фільтрів
	    function closeFiltersMenu(){
	      $('body').removeClass('is--mobile-active');
	      $('.js-filters').removeClass('is--visible');
	      // $('.js-nav-toggle').removeClass('is--active');
	    }


	// Mobile menu search and minicart
	//---------------------------------------------------------------------------------------
		var  $searchForm = $(".js-search")
			,$searchIcon = $searchForm.children("button[type='submit']")
			,$searchField = $searchForm.children(".js-minisearch")
			,$minicartIcon = $(".js-cart")
			,$minicart = $minicartIcon.find(".js-minicart")
			;

		var focusBlurSearchField = function(bBlur){	// focus/blur cursor on search field after searchButton press
			if ($searchField.hasClass("is-focused") || bBlur){
				$searchField.removeClass("is-focused");
				$searchField.children("input").blur();
				// console.log("blur");
			} else {
				$searchField.addClass("is-focused");
				$searchField.children("input").focus();
				// console.log("focus");
			}
		}

		var hideSearch = function(iTime){
			$searchField.fadeOut(iTime);
			focusBlurSearchField(true);
			console.log("Hide search");
		}
		var toggleSearch = function(iTime){
			$searchField.fadeToggle(iTime);
			focusBlurSearchField();
			console.log("toggle search");
		}

		var hideCart = function(iTime){
			$minicart.slideUp(iTime);
			removeBodyBackground();
			console.log("hide minicart");
		}
		var toggleCart = function(iTime){
			$minicart.slideToggle(iTime);
			toggleBodyBackground()
			console.log("toggle minicart");
		}

		var hideSearchAndCart = function(iTime){
			hideSearch(iTime);
			hideCart(iTime);
			focusBlurSearchField(true);
		}


		$searchIcon.on("click", function(e){	// prevent form submit
			if(window.innerWidth < BREAKPOINT_RES){
				e.preventDefault();
				// console.log("search icon click")
			}
		});
		$searchField.on("click", function(e){	//	prevent hiding search field on click
			if(window.innerWidth < BREAKPOINT_RES){
				e.stopPropagation();
			}
		})
		$searchField.children("input").on("keypress", function(e){		// submit search form by enter press
			if ( e.which == 13 ) {
				$searchForm.trigger("submit");
				// console.log("submit");
			}

		});

		$minicartIcon.on("click", function(e){
			e.stopPropagation();
			if(window.innerWidth < BREAKPOINT_RES){
				hideSearch(ANIM_TIME_SM);
			}
			toggleCart(ANIM_TIME_SM);
		});

		$window.on("resize", function(){
			$searchForm.off("click");
			hideSearchAndCart(0);
			removeBodyBackground();

			if(window.innerWidth < BREAKPOINT_RES){
				$searchForm.on("click", function(e){
					e.stopPropagation();
					hideCart(ANIM_TIME_SM);
					toggleSearch(ANIM_TIME_SM);
				});
			} else{
				if ($searchField.is(":hidden")){$searchField.show(0)};
			}

		}).trigger("resize");



	    // Закрываем мобильное меню (меню фільтрів, і кошик/пошук ) при клике на область вне его
	    function closeMobileMenuOnOutOfClick(){
	      $('body').on("mouseup", function(e) {
	        var subject = $('.is--visible');

	        if( subject.length	// якщо відкрита бічна панель головного меню (або меню фільтрів)
	          && !$(e.target).hasClass('js-nav-toggle')	// і це не клік по діву з кнопкою-бутербродом
	          && !$(e.target).hasClass('icon-nav')		// і це не іконка кнопки-бутерброда
	          && e.target.className != subject.attr('class')	// і це не клік по бічній панелі меню (або меню фільтрів)
	          && !subject.has(e.target).length){		// і це не клік по якомусь нащадку бічній панелі меню (або меню фільтрів)
		          console.log("if");
		          removeMenuVisibility();	// закриваємо бічне головне меню
		      	  closeFiltersMenu();	// закриваємо бічне меню фільтрів
		          removeBodyBackground();	// прибираємо затемнення фона
		          removeMenuTriggerClass();	// вертаємо кнопку "X" в стан бутерброда
				// if(window.innerWidth < BREAKPOINT_RES){
				// 	$searchField.fadeOut(ANIM_TIME_SM);
				// 	$minicart.slideUp(ANIM_TIME_SM);
				// 	// removeBodyBackground();
				// };
	        } else if (window.innerWidth < BREAKPOINT_RES){
		          console.log("else");
				$searchField.fadeOut(ANIM_TIME_SM);
				$minicart.slideUp(ANIM_TIME_SM);
				removeBodyBackground();
	        }
	      });
	    }

		// $("body").on("mouseup", function(e){
		// 	if(window.innerWidth < BREAKPOINT_RES){
		// 		$searchField.fadeOut(ANIM_TIME_SM);
		// 		$minicart.slideUp(ANIM_TIME_SM);
		// 		removeBodyBackground();
		// 	};

		// });

    
    /* Подключаем обработчик моб. меню */
    (function(){
      closeMobileMenuOnOutOfClick();

      // Добавляем обработчик для переключателя меню
      $('.js-nav-toggle').on('click',function(){
        toggleMenuVisibility();
        toggleMenuTriggerClass();
        toggleBodyBackground();
      });

      // Add listener for filters open/close buttons
    $('.js-filters-toggle').on('click',function(){
        toggleFiltersMenuVisibility();
        // toggleMenuTriggerClass();
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
					$(this).slideUp(ANIM_TIME_SM);
					currentParent.classList.remove("opened");
					currentParent.classList.add("closed");
				}
			});
			$parent.toggleClass("opened").toggleClass("closed");
			$content.slideToggle(ANIM_TIME_SM, function(){
				if (typeof fCallback == "function"){
					fCallback($container);
				}
			});
		});
    };


    // акордеон + кастомна прокрутка (моб меню)
    (function(){
    	// var  $container = $(".b-mobile-nav_wrapper").jScrollPane({
			// showArrows: false
		// });

    	// function callback($container){
	    	// $container.data('jsp').reinitialise();	// reinitialize jScrollPane
	   	// }

    	// accordion(".b-mobile-nav_wrapper",	callback);	// initialize accordions in mobile menu
    	accordion(".b-mobile-nav_wrapper");	// initialize accordions in mobile menu

    	// $window.on("resize", function(){	// reinitialize jScrollPane after window resizing
    		// callback($container);
    	// });

    })();

    //
    //кастомна смуга прокрутки
 	//---------------------------------------------------------------------------------------
   	// $(".js-scrollPane").jScrollPane({
    // 	showArrows: false
    // });

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

		// $window.on("resize", function(){
		// 	if (window.innerWidth <= 480 && $slider[0]){
		// 		// $slider.reloadSlider();
		// 		$slider.destroySlider();
		// 		$('.js-slider').bxSlider({
		// 			slideSelector: ".b-slider__slide.visible-xs-block",
		// 			// auto: true,
		// 			// pager: true,
		// 			// controls:false
		// 		})
		// 	}
		// }).trigger("resize");		

		// $(window).on("load", function(){
			//verticalAlign( $('.b-slider__desc') );
		// });

		// function verticalAlign($el){
		// 	var parentHeight = $el.parents('.b-slider__slide').outerHeight(); 
		// 	console.log(parentHeight);

		// 	$el.each(function(){
		// 		var h = $(this).outerHeight();
		// 		console.log(h);
		// 		console.log( (parentHeight-h)/2 );
		// 		$(this).css({ top: (parentHeight-h)/2 });
		// 	})
		// }

	})();

	//
	// Catalog - Products Sort Block
	//---------------------------------------------------------------------------------------
		(function(){
			var  $sort = $('.b-sort')
				,$select = $sort.find(".js-selectric")	// "Сортировать"
				,$optionLabeled = $select.children(".label")
				,bPrevWindowWidthMore =  $window.outerWidth() >= BREAKPOINT_RES
				;

			var SelectricSettings = {
					onInit: function() {
						$(this).parents(".selectric-wrapper").children(".selectric-items").find("ul").children("li.disabled").remove();	//прибираємо з меню неактивний пункт (placeholder)
					},
					onChange: function(){
						// $(this).change();
						$(this).parents("form").trigger("submit");
					}
				}

			var  selectInit = function(bInitialization){	// if bInitialization == true then first init select
				if ($window.outerWidth() >= BREAKPOINT_RES && (bInitialization?true:!bPrevWindowWidthMore)){
					$optionLabel = $select.children(".label");
					$select.children(".label").remove();	// hide "Сортировать" option on desktops
				} else if ($window.outerWidth() < BREAKPOINT_RES && (bInitialization?true:bPrevWindowWidthMore)){
					if(!$select.children(".label").length){	// show "Сортировать" option on tablets
						$select.prepend($optionLabeled);
					}
				}

				$select.selectric(SelectricSettings);
				bPrevWindowWidthMore =  $window.outerWidth() >= BREAKPOINT_RES;
			}

			if ( $sort.length ){	// if page has Sort block
				// $sort.find('.b-sort__selected').on('click',function(){
				// 	$(this).parents('.b-sort').toggleClass('is--open');
				// });
				selectInit(true);
				$window.on("resize", selectInit);	// hide/show "Сортировать" option on resize
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
  	// Filter (blocks with checkboxes)
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
				$backToTop.css("display", "block");
			} else {
				$backToTop.css("display", "none");;
			}
		});

		$backToTop.on('click',function(e){
			e.preventDefault();

			$('body,html').animate({ scrollTop: 0 }, 1000);
		});
		$backToTop.hover(
			function(){
				$backToTop.addClass("hover");
			},
			function(){
				$backToTop.removeClass("hover");
			}
		);

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