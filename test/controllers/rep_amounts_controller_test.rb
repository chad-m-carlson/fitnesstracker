require 'test_helper'

class RepAmountsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get rep_amounts_index_url
    assert_response :success
  end

  test "should get create" do
    get rep_amounts_create_url
    assert_response :success
  end

  test "should get update" do
    get rep_amounts_update_url
    assert_response :success
  end

  test "should get destroy" do
    get rep_amounts_destroy_url
    assert_response :success
  end

end
