<?php
/*
Template Name: Home PageTemplate
*/
?>

<div id="myCarousel" class="carousel slide">
    <!-- Carousel items -->
    <div class="carousel-inner">
        <div class="active item">
            <img src="http://placehold.it/1170x300">
            <div class="carousel-caption"><p>Vini Vidi Veci</p></div>
        </div>
        <div class="item">
            <img src="http://placehold.it/1170x300">
            <div class="carousel-caption"><p>Vini Vidi Veci</p></div>
        </div>
    </div>
    <!-- Carousel nav -->
    <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
    <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
</div>

<?php
// get_template_part('templates/page', 'header');
get_template_part('templates/content', 'page');
?>