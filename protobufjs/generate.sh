DIST_DIR=./src/types/index.js

./node_modules/.bin/pbjs --target static-module --wrap commonjs --keep-case --out "${DIST_DIR}" ./src/hero/*.proto
./node_modules/.bin/pbts --out ./src/types/index.d.ts "${DIST_DIR}"
