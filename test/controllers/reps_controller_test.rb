require 'test_helper'

class RepsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get reps_index_url
    assert_response :success
  end

  test "should get show" do
    get reps_show_url
    assert_response :success
  end

  test "should get new" do
    get reps_new_url
    assert_response :success
  end

  test "should get create" do
    get reps_create_url
    assert_response :success
  end

  test "should get edit" do
    get reps_edit_url
    assert_response :success
  end

end
