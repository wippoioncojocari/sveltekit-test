<script lang="ts">
    import cms from "$lib/utils/cms";
    import Builder from "$lib/components/cms_elems/Builder.svelte";
    export let data

</script>

<Builder json={data} />



