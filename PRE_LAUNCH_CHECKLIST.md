# Pre-Launch Checklist and Remaining Tasks (as of February 5, 2026)

This document outlines the remaining tasks and issues that need to be addressed before making this website live and hosting it. This information is intended for any LLM picking up this project.

## Resolved Critical Issues and Current Status:

*   **Prettier Not Found Warning:** Resolved. Prettier has been installed as a dev dependency, and an empty `.prettierrc.js` file has been created. The warning should no longer appear.
*   **MultiSceneVideo Schema/Preset Issues:** Resolved for core functionality. The "scenes: Required" validation error is gone due to improved default props and schema handling. The `isActive` functionality works. The `presetName` within individual scenes now loads correctly.
    *   **Note:** The `MultiSceneVideo` composition has been temporarily commented out in `src/Root.tsx` by user request to simplify the project focus.
*   **ThreePhones Image Loading Errors:** Resolved. Image paths have been corrected, and the composition loads images correctly.
    *   **Note:** The `ThreePhones` composition has been temporarily commented out in `src/Root.tsx` by user request to simplify the project focus.
*   **Server `lowdb` `TypeError` and Intermittent Unresponsiveness:** Resolved. The `lowdb` initialization and login route logic have been fixed, ensuring stable and correct server responses for authentication.

## Remaining Tasks for Live Hosting:

### 1. Multi-Scene Compositions Feature Completion

*   **Current Status:** The core `MultiSceneVideo` component and its `multiSceneSchema` are implemented, allowing for multiple `DemoVideo` scenes. The `isActive` property is present for toggling scene visibility. The `presetName` in `demoVideoSchema` is optional, and `MultiSceneVideo.tsx` provides a hardcoded fallback default scene. The `durationInFrames` for `MultiSceneVideo` is now dynamically calculated based on the sum of active scene durations. The current method of editing scenes in the JSON editor is acceptable for now.
*   **To Do:** (Development on advanced UI for scene management is currently paused by user request).

### 2. Server Connectivity and Stability

*   **Current Status:** The Express.js server (in `server/server.mjs`) is now accessible from the client (your machine), successfully receiving requests. The primary issue of initial server connectivity is resolved. The intermittent unresponsiveness issue that was observed during earlier `curl` tests appears to be resolved, as recent `curl` commands have been consistently successful.
*   **To Do:**
    *   **Error Handling and Logging:** Enhance server-side error handling and logging for production.

### 3. Authentication System

*   **Current Status:** Basic authentication (registration/login) logic using `lowdb` has been re-implemented in `server/server.mjs`. The API now correctly expects `email` and `password` for authentication requests. Password hashing using `bcryptjs` has been implemented for secure storage and comparison. Basic JWT authentication middleware has been implemented to protect routes. A protected example route (`/api/protected`) is available.
*   **To Do:**
    *   **Client-Side Authentication Integration:** *Note: Remotion Studio is not designed for direct UI customization or embedding.* To implement client-side authentication, a *separate frontend application* (e.g., a simple React/HTML/JS app served by Express) is required to handle user registration, login, and session management (storing/sending JWT).
    *   **Protect API Endpoints:** Ensure that only authenticated users can access sensitive API endpoints (e.g., saving/loading video schemas, media uploads) within the separate frontend application.

### 4. Database Integration for Video Schemas and Media Storage

*   **Current Status:** The intention is to save and load video schemas and potentially small media files. `lowdb` is currently used for a simple file-based database for user data but is likely insufficient for production for video schemas and media.
*   **To Do:**
    *   **Choose a Production-Ready Database:** For hosting on Railway and handling schema and media data, consider:
        *   **PostgreSQL/MongoDB:** For structured/unstructured data for schemas.
        *   **Object Storage (e.g., S3-compatible, Railway's built-in storage):** For media files (images, short videos).
    *   **Implement Database Schema and ORM/ODM:** Define the database schema for storing Remotion video configurations. Choose an appropriate ORM/ODM (e.g., Prisma, Mongoose) for interaction.
    *   **API Endpoints for Schema CRUD:** Create API endpoints for:
        *   Creating new video schemas.
        *   Reading (listing, single) video schemas.
        *   Updating existing video schemas.
        *   Deleting video schemas.
    *   **API Endpoints for Media Upload/Download:** Securely handle:
        *   Uploading small images/videos.
        *   Serving stored media.
    *   **Integrate with Remotion Studio:** Modify the Studio's sidebar to:
        *   Load available video schemas from the database.
        *   Save the current Studio state (props) as a new or updated schema in the database.
        *   Allow users to select/upload media files to be used in compositions.

### 5. Deployment to Railway

*   **Current Status:** Not yet started.
*   **To Do:**
    *   **Containerization (Dockerfile):** Create a `Dockerfile` to package the Express server and possibly the Remotion rendering environment.
    *   **Railway Configuration:** Configure `railway.json` (or equivalent) for deployment, including environment variables for database connections, authentication secrets, etc.
    *   **CI/CD Pipeline (Optional but Recommended):** Set up automated deployment on push to a Git repository.

### 6. Codebase Clean-up and Best Practices

*   **Current Status:** Several attempts were made to set up ESLint for code quality, but this was reverted.
*   **To Do:**
    *   **Re-establish Linting and Code Formatting:** Implement ESLint (preferably using the new flat config system) and Prettier to maintain code quality and consistency. Address any specific ESLint errors/warnings that arise.
    *   **TypeScript Strictness:** Ensure `tsconfig.json` is configured for optimal TypeScript strictness to catch potential errors early.
    *   **Security Best Practices:** Review server-side code for common vulnerabilities (e.g., input validation, secure password storage - hashing, not plain text).
    *   **Error Handling:** Implement robust error handling on both client and server.
    *   **Testing:** Add unit and integration tests for server-side logic and complex React components.