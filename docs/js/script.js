function init_menu() {
  const $js_header_menu_toggle = $('.js_header_menu_toggle'),
    $main_nav = $('.main-nav');

  $js_header_menu_toggle.on('click', function () {
    $('.bar').toggleClass('animate');
    $main_nav.toggleClass('open');
    $('.header, body').toggleClass('modal-open');
    $(document).on('click', document_click_handler);
  });

  function document_click_handler(evt) {
    if (
      !$(evt.target).is('.main-nav') &&
      !$(evt.target).closest('.js_header_menu_toggle').length &&
      !$(evt.target).is('.js_header_menu_toggle')
    ) {
      $main_nav.removeClass('open');
      $('.bar').removeClass('animate');
      $('.header, body').removeClass('modal-open');
      $(document).off('click', document_click_handler);
    }
  }
}

function init_carousel() {
  /* ============= Banner Start ============ */

  $('.banner__slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
  });

  $('.item-6__slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
  });

  /* ============= Banner End ============ */

  /* ============= Rates Start ============ */

  $('.rates__slider').slick({
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  });

  $('.js_rates_btn').on('click', function (evt) {
    evt.preventDefault();

    const $btn = $(this),
      to_item = $btn.data('item');

    $('.rates__slider').slick('slickGoTo', to_item);
    $('.js_rates_btn').removeClass('active');
    $btn.addClass('active');
  });

  /* ============= Rates End ============ */

  $('.cases__slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  });

  if ($(window).width() > 560) {
    $('.js_videos_list').slick({
      dots: false,
      infinite: true,
      arrows: true,
      prevArrow: $('.videos__nav--prev'),
      nextArrow: $('.videos__nav--next'),
      speed: 500,
      fade: true,
      cssEase: 'linear',
    });
  }

  if ($(window).width() <= 560) {
    $('.js_technologies_slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 2,
    });

    $('.js_team_slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 2,
    });

    $('.js_clients_slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      rows: 3,
    });

    $('.js_testimonials_slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
    });

    $('.js_services_slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      rows: 6,
    });
  }
}

function init_contact_form() {
  const $callback_form = $('.callback__form'),
    $inputs = $callback_form.find('input'),
    $file = $inputs.filter('[type="file"]');

  check_inputs();
  update_file_name();

  $callback_form.find('input[name="phone"]').on('keydown', function (evt) {
    if ($(this).val() == '' && evt.originalEvent.key == '8') {
      evt.preventDefault();

      $(this).val('+7 ');
    }

    $(this).mask('+7 (000) 000-00-00');
  });

  $('.js_callback_file').on('click', function () {
    $inputs.filter('[type="file"]').trigger('click');
  });

  $file.on('change', update_file_name);

  $inputs.on('change input', check_inputs);

  $callback_form.on('submit', function (evt) {
    evt.preventDefault();

    $.ajax({
      url: 'mail.php',
      method: 'POST',
      data: $callback_form.serialize(),
      dataType: 'json',

      beforeSend: function (data) {
        $callback_form.find('button[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
      },
      complete: function (data) {
        // событие после любого исхода
        $callback_form.find('button[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
        $('#modal-success').addClass('open');
      },
    });
  });

  $('.modal__close').on('click', function () {
    $(this).closest('.modal').removeClass('open');
  });

  function update_file_name() {
    if ($file.val() == '' || $file[0].files[0].size > 10485760) {
      $(this).val('');
      $('.js_callback_file').text('Прикрепить файл');
    } else {
      $('.js_callback_file').text($file[0].files[0].name);
    }
  }

  function check_inputs() {
    const is_complete = $inputs.toArray().reduce((res, current) => res * ($(current).val() != ''), true);

    if (is_complete) {
      $('.callback__submit').attr('disabled', false);
    } else {
      $('.callback__submit').attr('disabled', 'disabled');
    }
  }
}

$(document).ready(function () {
  init_menu();
  init_carousel();
  init_contact_form();
});
