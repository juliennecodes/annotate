Rails.application.routes.draw do
  resources :images
end

# rails routes
# Prefix Verb   URI Pattern                            Controller#Action
# images GET    /images(.:format)                      images#index
#        POST   /images(.:format)                      images#create
#  image GET    /images/:id(.:format)                  images#show
#        PATCH  /images/:id(.:format)                  images#update
#        PUT    /images/:id(.:format)                  images#update
#        DELETE /images/:id(.:format)                  images#destroy
