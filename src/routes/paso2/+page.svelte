<script lang="ts">
    let title = "Formulario";
    import { onMount } from "svelte";

    interface FormData {
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    }

    interface FormErrors {
        name?: string;
        email?: string;
        phone?: string;
        subject?: string;
        message?: string;
    }

    let formData: FormData = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    };

    let errors: FormErrors = {};
    let isSubmitting = false;
    let submitSuccess = false;
    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    function validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone: string): boolean {
        const re = /^[\d\s\-\+\(\)]+$/;
        return phone.length >= 9 && re.test(phone);
    }

    function validateForm(): boolean {
        errors = {};

        if (!formData.name.trim()) {
            errors.name = "El nombre es requerido";
        } else if (formData.name.trim().length < 2) {
            errors.name = "El nombre debe tener al menos 2 caracteres";
        }

        if (!formData.email.trim()) {
            errors.email = "El email es requerido";
        } else if (!validateEmail(formData.email)) {
            errors.email = "Email inválido";
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            errors.phone = "Teléfono inválido";
        }

        if (!formData.subject.trim()) {
            errors.subject = "El asunto es requerido";
        }

        if (!formData.message.trim()) {
            errors.message = "El mensaje es requerido";
        } else if (formData.message.trim().length < 10) {
            errors.message = "El mensaje debe tener al menos 10 caracteres";
        }

        return Object.keys(errors).length === 0;
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        isSubmitting = true;

        // Simulación de envío
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Formulario enviado:", formData);

        submitSuccess = true;
        isSubmitting = false;

        // Reset form después de 3 segundos
        setTimeout(() => {
            formData = {
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            };
            submitSuccess = false;
        }, 3000);
    }

    function handleInput(field: keyof FormData) {
        if (errors[field]) {
            delete errors[field];
            errors = errors;
        }
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="container" class:mounted>
    <div class="form-wrapper">
        <div class="header">
            <h1>Contáctanos</h1>
            <p>Completa el formulario y nos pondremos en contacto contigo</p>
        </div>

        {#if submitSuccess}
            <div class="success-message">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>¡Mensaje enviado con éxito!</span>
            </div>
        {/if}

        <form on:submit={handleSubmit} novalidate>
            <div class="form-group">
                <label for="name">Nombre completo *</label>
                <input
                    id="name"
                    type="text"
                    bind:value={formData.name}
                    on:input={() => handleInput("name")}
                    class:error={errors.name}
                    placeholder="Juan Pérez"
                    disabled={isSubmitting}
                />
                {#if errors.name}
                    <span class="error-message">{errors.name}</span>
                {/if}
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={formData.email}
                        on:input={() => handleInput("email")}
                        class:error={errors.email}
                        placeholder="juan@ejemplo.com"
                        disabled={isSubmitting}
                    />
                    {#if errors.email}
                        <span class="error-message">{errors.email}</span>
                    {/if}
                </div>

                <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input
                        id="phone"
                        type="tel"
                        bind:value={formData.phone}
                        on:input={() => handleInput("phone")}
                        class:error={errors.phone}
                        placeholder="+51 999 999 999"
                        disabled={isSubmitting}
                    />
                    {#if errors.phone}
                        <span class="error-message">{errors.phone}</span>
                    {/if}
                </div>
            </div>

            <div class="form-group">
                <label for="subject">Asunto *</label>
                <input
                    id="subject"
                    type="text"
                    bind:value={formData.subject}
                    on:input={() => handleInput("subject")}
                    class:error={errors.subject}
                    placeholder="Consulta sobre servicios"
                    disabled={isSubmitting}
                />
                {#if errors.subject}
                    <span class="error-message">{errors.subject}</span>
                {/if}
            </div>

            <div class="form-group">
                <label for="message">Mensaje *</label>
                <textarea
                    id="message"
                    bind:value={formData.message}
                    on:input={() => handleInput("message")}
                    class:error={errors.message}
                    placeholder="Escribe tu mensaje aquí..."
                    rows="5"
                    disabled={isSubmitting}
                ></textarea>
                {#if errors.message}
                    <span class="error-message">{errors.message}</span>
                {/if}
            </div>

            <button type="submit" class="submit-btn" disabled={isSubmitting}>
                {#if isSubmitting}
                    <span class="spinner"></span>
                    Enviando...
                {:else}
                    Enviar mensaje
                {/if}
            </button>
        </form>
    </div>
</div>

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
        font-family:
            "Lexend",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
    }
    :global(h1, h2) {
        font-family: "Lexend", sans-serif;
    }

    .container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: linear-gradient(135deg, #0a0910 0%, #1a0a2e 100%);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .container.mounted {
        opacity: 1;
        transform: translateY(0);
    }

    .form-wrapper {
        background: rgba(20, 20, 30, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 3rem;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .header {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .header p {
        color: #a0a0a0;
        font-size: 1rem;
    }

    .success-message {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.3);
        border-radius: 12px;
        margin-bottom: 1.5rem;
        color: #22c55e;
        animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        font-size: 0.95rem;
        color: #e0e0e0;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.875rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        font-size: 1rem;
        color: #f8f9fa;
        transition: all 0.3s ease;
        font-family: inherit;
    }

    input:focus,
    textarea:focus {
        outline: none;
        border-color: #3b82f6;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input.error,
    textarea.error {
        border-color: #ef4444;
    }

    input:disabled,
    textarea:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }

    .error-message {
        display: block;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #ef4444;
    }

    .submit-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2rem;
    }

    .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
    }

    .submit-btn:active:not(:disabled) {
        transform: translateY(0);
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 640px) {
        .form-wrapper {
            padding: 2rem;
        }

        .header h1 {
            font-size: 2rem;
        }

        .form-row {
            grid-template-columns: 1fr;
            gap: 0;
        }
    }
</style>
