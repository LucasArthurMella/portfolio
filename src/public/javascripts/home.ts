import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'slick-carousel/slick/slick.min.js';
import $ from 'jquery';

import { Carousel } from "@fancyapps/ui"
import "@fancyapps/ui/dist/carousel/carousel.css";



export function home() {


//Fancybox.bind('[data-fancybox="gallery2"]', {
//  //
//});

$(function(){
  $('.project-box-images').slick({
   infinite: true,
    dots: true,
    speed: 300,
  });
});



}

home();



