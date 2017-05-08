all:
	@react-scripts build
	@sed -i "s/\"\/uvss_api_test_tool/\"\./g" build/index.html
	@echo please run \"electron build\" now

debug:
	@NODE_ENV=development electron -r babel-register test
	

prod:all
	@mv build uvss_api_test_tool 
	@tar zcvf uvss_api_test_tool.tar.gz uvss_api_test_tool/
	@rm uvss_api_test_tool -rf

clean:
	@rm build -rf
	@rm uvss_api_test_tool -rf

deploy:
	@npm run deploy