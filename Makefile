all:
	@react-scripts build
	@sed -i "s/\"\/uvss_api_test_tool/\"\./g" build/index.html
	@echo please run \"electron build\" now
