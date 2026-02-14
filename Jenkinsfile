pipeline {
    agent any

    environment {
        DOCKERHUB_NAMESPACE = 'emashachathuni'
        BACKEND_IMAGE_NAME = 'island-table-backend'
        FRONTEND_IMAGE_NAME = 'island-table-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIAL_ID = 'dockerhub-pipeline'
        EC2_CREDENTIAL_ID = 'ec2-ssh-key'
        EC2_HOST = '13.232.46.238'
        EC2_USER = 'ubuntu'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
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

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2 instance...'
                sshagent(credentials: ["${EC2_CREDENTIAL_ID}"]) {
                    script {
                        if (isUnix()) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                    # Login to Docker Hub
                                    echo "Logging into Docker Hub..."
                                    
                                    # Create network if it does not exist
                                    echo "Creating docker network..."
                                    docker network create food-recipe-network || true

                                    # Stop and remove existing containers
                                    echo "Stopping existing containers..."
                                    docker stop island-table-backend island-table-frontend || true
                                    docker rm island-table-backend island-table-frontend || true
                                    
                                    # Pull latest images
                                    echo "Pulling latest images..."
                                    docker pull ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest
                                    docker pull ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest
                                    
                                    # Run backend container
                                    echo "Starting backend container..."
                                    docker run -d \\
                                        --name island-table-backend \\
                                        --network food-recipe-network \\
                                        --restart unless-stopped \\
                                        -p 5000:5000 \\
                                        ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest
                                    
                                    # Run frontend container
                                    echo "Starting frontend container..."
                                    docker run -d \\
                                        --name island-table-frontend \\
                                        --network food-recipe-network \\
                                        --restart unless-stopped \\
                                        -p 80:80 \\
                                        ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest
                                    
                                    # Clean up old images
                                    echo "Cleaning up old images..."
                                    docker image prune -f
                                    
                                    # Show running containers
                                    echo "Running containers:"
                                    docker ps
                                '
                            """
                        } else {
                            bat """
                                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "docker network create food-recipe-network || true & docker stop island-table-backend island-table-frontend & docker rm island-table-backend island-table-frontend & docker pull ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest & docker pull ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest & docker run -d --name island-table-backend --network food-recipe-network --restart unless-stopped -p 5000:5000 ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest & docker run -d --name island-table-frontend --network food-recipe-network --restart unless-stopped -p 80:80 ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest & docker ps"
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
