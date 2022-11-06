import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  counterState,
  deletePostsAsync,
  getPostsAsync,
  setEditId,
  setEditMode,
  setNewPostDescription,
  setNewPostTitle,
} from "./PostsSlice";

import "./Posts.css";

import { Icon } from "@iconify/react";

// Material UI
import {
  Card,
  CardContent,
  Typography,
  withStyles,
  Button,
} from "@material-ui/core";
import Form from "./Modal/newPostForm";

const styles = (muiBaseTheme) => ({
  card: {
    maxWidth: 300,
    margin: "15px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "4px 4px 40px 0px rgb(0 0 0 / 10%)",
    },
    borderRadius: "5px",
    position: "relative",
  },

  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing.unit,
    },
  },
});



function Counter({ classes }) {
  const { posts } = useSelector(counterState);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setEditMode({ value: false }));
    dispatch(setNewPostTitle({ value: "" }));
    dispatch(setNewPostDescription({ value: "" }));
    dispatch(setEditId({ value: null }));
  };

  useEffect(() => {
    dispatch(getPostsAsync({}));
  }, [dispatch]);

  return (
    <div>
      <div className="Header_title">
        <h2 style={{ fontFamily: "cursive" }}> Welcome to My Blog Post </h2>
        <Button
          variant="contained"
          onClick={handleOpen}
          className="newPostBtn"
          color="primary"
        >
          New Post
        </Button>
      </div>
      <div className="App">
        {posts.map(({ title, body, id }) => {
          return (
            <Card className={classes.card}>
              <CardContent className={classes.media}>
                <div className="action_button">
                  <Icon
                    icon="fluent:clipboard-text-edit-24-filled"
                    onClick={() => {
                      dispatch(setEditMode({ value: true }));
                      dispatch(setNewPostTitle({ value: title }));
                      dispatch(setNewPostDescription({ value: body }));
                      dispatch(setEditId({ value: id }));
                      handleOpen();
                    }}
                  />
                  <Icon
                    icon="fluent:delete-20-filled"
                    onClick={() => {
                      dispatch(deletePostsAsync({ id }));
                    }}
                  />
                </div>
                <Typography
                  className={"MuiTypography--heading"}
                  variant={"h6"}
                  gutterBottom
                >
                  {title}
                </Typography>
                <Typography
                  className={"MuiTypography--subheading"}
                  variant={"caption"}
                >
                  {body}
                </Typography>
              </CardContent>
            </Card>
          );
        })}

        <Form open={open} handleOpen={handleOpen} handleClose={handleClose} />
     
      </div>
    </div>
  );
}

export const WrappedApp = withStyles(styles)(Counter);
