# CI/CD Setup Guide

Denna guide förklarar hur du konfigurerar automatisk deployment med GitHub Actions.

## 🔧 Förutsättningar

- GitHub repository för projektet
- Tillgång till Kubernetes cluster
- ArgoCD installerat i clusteret

## 🔐 GitHub Secrets

Du behöver lägga till följande secrets i ditt GitHub repository:

### 1. GITHUB_TOKEN (automatisk)
Denna skapas automatiskt av GitHub Actions - behöver ingen konfiguration.

### 2. KUBECONFIG (manuell)
Base64-kodad kubeconfig fil för åtkomst till ditt Kubernetes cluster:

```bash
# Exportera din kubeconfig
cat ~/.kube/config | base64

# Kopiera output och lägg till som secret i GitHub:
# Settings → Secrets and variables → Actions → New repository secret
# Name: KUBECONFIG
# Value: <base64-output>
```

## 🚀 Hur det fungerar

### Automatisk flöde:

1. **Push till main branch** → Triggar CI/CD Pipeline
2. **Build job** → Bygger frontend och backend
3. **Docker job** → Bygger och pushar image till ghcr.io
4. **Deploy job** → Deployar till Kubernetes (endast på main)

### ArgoCD Sync:
- ArgoCD övervakar GitHub repot
- Vid ny commit syncar ArgoCD automatiskt
- Applikationen uppdateras med ny image

## 📊 Monitoring

### GitHub Actions flikar:
- **Actions** tab i GitHub visar alla runs
- Rött = fel, Grönt = success
- Klicka på ett run för detaljer

### Kubernetes status:
```bash
# Se pod status
kubectl get pods -n time-learning

# Se deployment status
kubectl get deployment -n time-learning

# Se ArgoCD status
kubectl get applications -n argocd
```

## 🔄 Manuelle deployments

Om du behöver deploya manuellt:

```bash
# Bygg och pusha image lokalt
docker build -t ghcr.io/surfjoan/time-learning-app:latest .
docker push ghcr.io/surfjoan/time-learning-app:latest

# Trigga ArgoCD sync
kubectl patch application time-learning-app -n argocd --type merge -p '{"operation": {"sync": {"revision": "HEAD"}}}'
```

## 🐛 Felsökning

### Problem: Image pull fails
**Orsak:** Kubernetes kan inte autentisera mot ghcr.io

**Lösning:** Skapa image pull secret:
```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=surfjoan \
  --docker-password=<GITHUB_TOKEN> \
  --docker-email=surfjoan@users.noreply.github.com \
  -n time-learning
```

Uppdatera deployment.yaml:
```yaml
spec:
  template:
    spec:
      imagePullSecrets:
      - name: ghcr-secret
```

### Problem: ArgoCD syncar inte
**Lösning:**
```bash
# Tvinga sync
kubectl patch application time-learning-app -n argocd --type merge -p '{"operation": {"sync": {"revision": "HEAD", "prune": true, "dryRun": false}}}'

# Eller via ArgoCD UI (port-forward)
kubectl port-forward svc/argocd-server -n argocd 8080:443
# Öppna https://localhost:8080
```

## 📈 Best Practices

1. **Använd branches:** 
   - `main` = produktion
   - `develop` = staging
   - Feature branches för utveckling

2. **Tagga releases:**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

3. **Skydda main branch:**
   - Kräv PR review
   - Kräv passing checks
   - Kräv signed commits

4. **Övervaka:**
   - Sätt upp alerts för failed builds
   - Övervaka Kubernetes resurser
   - Logga applikationsfel
