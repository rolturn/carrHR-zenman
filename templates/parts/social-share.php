<?php
    /*------------------------------------*\
        ::Images
    \*------------------------------------*/
    $options = get_field('featured_image_options');
    $post_thumbnail_url = '';
    if($options == "custom") {
        $image_array = get_field('post_custom_image');
        $post_thumbnail_url = $image_array['sizes']['medium'];
    } else{
        $post_thumbnail_url = get_site_url() . '/wp-content/themes/family-law/images/blog-placeholders/blog-images-'.$options.'.jpg';
    }
    /*------------------------------------*\
        ::Excerpts
    \*------------------------------------*/
    $excerpt = '';
    if(is_singular( 'post' )){
        $excerpt = strip_tags(get_field('post_content'));
    }
    if(strlen($excerpt) > 80){
        $excerpt = substr($excerpt,0,80) . '...';
    }
    /*------------------------------------*\
        ::Title
    \*------------------------------------*/
    $replace = array(
        '&' => 'and',
        '#038;' => '',
    );
    $newTitle = str_replace( array_keys($replace), $replace, $excerpt );
?>
<ul>
    <li class="twitter">
        <a title="Share to Twitter" href="http://twitter.com/home?status=<?php echo $newTitle; ?> <?php the_permalink(); ?>" target="_blank" rel="nofollow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400 18.9C189.5 18.9 18.9 189.6 18.9 400c0 210.5 170.6 381.1 381.1 381.1 210.5 0 381.1-170.6 381.1-381.1 0-210.4-170.6-381.1-381.1-381.1zm152.1 321.8c.1 3.3.2 6.7.2 10.1 0 103.5-78.7 222.8-222.8 222.8-44.2 0-85.4-13-120-35.2 6.1.7 12.4 1.1 18.7 1.1 36.7 0 70.5-12.5 97.3-33.5-34.3-.6-63.2-23.3-73.1-54.4 4.8.9 9.7 1.4 14.7 1.4 7.2 0 14.1-.9 20.6-2.8-35.9-7.2-62.8-38.8-62.8-76.8v-1c10.6 5.8 22.7 9.4 35.5 9.8-21-14.1-34.8-38-34.8-65.2 0-14.4 3.9-27.8 10.6-39.4 38.7 47.4 96.3 78.6 161.4 81.8-1.3-5.7-2-11.7-2-17.8 0-43.2 35.1-78.3 78.3-78.3 22.5 0 42.9 9.5 57.2 24.7 17.9-3.5 34.6-10 49.7-19-5.8 18.3-18.2 33.6-34.4 43.3 15.8-1.9 30.9-6.1 45-12.3-10.7 15.9-24 29.7-39.3 40.7z"/></svg>
        </a>
    </li>
    <li class="facebook">
        <a title="Share to Facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" target="_blank" rel="nofollow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400 0C179.1 0 0 179.1 0 400s179.1 400 400 400 400-179.1 400-400S620.9 0 400 0zm88.3 332.3l-4.6 59.8h-61.3V600h-77.5V392.1h-41.4v-59.8h41.4v-40.2c0-17.7.4-45.1 13.3-62 13.6-17.9 32.2-30.1 64.2-30.1 52.2 0 74.1 7.4 74.1 7.4l-10.3 61.3s-17.2-5-33.3-5c-16.1 0-30.5 5.8-30.5 21.8v46.7h65.9z"/></svg>
        </a>
    </li>
    <li class="linkedin">
        <a title="Share to Linkedin" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink(); ?>&amp;title=<?php echo $newTitle; ?>&amp;summary=<?php echo $excerpt; ?>" target="_blank" rel="nofollow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400 0C179.1 0 0 179.1 0 400s179.1 400 400 400 400-179.1 400-400S620.9 0 400 0zM288.1 567.3h-78V317.8h78v249.5zm-41-280.7h-.6c-28.2 0-46.5-19.1-46.5-43.2 0-24.6 18.8-43.3 47.6-43.3s46.5 18.6 47 43.3c0 24-18.2 43.2-47.5 43.2zM600 567.3h-88.4V438.2c0-33.8-13.8-56.9-44.2-56.9-23.3 0-36.2 15.6-42.2 30.6-2.3 5.4-1.9 12.9-1.9 20.4v135h-87.6s1.1-228.7 0-249.5h87.6V357c5.2-17.1 33.2-41.6 77.8-41.6 55.4 0 98.9 35.9 98.9 113.2v138.7z"/></svg>
        </a>
    </li>
</ul>