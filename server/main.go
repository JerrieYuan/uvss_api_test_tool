package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"code.aliyun.com/JRY/mtquery/module/mhttp"
)

var (
	imageId = 1
)

func main() {
	port := ":608"
	if len(os.Args) == 2 {
		_, err := strconv.Atoi(os.Args[1])
		if err == nil {
			port = ":" + os.Args[1]
		}
	}
	http.HandleFunc("/newimage", NewImage)
	http.HandleFunc("/", NotFound)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		panic(err)
	}
}

func NewImage(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	url := r.FormValue("url")
	filename := fmt.Sprintf("images/image_%d.jpg", imageId)
	imageId++
	fmt.Println(url, "=>", filename)
	err := mhttp.DownloadUrl(url, filename, "root", "admin")
	if err != nil {
		fmt.Println(err)
	}
	w.Write([]byte("{}"))
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("404 not found"))
}
