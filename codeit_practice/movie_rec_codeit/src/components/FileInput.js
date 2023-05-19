import React, { useEffect, useRef, useState } from "react";

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const inputRef = useRef();
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = ""; //input값을 지워주고
    onChange(name, null); //상위컴포넌트 상태 변경해줌
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value); //오브젝트 url, 문자열 리턴, 해당파일의 주소처럼 쓸 수 있는 값
    setPreview(nextPreview);
    return () => {
      //언마운트될때 정리함수
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  //오브젝트 url을 만들면 웹은 메모리를 할당하고 파일에 대한 주소를 만들어줌. 파일인풋은 랜더링 과정에서 외부의 상태를 바꿈-메모리할당(컴포넌트 상태에서 외부의 상태를 바꾸는것) -> side effect
  return (
    <div>
      <div>
        <img src={preview} alt="이미지 미리보기" />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={inputRef}
        ></input>
        {value && <button onClick={handleClearClick}>x</button>}
      </div>
    </div>
  );
};

export default FileInput;

// 파일인풋은 비제어 컴포넌트로 만들어야됨
//state리프팅
