<script lang="ts">
    import '$lib/styles/variables.scss'
    import '$lib/styles/global.scss'
    import Header from "$lib/components/header/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import GeneralComponent from "$lib/components/GeneralComponent.svelte";
    let mess = "Hello"
</script>

<Header mess="{mess}" />

<GeneralComponent >
    <slot/>
</GeneralComponent>

<Footer message="hello" />
