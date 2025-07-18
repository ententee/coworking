import {useEffect, useState} from "react";
import {Item} from "./Item.ts";
import {SERVER_URL} from "./config.ts";
import "./ItemList.css"

interface ItemListProps {
    token: string,
    onItemOpened: (itemId: number) => void,
    onItemCreate: () => void
}

export default function ItemList(props: ItemListProps) {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        fetch(`${SERVER_URL}/items`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        }).then(res => res.json())
        .then(resJson => setItems(resJson.items))
    }, [props.token])

    const deleteItem = async (itemId: number) => {
        await fetch(`${SERVER_URL}/items/${itemId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        })
        setItems(prevItems => prevItems.filter(item => item.id !== itemId))
    }

    return <>
        <button className="new-item" onClick={() => props.onItemCreate()}>New Item</button>
        <table>
            <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Actions</th>
            </thead>
            <tbody>
            {items.map((item) => <tr key={item.id}>
                <td className="clickable" onClick={() => props.onItemOpened(item.id)}>{item.id}</td>
                <td className="clickable" onClick={() => props.onItemOpened(item.id)}>{item.name}</td>
                <td className="clickable" onClick={() => props.onItemOpened(item.id)}>{item.amount}</td>
                <td>
                    <span className="link" onClick={() => props.onItemOpened(item.id)}>✎</span>
                    <span className="link" onClick={() => deleteItem(item.id)}>🗑</span>
                </td>
            </tr>)}
            </tbody>
        </table>
    </>
}