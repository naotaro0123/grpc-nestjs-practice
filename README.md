# grpc-nestjs-practice-
nestjs x grpc

# How to Create Project

protocからコード生成する方法
  1. [nestjs doc - create nest project](https://docs.nestjs.com/first-steps)

  2. `yarn add -D @nestjs/microservices`

  3. [nestjs doc - gRPC](https://docs.nestjs.com/microservices/grpc)

  4. create folder types and generate js code

    `protoc --proto_path=src --js_out=library=index,binary:src/types src/hero/hero.proto`


Protobuf.jsからコード生成する方法
  こっちの場合は、brew install protobufも不要

  `yarn add -D protobufjs`

  ```package.json
  "codegen": "pbjs --target static-module --wrap commonjs --keep-case --out ./src/types/hero_pb.js ./src/hero/hero.proto",
  "typegen": "pbts --out ./src/types/index.d.ts ./src/types/hero_pb.js"
  ```

  参考
  
  https://qiita.com/daikiojm/items/577d4f6675b298440ef6
  
  https://qiita.com/daikiojm/items/a7aee119c035ffd2bef5
