<script lang="ts">
    import { goto } from "$app/navigation";

    let nombre: string = "";
    let email: string = "";
    let password: string = "";
    let confirmPassword: string = "";
    let acceptTerms: boolean = false;
    let isLoading: boolean = false;
    let errorMessage: string = "";
    let showPassword: boolean = false;
    let showConfirmPassword: boolean = false;
    let passwordStrength: number = 0;

    // Validación de fortaleza de contraseña
    $: {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        passwordStrength = strength;
    }

    const getStrengthText = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength === 1) return "Débil";
        if (passwordStrength === 2) return "Regular";
        if (passwordStrength === 3) return "Buena";
        return "Fuerte";
    };

    const getStrengthColor = () => {
        if (passwordStrength === 1) return "#ef4444";
        if (passwordStrength === 2) return "#f59e0b";
        if (passwordStrength === 3) return "#3b82f6";
        return "#10b981";
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        errorMessage = "";

        // Validaciones
        if (!nombre || !email || !password || !confirmPassword) {
            errorMessage = "Por favor completa todos los campos";
            return;
        }

        if (!email.includes("@")) {
            errorMessage = "Email inválido";
            return;
        }

        if (password.length < 8) {
            errorMessage = "La contraseña debe tener al menos 8 caracteres";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage = "Las contraseñas no coinciden";
            return;
        }

        if (!acceptTerms) {
            errorMessage = "Debes aceptar los términos y condiciones";
            return;
        }

        isLoading = true;

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error al crear la cuenta");
            }

            const data = await response.json();
            console.log("Registro exitoso", data);
            // Redirigir al login o dashboard
            goto("/login/register/success");
        } catch (error) {
            errorMessage =
                error instanceof Error ? error.message : "Error al registrarse";
        } finally {
            isLoading = false;
        }
    };

    const togglePassword = () => {
        showPassword = !showPassword;
    };

    const toggleConfirmPassword = () => {
        showConfirmPassword = !showConfirmPassword;
    };
</script>

<main>
    <div class="register-container">
        <div class="register-card">
            <div class="register-header">
                <h1>Crear cuenta</h1>
                <p>Únete y comienza hoy mismo</p>
            </div>

            <form on:submit={handleSubmit}>
                {#if errorMessage}
                    <div class="error-message">
                        <span class="error-icon">⚠️</span>
                        {errorMessage}
                    </div>
                {/if}

                <div class="form-group">
                    <label for="nombre">Nombre completo</label>
                    <input
                        type="text"
                        id="nombre"
                        bind:value={nombre}
                        placeholder="Juan Pérez"
                        disabled={isLoading}
                        autocomplete="name"
                    />
                </div>

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
                            autocomplete="new-password"
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
                    {#if password.length > 0}
                        <div class="password-strength">
                            <div class="strength-bars">
                                {#each Array(4) as _, i}
                                    <div
                                        class="strength-bar"
                                        class:active={i < passwordStrength}
                                        style="background-color: {i <
                                        passwordStrength
                                            ? getStrengthColor()
                                            : 'var(--border)'}"
                                    ></div>
                                {/each}
                            </div>
                            <span
                                class="strength-text"
                                style="color: {getStrengthColor()}"
                            >
                                {getStrengthText()}
                            </span>
                        </div>
                    {/if}
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirmar contraseña</label>
                    <div class="password-input">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            bind:value={confirmPassword}
                            placeholder="••••••••"
                            disabled={isLoading}
                            autocomplete="new-password"
                        />
                        <button
                            type="button"
                            class="toggle-password"
                            on:click={toggleConfirmPassword}
                            aria-label={showConfirmPassword
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

                <div class="form-group">
                    <label class="checkbox-label">
                        <input
                            type="checkbox"
                            bind:checked={acceptTerms}
                            disabled={isLoading}
                        />
                        <span>
                            Acepto los <a href="/terminos" target="_blank"
                                >términos y condiciones</a
                            >
                            y la
                            <a href="/privacidad" target="_blank"
                                >política de privacidad</a
                            >
                        </span>
                    </label>
                </div>

                <button type="submit" class="btn-submit" disabled={isLoading}>
                    {#if isLoading}
                        <span class="spinner"></span>
                        Creando cuenta...
                    {:else}
                        Crear cuenta
                    {/if}
                </button>
            </form>

            <div class="divider">
                <span>o</span>
            </div>

            <div class="social-register">
                <button class="btn-social google">
                    <span class="social-icon">G</span>
                    Registrarse con Google
                </button>
                <button class="btn-social github">
                    <i class="fa-brands fa-github"></i>
                    Registrarse con GitHub
                </button>
            </div>

            <div class="login-link">
                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
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

    .register-container {
        width: 100%;
        max-width: 480px;
    }

    .register-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 2.5rem;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .register-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .register-header h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--accent), #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .register-header p {
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

    .password-strength {
        margin-top: 0.75rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .strength-bars {
        display: flex;
        gap: 0.25rem;
        flex: 1;
    }

    .strength-bar {
        height: 4px;
        flex: 1;
        border-radius: 2px;
        transition: var(--transition);
    }

    .strength-text {
        font-size: 0.85rem;
        font-weight: 600;
        min-width: 60px;
        text-align: right;
    }

    .checkbox-label {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1.5;
    }

    .checkbox-label input[type="checkbox"] {
        width: auto;
        cursor: pointer;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }

    .checkbox-label a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 500;
    }

    .checkbox-label a:hover {
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
        margin-top: 1.5rem;
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

    .social-register {
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

    .social-icon {
        font-size: 1.2rem;
        font-weight: bold;
    }

    .login-link {
        text-align: center;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border);
    }

    .login-link p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .login-link a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 600;
        transition: var(--transition);
    }

    .login-link a:hover {
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        .register-card {
            padding: 2rem 1.5rem;
        }

        .register-header h1 {
            font-size: 1.75rem;
        }

        .password-strength {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
        }

        .strength-text {
            text-align: left;
        }
    }
</style>
