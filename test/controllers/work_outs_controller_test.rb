require 'test_helper'

class WorkOutsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get work_outs_index_url
    assert_response :success
  end

  test "should get show" do
    get work_outs_show_url
    assert_response :success
  end

  test "should get new" do
    get work_outs_new_url
    assert_response :success
  end

  test "should get create" do
    get work_outs_create_url
    assert_response :success
  end

  test "should get edit" do
    get work_outs_edit_url
    assert_response :success
  end

end
