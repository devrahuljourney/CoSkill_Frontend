import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../slices/loaderSlice";
import { setToken } from "../slices/userData";
import { useEffect } from "react";

export const useInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(showLoader());
        const token = await AsyncStorage.getItem("token");
        if (token) {
          dispatch(setToken(token));
        }
      } catch (err) {
        console.log("Error loading token:", err);
      } finally {
        dispatch(hideLoader());
      }
    };

    init();
  }, []);
};
