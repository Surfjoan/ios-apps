# Klockan - Lär dig läsa tid

En pedagogisk webbapp för barn som lär sig läsa klockan.

## Funktioner

- 🎓 **Lär-läge**: Steg-för-steg introduktion till klockan
- 📝 **Öva-läge**: Interaktiva övningar för olika tidsbegrepp
- 🎮 **Spela-läge**: Roliga spel för att befästa kunskapen
- 👨‍👩‍👧‍👦 **Föräldrapanel**: Följ barnets framsteg och anpassa inställningar

## Teknisk Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express + SQLite
- **Container**: Docker multi-stage build
- **Deployment**: Kubernetes + ArgoCD

## Projektstruktur

```
time-learning-app/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
├── backend/           # Node.js API
│   ├── src/
│   └── package.json
├── k8s/              # Kubernetes manifests
│   ├── deployment.yaml
│   └── argocd-application.yaml
├── Dockerfile
└── README.md
```

## Utveckling

### Lokal utveckling

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (i ny terminal)
cd backend
npm install
npm run dev
```

### Bygg Docker image

```bash
docker build -t ghcr.io/surfjoan/time-learning-app:latest .
docker push ghcr.io/surfjoan/time-learning-app:latest
```

### Deploy till Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s/deployment.yaml

# Eller via ArgoCD
kubectl apply -f k8s/argocd-application.yaml
```

## Deployment Checklista

- [ ] Skapa GitHub repository
- [ ] Konfigurera GitHub Container Registry
- [ ] Bygg och pusha Docker image
- [ ] Konfigurera Kubernetes cluster
- [ ] Installera cert-manager för SSL
- [ ] Konfigurera ArgoCD
- [ ] Apply ArgoCD application manifest
- [ ] Konfigurera DNS för klockan.surfjoan.dev
- [ ] Testa deployment

## Licens

MIT
