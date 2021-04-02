Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :images

  # get "/images/:image_id", controller: "images", action: "delete_image"
  # this handles get request

  # delete "/delete-images", controller: "images", action: "delete_image"

  get "/x", controller: "home", action:"x"
end

# rails routes
# Prefix Verb   URI Pattern                            Controller#Action
# images GET    /images(.:format)                      images#index
#        POST   /images(.:format)                      images#create
#  image GET    /images/:id(.:format)                  images#show
#        PATCH  /images/:id(.:format)                  images#update
#        PUT    /images/:id(.:format)                  images#update
#        DELETE /images/:id(.:format)                  images#destroy
