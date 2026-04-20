# Time Learning App

En rolig och interaktiv app för att lära barn förstå tid och läsa klockan.

## Utveckling

### Förutsättningar
- Node.js 18+
- npm eller yarn

### Lokal utveckling med Docker

1. **Bygg och starta alla tjänster:**
   ```bash
   docker-compose up --build
   ```

2. **Kör i bakgrunden:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stoppa tjänster:**
   ```bash
   docker-compose down
   ```

### Lokal utveckling utan Docker

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
npm install
npm start
```

## Testning

### Unit- och integrationstester
```bash
cd frontend
npm run test              # Kör alla tester
npm run test:watch        # Kör tester i watch-läge
npm run test:coverage     # Kör tester med coverage
```

### E2E-tester
```bash
cd frontend
npm run test:e2e          # Kör E2E-tester
npm run test:e2e:ui        # Kör E2E-tester med UI
npm run test:e2e:debug      # Debug E2E-tester
```

## Kodkvalitet

Projektet använder följande verktyg för kodkvalitet:

- **Husky** för pre-commit hooks
- **ESLint** för kodlintning
- **Commitlint** för konventionella commits
- **Lint-staged** för att köra lint på ändrade filer

### Pre-commit hooks
Följande kontroller körs automatiskt vid varje commit:

1. **Lint-staged** - Kör ESLint på ändrade filer
2. **Tester** - Kör alla enhets- och integrationstester
3. **Commitlint** - Validerar commit-meddelandet

### Commit-konventioner
Använd [conventional commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(clock): add analog clock component
fix(navigation): resolve routing issue
docs(readme): update installation guide
test(progress): add unit tests for useProgress hook
```

**Typer:**
- `feat` - Ny funktionalitet
- `fix` - Bugfixar
- `docs` - Dokumentation
- `style` - Kodformatering (inga funktionsändringar)
- `refactor` - Kodrefaktorering
- `test` - Tester
- `chore` - Underhåll (beroenden, build-processer etc.)

## Projektstruktur

```
time-learning-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/     # Återanvändbara komponenter
│   │   ├── pages/         # Sidor
│   │   ├── hooks/         # Custom hooks
│   │   ├── tests/         # Tester
│   │   └── mocks/         # Mock-data för tester
│   ├── public/
│   └── package.json
├── backend/                  # Node.js backend
│   ├── src/
│   └── package.json
├── docker-compose.yml         # Docker-konfiguration
├── .dockerignore
└── README.md
```

## Tillgängliga skript

### Frontend
- `npm run dev` - Starta utvecklingsserver
- `npm run build` - Bygg för produktion
- `npm run preview` - Förhandsgranska produktion build
- `npm run test` - Kör tester
- `npm run lint` - Kör ESLint

### Backend
- `npm start` - Starta server
- `npm test` - Kör tester

## Teknologier

### Frontend
- React 18 med TypeScript
- Vite för build-tool
- TailwindCSS för styling
- Framer Motion för animationer
- React Router för routing
- Jest + React Testing Library för tester
- Playwright för E2E-tester

### Backend
- Node.js med TypeScript
- Express.js
- SQLite för databas
- CORS för API-access

## API

Backend körs på `http://localhost:3001` och erbjuder följande endpoints:

- `GET /api/health` - Hälsokontroll
- `GET /api/users/:userId/progress` - Hämta användarprogress
- `PUT /api/users/:userId/progress` - Uppdatera progress
- `GET /api/exercises` - Hämta övningar
- `POST /api/users` - Skapa användare
- `GET /api/users/:userId/stats` - Hämta statistik

## Licens

MIT
