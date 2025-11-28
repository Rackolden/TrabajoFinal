<script lang="ts">
    import icon from "$lib/assets/img1.png";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={icon} />
</svelte:head>

{@render children()}

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: none;
        color: #f8f9fa;
    }
    :global(body) {
        background-color: #0a0910;
    }
    :global(p) {
        font-family:
            "Lexend",
            sans serif;
    }
    :global(h1, h2) {
        font-family: "Lexend", sans-serif;
    }
    :global(:root) {
        --bg-primary: #0a0a0a;
        --bg-secondary: #141414;
        --text-primary: #ffffff;
        --text-secondary: #a0a0a0;
        --accent: #3b82f6;
        --border: #2a2a2a;
        --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :global(:root.dark) {
        --bg-primary: #f5f5f5;
        --bg-secondary: #ffffff;
        --text-primary: #0a0a0a;
        --text-secondary: #666666;
        --accent: #2563eb;
        --border: #e5e5e5;
    }

    :global(body) {
        background-color: var(--bg-primary);
        color: var(--text-primary);
        transition: var(--transition);
    }
</style>
