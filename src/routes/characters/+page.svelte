<script lang="ts">
    export let data;

    $: personages = data?.data

    console.log(data?.data)
</script>

<h1>
    {#each personages as {title}}
        <h5>
            {title}
        </h5>
    {/each}
</h1>