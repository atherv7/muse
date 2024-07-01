package handler 

import (
	"fmt" 
	"net/http" 
)

type Search struct {} 

func (s *Search) GetByName(w http.ResponseWriter, r *http.Requests) {
	fmt.Println("Get the art piece by name") 
}

func (s *Search) GetByAuthor(w http.ResponseWriter, r *http.Requests) {

}
