# i18n JSON Viewer
> A helper tool to consistently manage i18n JSON files with a UI

## Setup

Make sure to install dependencies:

```bash
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Production

Build the application for production:

```bash
# bun
bun run build
```

Locally preview production build:

```bash
# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Example docker-compose.yml
```yaml
name: i18n-ui

services:
  i18n-ui:
    build: flowa.me/i18n-ui
    ports:
      - '3000:3000'
    # mount i18n folder to service
    volumes:
      - ./path/to/i18nFolder:/data
```
