import { authService, dbService } from "myBase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const nweets = await getDocs(q);
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  return (
    <>
      <form>
        <input type="text" onChange={onChange} value={newDisplayName} />
        <input type="submit" onClick={onSubmit} value="update Profile" />

        <button onClick={onLogOutClick}>Log out</button>
      </form>
    </>
  );
};
export default Profile;
