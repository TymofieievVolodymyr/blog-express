import { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserPosts, savePost } from '../api/api';
import Post from '../components/Post';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';

export const EditorContext = createContext(undefined);

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [isEditorVisible, setEditorVisible] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      fetchUserPosts(user.userId).then((json) => setPosts(json));
    }
  }, []);

  function getPostProps(post) {
    return {
      postId: post.postId,
      userName: `${user.firstName} ${user.lastName}`,
      userId: post.userId,
      title: post.title,
      content: post.content,
      created: post.created,
      modified: post.modified,
      setPosts: (value) => setPosts(value),
    };
  }

  function getEditorProps() {
    return {
      onSave: (title, content) => onPostSave(title, content),
      onCancel: () => setEditorVisible(false),
      initialTitle: '',
      initialContent: '',
    };
  }

  function getPosts() {
    if (posts.length > 0) {
      return posts.map((post) => <Post key={`post_${post.postId}`} {...getPostProps(post)} />);
    }
  }

  function onAddPostClick() {
    setEditorVisible(true);
  }

  function onPostSave(title, content) {
    const post = {
      userId: user.userId,
      title: title,
      content: content,
    };
    savePost(post).then((code) => {
      if (code === 201) {
        fetchUserPosts(user.userId)
          .then((posts) => {
            setPosts(posts);
            setEditorVisible(false);
          });
      } else {
        alert('An error occurred please try again later');
      }
    });
  }

  if (user === undefined) {
    return <Navigate to='/login' />;
  }

  return (
    <><Navbar />
      <div className='container'>
        <div className='flex-column'>
          {getPosts()}
          {isEditorVisible && <Editor {...getEditorProps()} />}
          <div
            className='flex-column'
            style={{ justifyContent: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
            {!isEditorVisible && <button onClick={onAddPostClick}>Create post</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;