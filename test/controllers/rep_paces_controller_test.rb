require 'test_helper'

class RepPacesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get rep_paces_index_url
    assert_response :success
  end

  test "should get create" do
    get rep_paces_create_url
    assert_response :success
  end

  test "should get update" do
    get rep_paces_update_url
    assert_response :success
  end

  test "should get destroy" do
    get rep_paces_destroy_url
    assert_response :success
  end

end
