<script lang="ts">
    // No requiere lógica
</script>

<main class="success-container">
    <div class="success-card">
        <h1>Cuenta creada correctamente</h1>
        <p>Tu registro se completó con éxito.</p>

        <a href="/" class="btn-home">Volver al inicio</a>
    </div>
</main>

<style>
    .success-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 20px;
    }

    .success-card {
        text-align: center;
        padding: 30px;
        border: 1px solid var(--border);
        border-radius: 12px;
        max-width: 400px;
        width: 100%;
        background: var(--bg-secondary);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        transition: var(--transition);
    }

    h1 {
        font-size: 1.7rem;
        margin-bottom: 12px;
        color: var(--text-primary);
    }

    p {
        color: var(--text-secondary);
        margin-bottom: 25px;
        font-size: 1rem;
    }

    .btn-home {
        display: inline-block;
        padding: 12px 22px;
        background: var(--accent);
        color: var(--text-primary);
        border-radius: 8px;
        text-decoration: none;
        font-weight: 500;
        transition: var(--transition);
    }

    .btn-home:hover {
        opacity: 0.85;
        transform: translateY(-1px);
    }
</style>
