<script lang="ts">
    let title = "Login";
    let email: string = "";
    let password: string = "";
    let rememberMe: boolean = false;
    let isLoading: boolean = false;
    let errorMessage: string = "";
    let showPassword: boolean = false;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        errorMessage = "";

        // Validación básica
        if (!email || !password) {
            errorMessage = "Por favor completa todos los campos";
            return;
        }

        if (!email.includes("@")) {
            errorMessage = "Email inválido";
            return;
        }

        isLoading = true;

        try {
            // Aquí irá tu lógica de autenticación
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json();
            // Redirigir o guardar token
            console.log("Login exitoso", data);
        } catch (error) {
            errorMessage =
                error instanceof Error
                    ? error.message
                    : "Error al iniciar sesión";
        } finally {
            isLoading = false;
        }
    };

    const togglePassword = () => {
        showPassword = !showPassword;
    };
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>
<main>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h1>Bienvenido</h1>
                <p>Inicia sesión para continuar</p>
            </div>

            <form on:submit={handleSubmit}>
                {#if errorMessage}
                    <div class="error-message">
                        <i class="fa-solid fa-triangle-exclamation"></i>
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

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <div class="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            bind:value={password}
                            placeholder="••••••••"
                            disabled={isLoading}
                            autocomplete="current-password"
                        />
                        <button
                            type="button"
                            class="toggle-password"
                            on:click={togglePassword}
                            aria-label={showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"}
                        >
                            <i
                                class={showPassword
                                    ? "fa-solid fa-eye-slash"
                                    : "fa-solid fa-eye"}
                            ></i>
                        </button>
                    </div>
                </div>

                <div class="form-options">
                    <label class="checkbox-label">
                        <input
                            type="checkbox"
                            bind:checked={rememberMe}
                            disabled={isLoading}
                        />
                        <span>Recordarme</span>
                    </label>
                    <a href="/login/recovery" class="forgot-link">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>

                <button type="submit" class="btn-submit" disabled={isLoading}>
                    {#if isLoading}
                        <span class="spinner"></span>
                        Iniciando sesión...
                    {:else}
                        Iniciar Sesión
                    {/if}
                </button>
            </form>

            <div class="divider">
                <span>o</span>
            </div>

            <div class="social-login">
                <button class="btn-social google">
                    <i class="fa-brands fa-google"></i>
                    Continuar con Google
                </button>
                <button class="btn-social github">
                    <i class="fa-brands fa-github"></i>
                    Continuar con GitHub
                </button>
            </div>

            <div class="signup-link">
                <p>
                    ¿No tienes cuenta? <a href="/login/register"
                        >Regístrate aquí</a
                    >
                </p>
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

    .login-container {
        width: 100%;
        max-width: 440px;
    }

    .login-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 2.5rem;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .login-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .login-header h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--accent), #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .login-header p {
        color: var(--text-secondary);
        font-size: 0.95rem;
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

    input[type="email"],
    input[type="password"],
    input[type="text"] {
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

    .password-input {
        position: relative;
    }

    .password-input input {
        padding-right: 3rem;
    }

    .toggle-password {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0.25rem;
        opacity: 0.6;
        transition: var(--transition);
    }

    .toggle-password:hover {
        opacity: 1;
    }

    .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
        width: auto;
        cursor: pointer;
    }

    .forgot-link {
        color: var(--accent);
        text-decoration: none;
        transition: var(--transition);
    }

    .forgot-link:hover {
        text-decoration: underline;
    }

    .btn-submit {
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

    .btn-submit:hover:not(:disabled) {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .btn-submit:disabled {
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

    .divider {
        position: relative;
        text-align: center;
        margin: 2rem 0;
    }

    .divider::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--border);
    }

    .divider span {
        position: relative;
        background: var(--bg-secondary);
        padding: 0 1rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .social-login {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }

    .btn-social {
        width: 100%;
        padding: 0.875rem;
        border: 1px solid var(--border);
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-family: "Lexend", sans-serif;
        color: var(--text-primary);
    }

    .btn-social:hover {
        border-color: var(--accent);
        background: var(--bg-primary);
    }

    .signup-link {
        text-align: center;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border);
    }

    .signup-link p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .signup-link a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 600;
        transition: var(--transition);
    }

    .signup-link a:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        .login-card {
            padding: 2rem 1.5rem;
        }

        .login-header h1 {
            font-size: 1.75rem;
        }

        .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }
    }
</style>
