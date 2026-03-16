

ng-watch:
	ng build --watch --configuration development

tsc-watch:
	npx tsc --watch -p electron/tsconfig.electron.json

tests: test-damerau-levenshtein

test-damerau-levenshtein:
	npx jest damerauLevenshtein --config=jest.config.js --verbose