<?php
/*
Template Name: Home PageTemplate
*/
?>

<div class="row">
    <div class="span12">
        <div id="myCarousel" class="carousel slide">
            <!-- Carousel items -->
            <div class="carousel-inner">

                <?php
                    query_posts('cat=1');
                    if (have_posts()):
                        $first = True;
                        while (have_posts()):
                            the_post();


                ?>
                    <?php if ($first == True): ?>
                        <div class="item active">
                    <?php else: ?>
                        <div class="item">
                    <?php endif; ?>
                        <a href="<?php the_permalink(); ?>">
                            <?php
                            if (has_post_thumbnail()):
                                the_post_thumbnail('homepage-hero');
                            else: ?>
                                <img src="http://placehold.it/940x300/fff/dedede">
                            <?php endif; ?>
                        </a>
                        <div class="carousel-caption">
                            <p>
                                <a href="<?php the_permalink(); ?>">
                                <?php the_title();?></p>
                                </a>
                        </div>
                    </div>
                        <?php if($first): $first = False; endif; endwhile; else: ?>

                        <div class="item">
                            <a href="">
                                <img src="http://placehold.it/940x300/fff/dedede"></a>
                            <div class="carousel-caption">
                                <p>Seattle Elementary Alignment Team</p>
                            </div>
                        </div>
                <?php endif; wp_reset_query(); ?></div>
                <!-- Carousel nav -->
                <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>

        </div>


    </div>

</div>

<div class="row-fluid subheroes">
<div class="span6">
    <h4>What is SEAT Group?</h4>
    <p>
        We are a Collaboration of Out-of-School Time Providers located on-site within Seattle Public Schools committed to reducing the K-5 Achievement Gap. We began our collective impact efforts in February 2011 and are funded by a Gates Foundation Grant for new initiatives.
    </p>
</div>
<div class="span3">
    <h4>The current state of education</h4>
    <p>
        Out-of-School Time programs are uniquely positioned to partner with schools and families to reduce the K-5 Achievement Gap. Learning how to do this well while advancing the field of early elementary education is the purpose of SEAT.
    </p>
</div>
<div class="span3">
    <h4>How can I get involved?</h4>
    <p>
        Check out our Academic Achievement Program and our Data Tools if you are interested in learning how to access and use data for your educational program to identify student need, align learning outcomes, design with intentionality, and track results.
    </p>
</div>
</div>