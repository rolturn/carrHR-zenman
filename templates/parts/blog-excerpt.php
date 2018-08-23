<?php
$label_text = get_field('label_text') ? get_field('label_text') : false;
$label_color = get_field('label_color') ? get_field('label_color') : false;
$label_color_class_ext = $label_text ? 'color-'.$label_color['value'] : '';
?>

<a class="card card__post" href="<?php the_permalink(); ?>" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
  <article>
    <div class="card__image__container <?php echo ' card__image__container__'.$label_color_class_ext; ?>">
      <?php if ( has_post_thumbnail() ) : ?>
        <?php $bg_img = get_the_post_thumbnail_url($post_obj->ID); ?>
        <div class="card__image img-bg cover" style="background: url(<?php echo $bg_img; ?>) no-repeat center center; background-size: cover;"></div>
        <?php if ($label_text): ?>
          <div class="card__label<?php echo ' card__label__'.$label_color_class_ext; ?>"><?php echo $label_text; ?></div> <!-- /.card__label -->
        <?php endif; ?>
      <?php endif; ?>
    </div>

    <div class="card__text">
      <h1><?php the_title(); ?></h1>

      <div class="card__content">
        <?php echo excerpt_with_strong(20); ?>
      </div> <!-- /.card__content -->
    </div>
  </article>
  <div class="more">Read More</div><!-- /.read-more -->
</a> <!-- //card__post -->
