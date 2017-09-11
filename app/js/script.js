$(function() {
  var $window = $(window);
  
  //
  // Window scale script 
  //---------------------------------------------------------------------------------------
//    (function(){
////    var elm = document.getElementById('all'); // all -- элемент, в который был обернут весь сайт
////    var coeff = document.body.clientWidth/elm.offsetWidth; // считаем коэффициент масштабирования так, чтобы элемент all занял весь экран
//    var  body = document.body
//        ,html = document.getElementsByTagName("html")[0]
//        ;
//        
//        console.log("body:", body);
//        console.log("html:", html);
//        console.log("body width:", body.clientWidth);
//        console.log("html width:", html.clientWidth);    
//        var coeff = html.clientWidth/body.clientWidth;
//            console.log("coeff: ", coeff);
//            console.log("style: ", 'scale('+coeff+')');
//        if (coeff>1) coeff=1; // нам нужно только уменьшение сайта, но не его увеличение, поэтому ограничиваем коэффициент сверху единицей
//        if (coeff<0.6) coeff=0.6; // ограничение снизу добавлено для того, чтобы сайт совсем уж не превращался в нечитаемый
//        if (coeff!=1.0) {
//        //    if (navigator.userAgent.indexOf('Firefox')!=-1) elm.style.boxShadow='none';  // масштабирование в Firefox порождало некорректное отображение boxshadow, и пришлось это свойство отключить
////            html.style.webkitTransform = 
////            html.style.msTransform = 
////            html.style.mozTransform = 
//            html.style.transform = 'scale('+coeff+')'; // собственно масштабирование
//        }
//    })()

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

    // акордеон (в т.ч. в моб меню)
    (function(){
    	var  
    		 $accordions = $(".js-accordion__item")
    		,$accordionTriggers = $accordions.find(".js-accordion__trigger")
			,$accordionContents = $accordionTriggers.siblings(".js-accordion__content")
    		;

    	$accordionTriggers.on("click", function(){
			var  $trigger = $(this)
				,$content = $trigger.siblings(".js-accordion__content")
				,$parent = $(this).parents(".js-accordion__item")
				;
			// close all opened accordion items except of clicked
			$accordionContents.each(function(){
				if (($(this)[0] !== $content[0])&&($parent.hasClass("opened"))){
					$(this).slideUp(200);
					$parent.removeClass("opened").addClass("closed");
				}
			});
			$content.slideToggle(200);
			$parent.toggleClass("opened").toggleClass("closed");
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
        
//        var  body = document.body
//            ,html = document.getElementsByTagName("html")[0]
//            ;
//        
//        console.log("body:", body);
//        console.log("html:", html);
//        console.log("body width:", body.clientWidth);
//        console.log("html width:", html.clientWidth);    
//        var coeff = html.clientWidth/body.clientWidth;
//            console.log("coeff: ", coeff);
//            console.log("style: ", 'scale('+coeff+')');
//        if (coeff>1) coeff=1; // нам нужно только уменьшение сайта, но не его увеличение, поэтому ограничиваем коэффициент сверху единицей
//        if (coeff<0.6) coeff=0.6; // ограничение снизу добавлено для того, чтобы сайт совсем уж не превращался в нечитаемый
//        if (coeff!=1.0) {
//        //    if (navigator.userAgent.indexOf('Firefox')!=-1) elm.style.boxShadow='none';  // масштабирование в Firefox порождало некорректное отображение boxshadow, и пришлось это свойство отключить
//            html.style.webkitTransform = 
//            html.style.msTransform = 
//            html.style.mozTransform = 
//            html.style.transform = 'scale('+coeff+')'; // собственно масштабирование
//        }
		
		$('.js-slider').bxSlider({
				// auto: true,
				pager: true,
				controls:false
			}
		);

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