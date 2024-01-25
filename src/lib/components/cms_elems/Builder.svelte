<script lang="ts">
    import cms from "../../utils/cms";
    import BlockSeo from "$lib/components/cms_elems/block_seo/BlockSeo.svelte";
    import FullWidthCarousel from "$lib/components/cms_elems/full_width_carousel/FullWidthCarousel.svelte";

    // PROPS START
    export let json: any;
    // PROPS END

    const getComponent = (item: any) => {
        switch (item.type) {
            case cms.BLOCK_SEO:
                return BlockSeo;
            case cms.BLOCK_FULL_WIDTH_CAROUSEL:
                return FullWidthCarousel;
            default:
                return null;
        }
    }

</script>

<div>
    {#if json.types.length}
        {#each json.types as item, index (item.type + index)}
            {#if getComponent(item)}
                <svelte:component json={item} this={getComponent(item)} />
            {/if}
        {/each}
    {/if}
</div>
