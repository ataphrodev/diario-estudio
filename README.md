
# 📖 Diario de Estudio / Study Journal

<p align="center">
  <a href="#-diario-de-estudio-español"><b>🇪🇸 Versión en Español</b></a> | 
  <a href="#-study-journal-english"><b>🇬🇧 English Version</b></a>
</p>

<p align="center">
  <b>Built with AI using Antigravity IDE & Gemini 3.8 Flash</b>
</p>

---

## 🇪🇸 Diario de Estudio (Español)

> Un diario de estudio personal, minimalista y sin dependencias externas para controlar tus horas de estudio, registrar los temas aprendidos y mantener la constancia diaria.

Inspirado en la estética limpia y productiva de **Notion (tema oscuro)**, construido enteramente con **HTML5, CSS3 y JavaScript puro (Vanilla JS)** siguiendo los principios de **Clean Architecture**.

> [!NOTE]
> **Desarrollado con Inteligencia Artificial:** Este proyecto ha sido desarrollado en colaboración con Inteligencia Artificial utilizando **Antigravity IDE** como entorno de desarrollo y el modelo **Gemini 3.8 Flash**.

---


### ✨ Características Principales


* **📝 Registro detallado de sesiones:** Registra fecha, asignatura o tema, duración en minutos, notas o conceptos aprendidos y valoración de 1 a 5 estrellas.
* **⭐ Selector de estrellas interactivo:** Componente visual reactivo con estados de previsualización al pasar el cursor y selección persistente.
* **⚡ Historial y gestión completa (CRUD):** Visualiza todas tus sesiones ordenadas cronológicamente, edítalas en cualquier momento o elimínalas con confirmación segura.
* **🔒 Seguridad integrada (Anti-XSS):** Todo el contenido ingresado por el usuario es sanitizado mediante inserción segura en el DOM (`textContent` y `createElement`), neutralizando cualquier inyección maliciosa de HTML/JavaScript.
* **💾 Persistencia local sin servidor:** Tus datos se guardan de forma instantánea y privada en el `localStorage` de tu navegador, con control defensivo ante datos corruptos.
* **🚀 Cero dependencias:** No requiere Node.js, empaquetadores (Vite/Webpack), frameworks ni servidores locales. Funciona directamente abriendo `index.html`.

---


### 🏛️ Arquitectura del Proyecto (Clean Architecture)

El código está organizado siguiendo los principios de separación de responsabilidades y arquitectura limpia adaptada a Vanilla JavaScript:

```text
diario-estudio/
├── index.html                   # Punto de entrada y estructura semántica
├── README.md                    # Documentación bilingüe del proyecto
├── css/
│   ├── variables.css            # Tokens de diseño y paleta Notion Dark (#E5A93C)
│   ├── base.css                 # Reset, layout Grid en 2 columnas y tipografía
│   ├── components.css           # Componentes UI (tarjetas, botones, formulario, estrellas)
│   └── styles.css               # Hoja principal que consolida los módulos CSS
└── js/
    ├── domain/                  # CAPA DE DOMINIO (Lógica de negocio pura)
    │   ├── calculations.js      # Formateos de fecha, duración, estrellas y generador de IDs
    │   └── validators.js        # Validaciones puras de integridad de sesión
    ├── storage/                 # CAPA DE ALMACENAMIENTO (Repositorio / Infraestructura)
    │   └── storage.js           # Abstracción segura de localStorage con manejo defensivo
    ├── ui/                      # CAPA DE PRESENTACIÓN (Vistas y manipulación del DOM)
    │   ├── star-rating.js       # Componente interactivo de valoración
    │   └── session-renderer.js  # Renderizado seguro de tarjetas de sesión (anti-XSS)
    └── app.js                   # ORQUESTADOR / CONTROLLER (Gestión del estado y eventos)
```

#### Principios y Patrones Aplicados:

