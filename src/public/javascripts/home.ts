import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'slick-carousel/slick/slick.min.js';
import $ from 'jquery';


export function home() {

Fancybox.bind('[data-fancybox]', {
});

$(function(){
  $('.project-box-images').slick({
   infinite: true,
    dots: true,
    speed: 300,
  });
});

}

home();



