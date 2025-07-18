import './App.css'
import {ReactNode, useEffect, useState} from "react";
import LoginPage from "./LoginPage.tsx";
import ItemDetail from "./ItemDetail.tsx";
import ItemList from "./ItemList.tsx";
import logo from "./assets/logo.png";

enum Page {Login, ItemList, ItemDetail}

export default function App() {
    const [page, setPage] = useState<Page>(Page.Login);
    const [token, setToken] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        if (token == null) {
            setPage(Page.Login)
        }
    }, [token])

    let content: ReactNode;
    switch(page) {
        case Page.Login:
            content = <LoginPage onLogin={token => {setToken(token); setPage(Page.ItemList)}} />
        break;
        case Page.ItemList:
            content = <ItemList token={token!}
                                onItemOpened={itemId => { setSelectedItemId(itemId); setPage(Page.ItemDetail) }}
                                onItemCreate={() => { setSelectedItemId(null); setPage(Page.ItemDetail)}} />
        break;
        case Page.ItemDetail:
            content = <ItemDetail token={token!} itemId={selectedItemId} onBack={() => setPage(Page.ItemList)} />
        break;
    }
    return (
        <>
            <img src={logo} />
            {content}
        </>
    )
}
