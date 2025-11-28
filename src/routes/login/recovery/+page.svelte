<script lang="ts">
    let email: string = "";
    let isLoading: boolean = false;
    let errorMessage: string = "";
    let successMessage: string = "";
    let emailSent: boolean = false;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        errorMessage = "";
        successMessage = "";

        // Validación básica
        if (!email) {
            errorMessage = "Por favor ingresa tu email";
            return;
        }

        if (!email.includes("@")) {
            errorMessage = "Email inválido";
            return;
        }

        isLoading = true;

        try {
            // Aquí irá tu lógica para enviar email de recuperación
            const response = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("No se pudo enviar el email");
            }

            const data = await response.json();
            emailSent = true;
            successMessage =
                "Hemos enviado un enlace de recuperación a tu email";
            console.log("Email enviado", data);
        } catch (error) {
            errorMessage =
                error instanceof Error
                    ? error.message
                    : "Error al enviar el email";
        } finally {
            isLoading = false;
        }
    };

    const resendEmail = async () => {
        emailSent = false;
        successMessage = "";
        await handleSubmit(new Event("submit"));
    };
</script>

<main>
    <div class="forgot-container">
        <div class="forgot-card">
            {#if !emailSent}
                <div class="header">
                    <div class="icon-wrapper">
                        <span class="icon">🔐</span>
                    </div>
                    <h1>¿Olvidaste tu contraseña?</h1>
                    <p>
                        No te preocupes, te enviaremos instrucciones para
                        recuperarla
                    </p>
                </div>

                <form on:submit={handleSubmit}>
                    {#if errorMessage}
                        <div class="error-message">
                            <span class="error-icon">⚠️</span>
                            {errorMessage}
                        </div>
                    {/if}

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            bind:value={email}
                            placeholder="tu@email.com"
                            disabled={isLoading}
                            autocomplete="email"
                        />
                    </div>

                    <button
                        type="submit"
                        class="btn-submit"
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <span class="spinner"></span>
                            Enviando...
                        {:else}
                            Enviar enlace de recuperación
                        {/if}
                    </button>
                </form>
            {:else}
                <div class="success-container">
                    <div class="icon-wrapper success">
                        <span class="icon">✉️</span>
                    </div>
                    <h1>¡Email enviado!</h1>
                    <p class="success-text">
                        Hemos enviado un enlace de recuperación a <strong
                            >{email}</strong
                        >
                    </p>
                    <div class="instructions">
                        <p>
                            Por favor revisa tu bandeja de entrada y haz clic en
                            el enlace para restablecer tu contraseña.
                        </p>
                        <p class="note">
                            Si no ves el email, revisa tu carpeta de spam.
                        </p>
                    </div>

                    <button
                        on:click={resendEmail}
                        class="btn-resend"
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <span class="spinner"></span>
                            Reenviando...
                        {:else}
                            Reenviar email
                        {/if}
                    </button>
                </div>
            {/if}

            <div class="back-link">
                <a href="/login">
                    <span class="arrow">←</span>
                    Volver al inicio de sesión
                </a>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
    }

    .forgot-container {
        width: 100%;
        max-width: 480px;
    }

    .forgot-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 2.5rem;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .icon-wrapper {
        width: 80px;
        height: 80px;
        margin: 0 auto 1.5rem;
        background: linear-gradient(135deg, var(--accent), #8b5cf6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: float 3s ease-in-out infinite;
    }

    .icon-wrapper.success {
        background: linear-gradient(135deg, #10b981, #059669);
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    .icon {
        font-size: 2.5rem;
    }

    h1 {
        font-size: 1.75rem;
        margin-bottom: 0.75rem;
        color: var(--text-primary);
    }

    .header p {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }

    .error-icon {
        font-size: 1.2rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 0.9rem;
        color: var(--text-primary);
    }

    input[type="email"] {
        width: 100%;
        padding: 0.875rem 1rem;
        background: var(--bg-primary);
        border: 1px solid var(--border);
        border-radius: 8px;
        font-size: 0.95rem;
        color: var(--text-primary);
        transition: var(--transition);
        font-family: "Lexend", sans-serif;
    }

    input:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn-submit,
    .btn-resend {
        width: 100%;
        padding: 0.875rem;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-family: "Lexend", sans-serif;
    }

    .btn-submit:hover:not(:disabled),
    .btn-resend:hover:not(:disabled) {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .btn-submit:disabled,
    .btn-resend:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .success-container {
        text-align: center;
    }

    .success-text {
        color: var(--text-primary);
        margin: 1rem 0 1.5rem;
        font-size: 0.95rem;
    }

    .success-text strong {
        color: var(--accent);
        font-weight: 600;
    }

    .instructions {
        background: var(--bg-primary);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        text-align: left;
    }

    .instructions p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 0.75rem;
    }

    .instructions p:last-child {
        margin-bottom: 0;
    }

    .note {
        font-size: 0.85rem !important;
        font-style: italic;
        opacity: 0.8;
    }

    .btn-resend {
        margin-top: 1.5rem;
        background: var(--bg-primary);
        color: var(--text-primary);
        border: 1px solid var(--border);
    }

    .btn-resend:hover:not(:disabled) {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
    }

    .back-link {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border);
        text-align: center;
    }

    .back-link a {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        transition: var(--transition);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .back-link a:hover {
        color: var(--accent);
    }

    .arrow {
        transition: var(--transition);
        display: inline-block;
    }

    .back-link a:hover .arrow {
        transform: translateX(-4px);
    }

    @media (max-width: 480px) {
        .forgot-card {
            padding: 2rem 1.5rem;
        }

        h1 {
            font-size: 1.5rem;
        }

        .icon-wrapper {
            width: 70px;
            height: 70px;
        }

        .icon {
            font-size: 2rem;
        }
    }
</style>
