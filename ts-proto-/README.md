# ts-proto

### Start project
`yarn start:dev`

### check api command
```
# unaryCall
grpcurl -plaintext \
-proto hero.proto \
-import-path ./src/protos \
-d '{"id": 1}' \
-rpc-header 'credentials: hogehoge' \
  localhost:5000 \
  hero.HeroService/UnaryCall

# clientStreamExample
grpcurl -plaintext \
-proto hero.proto \
-import-path ./src/protos \
-d '{"id": 1}' \
-rpc-header 'credentials: hogehoge' \
  localhost:5000 \
  hero.HeroService/ClientStreamExample

# serverStreamExample
grpcurl -plaintext \
-proto hero.proto \
-import-path ./src/protos \
-d '{"id": 1}' \
-rpc-header 'credentials: hogehoge' \
  localhost:5000 \
  hero.HeroService/ServerStreamExample

# bidirectionalStreamExample
grpcurl -plaintext \
-proto hero.proto \
-import-path ./src/protos \
-d '{"id": 1}' \
-rpc-header 'credentials: hogehoge' \
  localhost:5000 \
  hero.HeroService/BidirectionalStreamExample
```
