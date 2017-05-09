all:clean server_linux server_windows js
	@mv server_bin build/downloads -f

build_js:
	@react-scripts build
	@cp package.json build/
	@rm build/static/*/*.map
	@rm build/index.html
	@mv build/main.html build/index.html


set_js:
	@echo ./static/js/$(shell ls build/static/js/ | grep js$)"||"./static/css/$(shell ls build/static/css/ | grep css$) > build/config

js:clean build_js set_js
	@echo please run \"electron build\" now


debug:
	@cp package.json test/
	@NODE_ENV=development electron -r babel-register test

prod:all
	@mv build uvss_api_test_tool 
	@tar zcvf uvss_api_test_tool.tar.gz uvss_api_test_tool/
	@rm uvss_api_test_tool -rf

clean:
	@rm build -rf
	@rm uvss_api_test_tool -rf
	@rm test/package.json -rf

deploy:
	@npm run deploy

server_linux:
	-@mkdir ../server_bin
	@cd server && GOOS=linux go build -ldflags "-w -s" -o ../server_bin/server.bin

server_windows:
	-@mkdir ../server_bin
	@cd server && GOOS=windows go build -ldflags "-w -s" -o ../server_bin/server.exe