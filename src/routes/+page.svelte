<script>
    let title = "TF DE ARQUI PARA SONSOS (osea yo :,)";
    let subtitle = "Bitácora y documentación del proyecto";
    let paso1 = ` <a href="/paso1" data-sveltekit-preload-data="hover">Paso 1:</a> Para la parte visual de la página (frontend como le dicen los chavos) puedes ecoger entre hace las cosas a la antigua con html, css y js puros o usar un framework como react, angular, vue, etc... Por último si ya eres muy vago la mejor opción sería usar una plataforma como Wordprezzz.`;
</script>

<main>
    <header>
        <nav class="hero">
            <h1 class="title">{title}</h1>
            <a href="/docs">Documentación que me ayudó</a>
        </nav>
    </header>
    <p>
        {@html paso1}
    </p>
    <p></p>
</main>

<style>
    main :global(*) {
        color: black;
    }
    h1 {
        font-family: "Lexend Deca", sans-serif;
    }

    p {
        font-family: "Lexend", sans-serif;
    }
    .hero {
        background-image: url("/home/img1.png");
        min-height: 50vh;
    }
    .title {
        background: none;
    }
</style>
