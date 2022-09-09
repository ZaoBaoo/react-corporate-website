import { useEffect, useState } from "react";

const useFixVH = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  console.log(vh * 100);
};

export { useFixVH };
