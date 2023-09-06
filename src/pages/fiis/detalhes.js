import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import HeaderComponent from '../../components/Header.Component';
import LinkListComponent from '../../components/LinkList.Component';
import { useParams } from 'react-router-dom';



const Index = () => {
    const theme = useSelector((state) => state.theme.value)
    const themeText = theme === 'dark' ? 'light' : 'dark';
    const  { id } = useParams()
   
    useEffect(() => {
   
    }, []);


    return (
        <div className='h-100'>
            <LinkListComponent />
            <main className={[theme, "container", "h-100", `bg-${theme}`].join(" ")}>
                 <h2 className={`text-${themeText}`}>{id}</h2>
            </main>
         
        </div>
    );
}

export default Index;
