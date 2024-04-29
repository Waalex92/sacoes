# SACOES

SACOES is a Progressive Web Application (PWA) specifically designed for tailoring shops. It facilitates user and job management, allowing detailed tracking of products in the process of tailoring, such as coats, pants, shirts, and vests. With SACOES, you can easily visualize the status of garments at any time.

## Table of Contents

-   [Tecnologías Utilizadas](#tecnologías-utilizadas)
-   [Características Principales](#características-principales)
-   [Requisitos de Instalación](#requisitos-de-instalación)
-   [Instrucciones de Instalación](#instrucciones-de-instalación)
-   [Navegadores Compatibles](#navegadores-compatibles)
-   [Instrucciones de Uso](#instrucciones-de-uso)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Contribución](#contribución)

## Tecnologías Utilizadas

-   **Backend:** Laravel, Sanctum, Spatie Laravel Permission, Spatie Laravel Model States
-   **Frontend:** Next.js, NextUI, Framer Motion, NextAuth, Next PWA, React Icons
-   **Base de Datos:** MySQL
-   **Paleta de Colores:** Análoga

## Características Principales

-   **Autenticación de usuarios:** Performs user authentication handling 4 roles with their respective permissions to access the system.
-   **Gestión de usuarios (CRUD):** Performs creation, editing, deletion, and search of users according to the corresponding role.
-   **Gestión de trabajos (CRUD):** Performs creation, editing, and search of jobs, as well as details of garments.
-   **Seguimiento de trabajos:** Each detail of the products must have its corresponding status to be able to track each garment respectively.

## Requisitos de Instalación

Before proceeding with the installation, make sure you have the following programs installed:

-   Node.js (version 12 or higher)
    -   You can download Node.js from [here](https://nodejs.org)
-   NPM (included with Node.js)
    -   Package manager used to install project dependencies.

## Instrucciones de Instalación

1. Run `npm install`
   PWA Installation Instructions
1. Run `npm i next-pwa`
1. Configure `next.config.mjs` file
1. Ensure that the `manifest.js` file in the `public` folder is properly configured.
1. Add manifest metadata in the main layout `layout.tsx`.

## Navegadores Compatibles

This Application is compatible with the following web browsers:

-   Google Chrome
-   Mozilla Firefox
-   Microsoft Edge
-   Safari (MacOS)

## Instrucciones de Uso

1. Log in with your credentials.
1. Access the sections to Manage Users and Jobs.
1. Use the search to find specific information.
1. Update the status of jobs as the tailoring progresses.

## Estructura del Proyecto

Sacoes

-   ├── public
-   │ ├── ...
-   ├── src
-   │ ├── app
-   │ ├── components
-   │ ├── context
-   │ ├── icons
-   │ ├── types
-   │ ├── middleware.ts
-   │ └── package.json
-   └── README.md

-   **public:** Contains the public files of the application (images, manifest file).
-   **src:** Folder containing the necessary pages, components, and files of the application.
-   **app:** Contains configuration files for next-auth as well as the pages accessible.
-   **components:** Contains the application components.
-   **context:** Contains the file that wraps the application in the next auth session provider.
-   **icons:** Contains the file with the icons used in the application.
-   **types:** Contains the file containing the definition of the Session interface of next auth.
-   **Middleware.ts:** File used for route protection.

## Contribución

If you want to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a branch for your new feature: `git checkout -b my-new-feature`
3. Make the changes and commit descriptive commits: `git commit -m "Add my new feature"`
4. Push your changes to your remote repository: `git push origin my-new-feature`
5. Create a new Pull Request in this repository.
