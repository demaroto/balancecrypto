import React, { useEffect } from "react";
import { SunFill, MoonStars } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from "../redux/actions/themeSlice";


const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()
  
  const themeClass = theme === "dark" ? "light" : "dark";
  const cssBackground = { dark: "rgb(33,37,41)", light: "#ffffff" };

  
  useEffect(() => {
      
      localStorage.setItem("theme", theme)
      document.body.style.backgroundColor = cssBackground[theme]
      
    return () => {
    };
  }, [theme, themeClass, cssBackground]);
  return (
    <div class="d-grid gap-2">
        <button className={`text-capitalize btn text-${themeClass} btn-lg"`} type="button" onClick={() => dispatch(changeTheme(themeClass))}>
          {theme ? theme === 'light' ? <span><MoonStars /> Noite</span> : <span><SunFill /> Dia</span> : "Choose Theme"}
        </button>   
    </div>
     
      );
};
export default ThemeSwitcher;