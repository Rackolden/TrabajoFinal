<script>
  let username = "";
  let password = "";
  let message = "";
  let loggedIn = false;

  function submit() {
    if (!username.trim()) {
      message = "Por favor ingresa un usuario.";
      return;
    }
    // login puramente ficticio (cliente)
    loggedIn = true;
    message = `Bienvenid@, ${username.trim()}`;
  }

  function logout() {
    loggedIn = false;
    username = "";
    password = "";
    message = "";
  }
</script>

<div id="rancio-wrap">
  <header class="topbar">
    <div class="brand"><a href="/">rancio-list</a></div>
    <nav class="menu">
      <a href="#">inicio</a>
      <a href="#">clasificados</a>
      <a href="#">foros</a>
      <a href="#">empleo</a>
      <a href="#">comprar/vender</a>
      <a href="#">publicar</a>
    </nav>
  </header>

  <main class="container">
    <section class="panel login-panel">
      <h2>iniciar sesión</h2>

      {#if loggedIn}
        <div class="welcome">{message}</div>
        <div class="actions">
          <button on:click={logout}>Cerrar sesión</button>
        </div>
      {:else}
        <form class="login" on:submit|preventDefault={submit}>
          <label class="field"
            >Usuario
            <input type="text" bind:value={username} placeholder="usuario" />
          </label>
          <label class="field"
            >Clave
            <input type="password" bind:value={password} placeholder="clave" />
          </label>
          <div class="actions">
            <button type="submit">Entrar</button>
            <button
              type="button"
              on:click={() => {
                username = "";
                password = "";
                message = "";
              }}>Limpiar</button
            >
          </div>
        </form>
      {/if}

      <p class="tiny">
        Login de muestra — sin imágenes, sin tracking. Solo HTML & CSS viejuno.
      </p>
    </section>

    <aside class="panel sidebar">
      <div class="box">
        <h3>publicar</h3>
        <ul>
          <li><a href="#">anuncios</a></li>
          <li><a href="#">trabajos</a></li>
          <li><a href="#">eventos</a></li>
          <li><a href="#">servicios</a></li>
        </ul>
      </div>

      <div class="box small">
        <h3>enlaces</h3>
        <ul>
          <li><a href="#">ayuda</a></li>
          <li><a href="#">privacidad</a></li>
          <li><a href="#">contacto</a></li>
        </ul>
      </div>
    </aside>
  </main>

  <footer class="footer">
    <div class="footer-top">
      <span>rancio-list</span>
      <span class="sep">|</span>
      <a href="#">about</a>
      <span class="sep">|</span>
      <a href="#">help</a>
      <span class="sep">|</span>
      <a href="#">post</a>
    </div>

    <div class="footer-cols">
      <div class="col">
        <h4>categorias</h4>
        <ul>
          <li><a href="#">personales</a></li>
          <li><a href="#">venta</a></li>
          <li><a href="#">hogar</a></li>
          <li><a href="#">servicios</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>ciudades</h4>
        <ul>
          <li><a href="#">Madrid</a></li>
          <li><a href="#">Barcelona</a></li>
          <li><a href="#">Valencia</a></li>
          <li><a href="#">Sevilla</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>otros</h4>
        <ul>
          <li><a href="#">anunciar</a></li>
          <li><a href="#">acerca de</a></li>
          <li><a href="#">rss</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <small>ubicación: España &nbsp;·&nbsp; idioma: español</small>
    </div>
  </footer>
</div>
