

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
127.0.0.1	api.local
127.0.0.1	chain-api.local
127.0.0.1	contracts-api.local
127.0.0.1	network-api.local
127.0.0.1	tokenize-api.local
127.0.0.1	chain-sync.local
127.0.0.1	contracts-sync.local
127.0.0.1	network-sync.local
127.0.0.1	tokenize-sync.local
127.0.0.1	dapp.local
127.0.0.1	pg.local
127.0.0.1	amqp.local
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
