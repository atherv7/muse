package application 

import (
	"net/http" 
	"github.com/go-chi/chi/v5" 
)

func loadRoutes() *chi.Mux {
	router := chi.NewRouter() 

	router.Get("/", func (w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK) 
	}) 
	
	router.Route("/search", loadSearchRoute) 
	
	return router 
}

func loadSearchRoute(router chi.Router) {
	searchHandler := &handler.Search{}
	
	router.Get("/byname/{name}", searchHandler.GetByName) 
	router.Get("/byauthor/{name}", searchHandler.GetByAuthor) 
}
