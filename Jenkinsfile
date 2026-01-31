pipeline {
    agent any

    environment {
        DOCKERHUB_NAMESPACE = 'emashachathuni'
        BACKEND_IMAGE_NAME = 'island-table-backend'
        FRONTEND_IMAGE_NAME = 'island-table-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIAL_ID = 'dockerhub-credentials'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('🔍 Checkout') {
            steps {
                echo ' Checking out source code...'
                checkout scm
                sh '''
                    echo "Current directory: $(pwd)"
                    echo "Files in workspace:"
                    ls -la
                    echo "Frontend directory:"
                    ls -la frontend/ || echo "Frontend directory not found!"
                    echo "Backend directory:"
                    ls -la backend/ || echo "Backend directory not found!"
                '''
            }
        }

        stage(' Build Backend Image') {
            steps {
                echo ' Building backend Docker image...'
                script {
                    sh """
                        cd backend
                        docker build \
                          --no-cache \
                          -t ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG} \
                          -t ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:latest \
                          .
                    """
                }
            }
        }

        stage(' Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                script {
                    sh """
                        cd frontend
                        docker build \
                          --no-cache \
                          -t ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG} \
                          -t ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:latest \
                          .
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '⬆️ Pushing images to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIAL_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
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
                }
            }
        }

        stage('🧹 Cleanup') {
            steps {
                echo '🗑️ Cleaning up old images...'
                sh '''
                    docker image prune -f || true
                    docker system prune -f || true
                '''
            }
        }
    }

    post {
        always {
            echo '📊 Pipeline execution completed.'
        }
        success {
            echo '✅ SUCCESS! Docker images built and pushed successfully!'
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo "Backend Image: ${DOCKERHUB_NAMESPACE}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}"
            echo "Frontend Image: ${DOCKERHUB_NAMESPACE}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        }
        failure {
            echo '❌ FAILED! Build or push failed. Check logs above for details.'
        }
    }
}
