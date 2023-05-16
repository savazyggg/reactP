import { dbService, storageService } from "myBase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState, useRef } from "react";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attatchment, setAttatchment] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let attatchmentURL = "";
    if (attatchment != "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const attachmentData = attatchment.split(",")[1]; // "data:[<mediatype>][;base64],<data>" 형식에서 <data> 부분만 추출
      const response = await uploadString(
        attachmentRef,
        attachmentData,
        "base64"
      ); // "base64" 인코딩된 문자열을 업로드
      attatchmentURL = await getDownloadURL(response.ref);
    }

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attatchmentURL,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    console.log(nweet.creatorId, userObj.uid);
    setNweet("");
    setAttatchment("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  const onFileChange = (e) => {
    //console.log(e.target.files);//e.target하면 인풋자체 태그들이 나옴
    const {
      target: { files },
    } = e;
    const theFile = files[0]; //file리스트로 가져옴으로 인덱스 정해줘야함
    //console.log(theFile);
    const reader = new FileReader(); //fildreader doc찾아보기
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttatchment(result);
    };
  };

  const onClearAttachmentClick = () => {
    setAttatchment(null);
    fileInput.current.value = null;
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Nweet" />
        {attatchment && (
          <div>
            <img src={attatchment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
