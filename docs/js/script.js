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
  $('.banner__slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
  });
}

function init_contact_form() {
  const $callback_form = $('.callback__form');

  $('input[name="phone"]').on('keydown', function (evt) {
    if ($(this).val() == '' && evt.originalEvent.key == '8') {
      evt.preventDefault();

      $(this).val('+7 ');
    }

    $(this).mask('+7 000 000-00-00');
  });

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
}

$(document).ready(function () {
  init_menu();
  init_carousel();
  init_contact_form();
});
