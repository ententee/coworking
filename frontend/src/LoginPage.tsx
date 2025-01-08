import {useState} from "react";
import {SERVER_URL} from "./config.ts";

interface LoginPageProps {
    onLogin: (token: string) => void
}

export default function LoginPage(props: LoginPageProps) {
    const [error, setError] = useState<boolean>(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const response = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({username: username, password: password}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            const responseBody = await response.json()
            props.onLogin(responseBody.token)
        } else {
            setError(true)
        }
    }

    return <div style={{display: 'flex', flexDirection: 'column', gap: '0.5em', width: '500px'}}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={login}>Login</button>
        {error && "There was an error while logging in. Try using credentials admin/admin"}
    </div>
}