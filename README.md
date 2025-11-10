# Food Recipe App

This repository contains a React frontend and a Node/Express backend that uses MongoDB for persistence.  
The instructions below walk you through running the stack locally, and then configuring a Jenkins pipeline that builds Docker images and pushes them to Docker Hub.

---

## 1. Run the application locally (without Docker)

### Prerequisites
- Node.js 18+ and npm
- MongoDB installed locally (Compass is fine, but the `mongod` service must be running)
- Two terminal windows (one for the backend, one for the frontend)

### Steps
1. **Start MongoDB** (keep this running while you develop):
   ```powershell
   New-Item -ItemType Directory -Path 'C:\data\db' -Force
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath "C:\data\db"
   ```
   Replace `<version>` with the version installed on your machine. If `mongod` is already on your PATH you can just run `mongod --dbpath "C:\data\db"`.

2. **Backend**:
   ```powershell
   Set-Location -Path 'D:\food-recipe-app\backend'
   npm install
   npm run dev
   ```
   The server starts on http://localhost:5000 and connects to MongoDB using `backend/.env`.

3. **Frontend** (new terminal):
   ```powershell
   Set-Location -Path 'D:\food-recipe-app\frontend'
   npm install
   npm start
   ```
   The CRA dev server opens on http://localhost:3000 and proxies API calls to the backend via the configured environment variables.

4. **Verify**: sign up, log in, create recipes, and mark favourites to confirm the full stack works before introducing Docker or CI.

---

## 2. Jenkins pipeline to build & push Docker images

The repository root contains a `Jenkinsfile` that installs dependencies, builds Docker images for the backend and frontend, and pushes them to Docker Hub. Follow the steps below exactly to run it.

### 2.1 Prerequisites
1. Jenkins (2.440+ recommended) running on a machine that has Docker CLI access.
2. Jenkins agent user has permission to run Docker commands (`docker ps` succeeds without sudo).
3. Docker Hub account and access token (or password) that can push to the desired namespace.
4. This Git repository pushed to a remote Git host reachable by Jenkins (GitHub, GitLab, etc.).

### 2.2 Prepare Jenkins
1. Log into the Jenkins UI as an administrator.
2. Install plugins if missing:
   - **Pipeline** (already bundled in recent Jenkins versions)
   - **Credentials Binding** (for securely injecting credentials) 
3. Navigate to **Manage Jenkins → Tools** and ensure the Jenkins node has a JDK and npm. If Jenkins will use the system Node installation, nothing else is required.

### 2.3 Add Docker Hub credentials
1. Go to **Manage Jenkins → Credentials → (global)**.
2. Click **Add Credentials**.
3. Choose type **Username with password**.
4. Enter:
   - **ID**: `dockerhub-credentials` (must match the value used in the Jenkinsfile)
   - **Username**: your Docker Hub username
   - **Password**: Docker Hub password or Personal Access Token
5. Save the credential.

### 2.4 Create the pipeline job
1. Click **New Item**.
2. Enter a job name, e.g. `food-recipe-build`.
3. Select **Pipeline** and click **OK**.
4. In the **Build Triggers** section, optionally enable “GitHub hook trigger” if using webhooks.
5. In the **Pipeline** section:
   - Set **Definition** to **Pipeline script from SCM**.
   - Choose **Git** as the SCM.
   - Enter the repository URL and credentials (if private).
   - Ensure **Script Path** is exactly `Jenkinsfile`.
6. Save the job.

### 2.5 Pipeline parameters
When you run the job you will be prompted for:
- `DOCKERHUB_NAMESPACE`: Docker Hub username or organisation (e.g. `my-dockerhub-user`).
- `BACKEND_IMAGE_NAME`: (default `food-recipe-backend`).
- `FRONTEND_IMAGE_NAME`: (default `food-recipe-frontend`).
- `IMAGE_TAG` is automatically set inside the pipeline to the short Git commit (with a `latest` tag added as well).

### 2.6 First run checklist
1. In Jenkins, open the pipeline job and click **Build with Parameters**.
2. Enter your Docker Hub namespace (leave other fields default unless you prefer custom names).
3. Click **Build**.
4. Watch the console output. The stages executed are:
   - **Checkout**: clones the repository.
   - **Set image tag**: sets the Docker tag to the short Git commit or build number.
   - **Install backend dependencies** (`npm ci` in `backend`).
   - **Install frontend dependencies** (`npm ci` in `frontend`).
   - **Build backend Docker image** (`docker build` using `backend/Dockerfile`).
   - **Build frontend Docker image** (`docker build` using `frontend/Dockerfile`).
   - **Push images to Docker Hub** (logs in using the saved credential and pushes both `IMAGE_TAG` and `latest`).
5. Confirm the job ends with `Finished: SUCCESS`.
6. Visit Docker Hub and verify both repositories now have the new tags.

### 2.7 Troubleshooting tips
- **Docker build fails**: ensure the Jenkins agent has enough RAM/CPU and the Dockerfiles build locally.
- **`docker login` fails**: recheck the credential ID and that the password/token is correct. PATs must have write scope.
- **Permission denied on Docker**: add the Jenkins Unix user to the `docker` group or configure Docker-in-Docker.
- **Parameter missing**: if Jenkins doesn’t show parameters, make sure the job type is **Pipeline** and that you saved the job after the first build.

---

## 3. Pushing manually (optional sanity check)
If you prefer to test outside Jenkins:
```powershell
# Build images
Set-Location -Path 'D:\food-recipe-app'
docker build -t <namespace>/food-recipe-backend:local -f backend/Dockerfile backend
docker build -t <namespace>/food-recipe-frontend:local -f frontend/Dockerfile frontend

# Log in & push
docker login
docker push <namespace>/food-recipe-backend:local
docker push <namespace>/food-recipe-frontend:local
```

---

## 4. Next steps
- Once you are satisfied with local testing, say **“ok docker go”** to proceed with container orchestration, docker-compose enhancements, and Jenkins delivery stages.
- Add integration tests in future pipelines before the Docker build stages for better coverage.

Happy cooking 🚀
