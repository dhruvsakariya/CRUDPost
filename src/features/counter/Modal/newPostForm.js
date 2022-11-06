import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import "./newPostForm.css";

import { useForm } from "react-hook-form";
import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  counterState,
  createPostsAsync,

  setNewPostDescription,
  setNewPostTitle,
  updatePostsAsync,
} from "../PostsSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
}));

export default function Form({ open, handleOpen, handleClose }) {
  const dispatch = useDispatch();

  const { newPostTitle, newPostDescription, editMode, editId } =
    useSelector(counterState);
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    dispatch(setNewPostTitle({ value: data.example }));
    dispatch(setNewPostDescription({ value: data.exampleRequired }));
    if (editMode) {
      await dispatch(updatePostsAsync({ id: editId }));
    } else {
      await dispatch(createPostsAsync({}));
    }

    handleClose();
  };

  useEffect(() => {
    setValue("example", newPostTitle, {
      shouldValidate: false,
    });
    setValue("exampleRequired", newPostDescription, {
      shouldValidate: false,
    });
  }, [newPostTitle, newPostDescription, setValue]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>Create New Post</h3>
              <div>
                <TextField
                  size="small"
                  {...register("example", { required: true })}
                  className="post_input_title"
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                />
              </div>
              <div className="post_input_error">
                {errors.example && <span>This field is required</span>}
              </div>
              <div>
                <TextareaAutosize
                  className="textArea_wrapper"
                  minRows={10}
                  {...register("exampleRequired", { required: true })}
                  aria-label="empty textarea"
                  placeholder="Description"
                />
              </div>
              <div className="post_input_error">
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
              <Button
                type="submit"
                variant="contained"
                className="submitBtn"
                color="secondary"
                size="small"
              >
                {editMode ? "Update" : "Submit"}
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
