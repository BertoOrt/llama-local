$(document).ready(function() {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 80) {
      $('.nav').addClass('navbar-fixed');
      $('.logo').css('width', '35px')
      $('.logo').css('height', '30px')
      $('.nav-tabs').css('padding-top', '1%')
    }
    if ($(window).scrollTop() < 80) {
      $('.nav').removeClass('navbar-fixed');
      $('.logo').css('width', '60px')
      $('.logo').css('height', '50px')
      $('.nav-tabs').css('padding-top', '2%')
    }
  });
});