1. **Patrón Namespace (`window.StudyJournal`):** Evita la contaminación del ámbito global (`window`) agrupando los módulos en `domain`, `storage`, `ui` y `app`, permitiendo además la ejecución local directa mediante el protocolo `file:///` sin bloqueos de CORS.
2. **Aislamiento del Dominio:** `calculations.js` y `validators.js` contienen únicamente funciones puras y predecibles; no dependen del DOM ni del almacenamiento.
3. **Capa de Almacenamiento Desacoplada:** La interacción con `localStorage` está centralizada en `storage.js`. Si en el futuro se migra a IndexedDB o una API REST, solo se modifica esta capa.
4. **Capa de UI Segura:** `session-renderer.js` aísla la creación de nodos en memoria utilizando un `DocumentFragment` para optimizar el rendimiento y evitar redibujados innecesarios del navegador.

---


### 🎨 Diseño y UX


* **Tema oscuro Notion:** Fondo pizarra suave (`#18191A`), contenedores y tarjetas elevados (`#242526`), y bordes sutiles para evitar la fatiga visual.
* **Color de acento:** **Ámbar cálido dorado (`#E5A93C`)**, diseñado para evocar concentración, foco y subrayadores clásicos de estudio.
* **Layout escritorio:** Disposición en dos columnas:
  - **Columna izquierda:** Formulario de registro y paneles auxiliares.
  - **Columna derecha:** Listado cronológico de sesiones registradas.

---


### 🚀 Cómo Ejecutar la Aplicación

No necesitas instalar dependencias ni iniciar ningún servidor:

1. Clona o descarga este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd diario-estudio
   ```
2. Abre el archivo `index.html` en tu navegador preferido (**Google Chrome**, **Firefox**, **Edge**):
   * En Linux / Ubuntu:
     ```bash
     google-chrome index.html
     # o
     xdg-open index.html
     ```
   * O simplemente haciendo **doble clic** sobre `index.html` en tu explorador de archivos.

---


### 🗺️ Hoja de Ruta (Roadmap)

- [x] **Fase 1: Núcleo CRUD y Arquitectura Modular**
  - [x] Formulario con validación (fecha, tema, duración > 0, contenido, valoración).
  - [x] Selector interactivo de estrellas (1 a 5).
  - [x] Historial reactivo con edición y eliminación confirmada.
  - [x] Estructura Clean Architecture y estilos Notion Dark.
  - [x] Persistencia en `localStorage` y prevención XSS.
- [ ] **Fase 2: Panel de Constancia**
  - [ ] Algoritmo de cálculo de racha de días consecutivos (regla hoy / ayer).
  - [ ] Objetivo semanal de horas (editable) con barra de progreso interactiva.
  - [ ] Calendario del mes actual marcando los días con sesiones de estudio.
- [ ] **Fase 3: Respaldo y Portabilidad de Datos**
  - [ ] Exportación de datos a archivo `.json`.
  - [ ] Importación y restauración con validación previa de esquema.

---

---


## 🇬🇧 Study Journal (English)


> A personal, minimalist, zero-dependency study tracker to log study hours, keep track of topics learned, and maintain daily consistency.

Inspired by **Notion's clean dark aesthetic**, built purely with **HTML5, CSS3, and Vanilla JavaScript** following **Clean Architecture** principles.

> [!NOTE]
> **Built with Artificial Intelligence:** This project was developed in pair-programming collaboration with AI using the **Antigravity IDE** and the **Gemini 3.8 Flash** model.

---

### ✨ Key Features

- **📝 Detailed Session Logging:** Record date, subject/topic, duration in minutes, notes or learned concepts, and a 1 to 5-star rating.
- **⭐ Interactive Star Rating:** Reactive visual rating component with hover previews and persistent selection.
- **⚡ Complete History Management (CRUD):** View sessions sorted in reverse chronological order, edit any session on demand, or delete with confirmation.
- **🔒 Built-in Security (Anti-XSS):** All user-provided inputs are securely injected into the DOM via `textContent` and `createElement`, neutralizing any malicious HTML/JavaScript injection.
- **💾 Serverless Local Persistence:** Data is stored instantly and privately in browser `localStorage`, with defensive error handling for corrupted data.
- **🚀 Zero Dependencies:** No Node.js, bundlers (Vite/Webpack), external frameworks, or local servers needed. Works by opening `index.html` directly.

---

### 🏛️ Project Architecture (Clean Architecture)

The codebase is organized following Separation of Concerns and Clean Architecture tailored for Vanilla JavaScript:

```text
diario-estudio/
├── index.html                   # Entry point and semantic HTML structure
├── README.md                    # Bilingual project documentation
├── css/
│   ├── variables.css            # Design tokens and Notion Dark palette (#E5A93C)
│   ├── base.css                 # Reset, 2-column Grid layout, and global typography
│   ├── components.css           # UI Components (cards, buttons, form, stars)
│   └── styles.css               # Main stylesheet consolidating CSS modules
└── js/
    ├── domain/                  # DOMAIN LAYER (Pure business logic)
    │   ├── calculations.js      # Date & duration formatting, stars, ID generator
    │   └── validators.js        # Pure validation rules for study sessions
    ├── storage/                 # DATA / REPOSITORY LAYER (Infrastructure)
    │   └── storage.js           # Defensive localStorage wrapper
    ├── ui/                      # PRESENTATION / UI LAYER (DOM & Views)
    │   ├── star-rating.js       # Interactive rating component
    │   └── session-renderer.js  # Safe session card renderer (Anti-XSS)
    └── app.js                   # APPLICATION ORCHESTRATOR / CONTROLLER
