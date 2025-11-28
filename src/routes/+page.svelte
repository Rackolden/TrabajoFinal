<script>
    let title = "Trabajo Final";
    let subtitle = "Bitácora y documentación del proyecto";
    let darkMode = false;
    let searchOpen = false;
    let searchQuery = "";
    import { fade } from "svelte/transition";

    // Toggle dark mode
    function toggleDarkMode() {
        darkMode = !darkMode;
        document.documentElement.classList.toggle("dark");
    }

    // Toggle search
    function toggleSearch() {
        searchOpen = !searchOpen;
        if (searchOpen) {
            setTimeout(
                () => document.getElementById("search-input")?.focus(),
                100,
            );
        }
    }

    let pasos = [
        {
            numero: 1,
            titulo: "Documentación",
            contenido:
                "Explora todos los recursos, herramientas y tecnologías utilizadas en este proyecto.",
        },
        {
            numero: 2,
            titulo: "Formulario",
            contenido:
                "Remítenos tu información para ponernos en contacto contigo.",
        },
    ];
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main class:dark={darkMode}>
    <header class="hero">
        <nav class="navbar" aria-label="Navegación principal">
            <a
                href="/"
                title="Inicio"
                class="nav-link"
                aria-label="Ir al inicio"
            >
                <i class="fa-light fa-house"></i>
            </a>

            <div class="options">
                <!-- Search -->
                <div class="search-container">
                    <button
                        type="button"
                        on:click={toggleSearch}
                        title="Buscar"
                        aria-label="Abrir búsqueda"
                        class="icon-button"
                    >
                        <i class="fa-light fa-magnifying-glass"></i>
                    </button>

                    {#if searchOpen}
                        <div
                            class="search-dropdown"
                            transition:fade={{ duration: 200 }}
                        >
                            <input
                                id="search-input"
                                type="text"
                                bind:value={searchQuery}
                                placeholder="Buscar en la bitácora..."
                                class="search-input"
                            />
                        </div>
                    {/if}
                </div>

                <!-- Dark mode toggle -->
                <button
                    type="button"
                    on:click={toggleDarkMode}
                    title={darkMode ? "Modo claro" : "Modo oscuro"}
                    aria-label="Cambiar tema"
                    class="icon-button"
                >
                    <i class="fa-light {darkMode ? 'fa-sun' : 'fa-moon'}"></i>
                </button>

                <!-- Social links -->
                <a
                    title="GitHub"
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="icon-button"
                >
                    <i class="fa-brands fa-github"></i>
                </a>
                <a
                    title="Twitter"
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="icon-button"
                >
                    <i class="fa-brands fa-x-twitter"></i>
                </a>

                <!-- Login (separado) -->
                <a
                    title="Iniciar sesión"
                    href="/login"
                    class="icon-button login-button"
                    aria-label="Iniciar sesión"
                >
                    <i class="fa-light fa-right-to-bracket"></i>
                </a>
            </div>
        </nav>

        <div class="title-container">
            <h1 class="main-title">{title}</h1>
            <p class="subtitle">{subtitle}</p>
        </div>
    </header>

    <article class="content">
        {#each pasos as paso}
            <section class="paso-card">
                <h2 class="paso-title">
                    <a
                        href="/paso{paso.numero}"
                        data-sveltekit-preload-data="hover"
                    >
                        Paso {paso.numero}: {paso.titulo}
                    </a>
                </h2>
                <p class="paso-content">{paso.contenido}</p>
            </section>
        {/each}
    </article>
</main>

<style>
    :global(body) {
        background-color: var(--bg-primary);
        color: var(--text-primary);
        transition: var(--transition);
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
    main {
        display: flex;
        flex-flow: column nowrap;
        margin: 0 auto;
        padding: 1rem;
        width: min(90%, 1200px);
        min-height: 100vh;
    }
    .icon-button i,
    .nav-link i {
        color: var(--text-primary);
    }
    /* Navbar */
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 0;
        border-bottom: 1px solid var(--border);
    }

    .options {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .icon-button,
    .nav-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.625rem;
        border-radius: 0.5rem;
        color: var(--text-primary);
        text-decoration: none;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: var(--transition);
        font-size: 1.125rem;
    }

    .icon-button:hover,
    .nav-link:hover {
        background-color: var(--bg-secondary);
        color: var(--accent);
        transform: translateY(-2px);
    }

    .login-button {
        position: relative;
        margin-left: 0.75rem;
        padding-right: 1.25rem;
    }

    .login-button::after {
        content: "";
        position: absolute;
        left: -0.5rem;
        top: 50%;
        transform: translateY(-50%);
        height: 70%;
        width: 2px;
        background-color: var(--border);
        border-radius: 2px;
    }

    /* Search */
    .search-container {
        position: relative;
    }

    .search-dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        width: 300px;
        background-color: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 0.5rem;
        padding: 0.5rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 100;
    }

    .search-input {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--bg-primary);
        border: 1px solid var(--border);
        border-radius: 0.375rem;
        color: var(--text-primary);
        font-size: 0.875rem;
        outline: none;
        transition: var(--transition);
    }

    .search-input:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Hero */
    .hero {
        padding: 3rem 0;
    }

    .title-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 2rem 0;
    }

    .main-title {
        position: relative;
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        line-height: 1.2;
        padding-left: 1.5rem;
        color: var(--text-primary);
    }

    .main-title::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 6px;
        background: linear-gradient(180deg, var(--accent), #8b5cf6);
        border-radius: 3px;
    }

    .subtitle {
        font-size: 1.125rem;
        color: var(--text-secondary);
        padding-left: 1.5rem;
    }

    /* Content */
    .content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem 0;
    }

    .paso-card {
        background-color: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 0.75rem;
        padding: 2rem;
        transition: var(--transition);
    }

    .paso-card:hover {
        border-color: var(--accent);
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
        transform: translateY(-2px);
    }

    .paso-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .paso-title a {
        color: var(--text-primary);
        text-decoration: none;
        transition: var(--transition);
    }

    .paso-title a:hover {
        color: var(--accent);
    }

    .paso-content {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--text-secondary);
    }

    /* Responsive */
    @media (max-width: 768px) {
        main {
            width: 95%;
        }

        .navbar {
            flex-direction: column;
            gap: 1rem;
        }

        .search-dropdown {
            width: 250px;
        }

        .main-title {
            font-size: 1.75rem;
        }
    }
</style>
