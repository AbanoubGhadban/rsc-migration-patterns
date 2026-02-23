# frozen_string_literal: true

# PatternsController - RSC Migration Pattern Demos
#
# Each action demonstrates a different RSC migration pattern from
# the React on Rails Pro migration guide (rsc-component-patterns.md).
#
# All actions use ReactOnRailsPro::Stream for streaming SSR with RSC support.

class PatternsController < ApplicationController
  include ReactOnRailsPro::Stream

  # Pattern 1: Pushing State to Leaf Components
  def product_page
    @product_page_props = { productId: 1 }
    stream_view_containing_react_components(template: "patterns/product_page")
  end

  # Pattern 2: The Donut Pattern (Children as Props)
  def cart_page
    @cart_page_props = {}
    stream_view_containing_react_components(template: "patterns/cart_page")
  end

  # Pattern 3: Extracting State into a Wrapper Component
  def theme_page
    @theme_page_props = {}
    stream_view_containing_react_components(template: "patterns/theme_page")
  end

  # Pattern 4: Async Server Components with Suspense
  def dashboard
    @dashboard_props = {}
    stream_view_containing_react_components(template: "patterns/dashboard")
  end

  # Pattern 5: Server-to-Client Promise Handoff
  def blog_post
    @blog_post_props = { postId: 1 }
    stream_view_containing_react_components(template: "patterns/blog_post")
  end
end
