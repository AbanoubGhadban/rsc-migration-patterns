Rails.application.routes.draw do
  get 'hello_server', to: 'hello_server#index'
  rsc_payload_route

  # RSC Migration Patterns
  get 'patterns/product_page', to: 'patterns#product_page'  # Pattern 1
  get 'patterns/cart_page', to: 'patterns#cart_page'         # Pattern 2
  get 'patterns/theme_page', to: 'patterns#theme_page'       # Pattern 3
  get 'patterns/dashboard', to: 'patterns#dashboard'         # Pattern 4
  get 'patterns/blog_post', to: 'patterns#blog_post'         # Pattern 5
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  root "home#index"
end
