<div class="footer-wrapper">
    <footer id="content-info" class="container" role="contentinfo">
        <?php dynamic_sidebar('sidebar-footer'); ?>

        <div class="row-fluid footer">
            <div class="span4">
                <p>
                    <h5>Contact Us</h5>
                    5333 15th AVE S., Suite 1L<br>
                    Seattle, WA 98108<br>
                    <br>
                    <a href="mailto:seatgroupseattle@gmail.com">seatgroupseattle@gmail.com</a>
                </p>

                <p>
                    &copy;
                    <?php echo date('Y'); ?>
                    <?php bloginfo('name'); ?></p>
            </div>
            <div class="span4">
                <p>
                    Chocolate cake pudding jelly chupa chups. Topping halvah sweet chocolate bar biscuit cheesecake topping chocolate caramels. Macaroon ice cream jujubes chocolate bar chupa chups. Dessert lemon drops cookie jelly-o donut chupa chups.
                </p>
            </div>
            <div class="span4">
                <p>
                    Chocolate cake pudding jelly chupa chups. Topping halvah sweet chocolate bar biscuit cheesecake topping chocolate caramels. Macaroon ice cream jujubes chocolate bar chupa chups. Dessert lemon drops cookie jelly-o donut chupa chups.
                </p>
            </div>
        </div>

    </footer>
</div>

<?php if (GOOGLE_ANALYTICS_ID) : ?>
<script>
  var _gaq=[['_setAccount','<?php echo GOOGLE_ANALYTICS_ID; ?>'],['_trackPageview']];
  (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
</script>
<?php endif; ?>

<script>
window.onresize = function(event) {
    $('.footer-wrapper').width
}
</script>
<?php wp_footer(); ?>