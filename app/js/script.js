$(function() {
  var 	 $window = $(window)
		,$body = $('body')
  		,BREAKPOINT_RES = 1220	// px
  		,BREAKPOINT_RES_CATALOG = 1024	// px
  		,ANIM_TIME_SM = 300		// ms
  		;
  
// моб меню/фільтри/пошук/кошик - логіка:
	//
	// Переключатель для моб. версии главного меню сайта
	//---------------------------------------------------------------------------------------
		var 
			 $mobNav = $('.js-mobile-nav')
			,$menuTrigger = $('.js-nav-toggle')
			,$filtersMenu = $('.js-filters')			// filters aside
			,$filtersTriggers = $(".js-filters-toggle")	// button and X
			;
	    // Показываем/Скрываем боковое меню
	    function addMenuVisibility(){
	      $mobNav.addClass('is--visible');
	      console.log("show Main Menu");
	    }
	    function removeMenuVisibility(){
	      $mobNav.removeClass('is--visible');
	      console.log("hide Main Menu");
	    }
	    // function toggleMenuVisibility(){
	    //   $mobNav.toggleClass('is--visible');
	    //   console.log("toggle Main Menu");
	    // }

        // ios body (h100p; ovh) prevent scroll hack after addBodyBackground
        // fix body scroll position
        function preventScroll(){
            var scroll; // scroll position
            if (!$body.hasClass('is--mobile-active')){  // якщо оверлей не відкрито
                scroll = $window.scrollTop();       // зберігаємо величину скрола
                $body.css({"position": "fixed", "top": -scroll});
            } else {
                scroll = -parseInt($body.css("top"));
                console.log(scroll);
                $body.css({'position': '', 'top': ''});
                $("html, body").animate({scrollTop: scroll}, 0);
            }
        }
    
	    // Показываем/Скрываем затемнение фона
	    function addBodyBackground(){
            preventScroll();
            $body.addClass('is--mobile-active');
            console.log("add BG");
	    }
	    function removeBodyBackground(){
            preventScroll();
            $body.removeClass('is--mobile-active');
            console.log("remove BG");
	    }
	    // function toggleBodyBackground(){
	    //   $body.toggleClass('is--mobile-active');
	    //   console.log("toggle BG");
	    // }
	    
	    // Добавляем/Удаляем активный класс для переключателя меню
	    function addMenuTriggerClass(){
	      $menuTrigger.addClass('is--active');
	    }
	    function removeMenuTriggerClass(){
	      $menuTrigger.removeClass('is--active');
	    }
	    // function toggleMenuTriggerClass(){
	    //   $menuTrigger.toggleClass('is--active');
	    // }

	    // Закрываем/Open мобильное меню - меняем состояния через классы
		function openMainMenu(){
	    	addMenuVisibility();
	    	addMenuTriggerClass();
	    	// addBodyBackground();
	    }
	    function closeMainMenu(){
	    	removeMenuVisibility();
	    	removeMenuTriggerClass();
	    	// removeBodyBackground();
	    }

	    // filters:
	    // Показываем/Скрываем бічне меню фільтрів
	    function openFiltersMenu(){
	      $filtersMenu.addClass('is--visible');
	      console.log("show filters menu");
	    }
	    function closeFiltersMenu(){
	      $filtersMenu.removeClass('is--visible');
	      console.log("hide filters menu");
	    }
	    // function toggleFiltersMenuVisibility(){
	    //   $filtersMenu.toggleClass('is--visible');
	    //   console.log("toggle filters menu");
	    // }

	    // Закрываем/Open бічне меню фільтрів
	    // function openFiltersMenu(){
	    // 	addFiltersMenuVisibility();
	    // 	// addBodyBackground();
	    // }
	    // function closeFiltersMenu(){
	    // 	removeFiltersMenuVisibility();
	    // 	// removeBodyBackground();
	    // }
	    $('.b-mobile-nav_wrapper').css({
	    	display: 'block'
	    });

	// Mobile menu search and minicart
	//---------------------------------------------------------------------------------------
		var  
			 $searchForm = $(".js-search")
			,$searchField = $searchForm.children("input")
			,$searchBtn = $searchForm.children("button[type='submit']")
			,$searchPopup = $searchForm.children(".js-minisearch")
			,$cartBtn = $(".js-cart")
			,$cartPopup = $cartBtn.find(".js-minicart")
			;

		// var focusBlurSearchField = function(bBlur){	// focus/blur cursor on search field after searchButton press
		// 	if ($searchField.hasClass("is-focused") || bBlur){
		// 		$searchField.removeClass("is-focused");
		// 		$searchField.children("input").blur();
		// 		// console.log("blur");
		// 	} else {
		// 		$searchField.addClass("is-focused");
		// 		$searchField.children("input").focus();
		// 		// console.log("focus");
		// 	}
		// }

		// var hideSearch = function(iTime){
		// 	$searchField.fadeOut(iTime);
		// 	focusBlurSearchField(true);
		// 	console.log("Hide search");
		// }
		// var toggleSearch = function(iTime){
		// 	$searchField.fadeToggle(iTime);
		// 	focusBlurSearchField();
		// 	console.log("toggle search");
		// }

		var openSearchPopup = function(){
			$searchPopup.addClass("is--visible");
			$searchField.focus();
			console.log("openSearchPopup");
		};
		var closeSearchPopup = function(){
			$searchPopup.removeClass("is--visible");
			$searchField.blur();
			console.log("closeSearchPopup");
		};

		// var hideCart = function(iTime){
		// 	$minicart.slideUp(iTime);
		// 	removeBodyBackground();
		// 	console.log("hide minicart");
		// }
		// var toggleCart = function(iTime){
		// 	$minicart.slideToggle(iTime);
		// 	toggleBodyBackground()
		// 	console.log("toggle minicart");
		// }

		// var hideSearchAndCart = function(iTime){
		// 	hideSearch(iTime);
		// 	hideCart(iTime);
		// 	focusBlurSearchField(true);
		// }

		var openCartPopup = function(){
			$cartPopup.addClass("is--visible");
			console.log("openCartPopup");
		};
		var closeCartPopup = function(){
			$cartPopup.removeClass("is--visible");
			console.log("closeCartPopup");
		};

		// close all popups and menus
		var closeAllPopupMenus = function(){
			closeMainMenu();
			closeFiltersMenu();
			closeSearchPopup();
			closeCartPopup();
		};

    	// Добавляем обработчик для переключателя меню
    	$menuTrigger.on('click',function(e){
			console.log("----------------");
    		console.log("menu btn click");
    		e.stopPropagation();

    		if (!$body.hasClass('is--mobile-active')){	// Якщо немає жодного відкритого попапа
    			openMainMenu();
    			addBodyBackground();
    		} else if(!$mobNav.hasClass("is--visible")){// Якщо відкритий якийсь попап, але це не - головне меню
				closeAllPopupMenus();
    			openMainMenu();
    		} else {									// Якщо відкрито саме - головне меню
    			closeMainMenu();
    			removeBodyBackground();
    		}
    		// toggleMenuVisibility();
    		// toggleMenuTriggerClass();
    		// toggleBodyBackground();
		});

    	// Add listener for filters open/close buttons
	    $filtersTriggers.on('click',function(e){
	    	console.log("----------------");
    		console.log("filtersTriggers click");
    		e.stopPropagation();

    		if (!$body.hasClass('is--mobile-active')){	// Якщо немає жодного відкритого попапа
    			openFiltersMenu();
    			addBodyBackground();
    		} else if(!$filtersMenu.hasClass("is--visible")){// Якщо відкритий якийсь попап, але це не - меню фільтрів
				closeAllPopupMenus();
    			openFiltersMenu();
    		} else {									// Якщо відкрито саме - меню фільтрів
    			closeFiltersMenu();
    			removeBodyBackground();
    		}
	    });

	    $mobNav.on("click", function(e){	// 
			e.stopPropagation();
		});
		$searchForm.on("click", function(e){	// prevent form submit
			e.stopPropagation();
		});
		$cartBtn.on("click", function(e){	// 
			e.stopPropagation();
		});
		// $cartPopup.on("click", function(e){	// 
		$cartPopup.find(".b-minicart__item").on("click", function(e){	// 
			e.stopPropagation();
		});
		$cartPopup.find(".b-minicart__total").on("click", function(e){	// 
			e.stopPropagation();
		});
		$filtersMenu.on("click", function(e){	// 
			e.stopPropagation();
		});


		$searchBtn.on("click", function(e){	// prevent form submit
			console.log("----------------");
			console.log("search btn click");
			if(window.innerWidth < BREAKPOINT_RES){
				e.preventDefault();	// prevent sending search form on tablets
			}

			if (!$body.hasClass('is--mobile-active')){
				openSearchPopup();
				addBodyBackground();
			} else if (!$searchPopup.hasClass("is--visible")){
				closeAllPopupMenus();
				openSearchPopup();
			} else {
				closeSearchPopup();
				removeBodyBackground();
			}
			// $searchPopup.toggleClass("is--visible");
		});

		$cartBtn.on("click", function(e){	// prevent form submit
			console.log("----------------");
			console.log("cart btn click");

			if (!$body.hasClass('is--mobile-active')){
				openCartPopup();
				addBodyBackground();
			} else if (!$cartPopup.hasClass("is--visible")){
				closeAllPopupMenus();
				openCartPopup();
			} else {
				closeCartPopup();
				removeBodyBackground();
			}
		});


		$searchPopup.children("input").on("keypress", function(e){		// submit search form by enter press
			if ( e.which == 13 ) {
				$searchForm.trigger("submit");
				console.log("----------------");
				console.log("submit searchForm");
			}
		});

		$('body').on("click", function(e) {
			if ($body.hasClass('is--mobile-active')){	// якщо відкрито оверлей
				closeAllPopupMenus();
				removeBodyBackground();
			}
		});

		$(".js-mobile-nav").removeAttr("style");	// "visible menu while page loads" bug fix js part

		// $minicartIcon.on("click", function(e){
		// 	e.stopPropagation();
		// 	if(window.innerWidth < BREAKPOINT_RES){
		// 		hideSearch(ANIM_TIME_SM);
		// 	}
		// 	toggleCart(ANIM_TIME_SM);
		// });

		// $window.on("resize", function(){
		// 	$searchForm.off("click");
		// 	hideSearchAndCart(0);
		// 	removeBodyBackground();

		// 	if(window.innerWidth < BREAKPOINT_RES){
		// 		$searchForm.on("click", function(e){
		// 			e.stopPropagation();
		// 			hideCart(ANIM_TIME_SM);
		// 			toggleSearch(ANIM_TIME_SM);
		// 		});
		// 	} else{
		// 		if ($searchField.is(":hidden")){$searchField.show(0)};
		// 	}

		// }).trigger("resize");



	    // Закрываем мобильное меню (меню фільтрів, і кошик/пошук ) при клике на область вне его
	   //  function closeMobileMenuOnOutOfClick(){
	   //    $('body').on("mouseup", function(e) {
	   //      var subject = $('.is--visible');

	   //      if( subject.length	// якщо відкрита бічна панель головного меню (або меню фільтрів)
	   //        && !$(e.target).hasClass('js-nav-toggle')	// і це не клік по діву з кнопкою-бутербродом
	   //        && !$(e.target).hasClass('icon-nav')		// і це не іконка кнопки-бутерброда
	   //        && e.target.className != subject.attr('class')	// і це не клік по бічній панелі меню (або меню фільтрів)
	   //        && !subject.has(e.target).length){		// і це не клік по якомусь нащадку бічній панелі меню (або меню фільтрів)
		  //         console.log("if");
		  //         removeMenuVisibility();	// закриваємо бічне головне меню
		  //     	  closeFiltersMenu();	// закриваємо бічне меню фільтрів
		  //         removeBodyBackground();	// прибираємо затемнення фона
		  //         removeMenuTriggerClass();	// вертаємо кнопку "X" в стан бутерброда
				// // if(window.innerWidth < BREAKPOINT_RES){
				// // 	$searchField.fadeOut(ANIM_TIME_SM);
				// // 	$minicart.slideUp(ANIM_TIME_SM);
				// // 	// removeBodyBackground();
				// // };
	   //      } else if (window.innerWidth < BREAKPOINT_RES){
		  //         console.log("else");
				// $searchField.fadeOut(ANIM_TIME_SM);
				// $minicart.slideUp(ANIM_TIME_SM);
				// removeBodyBackground();
	   //      }
	   //    });
	   //  }

		// $("body").on("mouseup", function(e){
		// 	if(window.innerWidth < BREAKPOINT_RES){
		// 		$searchField.fadeOut(ANIM_TIME_SM);
		// 		$minicart.slideUp(ANIM_TIME_SM);
		// 		removeBodyBackground();
		// 	};

		// });

    
    /* Подключаем обработчик моб. меню */
    // (function(){
      // closeMobileMenuOnOutOfClick();

    // })();


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
      afterOpen: function() {
        // $body.removeAttr("style")
      },
      afterClose: function() {
        // $body.removeAttr("style")
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
  	$window.on("load",function(){

	  	var fixedHeader = $('.js-fixed-header');
	  	var servicesTop = $('.section--services').length 
	  										? $('.section--services').offset().top 
	  										: 600;

	  	$window.scroll(function(e){

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
	// Menu Slider
	//---------------------------------------------------------------------------------------
	// (function(){

	// 	var $slider = $('.js-slider_menu').bxSlider({
	// 		slideMargin: 10,
	// 		minSlides: 5,
	// 		// infiniteLoop: false,
	// 		pager: false,
	// 		controls:false
	// 	});
	// })();

	//
	// Catalog - Products Sort Block
	//---------------------------------------------------------------------------------------
		(function(){
			var  $sort = $('.b-sort')
				,$select = $sort.find(".js-selectric")	// "Сортировать"
				,$optionLabeled = $select.children(".label")
				,bPrevWindowWidthMore =  $window.outerWidth() >= BREAKPOINT_RES_CATALOG
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
				if ($window.outerWidth() >= BREAKPOINT_RES_CATALOG && (bInitialization?true:!bPrevWindowWidthMore)){
					$optionLabel = $select.children(".label");
					$select.children(".label").remove();	// hide "Сортировать" option on desktops
				} else if ($window.outerWidth() < BREAKPOINT_RES_CATALOG && (bInitialization?true:bPrevWindowWidthMore)){
					if(!$select.children(".label").length){	// show "Сортировать" option on tablets
						$select.prepend($optionLabeled);
					}
				}

				$select.selectric(SelectricSettings);
				bPrevWindowWidthMore =  $window.outerWidth() >= BREAKPOINT_RES_CATALOG;
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
	    var 
             $filter = $('.b-filter')
            ,filterSP
            ;

		filterSP = $filter.find('.b-filter__block-items').jScrollPane({
	    	showArrows: false,
	    	// autoReinitialise: true
	    });

		// reinitialize jScrollPane (fixed .jspScrollable width after resize bugFix)
	    $window.on("resize", function(){
	    	filterSP.each(function(){
	    		// console.log("reinitialise");
	    		$(this).data('jsp').reinitialise();	// width changes
	    		// $(this).data('jsp').destroy();
	    	});
	    });
        
	})();

	//
	// Slide Up
	//---------------------------------------------------------------------------------------
	(function(){
		var 
			 limit = $window.height()
			,$backToTop = $('.js-up')
			;

		$window.on("scroll", function () {
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