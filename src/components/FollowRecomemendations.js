import '../components/FollowRecomemendations.css';

import axios from "axios";
import { useEffect, useState } from "react";

const FollowRecomemendations = (props) => {
  const [recomemendations, setRecomemendations] = useState([]);

  const getRecomemendations = () => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/recommendations")
      .then((res) => {
        setRecomemendations(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRecomemendations();
  }, [props.posts]);

  const follow = (id) => {
    axios.post("https://akademia108.pl/api/social-app/follows/follow", {
      leader_id: id
    })
    .then(() => {
      props.getLatestPosts();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  console.log(recomemendations);

  return (
    <div className="followRecomemendations">
      {recomemendations.map((recomemendation) => {
        return (
          <div className="followRecomemendation" key={recomemendation.id}>
            <img src={recomemendation.avatar_url} alt={recomemendation.username}></img>
            <h3>{recomemendation.username}</h3>
            <button className="btn" onClick={() => follow(recomemendation.id)}>
              Follow
            </button>
          </div>
        )
      })}
    </div>
  );
};

export default FollowRecomemendations;
