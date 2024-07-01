package main 

import (
	"fmt"
	"context" 
	...
	"github.com/atherv7/search_micro/application" 
	...
)

func main() {
	app := application.New() 

	err := app.Start(context.TODO())
	if err != nil {
		fmt.Println("failed to start search service:", err) 
	}
}
