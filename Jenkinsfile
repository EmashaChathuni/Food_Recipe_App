pipeline {
    agent any

    environment {
        DOCKERHUB_NAMESPACE = 'emashachathuni'
        BACKEND_IMAGE_NAME = 'island-table-backend'
        FRONTEND_IMAGE_NAME = 'island-table-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIAL_ID = 'dockerhub-pipeline'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                script {
                    if (isUnix()) {
                        sh '''
                            echo "Current directory: $(pwd)"
                            echo "Files in workspace:"
                            ls -la
                            echo "Frontend directory:"
                            ls -la frontend/ || echo "Frontend directory not found!"
                            echo "Backend directory:"
                            ls -la backend/ || echo "Backend directory not found!"
                        '''
                    } else {
                        bat '''
                            echo Current directory: %CD%
                            dir
                        '''
                    }
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                echo 'Building backend Docker image...'
                script {
                    if (isUnix()) {
                        sh """
                            cd backend
                            docker build --no-cache -t ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest .
                        """
                    } else {
                        bat """
                            cd backend
                            docker build --no-cache -t ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest .
                        """
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                script {
                    if (isUnix()) {
                        sh """
                            cd frontend
                            docker build --no-cache -t ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest .
                        """
                    } else {
                        bat """
                            cd frontend
                            docker build --no-cache -t ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest .
                        """
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing images to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIAL_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    script {
                        if (isUnix()) {
                            sh '''
                                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                                
                                echo "Pushing backend images..."
                                docker push ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}
                                docker push ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest
                                
                                echo "Pushing frontend images..."
                                docker push ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}
                                docker push ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest
                                
                                docker logout
                            '''
                        } else {
                            bat """
                                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                                
                                echo Pushing backend images...
                                docker push ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}
                                docker push ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest
                                
                                echo Pushing frontend images...
                                docker push ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}
                                docker push ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest
                                
                                docker logout
                            """
                        }
                    }
                }
            }
        }

        stage('Cleanup Docker') {
            steps {
                echo 'Cleaning up old images...'
                script {
                    if (isUnix()) {
                        sh '''
                            docker image prune -f || true
                            docker system prune -f || true
                        '''
                    } else {
                        bat '''
                            docker image prune -f
                            docker system prune -f
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'SUCCESS: Application built and pushed successfully!'
            echo "Backend Image: ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}"
            echo "Frontend Image: ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}"
            echo "Docker Hub: https://hub.docker.com/u/${DOCKERHUB_NAMESPACE}"
        }
        failure {
            echo 'FAILED: Build failed. Check logs above for details.'
        }
    }
}

        stage('Terraform Init') {
            steps {
                echo 'Initializing Terraform...'
                dir('aws') {
                    sh '''
                        terraform init -upgrade
                    '''
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                echo 'Planning infrastructure changes...'
                dir('aws') {
                    sh '''
                        terraform plan \
                          -var="ssh_key_name=${SSH_KEY_NAME}" \
                          -out=tfplan
                    '''
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                echo 'Applying infrastructure changes...'
                input message: 'Deploy to AWS?', ok: 'Deploy'
                dir('aws') {
                    sh '''
                        terraform apply -auto-approve tfplan
                        terraform output -json > ../terraform-outputs.json
                    '''
                }
            }
        }

        stage('Configure EC2 & Deploy') {
            steps {
                echo 'Deploying application to EC2...'
                script {
                    def tfOutputs = readJSON file: 'terraform-outputs.json'
                    def ec2Ip = tfOutputs.public_ip.value
                    
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${ec2Ip} '
                            # Install Docker if not present
                            if ! command -v docker &> /dev/null; then
                                curl -fsSL https://get.docker.com -o get-docker.sh
                                sudo sh get-docker.sh
                                sudo usermod -aG docker ubuntu
                                sudo systemctl start docker
                                sudo systemctl enable docker
                            fi
                            
                            # Install Docker Compose if not present
                            if ! command -v docker-compose &> /dev/null; then
                                sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
                                sudo chmod +x /usr/local/bin/docker-compose
                            fi
                            
                            # Create app directory
                            mkdir -p ~/food-recipe-app
                            cd ~/food-recipe-app
                            
                            # Create docker-compose file
                            cat > docker-compose.yml << EOF
services:
  backend:
    image: ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}
    container_name: island-table-backend
    ports:
      - "5001:5000"
    environment:
      - PORT=5000
      - JWT_SECRET=\${JWT_SECRET:-production-secret-change-me}
      - NODE_ENV=production
    volumes:
      - backend-data:/app/data
    restart: unless-stopped

  frontend:
    image: ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}
    container_name: island-table-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  backend-data:
    driver: local
EOF
                            
                            # Pull and run containers
                            docker-compose pull
                            docker-compose up -d
                            
                            echo "✅ Application deployed successfully!"
                            docker-compose ps
                        '
                    """
                    
                    echo "Application URL: http://${ec2Ip}"
                    echo "Backend API: http://${ec2Ip}:5001"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'SUCCESS: Application deployed successfully!'
            echo "Backend Image: ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}"
            echo "Frontend Image: ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo 'FAILED: Deployment failed. Check logs above for details.'
        }
    }
}
