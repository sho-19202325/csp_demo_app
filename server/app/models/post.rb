class Post < ApplicationRecord
  validates :title, presence: true, length: { maximum: 50 }
  validates :content, length: { maximum: 1000 }
end
