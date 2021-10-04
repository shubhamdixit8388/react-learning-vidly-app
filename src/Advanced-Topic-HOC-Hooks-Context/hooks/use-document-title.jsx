import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;

    // componentWillUnmount
    return () => {
      console.log("Clean Up!!");
    };
  });
}
