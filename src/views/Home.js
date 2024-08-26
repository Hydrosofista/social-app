import './Home.css';
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPost from "../components/AddPost";
import FollowRecomemendations from '../components/FollowRecomemendations';

const Home = (props) => {
  // hook stanów poniżej, pusta tablica dla mapowania /pobrania danych
  const [posts, setPosts] = useState([])

  const getLatestPosts = () => {
    axios.post("http://akademia108.pl/api/social-app/post/latest")
      .then((res) => {

        setPosts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const getNextPosts = () => {
    axios.post("http://akademia108.pl/api/social-app/post/older-then",
      { date: posts[posts.length - 1].created_at }
    )
      .then((res) => {
 //       setPosts(res.data); // Wersja z nadpisem 10 postów w przeglądarce, pokazuje zawsze 10 postów
        setPosts(posts.concat(res.data)); // Wersja z doklejaniem kolejnyuch 10 postów w przeglądarce
      })
      .catch((error) => {
        console.error(error);
      });
  }
//------------------------------------------------
const getPrevPosts = () => {
  axios.post("http://akademia108.pl/api/social-app/post/newer-then",
    { date: posts[0].created_at }
  )
    .then((res) => {
//       setPosts(res.data); // Wersja z nadpisem 10 postów w przeglądarce, pokazuje zawsze 10 postów
      setPosts(res.data.concat(posts)); // Wersja z doklejaniem kolejnyuch 10 postów w przeglądarce
    })
    .catch((error) => {
      console.error(error);
    });
}

//------------------------------------------------


  useEffect(() => {
    getLatestPosts();
  }, [props.user])
  // console.log(posts); // Informacje o załadowaniu nowych danych #debug
  return (
    <div className="home">
      <h2>Home</h2>

      {props.user && <AddPost getPrevPosts={getPrevPosts}/>}
      {props.user && <FollowRecomemendations user={props.user} getLatestPosts={getLatestPosts} posts={posts}/>}

      <div className="postList"> {posts.map((post) => {
        return <Post post={post} key={post.id} user={props.user} setPosts={setPosts} getLatestPosts={getLatestPosts}/>
      })}
      </div>
      <button className='btn loadMore' onClick={getNextPosts}>Load more</button>
    </div>
  )

}

export default Home;