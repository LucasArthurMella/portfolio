import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'slick-carousel/slick/slick.min.js';
import $ from 'jquery';



function project(){
Fancybox.bind('[data-fancybox]', {
});

$(function(){
  $('.project-box-images').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.project-box-images-slider',
  adaptiveHeight: true
  });
});


$(function(){
  $('.project-box-images-slider').slick({
   slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.project-box-images',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    },
  ]



  });
});

}

project();
