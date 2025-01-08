import {useEffect, useState} from "react";
import {Item} from "./Item.ts";
import {SERVER_URL} from "./config.ts";

interface ItemDetailProps {
    token: string,
    itemId: number | null,
    onBack: () => void
}

export default function ItemDetail(props: ItemDetailProps) {
    const [item, setItem] = useState<Item>()

    useEffect(() => {
        fetch(`${SERVER_URL}/items/${props.itemId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        }).then(res => res.json())
        .then(resJson => setItem(resJson))
    }, [props.token, props.itemId])

    const save = async() => {
        let url: string
        let method: string
        if (props.itemId) {
            url = `${SERVER_URL}/items/${props.itemId}`
            method = "PUT"
        } else {
            url = `${SERVER_URL}/items`
            method = "POST"
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.token}`
            }
        }).then(props.onBack)
    }

    if (item == null) return <>Loading...</>

    return <div style={{display: "flex", flexDirection: "column", gap: "0.5em"}}>
        <button type="button" onClick={props.onBack}>Back</button>
        Item Detail
        <label>ID: {item.id}</label>
        <div>
            <label>Name: </label>
            <input value={item.name} onChange={e => setItem({...item, name: e.target.value})} />
        </div>
        <div>
            <label>Amount: </label>
            <input value={item.amount} type="number" onChange={e => setItem({...item, amount: parseInt(e.target.value)})} />
        </div>
        <button type="button" onClick={save}>Save</button>
    </div>
}