```

#### Applied Principles & Patterns:

1. **Namespace Pattern (`window.StudyJournal`):** Avoids global scope pollution by namespacing into `domain`, `storage`, `ui`, and `app`, while enabling direct `file:///` execution without browser CORS restrictions.
2. **Domain Isolation:** `calculations.js` and `validators.js` contain pure, predictable functions without DOM or storage dependencies.
3. **Decoupled Storage Layer:** Local persistence is isolated in `storage.js`. Migrating to IndexedDB or a REST API requires modifying only this file.
4. **Safe UI Layer:** `session-renderer.js` isolates in-memory DOM creation using a `DocumentFragment` to prevent unnecessary browser reflows.

---

### 🎨 Design & UX

- **Notion Dark Theme:** Soft slate background (`#18191A`), elevated cards (`#242526`), and subtle borders to prevent eye strain.
- **Accent Color:** **Warm golden amber (`#E5A93C`)**, designed to evoke focus, concentration, and classic study highlighters.
- **Desktop Layout:** Two-column desktop experience:
  - **Left Column:** Session logging form and consistency panels.
  - **Right Column:** Historical list of logged study sessions.

---

### 🚀 Getting Started

No dependencies or servers are required:

1. Clone or download the repository:
   ```bash
   git clone <REPO_URL>
   cd diario-estudio
   ```
2. Open `index.html` in your favorite modern browser (**Google Chrome**, **Firefox**, **Edge**):
   - On Linux / Ubuntu:
     ```bash
     google-chrome index.html
     # or
     xdg-open index.html
     ```
   - Or simply **double-click** `index.html` in your file explorer.

---

### 🗺️ Roadmap

- [x] **Phase 1: CRUD Core & Modular Architecture**
  - [x] Validated form (date, subject, duration > 0, content, rating).
  - [x] Interactive 1-5 star selector.
  - [x] Reactive history list with edit and confirmed deletion.
  - [x] Clean Architecture structure & Notion Dark theme.
  - [x] `localStorage` persistence and XSS protection.
- [ ] **Phase 2: Consistency Panel**
  - [ ] Streak calculation algorithm (today/yesterday business rules).
  - [ ] Editable weekly study hours goal with interactive progress bar.
  - [ ] Current month calendar highlighting study days.
- [ ] **Phase 3: Data Backup & Portability**
  - [ ] Export data to `.json` file.
  - [ ] Import and restore data with schema validation.

---

## 📄 Licencia / License

Código abierto para fines educativos y personales / Open source for personal and educational purposes.
