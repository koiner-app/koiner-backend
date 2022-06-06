

# Koiner Backend

## Docker-compose

### Run nx builds
```
npm run build
```

### Start docker containers
```
docker-compose up
```

### Add virtual hosts (Optional)
```
127.0.0.1	gateway.docker
127.0.0.1	subscriptions.docker
127.0.0.1	chain.docker
127.0.0.1	contracts.docker
127.0.0.1	sync.chain.docker
127.0.0.1	sync.contracts.docker
127.0.0.1	jsonrpc.docker
127.0.0.1	pg-chain.docker
127.0.0.1	pg-contracts.docker
```

## Kubernetes

Run nx builds
```
npm run build
```

Start minikube
```
minikube start
```

Deploy cluster
```
kubectl apply -f ...
```
