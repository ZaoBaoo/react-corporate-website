// import { useState, useEffect } from "react";

// // Store
// import { useDispatch, useSelector } from "react-redux";
// import { userDBAction } from "../store/slice/userDBSlice";

// // Firebase
// import { storage } from "../firebase";
// import { ref, listAll, getDownloadURL } from "firebase/storage";

// const useAvatar = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const avatarRef = ref(storage, `avatars/KUQq5TJySHWuTxNno0pvcUDxsl52`);

//     listAll(avatarRef).then((data) => console.log(data));

//     listAll(avatarRef).then((data) => {
//       const avatartName = data.prefixes.map((i) => {

//         // getDownloadURL(ref(storage, `avatars/`))
//       });

//       //   const avatartName = data.prefixes.map((i) => ({ name: i.name }));
//       //   dispatch(userDBAction.setAvatarNameList(avatartName));
//     });
//   }, []);
// };

// export { useAvatar };
