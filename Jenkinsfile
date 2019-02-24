pipeline{
    agent any

    stages  {
      
        
        stage ('dockerbuild')
        {
            steps{
                echo 'docker build'
                sh 'docker build .' 
            }
        }
}
}