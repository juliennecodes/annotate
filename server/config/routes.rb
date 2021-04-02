Rails.application.routes.draw do
  resources :images do
    resources :annotations
  end
end

# rails routes
#            Prefix Verb   URI Pattern                                       Controller#Action
# image_annotations GET    /images/:image_id/annotations(.:format)           annotations#index
#                   POST   /images/:image_id/annotations(.:format)           annotations#create
#  image_annotation GET    /images/:image_id/annotations/:id(.:format)       annotations#show
#                   PATCH  /images/:image_id/annotations/:id(.:format)       annotations#update
#                   PUT    /images/:image_id/annotations/:id(.:format)       annotations#update
#                   DELETE /images/:image_id/annotations/:id(.:format)       annotations#destroy
#            images GET    /images(.:format)                                 images#index
#                   POST   /images(.:format)                                 images#create
#             image GET    /images/:id(.:format)                             images#show
#                   PATCH  /images/:id(.:format)                             images#update
#                   PUT    /images/:id(.:format)                             images#update
#                   DELETE /images/:id(.:format)                             images#destroy