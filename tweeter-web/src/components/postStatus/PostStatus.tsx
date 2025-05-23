import "./PostStatus.css";
import React, { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoHook from "../userInfo/UserInfoHook";
import {PostPresenter, PostStatusView} from "../../presenter/PostPresenter";

const PostStatus = () => {
  const {displayErrorMessage, displayInfoMessage, clearLastInfoMessage} = useToastListener();

  const {currentUser, authToken} = useUserInfoHook();
  const [post, setPost] = useState("");

  const listener: PostStatusView = {
    setPost: setPost,
    displayInfoMessage: displayInfoMessage,
    displayErrorMessage: displayErrorMessage,
    clearLastInfoMessage: clearLastInfoMessage
  }

  const [presenter] = useState(new PostPresenter(listener))

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    await presenter.submitPost(authToken, post, currentUser)
  }

    const clearPost = (event: React.MouseEvent) => {
      event.preventDefault();
      setPost("");
    };

    const checkButtonStatus: () => boolean = () => !post.trim() || !authToken || !currentUser;

    return (
        <form>
          <div className="form-group mb-3">
            <textarea
                className="form-control"
                id="postStatusTextArea"
                aria-label="post-text-box"
                rows={10}
                placeholder="What's on your mind?"
                value={post}
                onChange={(event) => {
                  setPost(event.target.value);
                }}
            />
          </div>
          <div className="form-group">
            <button
                id="postStatusButton"
                aria-label="post-button"
                className="btn btn-md btn-primary me-1"
                type="button"
                disabled={checkButtonStatus()}
                onClick={(event) => submitPost(event)}
            >
              Post Status
            </button>
            <button
                id="clearStatusButton"
                aria-label="clear-button"
                className="btn btn-md btn-secondary"
                type="button"
                disabled={checkButtonStatus()}
                onClick={(event) => clearPost(event)}
            >
              Clear
            </button>
          </div>
        </form>
    );
}

export default PostStatus;
