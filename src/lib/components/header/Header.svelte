<script lang="ts">
    import styles from "$lib/styles/Header.module.scss"
    import LeftSide from "$lib/components/header/LeftSide.svelte";
    import RightSide from "$lib/components/header/RightSide.svelte";
    import logo_ig from "$lib/assets/images/gif-logo.gif";
    import { goto } from '$app/navigation';
    export let mess: any;

    const handleClick = ():void => {

    };

</script>

<div class={styles.header}>
    <div class={styles.header__inner}>
        <LeftSide />

        <div
            role="button"
            tabindex="0"
            on:click={() => {goto('/');}}
            on:keydown={() => {}}
            class={styles.header__logo}
        >
            <img src={logo_ig} alt="logo_ig" width="205" height="104">
        </div>

        <RightSide />
    </div>
</div>