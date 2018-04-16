class Api::FollowersController < ApplicationController
  before_action :client

  def index
    # binding.pry
    followers = @client.followers.take(10).collect do |followers|
      {
        id: follower.id,
        name: follower.name,
        img: follower.profile_image_url.to_s
      }
      # binding.pry
    end
    render json: followers
  end

  private

  def client
    @client = Twitter::REST::Client.new do |c|
      c.consumer_key = ENV['CONSUMER_KEY']
      c.consumer_secret = ENV['CONSUMER_SECRET']
      c.access_token = ENV['ACCESS_TOKEN']
      c.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
      # in development, these will be pulled from the local envirnment variable, in deployment these keys will come ffom the actual machine tit is being run on.
    end
  end
end
