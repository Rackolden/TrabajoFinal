<script lang="ts">
    let title = "Documentación";
    interface Recurso {
        nombre: string;
        categoria: string;
        descripcion: string;
        icon: string;
    }

    const recursos: Recurso[] = [
        {
            nombre: "Svelte",
            categoria: "Frontend",
            descripcion:
                "Framework reactivo para construir interfaces de usuario rápidas y eficientes.",
            icon: "🔥",
        },
        {
            nombre: "TypeScript",
            categoria: "Lenguaje",
            descripcion:
                "Superset de JavaScript con tipado estático para código más robusto.",
            icon: "📘",
        },
        {
            nombre: "Node.js",
            categoria: "Backend",
            descripcion:
                "Entorno de ejecución para JavaScript del lado del servidor.",
            icon: "🟢",
        },
        {
            nombre: "pnpm",
            categoria: "Herramientas",
            descripcion:
                "Gestor de paquetes rápido y eficiente en espacio de disco.",
            icon: "📦",
        },
        {
            nombre: "SQL",
            categoria: "Base de Datos",
            descripcion:
                "Lenguaje para gestión y consulta de bases de datos relacionales.",
            icon: "🗄️",
        },
        {
            nombre: "AWS",
            categoria: "Cloud",
            descripcion:
                "Plataforma de servicios en la nube para hosting y escalabilidad.",
            icon: "☁️",
        },
    ];

    const categorias = [...new Set(recursos.map((r) => r.categoria))];
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<main>
    <div class="container">
        <header>
            <h1>Documentación del Proyecto</h1>
            <p class="subtitle">Stack tecnológico y recursos utilizados</p>
        </header>

        <section class="recursos-grid">
            {#each categorias as categoria}
                <div class="categoria-section">
                    <h2 class="categoria-titulo">{categoria}</h2>
                    <div class="cards">
                        {#each recursos.filter((r) => r.categoria === categoria) as recurso}
                            <div class="card">
                                <div class="card-header">
                                    <span class="icon">{recurso.icon}</span>
                                    <h3>{recurso.nombre}</h3>
                                </div>
                                <p class="descripcion">{recurso.descripcion}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </section>

        <section class="adicional">
            <h2>Recursos Adicionales</h2>
            <div class="links">
                <a
                    href="https://svelte.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Documentación Svelte
                </a>
                <a
                    href="https://nodejs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Documentación Node.js
                </a>
                <a
                    href="https://aws.amazon.com/documentation"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    AWS Docs
                </a>
            </div>
        </section>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        padding: 2rem 1rem;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    header {
        text-align: center;
        margin-bottom: 4rem;
        padding-top: 2rem;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, var(--accent), #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .subtitle {
        font-size: 1.2rem;
        color: var(--text-secondary);
    }

    .categoria-section {
        margin-bottom: 3rem;
    }

    .categoria-titulo {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: var(--accent);
        border-bottom: 2px solid var(--border);
        padding-bottom: 0.5rem;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .card {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        transition: var(--transition);
        cursor: pointer;
    }

    .card:hover {
        transform: translateY(-4px);
        border-color: var(--accent);
        box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .icon {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .descripcion {
        color: var(--text-secondary);
        line-height: 1.6;
        font-size: 0.95rem;
    }

    .adicional {
        margin-top: 4rem;
        padding: 2rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 12px;
    }

    .adicional h2 {
        margin-bottom: 1.5rem;
        color: var(--accent);
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .links a {
        padding: 0.75rem 1.5rem;
        background: var(--bg-primary);
        border: 1px solid var(--border);
        border-radius: 8px;
        text-decoration: none;
        color: var(--text-primary);
        transition: var(--transition);
        font-family: "Lexend", sans-serif;
    }

    .links a:hover {
        border-color: var(--accent);
        background: var(--accent);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2rem;
        }

        .cards {
            grid-template-columns: 1fr;
        }

        .adicional {
            padding: 1.5rem;
        }
    }
</style>
