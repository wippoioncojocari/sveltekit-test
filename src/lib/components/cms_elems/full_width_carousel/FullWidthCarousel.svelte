<script>
    import { onMount } from 'svelte';
    import cms from "../../../utils/cms"
    import styles from "$lib/styles/FullWidthCarousel.module.scss";
    import Swiper from 'swiper';
    import 'swiper/css';
    import 'swiper/css/navigation';


    export let json

    onMount(() => {
        var swiper = new Swiper("#full_width_slider", {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            pagination: {
                el: '.swiper-pagination',
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    })

    const data = cms.getAllFields(json)
    console.log(data)
</script>

<div class={styles.main}>


    <div id="full_width_slider" class={`swiper  ${styles.swiper}`}>
        <div class={`swiper-wrapper ${styles.swiper__wrapper}`}>
            <div class={`swiper-slide ${styles.swiper__slide}`}>
                Slide 1
            </div>
            <div class={`swiper-slide ${styles.swiper__slide}`}>
                Slide 2
            </div>
        </div>
    </div>
</div>