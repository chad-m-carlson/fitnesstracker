require 'test_helper'

class Api::ExerciseCategoriesExercisesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_exercise_categories_exercises_index_url
    assert_response :success
  end

  test "should get show" do
    get api_exercise_categories_exercises_show_url
    assert_response :success
  end

end
